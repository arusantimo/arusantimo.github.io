# Codex CLI — Supplement Cheat Sheet (Additions)

## Interactive Session (TUI 기반)
codex

- 대화형 세션
- 상태 유지
- 멀티턴 작업 가능

---

## Slash Commands

### Session 관리
/clear
/new
/resume
/fork
/exit

### 모델 / 설정
/model
/fast
/permissions
/theme
/personality

### 작업 기능
/review
/plan
/diff
/status

### 파일 / 컨텍스트
@file
/mention file

---

## CLI Subcommands
codex exec "task"
codex review
codex apply
codex resume
codex fork
codex login
codex cloud
codex sandbox
codex mcp

---

## Keyboard Shortcuts
Ctrl+C
Ctrl+D
Ctrl+L
Ctrl+G
Enter
Tab
Esc Esc

---

## Execution & Safety
--sandbox read-only | workspace-write | danger-full-access
--ask-for-approval on-request | never
--full-auto
--yolo

---

## Multimodal
codex -i screenshot.png "generate UI code"

---

## Web Search
codex --search "query"

---

## Cloud / MCP / Sandbox
codex cloud
codex mcp
codex sandbox

---

## Plan & Diff Workflow
/plan
/diff
codex apply

---

## Automation
codex exec "task"

---

## Summary
Codex CLI = 상태 기반 AI 개발 에이전트
