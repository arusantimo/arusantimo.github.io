# Claude Code 완전 레퍼런스 (v2.1.112)

**최종 업데이트**: 2026년 4월 18일

---

## 목차
1. [슬래시 명령어 (Slash Commands)](#슬래시-명령어)
2. [CLI 명령어 및 플래그](#cli-명령어--플래그)
3. [Hook 이벤트 (Lifecycle Events)](#hook-이벤트)
4. [설정 & 환경 변수](#설정--환경-변수)
5. [키보드 단축키](#키보드-단축키)
6. [메모리 & 파일 시스템](#메모리--파일-시스템)

---

## 슬래시 명령어

### 세션 관리 (Session Management)

| 명령어 | 기능 | 용도 |
|--------|------|------|
| `/clear` | 대화 기록 초기화 | 새 작업 시작 |
| `/compact [focus]` | 컨텍스트 요약 | 토큰 효율성 |
| `/branch [name]` | 대화 분기 (`/fork` 별칭) | 멀티 스트림 작업 |
| `/cost` | 토큰 사용량 + 캐시 분석 | 비용 추적 |
| `/context` | 컨텍스트 시각화 (그리드) | 사용량 확인 |
| `/diff` | 변경된 파일 차이 보기 | 코드 검증 |
| `/copy [N]` | 마지막(또는 N번째) 응답 복사 | 텍스트 공유 |
| `/recap` | 세션 반환 시 요약 | 컨텍스트 복구 |
| `/undo` | `/rewind` 별칭 | 이전 상태 복구 |
| `/rewind` | 대화/코드 체크포인트 복구 | 변경사항 취소 |
| `/export` | 대화 내보내기 | 저장 & 공유 |
| `/plan [desc]` | 플랜 모드 직접 진입 | 읽기 전용 설계 |
| `/resume [session]` | ID/이름으로 세션 재개 | 컨텍스트 복구 |
| `/focus` | 포커스 뷰 전환 (fullscreen만) | UI 최적화 |

---

### 설정 & 구성 (Configuration)

| 명령어 | 기능 | 사용 예 |
|--------|------|--------|
| `/model [model]` | 모델 전환 (Sonnet/Opus 등) | `claude /model opus` |
| `/fast [on\|off]` | Fast mode 토글 | 속도 vs. 비용 최적화 |
| `/theme` | 색상 테마 변경 | 자동 다크/라이트 모드 옵션 |
| `/permissions` | 권한 프롬프트 추가/제거 | 도구 화이트리스트 관리 |
| `/effort [level]` | 노력 수준 설정 | `low`, `medium`, `high`, `xhigh`, `max` |
| `/color [color]` | 프롬프트 바 색상 지정 | 멀티 세션 구분 |
| `/keybindings` | 키보드 단축키 커스터마이징 | 워크플로우 최적화 |
| `/terminal-setup` | 터미널 키바인딩 설정 | 플랫폼별 호환성 |
| `/config` | 세션 설정 관리 | 세션 레벨 커스텀 |

---

### 도구 & 기능 (Tools & Features)

| 명령어 | 기능 | 사용 시나리오 |
|--------|------|-------------|
| `/init` | `CLAUDE.md` 자동 생성 | 새 프로젝트 필수 |
| `/memory` | 메모리 파일 편집 | 프로젝트 컨텍스트 관리 |
| `/mcp` | MCP 서버 관리 | 외부 도구 연동 |
| `/hooks` | 설정된 Hook 브라우저 (읽기 전용) | Hook 디버깅 |
| `/skills` | 사용 가능한 스킬 목록 | 기능 검색 |
| `/agents` | 에이전트 설정 관리 | 서브에이전트 제어 |
| `/review [PR]` | PR/파일 로컬 검토 | 코드 품질 검증 |
| `/ultrareview [PR#]` | 클라우드 코드 검토 (병렬 멀티에이전트) | 깊이 있는 분석 |
| `/simplify [focus]` | 3개 에이전트 병렬 코드 리뷰 | 빠른 개선 제안 |
| `/security-review` | 변경사항에서 취약점 스캔 | 보안 감시 |
| `/less-permission-prompts` | 자동 권한 제안 | 프롬프트 최소화 |
| `/loop [interval] [prompt]` | 반복 스케줄링 작업 | 정기적 자동화 |
| `/debug [desc]` | 디버그 로그 트러블슈팅 | 오류 진단 |
| `/chrome` | Chrome 브라우저 통합 | 웹 자동화 & 테스트 |
| `/ide` | IDE 통합 상태 확인 | VSCode/Cursor 연동 |
| `/reload-plugins` | 플러그인 핫 리로드 | 설정 즉시 적용 |
| `/add-dir <path>` | 작업 디렉토리 추가 | 파일 액세스 확장 |

---

### 특수 명령어 (Utility)

| 명령어 | 기능 | 용도 |
|--------|------|------|
| `/btw <question>` | 측면 질문 (컨텍스트 미추가) | 현재 작업 중단 없이 질문 |
| `/extra-usage` | Rate limit 초과 사용 | API 한도 해제 |
| `/voice` | Push-to-talk 음성 받아쓰기 | 음성 입력 (20개 언어) |
| `/doctor` | 설치 & 설정 진단 | 문제 자동 검사 |
| `/insights` | 세션 분석 리포트 | 사용 패턴 분석 |
| `/desktop` | Desktop 앱으로 계속 | 플랫폼 전환 |
| `/rename [name]` | 세션 이름 지정 | 세션 식별 |
| `/help` | 명령어 목록 표시 | 명령어 검색 |
| `/feedback` (또는 `/bug`) | 피드백 제출 | 버그 리포트 |
| `/tui fullscreen` | Fullscreen 렌더링 활성화 | Flicker 방지 |

---

### 내장 스킬 (Built-in Skills)

| 스킬 | 기능 | 특징 |
|------|------|------|
| `/simplify` | 3개 병렬 에이전트로 코드 리뷰 | AI 기반 개선 |
| `/batch` | 대규모 병렬 변경 (5-30 worktrees) | 마이그레이션 자동화 |
| `/debug` | 디버그 로그에서 문제 트러블슈팅 | 근본 원인 분석 |
| `/loop` | 반복 스케줄 작업 | 크론 작업 대체 |
| `/claude-api` | API + SDK 레퍼런스 로드 | 문서 참조 |

---

## CLI 명령어 & 플래그

### 핵심 CLI 명령어

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `claude` | 대화형 세션 시작 | `claude` |
| `claude "query"` | 초기 프롬프트로 세션 시작 | `claude "이 프로젝트 설명해줘"` |
| `claude -p "query"` | SDK 모드 (출력 후 종료) | `claude -p "README 요약해줘"` |
| `cat file \| claude -p "query"` | 파이프된 콘텐츠 처리 | `cat logs.txt \| claude -p "분석해줘"` |
| `claude -c` | 가장 최근 대화 계속 | `claude -c` |
| `claude -c -p "query"` | SDK 모드에서 계속 | `claude -c -p "타입 오류 확인"` |
| `claude -r "<session>"` | ID/이름으로 세션 재개 | `claude -r "auth-refactor"` |
| `claude update` | 최신 버전으로 업데이트 | `claude update` |
| `claude auth login` | Anthropic 계정 로그인 | `claude auth login --console` |
| `claude auth logout` | 로그아웃 | `claude auth logout` |
| `claude auth status` | 인증 상태 확인 (JSON) | `claude auth status --text` |
| `claude agents` | 모든 서브에이전트 목록 | `claude agents` |
| `claude auto-mode defaults` | 기본 Auto Mode 규칙 (JSON) | `claude auto-mode defaults > rules.json` |
| `claude mcp` | MCP 서버 구성 | `claude mcp add github --transport http` |
| `claude plugin` | 플러그인 관리 | `claude plugin install superpowers@official` |
| `claude remote-control` | Remote Control 서버 시작 | `claude remote-control --name "My Project"` |

---

### CLI 플래그 (주요)

#### 세션 관리

| 플래그 | 설명 | 예시 |
|--------|------|------|
| `--continue`, `-c` | 최근 대화 계속 | `claude --continue` |
| `--resume`, `-r` | ID/이름으로 특정 세션 재개 | `claude -r auth-refactor` |
| `--fork-session` | 재개 시 새 세션 ID 생성 | `claude --resume abc123 --fork-session` |
| `--session-id` | 특정 세션 ID 사용 | `claude --session-id "550e8400-..."` |
| `--name`, `-n` | 세션 표시 이름 설정 | `claude -n "my-feature"` |
| `--teleport` | 웹 세션을 터미널에서 재개 | `claude --teleport` |
| `--remote` | claude.ai에서 새 웹 세션 생성 | `claude --remote "로그인 버그 수정"` |
| `--remote-control`, `--rc` | Remote Control 활성화 | `claude --remote-control "My Project"` |

#### 모델 & 성능

| 플래그 | 설명 | 예시 |
|--------|------|------|
| `--model` | 모델 선택 (sonnet/opus) | `claude --model opus` |
| `--effort` | 노력 수준 (low/medium/high/max) | `claude --effort high` |
| `--fallback-model` | 오버로드 시 자동 폴백 | `claude -p --fallback-model sonnet` |
| `--max-turns` | 에이전트 턴 제한 | `claude -p --max-turns 3` |
| `--max-budget-usd` | 최대 API 비용 (인쇄 모드) | `claude -p --max-budget-usd 5.00` |

#### 권한 & 보안

| 플래그 | 설명 | 주의사항 |
|--------|------|----------|
| `--dangerously-skip-permissions` | 모든 권한 프롬프트 스킵 | ⚠️ YOLO 모드 - 신뢰 프로젝트만 |
| `--permission-mode` | 권한 모드 (default/acceptEdits/plan/auto/dontAsk/bypassPermissions) | `--permission-mode plan` |
| `--allow-dangerously-skip-permissions` | bypassPermissions를 Shift+Tab 사이클에 추가 | 조건부 권한 스킵 |
| `--allowedTools` | 권한 프롬프트 없이 실행되는 도구 | `--allowedTools "Bash(git log *)" "Read"` |
| `--disallowedTools` | 비활성화할 도구 | `--disallowedTools "Bash(rm -rf *)"` |
| `--permission-prompt-tool` | 비대화형 모드에서 권한 처리 MCP 도구 | `--permission-prompt-tool mcp_auth` |

#### 출력 & 형식

| 플래그 | 설명 | 옵션 |
|--------|------|------|
| `--print`, `-p` | 대화형 모드 없이 출력 | 인쇄 모드 활성화 |
| `--output-format` | 출력 형식 | `text`, `json`, `stream-json` |
| `--input-format` | 입력 형식 | `text`, `stream-json` |
| `--json-schema` | JSON Schema 검증 | `--json-schema '{"type":"object"...}'` |
| `--include-hook-events` | Hook 라이프사이클 이벤트 포함 | `--output-format stream-json` 필요 |
| `--include-partial-messages` | 부분 스트리밍 이벤트 포함 | `--output-format stream-json` 필요 |
| `--replay-user-messages` | stdin에서 사용자 메시지 재생 | 자동화 시나리오 |
| `--verbose` | 상세 로깅 활성화 | 디버깅용 |
| `--version`, `-v` | 버전 번호 출력 | `claude -v` |

#### 커스터마이제이션

| 플래그 | 설명 | 사용 예 |
|--------|------|--------|
| `--system-prompt` | 전체 시스템 프롬프트 교체 | `--system-prompt "You are a Python expert"` |
| `--system-prompt-file` | 파일에서 시스템 프롬프트 로드 | `--system-prompt-file ./prompt.txt` |
| `--append-system-prompt` | 기본 프롬프트에 추가 | `--append-system-prompt "항상 TypeScript 사용"` |
| `--append-system-prompt-file` | 파일 내용을 프롬프트에 추가 | `--append-system-prompt-file ./rules.txt` |
| `--settings` | 추가 설정 로드 (JSON) | `--settings ./settings.json` |
| `--mcp-config` | MCP 서버 설정 로드 | `--mcp-config ./mcp.json` |
| `--strict-mcp-config` | 지정된 MCP만 사용 | `--strict-mcp-config --mcp-config ./mcp.json` |
| `--plugin-dir` | 플러그인 디렉토리 경로 | `--plugin-dir ./my-plugins` |
| `--add-dir <path>` | 추가 작업 디렉토리 | `claude --add-dir ../apps ../lib` |

#### 고급 기능

| 플래그 | 설명 | 용도 |
|--------|------|------|
| `--worktree`, `-w` | Git worktree 격리 | `claude -w feature-auth` |
| `--tmux` | Worktree용 tmux 세션 생성 | `claude -w feature --tmux` |
| `--ide` | IDE 자동 연결 | `claude --ide` |
| `--chrome` | Chrome 브라우저 통합 활성화 | `claude --chrome` |
| `--no-chrome` | Chrome 통합 비활성화 | `claude --no-chrome` |
| `--agent` | 사용할 에이전트 지정 | `claude --agent my-agent` |
| `--agents` | JSON으로 사용자 정의 에이전트 정의 | `--agents '{"reviewer":{"prompt":"..."}}'` |
| `--teammate-mode` | 에이전트 팀 표시 모드 | `auto`, `in-process`, `tmux` |
| `--bare` | 최소 모드 (Hook/Plugin/MCP 스킵) | 빠른 시작 |
| `--init` | 초기화 Hook 실행 + 대화형 시작 | `claude --init` |
| `--init-only` | 초기화 Hook만 실행 후 종료 | `claude --init-only` |
| `--maintenance` | 유지보수 Hook 실행 | `claude --maintenance` |
| `--debug` | 디버그 모드 활성화 | `claude --debug "api,mcp"` |
| `--debug-file <path>` | 디버그 로그 파일 경로 | `claude --debug-file /tmp/debug.log` |
| `--disable-slash-commands` | 모든 스킬 & 명령어 비활성화 | 이번 세션만 |
| `--no-session-persistence` | 세션 저장 비활성화 | 인쇄 모드 + 보안 |
| `--betas` | Beta 헤더 포함 (API 키 사용자) | `--betas interleaved-thinking` |
| `--from-pr` | GitHub PR 연결 세션 재개 | `claude --from-pr 123` |

---

## Hook 이벤트

### Hook의 역할

Hook은 Claude Code의 라이프사이클의 특정 시점에서 자동으로 실행되는 사용자 정의 셸 명령어, HTTP 엔드포인트, 또는 LLM 프롬프트입니다. 

**특징**:
- ✅ **결정론적 (Deterministic)**: 프롬프트와 달리 항상 실행됨
- 🔒 **블로킹/논-블로킹 모드 지원**
- 📊 **4가지 Handler 타입**: Command, HTTP, Prompt, Agent

---

### 12개 Hook 이벤트 (Lifecycle Events)

#### **1. Setup Phase (프로젝트 진입)**

| 이벤트 | 발동 시기 | JSON 입력 | 용도 |
|--------|----------|----------|------|
| `Setup` | 저장소 진입 (`init`) 또는 주기적 (`maintenance`) | trigger (`init` 또는 `maintenance`), session info | 환경 설정, 컨텍스트 주입 |

---

#### **2. Session Lifecycle (세션 레벨)**

| 이벤트 | 발동 시기 | 블로킹 가능? | 주요 용도 |
|--------|----------|-----------|---------|
| `SessionStart` | 세션 시작/재개 | ❌ 아님 | 프로젝트 컨텍스트 로드, 개발 환경 초기화 |
| `SessionEnd` | 세션 종료 (exit/clear/logout) | ❌ 아님 | 정리, 분석, 트랜스크립트 백업 |

---

#### **3. User Interaction (사용자 입력)**

| 이벤트 | 발동 시기 | 블로킹 가능? | 통제 수준 |
|--------|----------|-----------|----------|
| `UserPromptSubmit` | 사용자 메시지 제출 후, Claude 처리 전 | ✅ Exit 2로 블로킹 | Prompt Injection 탐지, 컨텍스트 보강 |

**JSON 입력 예시**:
```json
{
  "session_id": "sess_abc123",
  "transcript_path": "/tmp/claude-transcript.json",
  "prompt": "사용자의 전체 메시지",
  "cwd": "/path/to/working/directory"
}
```

---

#### **4. Tool Execution (도구 실행 - 가장 강력)**

| 이벤트 | 발동 시기 | 블로킹 가능? | Exit Code 2 의미 |
|--------|----------|-----------|------------------|
| `PreToolUse` | **도구 실행 전** | ✅ 예 (Exit 2) | **도구 실행 차단** |
| `PermissionRequest` | 권한 프롬프트 표시 전 | ✅ 예 (Exit 2) | **권한 거부** |
| `PostToolUse` | 도구 실행 후 | ❌ 아님 | 메타데이터 추가 (차단 불가) |
| `PostToolUseFailure` | 도구 오류 발생 후 | ❌ 아님 | 오류 처리, 로깅 |

**PreToolUse JSON 입력**:
```json
{
  "session_id": "sess_abc123",
  "tool_name": "Bash",
  "tool_input": {"command": "rm -rf /"},
  "cwd": "/path/to/working/directory"
}
```

---

#### **5. Subagent Lifecycle (에이전트 작업)**

| 이벤트 | 발동 시기 | 용도 |
|--------|----------|------|
| `SubagentStart` | 서브에이전트 시작 | 분기별 컨텍스트 추적 |
| `SubagentStop` | 서브에이전트 완료 | 작업 검증, 병렬 처리 모니터링 |

---

#### **6. Notification & Completion**

| 이벤트 | 발동 시기 | 블로킹 가능? | 용도 |
|--------|----------|-----------|------|
| `Notification` | Claude가 알림 전송 | ❌ 아님 | 데스크톱 알림, TTS, 웹훅 |
| `Stop` | Claude 응답 완료 | ✅ Exit 2로 강제 재개 | 자체 검증, TDD 강제, 세션 메모리 |

---

#### **7. Maintenance (유지보수)**

| 이벤트 | 발동 시기 | 블로킹 가능? | 용도 |
|--------|----------|-----------|------|
| `PreCompact` | Compaction 전 | ❌ 아님 | 트랜스크립트 백업, 컨텍스트 보존 |
| `ConfigChange` | 설정 파일 변경 감지 | ❌ 아님 | 설정 검증, 재로드 |
| `FileChanged` | 모니터링 파일 변경 | ❌ 아님 | 파일 시스템 동기화 |

---

### Hook Handler 타입

Claude Code는 4가지 Handler 타입을 지원합니다:

#### **1. Command Hook (90% 사용 사례)**

```json
{
  "type": "command",
  "command": "python3 ~/.local/hooks/security-check.sh",
  "timeout": 60,
  "async": false
}
```

- **입력**: JSON via stdin
- **출력**: Exit code + stdout
- **특징**: 동기적 실행, 블로킹 가능

---

#### **2. HTTP Hook (외부 서비스 연동)**

```json
{
  "type": "http",
  "url": "http://localhost:8080/hooks/pre-tool-use",
  "timeout": 30,
  "headers": {
    "Authorization": "Bearer $MY_TOKEN"
  },
  "allowedEnvVars": ["MY_TOKEN"]
}
```

- **입력**: JSON via POST body
- **출력**: JSON response (같은 스키마)
- **특징**: 논-블로킹 오류, 타임아웃 시 실행 계속
- **사용 예**: 원격 정책 검증, 팀 감시

---

#### **3. Prompt Hook (의미론적 평가)**

```json
{
  "type": "prompt",
  "prompt": "이 Bash 명령이 안전한가? $ARGUMENTS",
  "model": "haiku"
}
```

- **입력**: `$ARGUMENTS` 플레이스홀더로 JSON 주입
- **출력**: Claude의 yes/no 응답
- **특징**: 단일 턴, 지능형 판단
- **사용 예**: TDD 검증, 보안 평가

---

#### **4. Agent Hook (깊이 있는 검증)**

```json
{
  "type": "agent",
  "agent": "code-reviewer",
  "prompt": "모든 수정 파일에 테스트가 있는가?"
}
```

- **입력**: 도구 액세스 (Read, Grep, Glob)
- **특징**: 다중 턴, 코드베이스 분석
- **사용 예**: 테스트 커버리지 강제, 아키텍처 검증

---

### Hook 설정 방법

#### **1. Settings JSON (권장)**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/scripts/guard.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
          }
        ]
      }
    ]
  }
}
```

**위치**:
- `~/.claude/settings.json` (전역)
- `.claude/settings.json` (프로젝트)

---

#### **2. Skill/Agent Frontmatter**

```yaml
---
name: secure-operations
description: Security checks on Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate.sh"
---

Perform operations with security validation...
```

---

### Hook Exit Code 규약

| Exit Code | 의미 | 효과 |
|-----------|------|------|
| **0** | 성공 (계속) | 정상 진행 |
| **1** | 경고 (비블로킹) | 로그만 기록, 실행 계속 |
| **2** | 차단/강제 | 블로킹 이벤트에서만 효과 있음 |
| **기타** | 오류 | 경고로 기록, 실행 계속 |

**PreToolUse에서 Exit 2**: 도구 실행 차단, stdout → Claude에 피드백
**Stop에서 Exit 2**: Claude 강제로 재개 (검증 실패)

---

### 실전 Hook 패턴

#### **패턴 1: Auto-Format (PostToolUse)**

```bash
npx prettier --write "$TOOL_INPUT_FILE_PATH"
npx eslint --fix "$TOOL_INPUT_FILE_PATH"
```

→ 파일 수정 후 자동 포매팅

---

#### **패턴 2: 위험한 명령어 차단 (PreToolUse)**

```bash
#!/bin/bash
input=$(cat)
command=$(echo "$input" | jq -r '.tool_input.command')

if [[ $command =~ "rm -rf" ]] || [[ $command =~ "curl.*bash" ]]; then
  echo "Dangerous command blocked"
  exit 2
fi

exit 0
```

→ 파괴적 명령어 사전 차단

---

#### **패턴 3: TDD 강제 (Stop)**

```bash
#!/bin/bash
# 모든 테스트 통과했는지 확인
if ! npm test; then
  echo "Tests failed - continuing..."
  exit 2  # Claude 강제 재개
fi

exit 0
```

→ 테스트 통과까지 작업 강제 계속

---

#### **패턴 4: 비동기 로깅 (PostToolUse)**

```json
{
  "type": "command",
  "command": "curl -X POST https://logging.service.com/api/log -d '...'",
  "async": true,
  "timeout": 30
}
```

→ Claude 대기 없이 백그라운드 로깅

---

## 설정 & 환경 변수

### Settings.json 구조

```json
{
  "defaultMode": "plan",
  "modelOverrides": {
    "custom-model": "claude-opus-4-6"
  },
  "autoMemoryDirectory": "~/.claude/memory",
  "worktree": {
    "sparsePaths": ["src/", "tests/"]
  },
  "hooks": { ... },
  "permissions": {
    "allow": [
      "Bash(npm run test:*)",
      "Read(~/.zshrc)"
    ],
    "deny": [
      "Bash(curl *)"
    ]
  }
}
```

---

### 주요 환경 변수

| 변수 | 용도 | 예시 |
|------|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API 키 | 설정 필수 |
| `ANTHROPIC_MODEL` | 기본 모델 | `claude-opus-4-6` |
| `MAX_THINKING_TOKENS` | 최대 생각 토큰 (0=비활성) | `10000` |
| `CLAUDECODE` | Claude Code 쉘 감지 (=1) | 자동 설정 |
| `CLAUDE_CODE_DISABLE_CRON` | 스케줄 작업 비활성화 | `1` |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | Recap 활성화 | `0` 비활성화 |
| `CLAUDE_CODE_DEBUG_LOGS_DIR` | 디버그 로그 디렉토리 | `/tmp/cc-debug/` |
| `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` | Bash 작업 디렉토리 유지 | `1` |
| `MCP_TIMEOUT` | MCP 서버 시작 타임아웃 (ms) | `5000` |

---

## 키보드 단축키

### 일반 제어

| 단축키 | 기능 |
|--------|------|
| `Ctrl+C` | 입력/생성 취소 |
| `Ctrl+D` | 세션 종료 |
| `Ctrl+L` | 프롬프트 초기화 + 전체 화면 다시 그리기 |
| `Ctrl+O` | 트랜스크립트 뷰어 토글 (verbose tool 사용) |
| `Ctrl+U` | 전체 입력 버퍼 지우기 |
| `Ctrl+Y` | 지운 입력 복원 |
| `Ctrl+G` | 편집기에서 열기 (`Ctrl+X Ctrl+E`와 동일) |
| `Ctrl+R` | 역방향 히스토리 검색 |
| `Ctrl+X Ctrl+K` | 모든 백그라운드 에이전트 중지 (2번 누르기) |
| `Ctrl+B` | 백그라운드 실행 작업 |
| `Ctrl+T` | 작업 목록 토글 |

---

### 모드 전환

| 단축키 | 기능 |
|--------|------|
| `Shift+Tab` | 권한 모드 사이클 (default → acceptEdits → plan → ...) |
| `Esc Esc` | 이전 상태로 복구 또는 요약 |

---

### Mac Option 키 (Meta로 구성 필요)

| 단축키 | 기능 |
|--------|------|
| `⌥P` | 모델 전환 |
| `⌥T` | Extended thinking 토글 |
| `⌥O` | Fast mode 토글 |

---

### 입력

| 단축키 | 기능 |
|--------|------|
| `Shift+Enter` | 새 줄 |
| `/` | 슬래시 명령어 프리픽스 |
| `!` | Direct bash 명령어 |
| `@` | 파일 언급 + 자동완성 |

---

## 메모리 & 파일 시스템

### CLAUDE.md 위치 (계층적 로드)

1. `./.claude/CLAUDE.md` (프로젝트 레벨)
2. `./CLAUDE.md` (프로젝트 루트)
3. `~/.claude/CLAUDE.md` (개인/모든 프로젝트)
4. `/etc/claude-code/CLAUDE.md` (Linux/WSL 조직 정책)

**Compaction 후에도 생존**

---

### 자동 메모리

위치: `~/.claude/projects/<proj>/memory/`

- `MEMORY.md`: 자동 로드 (처음 25KB 또는 200줄)
- 주제 파일: 요청 시 동적 로드

---

### 규칙 (Rules)

```
.claude/rules/*.md      (프로젝트 규칙)
~/.claude/rules/*.md    (개인 규칙)
```

**Frontmatter로 경로별 규칙**:
```yaml
---
paths:
  - "src/**"
  - "tests/**"
---
```

---

### 커스텀 명령어

위치: `.claude/commands/` (프로젝트) 또는 `~/.claude/commands/` (전역)

**Frontmatter**:
```yaml
---
description: GitHub 이슈 분석 및 수정
argument-hint: [issue-number]
---

이슈 #$1 분석...
```

**호출**: `/project:fix-github-issue 1234`

---

## 고급 패턴

### Worktree 격리

```bash
claude -w feature-auth --tmux
```

→ `.claude/worktrees/feature-auth/` 에서 격리된 세션 시작

---

### Headless (비대화형) 모드

```bash
claude -p "Python 파일 린트" --output-format json > results.json
```

→ 자동화 파이프라인에서 사용

---

### Remote Control (Web 제어)

```bash
claude --remote-control --name "My Backend"
```

→ claude.ai 또는 Claude 앱에서 제어 가능

---

### 병렬 워크플로우

```bash
claude --agents '{"reviewer":{"description":"코드 리뷰"},"tester":{"description":"테스트"}}'
```

→ 멀티 에이전트 병렬 작업

---

## 요약

| 카테고리 | 요소 수 | 예시 |
|----------|--------|------|
| **슬래시 명령어** | 40+ | `/init`, `/review`, `/simplify` |
| **CLI 명령어** | 16+ | `claude`, `claude -p`, `claude mcp` |
| **CLI 플래그** | 60+ | `--model`, `--permission-mode`, `--worktree` |
| **Hook 이벤트** | 12 | `PreToolUse`, `PostToolUse`, `Stop` |
| **Handler 타입** | 4 | Command, HTTP, Prompt, Agent |
| **키보드 단축키** | 15+ | `Ctrl+O`, `Shift+Tab`, `Esc Esc` |

---

**최신 정보는 `/help` 명령어로 세션에서 항상 확인할 수 있습니다.**
