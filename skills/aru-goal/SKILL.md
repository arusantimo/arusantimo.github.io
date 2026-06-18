---
name: aru-goal
version: 1.0.0
tags: [goal, context, hook, project-memory]
targets: [claude, codex, cursor, antigravity]
description: >
  Manage project goals as JSONL events and inject the current active goal into
  every tool call via PreToolUse hook. Use /aru-goal to view, set, complete, or
  pause goals across Claude, Codex, Cursor, and Antigravity.
  Invoke when user says "aru-goal", "현재 목표", "goal 설정", "목표 완료",
  or uses /aru-goal command.
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
triggers:
  - /aru-goal
  - 현재 목표
  - goal 설정
  - 목표 완료
  - 목표 일시중단
---

# Aru-Goal

프로젝트 목표(goal)를 JSONL 이벤트 로그로 관리하고, PreToolUse 훅이 설치된 경우 모든 도구 호출 시 현재 활성 goal을 컨텍스트로 자동 주입합니다.

## 저장소

- **Goal 이벤트 로그**: `~/.claude/projects/{slug}/goals.jsonl`
- **현재 goal 요약**: `~/.claude/projects/{slug}/goals/current.md`

`{slug}` = `git rev-parse --show-toplevel | xargs basename` (실패 시 cwd basename)

## 명령어

### `/aru-goal` — 현재 활성 goal 표시

```bash
node skills/aru-goal/scripts/goal-cli.mjs current
```

### `/aru-goal set` — 새 goal 생성

aru-goal-mission 스킬에 위임하여 3-phase 인터뷰를 진행합니다.
aru-goal-mission이 없으면 직접 질문:
1. 목표 제목은?
2. 목적(왜, 완료 기준)은?
3. milestone이 있다면?

인터뷰 완료 후:
```bash
node skills/aru-goal/scripts/goal-cli.mjs add --json '{"title":"...","objective":"...","milestones":[{"title":"...","done":false}]}'
```

### `/aru-goal done` — 현재 goal 완료

```bash
node skills/aru-goal/scripts/goal-cli.mjs done
```

### `/aru-goal pause` — 현재 goal 일시 중단

```bash
node skills/aru-goal/scripts/goal-cli.mjs pause
```

### `/aru-goal retry` — 재시도 횟수 증가

```bash
node skills/aru-goal/scripts/goal-cli.mjs retry
```

- `retries` +1 기록
- `max_retries` 설정 시: 초과하면 status 자동 → `blocked`
- `max_retries` 없으면: 횟수만 기록, status 유지

### `/aru-goal list` — 전체 goal 이력

```bash
node skills/aru-goal/scripts/goal-cli.mjs list
```

## JSONL 포맷

```json
{"id":"g-1748800000","title":"auth 리팩터링","objective":"레거시 JWT 제거 후 새 모듈 전환","milestones":[{"title":"테스트 통과","done":false}],"status":"active","priority":1,"max_retries":5,"retries":0,"created_at":"2026-06-01T00:00:00Z","updated_at":"2026-06-01T00:00:00Z","project_slug":"my-project"}
```

`status`: `active` | `paused` | `blocked` | `complete`

`max_retries`: 최대 재시도 횟수 (null = 무제한). `--max-retries N` 플래그로 설정:
```bash
node skills/aru-goal/scripts/goal-cli.mjs add --json '{"title":"...","objective":"..."}' --max-retries 3
```

## Antigravity 사용자 안내

훅이 지원되지 않으므로 goal 변경 후 수동으로 AGENTS.md 블록을 갱신합니다:

```bash
node skills/aru-goal/scripts/goal-cli.mjs refresh-instructions
```

## 규칙

1. goal CRUD는 항상 `goal-cli.mjs`를 통해 수행 — 파일 직접 편집 금지
2. 기존 활성 goal이 있을 때 새 goal 추가는 경고 후 진행 (기존 goal은 active 유지)
3. `goal-cli.mjs`가 없으면 "aru-goal 스킬이 설치되지 않았습니다" 안내

<!-- arus:instructions:start skill=aru-goal -->
# Aru-Goal (arus)

현재 프로젝트의 활성 goal은 `~/.claude/projects/{slug}/goals/current.md`에 기록됩니다.

## 명령어

- `/aru-goal` — 현재 목표 확인
- `/aru-goal set` — 새 목표 설정 (aru-goal-mission 인터뷰)
- `/aru-goal done` — 목표 완료
- `/aru-goal pause` — 목표 일시 중단
- `/aru-goal list` — 전체 이력

## Antigravity 전용

goal이 변경되면 아래 명령으로 AGENTS.md 블록을 갱신하세요:

```bash
node skills/aru-goal/scripts/goal-cli.mjs refresh-instructions
```

## 관련

- **complements** → `aru-goal-mission`: 3-phase 인터뷰로 goal 정제 후 자동 저장
- **complements** → `instruction-improver`: 지침 품질 점검
<!-- arus:instructions:end skill=aru-goal -->
