# aru-goal 설치 지침

- **분류:** 에이전트 지침·품질
- **목적:** 4타깃 공통 goal 관리 + PreToolUse 훅 자동 주입

## 타깃별 권장

| 타깃 | 1차 | 보조 | scope |
|------|-----|------|-------|
| claude | hook | skill, instructions | project |
| codex | hook | skill, instructions | project |
| cursor | hook | skill, instructions | project |
| antigravity | instructions | skill | both |

## 설치

```bash
# Claude Code
arus install aru-goal --target claude --modes hook,skill,instructions --scope project

# Cursor
arus install aru-goal --target cursor --modes hook,skill,instructions --scope project

# Codex
arus install aru-goal --target codex --modes hook,skill,instructions --scope project

# Antigravity (훅 미지원 — instructions + skill)
arus install aru-goal --target antigravity --modes skill,instructions --scope both
```

## aru-goal-mission 함께 설치 (권장)

```bash
arus install aru-goal-mission --target claude --modes skill --scope both
```

## Antigravity goal 갱신

goal 변경 후 AGENTS.md 블록 수동 갱신:

```bash
node skills/aru-goal/scripts/goal-cli.mjs refresh-instructions
```

## 확인

```bash
# goal-cli 동작 확인
node skills/aru-goal/scripts/goal-cli.mjs current

# 훅 직접 테스트 (Claude)
echo '{"tool_name":"Bash","tool_input":{"command":"ls"}}' | \
  node ~/.claude/hooks/arus/aru-goal/pre-tool-use.mjs
```
