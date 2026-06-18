#!/usr/bin/env node
/**
 * Shared PreToolUse context injector for aru-goal (Cursor / Claude Code / Codex).
 * Reads the current active goal and injects it as additionalContext.
 * No deny — only context injection.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

export function runPreToolUse(target) {
  const input = readStdin();
  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    return; // invalid input — skip silently
  }

  const context = loadGoalContext();
  if (!context) return; // no active goal — nothing to inject

  emitContext(target, context);
}

// ---------------------------------------------------------------------------
// Goal loading
// ---------------------------------------------------------------------------

function loadGoalContext() {
  const slug = resolveSlug();
  if (!slug) return null;

  const goalDir = path.join(os.homedir(), '.claude', 'projects', slug);

  // 1. Try current.md (fast path)
  const currentMd = path.join(goalDir, 'goals', 'current.md');
  if (existsSync(currentMd)) {
    const content = readFileSync(currentMd, 'utf8').trim();
    if (content && !content.startsWith('활성 goal이 없습니다')) {
      return `[aru-goal] 현재 목표:\n${content}`;
    }
    return null;
  }

  // 2. Fallback: read goals.jsonl directly
  const jsonlPath = path.join(goalDir, 'goals.jsonl');
  if (!existsSync(jsonlPath)) return null;

  const goals = readFileSync(jsonlPath, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => { try { return JSON.parse(l); } catch { return null; } })
    .filter(Boolean);

  const active = goals
    .filter((g) => g.status === 'active')
    .sort((a, b) => (b.priority ?? 1) - (a.priority ?? 1) || (b.created_at > a.created_at ? 1 : -1))[0];

  if (!active) return null;
  return `[aru-goal] 현재 목표: ${active.title}\n목적: ${active.objective}`;
}

function resolveSlug() {
  try {
    const result = spawnSync('git', ['rev-parse', '--show-toplevel'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    if (result.status === 0 && result.stdout.trim()) {
      return path.basename(result.stdout.trim());
    }
  } catch {
    // fallthrough
  }
  return path.basename(process.cwd());
}

// ---------------------------------------------------------------------------
// I/O helpers (same pattern as ctxs/hooks/shared/pre-tool-use.mjs)
// ---------------------------------------------------------------------------

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function emitContext(target, context) {
  if (target === 'cursor') {
    process.stdout.write(JSON.stringify({ additional_context: context }));
    return;
  }
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext: context,
      },
    }),
  );
}
