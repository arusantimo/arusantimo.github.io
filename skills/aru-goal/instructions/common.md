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
