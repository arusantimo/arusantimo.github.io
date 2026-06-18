#!/usr/bin/env node
/**
 * goal-cli.mjs — aru-goal CRUD CLI
 *
 * Usage:
 *   node goal-cli.mjs current
 *   node goal-cli.mjs list
 *   node goal-cli.mjs add --json '<JSON>' [--max-retries N]
 *   node goal-cli.mjs done
 *   node goal-cli.mjs pause
 *   node goal-cli.mjs block
 *   node goal-cli.mjs retry
 *   node goal-cli.mjs milestones
 *   node goal-cli.mjs milestone-check --index N
 *   node goal-cli.mjs milestone-uncheck --index N
 *   node goal-cli.mjs refresh-instructions
 *
 * File split policy (token 방지):
 *   milestones > 5 개 OR objective > 300자 → detail file 자동 생성
 *   current.md  : compact 요약 (hook 주입용, 항상 경량)
 *   goals/{id}.md: 전체 상세 (필요 시 에이전트가 Read)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

// ---------------------------------------------------------------------------
// 상수
// ---------------------------------------------------------------------------

/** compact current.md에 표시할 최대 미완료 마일스톤 수 */
const COMPACT_MILESTONE_LIMIT = 3;
/** compact current.md의 최대 objective 글자 수 */
const COMPACT_OBJECTIVE_LIMIT = 200;
/** detail file 생성 기준: 마일스톤 수 */
const DETAIL_THRESHOLD_MILESTONES = 5;
/** detail file 생성 기준: objective 글자 수 */
const DETAIL_THRESHOLD_OBJECTIVE_LEN = 300;

// ---------------------------------------------------------------------------
// 경로 헬퍼
// ---------------------------------------------------------------------------

function resolveSlug(cwd = process.cwd()) {
  try {
    const result = spawnSync('git', ['rev-parse', '--show-toplevel'], {
      encoding: 'utf8',
      cwd,
    });
    if (result.status === 0 && result.stdout.trim()) {
      return path.basename(result.stdout.trim());
    }
  } catch {
    // fallthrough
  }
  return path.basename(cwd);
}

function resolveGoalDir(slug, home = os.homedir()) {
  return path.join(home, '.claude', 'projects', slug);
}

function goalsJsonlPath(goalDir) {
  return path.join(goalDir, 'goals.jsonl');
}

function currentMdPath(goalDir) {
  return path.join(goalDir, 'goals', 'current.md');
}

function detailMdPath(goalDir, goalId) {
  return path.join(goalDir, 'goals', `${goalId}.md`);
}

// ---------------------------------------------------------------------------
// JSONL I/O
// ---------------------------------------------------------------------------

function readGoals(goalDir) {
  const p = goalsJsonlPath(goalDir);
  if (!existsSync(p)) return [];
  return readFileSync(p, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => { try { return JSON.parse(line); } catch { return null; } })
    .filter(Boolean);
}

function writeGoals(goalDir, goals) {
  mkdirSync(goalDir, { recursive: true });
  writeFileSync(
    goalsJsonlPath(goalDir),
    goals.map((g) => JSON.stringify(g)).join('\n') + '\n',
    'utf8',
  );
}

// ---------------------------------------------------------------------------
// Goal 로직
// ---------------------------------------------------------------------------

function getActiveGoal(goals) {
  return goals
    .filter((g) => g.status === 'active')
    .sort((a, b) =>
      (b.priority ?? 1) - (a.priority ?? 1) ||
      (b.created_at > a.created_at ? 1 : -1),
    )[0] ?? null;
}

function makeGoal({ title, objective, milestones = [], priority = 1, max_retries = null }, slug) {
  const ts = Math.floor(Date.now() / 1000);
  const now = new Date().toISOString();
  return {
    id: `g-${ts}`,
    title,
    objective,
    milestones,
    status: 'active',
    priority,
    max_retries: max_retries != null ? Number(max_retries) : null,
    retries: 0,
    created_at: now,
    updated_at: now,
    project_slug: slug,
  };
}

/** 파일 분리가 필요한지 여부 */
function needsDetailFile(goal) {
  return (
    (goal.milestones ?? []).length > DETAIL_THRESHOLD_MILESTONES ||
    (goal.objective ?? '').length > DETAIL_THRESHOLD_OBJECTIVE_LEN
  );
}

// ---------------------------------------------------------------------------
// 파일 쓰기: compact current.md (항상 경량 — hook 주입용)
// ---------------------------------------------------------------------------

function writeCurrentMd(goalDir, goal) {
  const dir = path.join(goalDir, 'goals');
  mkdirSync(dir, { recursive: true });
  const p = currentMdPath(goalDir);

  if (!goal) {
    writeFileSync(p, '활성 goal이 없습니다.\n', 'utf8');
    return;
  }

  // objective: 300자 초과 시 잘라서 detail file 참조
  const obj =
    (goal.objective ?? '').length > COMPACT_OBJECTIVE_LIMIT
      ? `${goal.objective.slice(0, COMPACT_OBJECTIVE_LIMIT)}… (전체: goals/${goal.id}.md)`
      : goal.objective;

  // 미완료 마일스톤만, 최대 3개
  const milestones = goal.milestones ?? [];
  const pending = milestones.filter((m) => !m.done);
  const shown = pending.slice(0, COMPACT_MILESTONE_LIMIT);
  const hiddenCount = pending.length - shown.length;
  const milestoneLines = shown.map((m) => `- [ ] ${m.title}`).join('\n');
  const moreHint =
    hiddenCount > 0 ? `... 외 ${hiddenCount}개 (goals/${goal.id}.md 참조)` : '';

  // 재시도 정보
  const retryInfo =
    goal.max_retries != null
      ? `재시도: ${goal.retries ?? 0}/${goal.max_retries}`
      : null;

  const lines = [
    `**제목**: ${goal.title}`,
    `**목적**: ${obj}`,
    shown.length
      ? `**미완료 마일스톤**:\n${milestoneLines}${moreHint ? '\n' + moreHint : ''}`
      : null,
    retryInfo,
  ].filter(Boolean);

  writeFileSync(p, lines.join('\n') + '\n', 'utf8');
}

// ---------------------------------------------------------------------------
// 파일 쓰기: goals/{id}.md (전체 상세, 조건부 생성)
// ---------------------------------------------------------------------------

function writeDetailMd(goalDir, goal) {
  const dir = path.join(goalDir, 'goals');
  mkdirSync(dir, { recursive: true });
  const p = detailMdPath(goalDir, goal.id);

  const milestoneLines = (goal.milestones ?? [])
    .map((m) => `- [${m.done ? 'x' : ' '}] ${m.title}`)
    .join('\n');

  const retryLine =
    goal.max_retries != null
      ? `재시도: ${goal.retries ?? 0}/${goal.max_retries}`
      : '재시도 한도: 없음';

  const lines = [
    `# Goal: ${goal.title}`,
    ``,
    `| 항목 | 값 |`,
    `|------|-----|`,
    `| ID | ${goal.id} |`,
    `| 상태 | ${goal.status} |`,
    `| 우선순위 | ${goal.priority} |`,
    `| ${retryLine.split(':')[0]} | ${retryLine.split(':')[1]?.trim() ?? ''} |`,
    `| 생성 | ${goal.created_at} |`,
    `| 갱신 | ${goal.updated_at} |`,
    ``,
    `## 목적`,
    ``,
    goal.objective,
    ``,
    milestoneLines ? `## 마일스톤\n\n${milestoneLines}` : null,
  ].filter((l) => l !== null);

  writeFileSync(p, lines.join('\n') + '\n', 'utf8');
}

/** goal 저장 후 파일들을 알맞게 기록 */
function persistGoalFiles(goalDir, goal) {
  writeCurrentMd(goalDir, goal);
  if (!goal) return;
  if (needsDetailFile(goal)) {
    writeDetailMd(goalDir, goal);
  }
}

// ---------------------------------------------------------------------------
// refresh-instructions (AGENTS.md arus 블록 upsert)
// ---------------------------------------------------------------------------

function buildBlock(skillName, content) {
  const body = content.trim();
  return [
    `<!-- arus:instructions:start skill=${skillName} -->`,
    body,
    `<!-- arus:instructions:end skill=${skillName} -->`,
  ].join('\n');
}

function buildBlockPattern(skillName) {
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(
    `${esc(`<!-- arus:instructions:start skill=${skillName} -->`)}[\\s\\S]*?${esc(`<!-- arus:instructions:end skill=${skillName} -->`)}\n?`,
    'g',
  );
}

function upsertBlock(filePath, skillName, content) {
  const nextBlock = buildBlock(skillName, content);
  const current = existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
  const pattern = buildBlockPattern(skillName);

  let nextContent = current;
  if (pattern.test(current)) {
    nextContent = current.replace(pattern, `${nextBlock}\n`);
  } else if (current.trim().length === 0) {
    nextContent = `${nextBlock}\n`;
  } else {
    nextContent = `${current.replace(/\s*$/, '')}\n\n${nextBlock}\n`;
  }

  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, nextContent, 'utf8');
}

function refreshInstructions(cwd, home) {
  const slug = resolveSlug(cwd);
  const goalDir = resolveGoalDir(slug, home);
  const goals = readGoals(goalDir);
  const active = getActiveGoal(goals);

  let blockContent;
  if (!active) {
    blockContent = `# Aru-Goal\n\n활성 goal이 없습니다. \`/aru-goal set\`으로 목표를 설정하세요.`;
  } else {
    // AGENTS.md 블록도 compact 요약만 사용 (토큰 방지)
    const obj =
      (active.objective ?? '').length > COMPACT_OBJECTIVE_LIMIT
        ? `${active.objective.slice(0, COMPACT_OBJECTIVE_LIMIT)}… (전체: goals/${active.id}.md)`
        : active.objective;

    const pending = (active.milestones ?? []).filter((m) => !m.done);
    const shown = pending.slice(0, COMPACT_MILESTONE_LIMIT);
    const hiddenCount = pending.length - shown.length;
    const milestoneLines = shown.map((m) => `- [ ] ${m.title}`).join('\n');
    const moreHint =
      hiddenCount > 0 ? `... 외 ${hiddenCount}개 (goals/${active.id}.md 참조)` : '';

    const retryInfo =
      active.max_retries != null
        ? `**재시도**: ${active.retries ?? 0}/${active.max_retries}`
        : null;

    blockContent = [
      `# Aru-Goal — 현재 활성 목표`,
      ``,
      `**제목**: ${active.title}`,
      `**목적**: ${obj}`,
      shown.length
        ? `**미완료 마일스톤**:\n${milestoneLines}${moreHint ? '\n' + moreHint : ''}`
        : null,
      retryInfo,
      ``,
      `> Antigravity: goal 변경 후 \`node skills/aru-goal/scripts/goal-cli.mjs refresh-instructions\` 실행`,
    ]
      .filter((l) => l !== null)
      .join('\n');
  }

  const agentsMd = path.join(cwd, 'AGENTS.md');
  upsertBlock(agentsMd, 'aru-goal', blockContent);
  console.log(`✓ AGENTS.md 갱신 완료: ${agentsMd}`);

  persistGoalFiles(goalDir, active);
}

// ---------------------------------------------------------------------------
// 서브커맨드 핸들러
// ---------------------------------------------------------------------------

function cmdCurrent(goalDir) {
  const goals = readGoals(goalDir);
  const active = getActiveGoal(goals);
  if (!active) {
    console.log('활성 goal이 없습니다.');
    return;
  }

  const pending = (active.milestones ?? []).filter((m) => !m.done);
  const milestoneLines = pending.map((m) => `  - [ ] ${m.title}`).join('\n');
  const retryInfo =
    active.max_retries != null
      ? `  재시도: ${active.retries ?? 0}/${active.max_retries}`
      : '';

  console.log(`[aru-goal] 현재 목표: ${active.title}`);
  console.log(`목적: ${active.objective}`);
  if (milestoneLines) console.log(`미완료 마일스톤:\n${milestoneLines}`);
  if (retryInfo) console.log(retryInfo);
  if (needsDetailFile(active)) {
    const goalDir2 = path.dirname(currentMdPath(goalDir));
    console.log(`상세: ${path.join(goalDir2, active.id + '.md')}`);
  }
}

function cmdList(goalDir) {
  const goals = readGoals(goalDir);
  if (goals.length === 0) {
    console.log('goal이 없습니다.');
    return;
  }
  const groups = { active: [], paused: [], blocked: [], complete: [] };
  for (const g of goals) {
    (groups[g.status] ?? groups.complete).push(g);
  }
  for (const [status, list] of Object.entries(groups)) {
    if (list.length === 0) continue;
    console.log(`\n[${status}]`);
    for (const g of list) {
      const retry =
        g.max_retries != null ? `  ↺ ${g.retries ?? 0}/${g.max_retries}` : '';
      const detail = needsDetailFile(g) ? '  📄' : '';
      console.log(`  ${g.id}  ${g.title}${retry}${detail}`);
    }
  }
}

function cmdAdd(goalDir, slug, jsonStr, maxRetriesFlag) {
  if (!jsonStr) {
    console.error('--json 플래그가 필요합니다.');
    process.exit(1);
  }
  let input;
  try { input = JSON.parse(jsonStr); } catch {
    console.error('--json 값이 유효한 JSON이 아닙니다.');
    process.exit(1);
  }

  // --max-retries 플래그가 있으면 input보다 우선
  if (maxRetriesFlag != null) {
    input.max_retries = Number(maxRetriesFlag);
  }

  const goals = readGoals(goalDir);
  const existing = getActiveGoal(goals);
  if (existing) {
    console.warn(`⚠ 기존 활성 goal이 있습니다: "${existing.title}" (${existing.id})`);
    console.warn('  기존 goal은 active 상태로 유지됩니다. /aru-goal done 또는 pause로 먼저 처리하세요.');
  }

  const goal = makeGoal(input, slug);
  goals.push(goal);
  writeGoals(goalDir, goals);
  persistGoalFiles(goalDir, goal);

  const retryNote =
    goal.max_retries != null ? ` (최대 재시도: ${goal.max_retries}회)` : '';
  const splitNote = needsDetailFile(goal) ? ' — 상세 파일 생성됨 (goals/' + goal.id + '.md)' : '';
  console.log(`✓ goal 추가됨: ${goal.id}  "${goal.title}"${retryNote}${splitNote}`);
}

function cmdSetStatus(goalDir, newStatus) {
  const goals = readGoals(goalDir);
  const active = getActiveGoal(goals);
  if (!active) {
    console.log('활성 goal이 없습니다.');
    return;
  }
  active.status = newStatus;
  active.updated_at = new Date().toISOString();
  writeGoals(goalDir, goals);
  // status 변경 시 detail file도 갱신
  if (newStatus === 'active') {
    persistGoalFiles(goalDir, active);
  } else {
    writeCurrentMd(goalDir, null);
    if (needsDetailFile(active)) writeDetailMd(goalDir, active);
  }
  console.log(`✓ goal ${active.id} → ${newStatus}: "${active.title}"`);
}

function cmdRetry(goalDir) {
  const goals = readGoals(goalDir);
  const active = getActiveGoal(goals);
  if (!active) {
    console.log('활성 goal이 없습니다.');
    return;
  }

  active.retries = (active.retries ?? 0) + 1;
  active.updated_at = new Date().toISOString();

  if (active.max_retries != null && active.retries >= active.max_retries) {
    active.status = 'blocked';
    writeGoals(goalDir, goals);
    writeCurrentMd(goalDir, null);
    if (needsDetailFile(active)) writeDetailMd(goalDir, active);
    console.log(
      `✗ 재시도 한도 초과 (${active.retries}/${active.max_retries}) → blocked: "${active.title}"`,
    );
  } else {
    writeGoals(goalDir, goals);
    persistGoalFiles(goalDir, active);
    const remaining =
      active.max_retries != null
        ? `${active.retries}/${active.max_retries}`
        : String(active.retries);
    console.log(`↺ 재시도 기록됨 (${remaining}): "${active.title}"`);
  }
}

function findMilestoneIndex(active, rest) {
  const indexFlagIdx = rest.indexOf('--index');
  if (indexFlagIdx < 0) {
    console.error('--index 플래그가 필요합니다.');
    process.exit(1);
  }

  const rawIndex = Number(rest[indexFlagIdx + 1]);
  if (!Number.isInteger(rawIndex) || rawIndex < 1) {
    console.error('--index 값은 1 이상의 정수여야 합니다.');
    process.exit(1);
  }

  const milestones = Array.isArray(active.milestones) ? active.milestones : [];
  if (rawIndex > milestones.length) {
    console.error(`유효하지 않은 milestone index입니다. 현재 개수: ${milestones.length}`);
    process.exit(1);
  }

  return rawIndex - 1;
}

function cmdMilestones(goalDir) {
  const goals = readGoals(goalDir);
  const active = getActiveGoal(goals);
  if (!active) {
    console.log('활성 goal이 없습니다.');
    return;
  }

  const milestones = Array.isArray(active.milestones) ? active.milestones : [];
  if (milestones.length === 0) {
    console.log(`[aru-goal] "${active.title}" 마일스톤이 없습니다.`);
    return;
  }

  console.log(`[aru-goal] 마일스톤: ${active.title}`);
  milestones.forEach((milestone, index) => {
    console.log(`  ${index + 1}. [${milestone.done ? 'x' : ' '}] ${milestone.title}`);
  });
}

function cmdSetMilestoneDone(goalDir, rest, done) {
  const goals = readGoals(goalDir);
  const active = getActiveGoal(goals);
  if (!active) {
    console.log('활성 goal이 없습니다.');
    return;
  }

  const milestoneIndex = findMilestoneIndex(active, rest);
  const milestones = Array.isArray(active.milestones) ? active.milestones : [];
  const milestone = milestones[milestoneIndex];

  milestone.done = done;
  active.updated_at = new Date().toISOString();
  writeGoals(goalDir, goals);
  persistGoalFiles(goalDir, active);

  console.log(
    `${done ? '✓' : '↺'} milestone ${milestoneIndex + 1} ${done ? '완료' : '미완료'}: "${milestone.title}"`,
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const [,, subcmd, ...rest] = process.argv;
const home = os.homedir();
const cwd = process.cwd();
const slug = resolveSlug(cwd);
const goalDir = resolveGoalDir(slug, home);

switch (subcmd) {
  case 'current':
    cmdCurrent(goalDir);
    break;

  case 'list':
    cmdList(goalDir);
    break;

  case 'add': {
    const jsonFlagIdx = rest.indexOf('--json');
    const jsonStr = jsonFlagIdx >= 0 ? rest[jsonFlagIdx + 1] : null;
    const maxRetriesFlagIdx = rest.indexOf('--max-retries');
    const maxRetriesFlag = maxRetriesFlagIdx >= 0 ? rest[maxRetriesFlagIdx + 1] : null;
    cmdAdd(goalDir, slug, jsonStr, maxRetriesFlag);
    break;
  }

  case 'done':
    cmdSetStatus(goalDir, 'complete');
    break;

  case 'pause':
    cmdSetStatus(goalDir, 'paused');
    break;

  case 'block':
    cmdSetStatus(goalDir, 'blocked');
    break;

  case 'retry':
    cmdRetry(goalDir);
    break;

  case 'milestones':
    cmdMilestones(goalDir);
    break;

  case 'milestone-check':
    cmdSetMilestoneDone(goalDir, rest, true);
    break;

  case 'milestone-uncheck':
    cmdSetMilestoneDone(goalDir, rest, false);
    break;

  case 'refresh-instructions':
    refreshInstructions(cwd, home);
    break;

  default:
    console.log(`사용법:
  node goal-cli.mjs current
  node goal-cli.mjs list
  node goal-cli.mjs add --json '<JSON>' [--max-retries N]
  node goal-cli.mjs done
  node goal-cli.mjs pause
  node goal-cli.mjs block
  node goal-cli.mjs retry
  node goal-cli.mjs milestones
  node goal-cli.mjs milestone-check --index N
  node goal-cli.mjs milestone-uncheck --index N
  node goal-cli.mjs refresh-instructions`);
    process.exit(1);
}
