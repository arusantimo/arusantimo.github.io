window.CLAUDE_TIPS = {
  "/simplify": {
    "title": "/simplify — 병렬 코드 리뷰",
    "desc": "병렬 에이전트 3개가 동시에 코드를 분석해 단순화·개선 제안을 제공합니다. 코드 복잡도 감소와 가독성 개선에 특화된 내장 스킬입니다.",
    "example": "/simplify\n/simplify src/auth.ts  # 특정 파일 지정"
  },
  "/batch": {
    "title": "/batch — 대규모 병렬 변경",
    "desc": "5~30개의 Git 워크트리를 자동 생성해 독립적인 파일 변경을 병렬로 처리합니다. 대규모 리팩토링·일괄 번역·타입 추가 등에 적합합니다.",
    "example": "/batch \"모든 .js 파일을 TypeScript로 변환\""
  },
  "/debug [desc]": {
    "title": "/debug — 디버그 모드",
    "desc": "디버그 로그를 mid-session에 켜고, Claude가 현재 세션 상태를 진단하게 합니다. 선택적 설명을 추가하면 특정 문제에 집중합니다.",
    "example": "/debug\n/debug \"왜 MCP 서버가 연결 안 되는지\""
  },
  "/loop [interval]": {
    "title": "/loop — 반복 예약 작업",
    "desc": "지정한 간격(예: 5m, 1h)마다 프롬프트·슬래시 명령을 자동 실행합니다. /proactive가 별칭입니다. 대기 중 Esc 키를 눌러 대기 중인 wakeups를 취소할 수 있습니다.",
    "example": "/loop 5m check the deploy\n/loop 1h /simplify"
  },
  "/claude-api": {
    "title": "/claude-api — API·SDK 참조 로드",
    "desc": "Claude API, Anthropic SDK 사용법·패턴·Managed Agents 설계 가이드를 컨텍스트에 로드합니다. API 연동 코드 작성 시 실행하세요.",
    "example": "/claude-api"
  },
  ".claude/skills/<n>/": {
    "title": ".claude/skills/<n>/ — 프로젝트 스킬",
    "desc": "현재 프로젝트에서만 사용하는 커스텀 스킬 디렉터리입니다. <n>은 스킬 이름으로, SKILL.md 파일이 포함되어야 합니다. Git에 커밋하면 팀원과 공유됩니다.",
    "example": "# 구조\n.claude/skills/my-skill/SKILL.md"
  },
  "~/.claude/skills/<n>/": {
    "title": "~/.claude/skills/<n>/ — 개인 스킬",
    "desc": "모든 프로젝트에서 사용할 수 있는 사용자 전역 스킬 디렉터리입니다. 개인 작업 패턴, 코딩 스타일 등을 스킬로 저장합니다.",
    "example": "~/.claude/skills/refactor/SKILL.md"
  },
  "description": {
    "title": "description — 자동 호출 트리거",
    "desc": "스킬 SKILL.md 프론트매터에서 Claude가 이 스킬을 언제 자동으로 실행할지 기술합니다. 이 설명과 사용자 프롬프트가 매칭될 때 자동 호출됩니다.",
    "example": "---\ndescription: 코드 리뷰가 필요할 때 사용\n---"
  },
  "allowed-tools": {
    "title": "allowed-tools — 도구 사전 승인",
    "desc": "스킬·에이전트가 사용할 수 있는 도구 목록입니다. 이 목록에 포함된 도구는 권한 프롬프트 없이 자동 실행됩니다.",
    "example": "---\nallowed-tools:\n  - Bash\n  - Edit\n  - Read\n---"
  },
  "model": {
    "title": "model — 스킬 모델 재정의",
    "desc": "스킬 실행 시 사용할 모델을 개별 지정합니다. 세션의 기본 모델과 무관하게 특정 모델을 강제할 수 있습니다.",
    "example": "---\nmodel: claude-opus-4-6\n---"
  },
  "effort": {
    "title": "effort — 노력 수준 재정의",
    "desc": "스킬 실행 시 적용할 노력 수준(low/medium/high/max)을 지정합니다. 빠른 스킬에는 low, 복잡한 분석에는 high를 사용합니다.",
    "example": "---\neffort: high\n---"
  },
  "paths: [globs]": {
    "title": "paths: — 경로별 조건부 적용",
    "desc": "스킬·규칙을 특정 파일 경로 패턴에만 적용합니다. glob 패턴 목록을 지정하면, 해당 파일 작업 시에만 스킬이 활성화됩니다.",
    "example": "---\npaths:\n  - src/**/*.ts\n  - lib/**/*.ts\n---"
  },
  "context: fork": {
    "title": "context: fork — 서브에이전트에서 실행",
    "desc": "스킬을 현재 세션 컨텍스트에서 분리된 포크 서브에이전트로 실행합니다. 메인 컨텍스트를 오염시키지 않고 독립적인 작업을 처리합니다.",
    "example": "---\ncontext: fork\n---"
  },
  "$ARGUMENTS": {
    "title": "$ARGUMENTS — 사용자 입력 플레이스홀더",
    "desc": "슬래시 명령·스킬 호출 시 사용자가 입력한 인수를 삽입합니다. `/my-skill 파라미터`처럼 호출하면 $ARGUMENTS가 해당 값으로 치환됩니다.",
    "example": "---\n# SKILL.md 내용\nAnalyze $ARGUMENTS and suggest improvements.\n---\n# 사용: /my-skill auth.ts"
  },
  "${CLAUDE_SKILL_DIR}": {
    "title": "${CLAUDE_SKILL_DIR} — 스킬 디렉터리 경로",
    "desc": "스킬 자신이 위치한 디렉터리의 절대 경로로 치환됩니다. 스킬 내에서 상대 경로 참조 없이 자신의 파일에 안전하게 접근할 수 있습니다.",
    "example": "!`cat ${CLAUDE_SKILL_DIR}/template.md`"
  },
  "!`cmd`": {
    "title": "!`cmd` — 동적 컨텍스트 주입",
    "desc": "스킬 SKILL.md 안에서 백틱 명령을 실행하고 결과를 컨텍스트에 삽입합니다. 최신 데이터를 동적으로 로드할 때 활용합니다.",
    "example": "!`git log --oneline -5`\n!`cat package.json`"
  },
  "plugin bin/": {
    "title": "plugin bin/ — 플러그인 실행 파일",
    "desc": "플러그인이 bin/ 디렉터리에 실행 파일을 포함할 수 있습니다. 이 파일들은 Bash 도구에서 PATH 없이 bare 명령으로 호출할 수 있습니다.",
    "example": "# 플러그인 구조\nbin/\n  my-tool.sh  # claude가 my-tool.sh로 직접 실행 가능"
  },
  "claude": {
    "title": "claude — 대화형 TUI 시작",
    "desc": "현재 디렉터리를 컨텍스트로 대화형 Claude Code 세션을 시작합니다. 프로젝트 CLAUDE.md, 스킬, MCP 서버를 자동으로 로드합니다.",
    "example": "cd my-project\nclaude"
  },
  "claude \"q\"": {
    "title": "claude \"프롬프트\" — 프롬프트와 함께 시작",
    "desc": "초기 프롬프트를 입력하면서 대화형 세션을 시작합니다. 세션이 열리는 즉시 Claude가 해당 작업을 시작합니다.",
    "example": "claude \"이 프로젝트에서 버그를 찾아줘\"\nclaude \"README.md를 한국어로 번역해\""
  },
  "claude -p \"q\"": {
    "title": "claude -p — 헤드리스 (비대화형) 실행",
    "desc": "대화형 TUI 없이 단일 쿼리를 실행하고 결과를 stdout으로 출력합니다. 스크립트·CI/CD 파이프라인에서 사용합니다. --print와 동일합니다.",
    "example": "claude -p \"main.ts의 버그 찾기\"\necho \"코드 리뷰\" | claude -p"
  },
  "claude -c": {
    "title": "claude -c — 마지막 대화 이어가기",
    "desc": "이전 세션의 컨텍스트를 그대로 유지하며 대화를 이어갑니다. --continue와 동일합니다. 세션 ID가 없어도 가장 최근 세션을 자동으로 재개합니다.",
    "example": "# 이전 세션을 그대로 이어가기\nclaude -c\nclaude -c -p \"아까 작업 계속해\""
  },
  "claude -r \"n\"": {
    "title": "claude -r \"이름\" — 세션 이름으로 재개",
    "desc": "/rename으로 지정한 이름 또는 --name으로 저장한 세션 이름으로 특정 세션을 재개합니다. --resume과 동일합니다.",
    "example": "# /rename my-feature로 저장한 세션 재개\nclaude -r \"my-feature\""
  },
  "claude update": {
    "title": "claude update — Claude Code 업데이트",
    "desc": "Claude Code CLI를 최신 버전으로 업데이트합니다. npm 전역 설치 또는 native installer 배포 모두 지원합니다.",
    "example": "claude update\n# 또는\nnpm install -g @anthropic-ai/claude-code"
  },
  "Explore": {
    "title": "Explore — 경량 탐색 에이전트",
    "desc": "Haiku 모델 기반의 빠른 읽기 전용 탐색 에이전트입니다. 코드베이스 구조 파악, 파일 검색 등 컨텍스트 비용이 낮은 탐색 작업에 최적화됩니다.",
    "example": "claude --agent Explore \"src 폴더 구조 설명해줘\""
  },
  "Plan": {
    "title": "Plan — 플랜 모드 에이전트",
    "desc": "구현 전 리서치와 계획 수립에 특화된 에이전트입니다. Sonnet 모델을 사용해 작업 계획을 세우고 세부 단계를 정의합니다.",
    "example": "# /plan 명령어 또는 에이전트 직접 사용\nclaude --agent Plan"
  },
  "General": {
    "title": "General — 범용 에이전트",
    "desc": "전체 도구에 접근 가능한 범용 에이전트입니다. 복잡한 다단계 태스크, 코드 편집, 파일 작업, 명령 실행 등을 처리합니다.",
    "example": "claude --agent General \"인증 시스템 전체 리팩토링\""
  },
  "Bash": {
    "title": "Bash — 터미널 전용 에이전트",
    "desc": "별도의 컨텍스트에서 Bash 명령 실행에 특화된 에이전트입니다. 메인 대화 컨텍스트를 유지하면서 셸 명령을 분리 실행합니다.",
    "example": "claude --agent Bash \"npm test를 실행하고 오류 분석해줘\""
  },
  "permissionMode": {
    "title": "permissionMode — 에이전트 권한 모드",
    "desc": "에이전트가 동작할 권한 수준을 지정합니다. default(기본), acceptEdits(편집 자동수락), plan(계획 모드), bypassPermissions(모든 권한 우회).",
    "example": "---\npermissionMode: acceptEdits\n---"
  },
  "isolation: worktree": {
    "title": "isolation: worktree — 워크트리 격리 실행",
    "desc": "에이전트를 별도의 Git 워크트리에서 실행합니다. 메인 브랜치에 영향 없이 실험적 변경을 안전하게 수행할 수 있습니다.",
    "example": "---\nisolation: worktree\n---"
  },
  "memory:": {
    "title": "memory: — 에이전트 영구 메모리",
    "desc": "에이전트가 세션 간 유지되는 메모리를 사용할 스코프를 지정합니다. user(개인), project(프로젝트), local(로컬).",
    "example": "---\nmemory: project\n---"
  },
  "background: true": {
    "title": "background: true — 백그라운드 태스크",
    "desc": "에이전트를 항상 백그라운드 태스크로 실행합니다. 메인 스레드와 독립적으로 작동하며, 완료 시 메인 에이전트에 알림을 보냅니다.",
    "example": "---\nbackground: true\n---"
  },
  "maxTurns": {
    "title": "maxTurns — 에이전트 턴 제한",
    "desc": "에이전트가 실행할 수 있는 최대 턴(대화 회전) 수를 제한합니다. 무한 루프 방지와 비용 제어에 활용합니다.",
    "example": "---\nmaxTurns: 20\n---"
  },
  "initialPrompt": {
    "title": "initialPrompt — 첫 턴 자동 제출",
    "desc": "에이전트 시작 시 자동으로 첫 번째 메시지를 제출합니다. /agents 메뉴에서 에이전트를 실행할 때 별도 입력 없이 바로 작동합니다.",
    "example": "---\ninitialPrompt: \"현재 PR의 스테이징 변경사항을 분석해\"\n---"
  },
  "SendMessage": {
    "title": "SendMessage — 에이전트 재개·메시지 전송",
    "desc": "멈춘 서브에이전트를 재개하거나 실행 중인 에이전트에 추가 메시지를 보냅니다. `resume` 파라미터가 제거된 이후의 공식 재개 방법입니다.",
    "example": "# Agent tool로 API 호출 시\n{\"tool\": \"SendMessage\", \"to\": \"agentId\", \"message\": \"계속 진행해\"}"
  },
  "@agent-name": {
    "title": "@agent-name — 에이전트 멘션",
    "desc": "타입어헤드 자동완성으로 특정 에이전트 이름을 멘션합니다. 대화 중 특정 에이전트를 호출하거나 태스크를 위임할 때 사용합니다.",
    "example": "@Explore 이 버그의 원인 파일을 찾아줘\n@Plan 다음 기능 개발 계획 세워줘"
  },
  "--model": {
    "title": "--model — 모델 지정",
    "desc": "사용할 Claude 모델을 지정합니다. 모델 ID 전체 또는 `opus`, `sonnet`, `haiku` 단축명을 지원합니다.",
    "example": "claude --model claude-opus-4-6\nclaude --model sonnet"
  },
  "-w": {
    "title": "-w / --worktree — Git 워크트리",
    "desc": "격리된 Git 워크트리에서 세션을 시작합니다. 메인 브랜치에 영향 없이 실험적 작업을 수행할 수 있습니다.",
    "example": "claude -w feature-branch\nclaude --worktree my-experiment"
  },
  "-n / --name": {
    "title": "-n / --name — 세션 이름 지정",
    "desc": "시작 시 세션 이름을 직접 지정합니다. 나중에 claude -r 로 이름으로 재개할 수 있습니다.",
    "example": "claude -n auth-refactor\nclaude --name \"feature-xyz\""
  },
  "--add-dir": {
    "title": "--add-dir — 작업 디렉터리 추가",
    "desc": "기본 작업 디렉터리 외에 읽기/쓰기 접근을 허용할 추가 디렉터리를 지정합니다. 여러 번 반복 가능합니다.",
    "example": "claude --add-dir ../shared --add-dir ../config"
  },
  "--agent": {
    "title": "--agent — 에이전트 사용",
    "desc": "세션에서 사용할 특정 에이전트를 지정합니다. 해당 에이전트의 시스템 프롬프트·도구·모델 설정이 적용됩니다.",
    "example": "claude --agent Explore\nclaude --agent my-custom-agent"
  },
  "--allowedTools": {
    "title": "--allowedTools — 도구 사전 승인",
    "desc": "허용할 도구 목록을 미리 지정해 권한 프롬프트를 생략합니다. 쉼표로 구분하거나 반복 지정합니다.",
    "example": "claude -p --allowedTools Edit,Bash,Read \"코드 수정해\""
  },
  "--output-format": {
    "title": "--output-format — 출력 형식",
    "desc": "헤드리스(-p) 모드의 출력 형식을 지정합니다. json: JSON 구조, stream-json: 스트리밍 JSONL 이벤트, text: 일반 텍스트.",
    "example": "claude -p --output-format json \"분석해줘\"\nclaude -p --output-format stream-json \"요약해\""
  },
  "--json-schema": {
    "title": "--json-schema — 구조화 출력 스키마",
    "desc": "응답 형식을 JSON Schema 파일로 정의해 구조화된 출력을 강제합니다. --output-format json과 함께 사용합니다.",
    "example": "claude -p --output-format json --json-schema schema.json \"분석해\""
  },
  "--max-turns": {
    "title": "--max-turns — 최대 턴 수 제한",
    "desc": "세션에서 허용하는 최대 대화 턴 수를 제한합니다. 비용 관리와 루프 방지에 사용합니다.",
    "example": "claude -p --max-turns 10 \"리팩토링해\""
  },
  "--max-budget-usd": {
    "title": "--max-budget-usd — API 비용 상한",
    "desc": "세션의 최대 API 비용을 USD 단위로 제한합니다. 초과 시 세션을 자동 종료합니다.",
    "example": "claude -p --max-budget-usd 2.5 \"전체 분석해\""
  },
  "--console": {
    "title": "--console — Anthropic Console 인증",
    "desc": "claude auth login 시 Anthropic Console(API 청구) 인증 방식을 사용합니다. API 키 없이 Console OAuth로 로그인합니다.",
    "example": "claude auth login --console"
  },
  "--verbose": {
    "title": "--verbose — 상세 로그",
    "desc": "세션 중 상세한 내부 로그를 출력합니다. 디버깅, 도구 실행 상태, MCP 연결 상태 등을 확인할 수 있습니다.",
    "example": "claude --verbose"
  },
  "--bare": {
    "title": "--bare — 최소 헤드리스 모드",
    "desc": "훅, LSP, 플러그인 동기화, 스킬 디렉터리 탐색을 생략한 최소 실행 모드입니다. OAuth/keychain 인증 불가, API 키 또는 apiKeyHelper 필수. -p와 함께 사용합니다.",
    "example": "ANTHROPIC_API_KEY=sk-... claude --bare -p \"빠른 쿼리\""
  },
  "--channels": {
    "title": "--channels — 권한 릴레이 / MCP 푸시",
    "desc": "채널 기능을 활성화합니다. MCP 서버가 세션에 메시지를 push할 수 있고, 모바일 앱으로 권한 승인을 릴레이할 수 있습니다.",
    "example": "claude --channels"
  },
  "--remote": {
    "title": "--remote — 웹 세션 WebSocket 연결",
    "desc": "TUI를 원격 app-server WebSocket 엔드포인트에 연결합니다. ws:// 또는 wss:// URL을 지정합니다. claude, resume, fork에서 지원됩니다.",
    "example": "claude --remote wss://my-server.com:8080\nclaude --remote ws://localhost:3000"
  },
  "--effort": {
    "title": "--effort — 노력 수준",
    "desc": "시작 시 노력 수준을 지정합니다. low(○): 빠른 작업, medium(◐): 기본, high(●): 기본 설정 이후, max: 최대 thinking 예산.",
    "example": "claude --effort high\nclaude --effort low \"간단히 요약해\""
  },
  "--permission-mode": {
    "title": "--permission-mode — 권한 모드 지정",
    "desc": "세션의 기본 권한 모드를 설정합니다. plan: 코드 편집 전 승인 필요, acceptEdits: 파일 편집 자동 수락, default: 개별 승인, bypassPermissions: 모두 우회.",
    "example": "claude --permission-mode acceptEdits\nclaude --permission-mode plan"
  },
  "--dangerously-skip-permissions": {
    "title": "--dangerously-skip-permissions ⚠️ — 권한 프롬프트 완전 생략",
    "desc": "모든 도구 사용 권한 프롬프트를 생략합니다. CI/CD처럼 자동화 환경에서만 사용해야 합니다. 잘못 사용하면 파일 삭제·코드 수정이 승인 없이 실행됩니다.",
    "example": "# CI에서만 사용\nclaude -p --dangerously-skip-permissions \"tests 실행\""
  },
  "--chrome": {
    "title": "--chrome — Chrome 브라우저 연동",
    "desc": "Claude Code와 Chrome 확장을 연동합니다. 브라우저를 직접 제어하거나, 화면의 정보를 컨텍스트로 활용할 수 있습니다.",
    "example": "claude --chrome"
  },
  "PowerShell tool": {
    "title": "PowerShell tool — Windows PowerShell 도구",
    "desc": "Windows에서 Bash 도구 대신 PowerShell을 사용하는 옵트인 미리보기 기능입니다. settings.json에서 활성화하거나 /config에서 설정합니다.",
    "example": "# settings.json\n{\"powershellTool\": true}"
  },
  "/clear": {
    "title": "/clear — 대화 초기화",
    "desc": "현재 대화 컨텍스트를 모두 지웁니다. 새 작업 시작 시 또는 컨텍스트 한도 도달 시 사용합니다. 백그라운드 에이전트는 유지됩니다.",
    "example": "/clear"
  },
  "/compact [focus]": {
    "title": "/compact — 컨텍스트 압축",
    "desc": "긴 대화를 요약해 컨텍스트 창을 절약합니다. focus 인수를 주면 특정 주제에 집중한 요약이 생성됩니다. 자동압축은 ~95%에서 트리거됩니다.",
    "example": "/compact\n/compact \"인증 관련 변경사항에 집중\""
  },
  "/resume": {
    "title": "/resume — 세션 재개/전환",
    "desc": "저장된 이전 세션 목록을 보여주거나, 세션 ID·이름을 직접 지정해 특정 세션으로 전환합니다.",
    "example": "/resume\n/resume my-auth-project"
  },
  "/rename [name]": {
    "title": "/rename — 세션 이름 변경",
    "desc": "현재 세션에 이름을 부여합니다. 이름 없이 호출하면 AI가 대화 내용을 바탕으로 자동 생성합니다. 나중에 claude -r \"이름\"으로 재개할 수 있습니다.",
    "example": "/rename\n/rename auth-refactor-5월"
  },
  "/branch [name]": {
    "title": "/branch — 대화 브랜치 생성",
    "desc": "현재 대화를 분기해 별도 스레드로 탐색합니다. /fork 와 동일한 기능입니다. 다른 접근법을 시도할 때 원본 대화를 보존합니다.",
    "example": "/branch\n/branch try-different-approach"
  },
  "/cost": {
    "title": "/cost — 토큰·비용 통계",
    "desc": "현재 세션의 토큰 사용량과 예상 비용을 표시합니다. 구독 사용자는 모델별·캐시 히트별 세부 분석도 확인할 수 있습니다.",
    "example": "/cost"
  },
  "/context": {
    "title": "/context — 컨텍스트 시각화",
    "desc": "컨텍스트 창 사용량을 시각화하고 최적화 팁을 제공합니다. 스킬·에이전트·MCP 도구별 토큰 비중과 절약 방법을 표시합니다.",
    "example": "/context"
  },
  "/diff": {
    "title": "/diff — 인터랙티브 Diff 뷰어",
    "desc": "Claude가 이 세션에서 수정한 파일들의 차이를 인터랙티브 뷰어로 보여줍니다. 변경사항 검토와 부분 수락/거부에 사용합니다.",
    "example": "/diff"
  },
  "/copy [N]": {
    "title": "/copy — 응답 복사",
    "desc": "마지막 응답(기본) 또는 N번째 최신 응답을 클립보드에 복사합니다. 코드 블록이 있으면 선택 피커를 표시합니다. /copy N 으로 특정 응답을 지정합니다.",
    "example": "/copy\n/copy 2  # 두 번째 최신 응답 복사"
  },
  "/rewind": {
    "title": "/rewind — 되감기",
    "desc": "이전 체크포인트로 대화를 되감고 그 시점 이후의 변경사항을 취소합니다. VS Code에서는 Esc-twice로 재감기 피커를 열 수 있습니다.",
    "example": "/rewind"
  },
  "/export": {
    "title": "/export — 대화 내보내기",
    "desc": "현재 대화 내용을 파일로 내보냅니다. 경로를 지정하거나 기본값을 사용합니다. 절대경로와 ~ 확장을 지원합니다.",
    "example": "/export\n/export ~/Desktop/session.txt"
  },
  "/config": {
    "title": "/config — 설정 열기",
    "desc": "Claude Code 설정 인터페이스를 엽니다. 검색(/)으로 설정을 필터링하고 Enter로 저장, Esc로 취소합니다. /settings 가 별칭입니다.",
    "example": "/config"
  },
  "/model [model]": {
    "title": "/model — 모델 전환",
    "desc": "현재 세션의 모델을 변경합니다. ← → 키로 노력 수준도 같이 변경 가능합니다. Claude 처리 중에도 즉시 실행됩니다.",
    "example": "/model\n/model claude-opus-4-6"
  },
  "/fast [on|off]": {
    "title": "/fast — 빠른 모드 전환",
    "desc": "Fast mode를 켜거나 끕니다. Fast mode는 동일 모델의 경량 추론 경로를 사용해 응답 속도가 빨라집니다.",
    "example": "/fast on\n/fast off\n/fast  # 현재 상태 확인"
  },
  "/vim": {
    "title": "/vim — Vim 모드 (제거됨)",
    "desc": "⚠️ v2.1.92에서 제거되었습니다. Vim 모드는 /config → Editor mode에서 설정하세요.",
    "example": "/config  # → Editor mode → Vim"
  },
  "/theme": {
    "title": "/theme — 컬러 테마 변경",
    "desc": "TUI의 컬러 테마를 변경합니다. Ctrl+T로 신택스 하이라이팅을 토글할 수 있습니다.",
    "example": "/theme"
  },
  "/permissions": {
    "title": "/permissions — 권한 보기/수정",
    "desc": "현재 세션의 허용·거부 규칙을 관리합니다. Recent 탭에서 자동 거부된 명령을 확인하고 R로 재시도할 수 있습니다.",
    "example": "/permissions"
  },
  "/effort [level]": {
    "title": "/effort — 노력 수준 설정",
    "desc": "모델의 사고 예산(노력 수준)을 변경합니다. low(○), medium(◐), high(●), max, auto. Claude 처리 중에도 즉시 적용됩니다.",
    "example": "/effort high\n/effort auto  # 기본값으로 리셋\n/effort low"
  },
  "/color [color]": {
    "title": "/color — 프롬프트 바 색상",
    "desc": "세션 프롬프트 바의 색상을 지정합니다. 여러 Claude Code 세션을 구분할 때 유용합니다. /color default로 초기화.",
    "example": "/color blue\n/color #ff6600\n/color default"
  },
  "/keybindings": {
    "title": "/keybindings — 키바인딩 커스텀",
    "desc": "~/.claude/keybindings.json 편집 화면을 엽니다. 기본 단축키를 재정의하거나 코드 시퀀스를 만들 수 있습니다.",
    "example": "/keybindings"
  },
  "/terminal-setup": {
    "title": "/terminal-setup — 터미널 키바인딩 설정",
    "desc": "현재 사용 중인 터미널(iTerm2, Ghostty, Kitty, WezTerm, Warp 등)에 최적화된 키바인딩을 설정합니다. VS Code 등 에디터의 스크롤 감도 설정 기능이 포함되어 있습니다.",
    "example": "/terminal-setup"
  },
  "/init": {
    "title": "/init — CLAUDE.md 생성",
    "desc": "프로젝트 루트에 CLAUDE.md 파일을 생성합니다. 코드베이스를 분석해 빌드 명령, 코딩 스타일, 프로젝트 규칙을 자동으로 채웁니다.",
    "example": "/init"
  },
  "/memory": {
    "title": "/memory — CLAUDE.md 파일 편집",
    "desc": "CLAUDE.md 파일들을 직접 편집합니다. 프로젝트·사용자·조직 규칙을 관리합니다. 자동메모리 파일도 확인·편집할 수 있습니다.",
    "example": "/memory"
  },
  "/mcp": {
    "title": "/mcp — MCP 서버 관리",
    "desc": "MCP(Model Context Protocol) 서버 목록을 확인하고, 연결·해제·OAuth 인증 등을 관리합니다. VS Code에서는 네이티브 대화상자를 사용합니다.",
    "example": "/mcp\n/mcp enable my-server\n/mcp disable my-server"
  },
  "/hooks": {
    "title": "/hooks — 훅 관리",
    "desc": "PreToolUse, PostToolUse, Stop, SessionStart 등 훅 설정을 관리합니다. 이벤트 트리거별로 실행할 커맨드를 구성합니다.",
    "example": "/hooks"
  },
  "/skills": {
    "title": "/skills — 사용 가능한 스킬 목록",
    "desc": "현재 세션에서 사용 가능한 내장·프로젝트·사용자 스킬 목록을 알파벳 순으로 표시합니다. 각 스킬의 설명이 표시됩니다.",
    "example": "/skills"
  },
  "/agents": {
    "title": "/agents — 에이전트 관리",
    "desc": "현재 사용 가능한 에이전트 목록을 표시합니다. Running 탭에서 실행 중인 서브에이전트, Library 탭에서 에이전트 실행·확인이 가능합니다.",
    "example": "/agents"
  },
  "/chrome": {
    "title": "/chrome — Chrome 브라우저 연동",
    "desc": "Chrome 확장과 연동해 브라우저를 직접 제어하거나 화면 정보를 컨텍스트로 활용합니다. Claude in Chrome 기능입니다.",
    "example": "/chrome"
  },
  "/reload-plugins": {
    "title": "/reload-plugins — 플러그인 핫 리로드",
    "desc": "재시작 없이 설치·수정된 플러그인을 즉시 로드합니다. 플러그인 개발 중 변경사항을 바로 테스트할 때 사용합니다.",
    "example": "/reload-plugins"
  },
  "/add-dir <path>": {
    "title": "/add-dir — 작업 디렉터리 추가",
    "desc": "세션 중에 추가 디렉터리에 읽기/쓰기 접근을 부여합니다. --remember 옵션으로 settings에 영구 저장할 수 있습니다. ~ 확장과 typeahead 지원.",
    "example": "/add-dir ~/shared-utils\n/add-dir /c/Projects/shared"
  },
  "/powerup": {
    "title": "/powerup — 인터랙티브 기능 학습",
    "desc": "애니메이션 데모로 Claude Code의 핵심 기능들을 단계별로 배웁니다. 처음 사용자 또는 새 기능 파악에 유용합니다.",
    "example": "/powerup"
  },
  "/btw <question>": {
    "title": "/btw — 컨텍스트 비용 없는 사이드 질문",
    "desc": "현재 작업 컨텍스트 비용을 들이지 않고 별도 질문에 답을 얻습니다. 짧은 확인 질문이나 정보 조회에 적합합니다.",
    "example": "/btw Rust의 lifetime이 뭐야?\n/btw fetch와 axios 차이?"
  },
  "/plan [desc]": {
    "title": "/plan — 플랜 모드",
    "desc": "플랜 모드를 활성화합니다. 설명을 추가하면 해당 작업 계획을 바로 시작합니다. 코드 편집 전 계획을 수립하고 승인받습니다.",
    "example": "/plan\n/plan auth 버그 수정"
  },
  "/voice": {
    "title": "/voice — 음성 입력",
    "desc": "음성 입력을 활성화합니다. Space(길게 누름)로 푸시-투-토크 녹음을 시작하고, 놓으면 전송합니다. 20개 언어를 지원합니다.",
    "example": "/voice\n# 활성화 후: Space키 길게 눌러 말하기"
  },
  "/doctor": {
    "title": "/doctor — 설치 상태 진단",
    "desc": "Claude Code의 설치 상태, 인증, MCP 서버, CLAUDE.md, 플러그인, 권한 규칙 등을 진단합니다. f를 눌러 Claude가 자동으로 수정하게 할 수 있습니다.",
    "example": "/doctor"
  },
  "/pr-comments [PR]": {
    "title": "/pr-comments — GitHub PR 코멘트 가져오기",
    "desc": "GitHub PR의 리뷰 코멘트를 가져와 컨텍스트에 로드합니다. PR 번호 또는 URL을 지정하거나, 현재 브랜치의 PR을 자동으로 감지합니다.",
    "example": "/pr-comments\n/pr-comments 123\n/pr-comments https://github.com/org/repo/pull/123"
  },
  "/stats": {
    "title": "/stats — 사용량 통계",
    "desc": "세션 토큰 사용량, 비용, 즐겨 쓰는 모델, 사용 스트릭 등 통계를 표시합니다. r키로 기간을 7일/30일/전체로 변경합니다.",
    "example": "/stats"
  },
  "/insights": {
    "title": "/insights — 세션 분석 리포트",
    "desc": "세션의 작업 패턴, 가장 많이 사용한 도구, 비용 분석 등을 포함한 상세 리포트를 생성합니다.",
    "example": "/insights"
  },
  "/desktop": {
    "title": "/desktop — 데스크탑 앱에서 계속",
    "desc": "현재 세션을 Claude Code 데스크탑 앱으로 이어서 진행합니다. 세션 상태를 유지한 채 앱으로 전환됩니다.",
    "example": "/desktop"
  },
  "/remote-control": {
    "title": "/remote-control — claude.ai/code 브릿지",
    "desc": "현재 세션을 claude.ai/code 웹 UI로 브릿지합니다. 모바일 또는 다른 기기에서 세션을 계속 제어할 수 있습니다. /rc 가 단축 별칭입니다.",
    "example": "/remote-control\n/remote-control my-session-name"
  },
  "/usage": {
    "title": "/usage — 플랜 한도 & 상태",
    "desc": "현재 플랜의 사용량, 남은 한도, 리셋 시간 등을 표시합니다. Pro/Max/Team 사용자의 5시간·7일 한도를 확인합니다.",
    "example": "/usage"
  },
  "/schedule": {
    "title": "/schedule — 클라우드 예약 작업",
    "desc": "Claude Code Cloud에서 정기적으로 실행될 작업을 예약합니다. 코드 점검, 자동화 태스크 등에 활용합니다.",
    "example": "/schedule"
  },
  "/ultrareview": {
    "title": "/ultrareview — 멀티에이전트 코드 리뷰",
    "desc": "병렬 멀티에이전트 분석으로 클라우드에서 종합 코드 리뷰를 실행합니다. 병렬 체크 및 diffstat 표시 도입으로 속도와 가독성이 향상되었습니다.",
    "example": "/ultrareview\n/ultrareview 123  # PR 리뷰"
  },
  "/security-review": {
    "title": "/security-review — 변경사항 보안 분석",
    "desc": "현재 브랜치의 변경사항을 보안 관점에서 분석합니다. 취약점, OWASP Top 10, 잠재적 이슈를 검토합니다.",
    "example": "/security-review"
  },
  "/help": {
    "title": "/help — 최신 명령어 및 전체 가이드",
    "desc": "현재 버전에서 사용 가능한 모든 명령어 목록과 상세 도움말을 표시합니다. 공식 문서에 아직 반영되지 않은 최신 기능이나 변경사항을 CLI 내에서 즉시 확인하는 가장 정확한 방법입니다.",
    "example": "/help"
  },
  "/feedback": {
    "title": "/feedback — 피드백 제출",
    "desc": "Anthropic에 버그 리포트나 기능 요청을 제출합니다. /bug 가 별칭입니다.",
    "example": "/feedback\n/bug"
  },
  "/release-notes": {
    "title": "/release-notes — 전체 변경 내역",
    "desc": "Claude Code 전체 버전의 변경 내역을 인터랙티브 버전 피커로 탐색합니다. 특정 버전 릴리스 노트를 확인할 수 있습니다.",
    "example": "/release-notes"
  },
  "/stickers": {
    "title": "/stickers — 스티커 주문 🎉",
    "desc": "Claude Code 스티커를 주문하는 링크를 제공합니다.",
    "example": "/stickers"
  },
  "--transport http": {
    "title": "--transport http — 원격 HTTP MCP (권장)",
    "desc": "Streamable HTTP 전송 방식으로 MCP 서버를 추가합니다. 원격 서버, OAuth 인증, 재연결을 지원하며 현재 권장되는 방식입니다.",
    "example": "claude mcp add my-server --transport http https://my-server.com"
  },
  "--transport stdio": {
    "title": "--transport stdio — 로컬 프로세스 MCP",
    "desc": "stdio 전송 방식으로 로컬 MCP 서버 프로세스를 실행합니다. 환경변수 설정(-e)과 함께 사용합니다.",
    "example": "claude mcp add my-local -- node /path/to/server.js"
  },
  "--transport sse": {
    "title": "--transport sse — 원격 SSE MCP",
    "desc": "Server-Sent Events 전송 방식으로 원격 MCP 서버를 추가합니다. OAuth 인증을 지원합니다.",
    "example": "claude mcp add my-server --transport sse https://my-server.com/sse"
  },
  "~/.claude.json": {
    "title": "~/.claude.json — MCP 서버 설정 파일",
    "desc": "사용자 전역 MCP 서버 설정 및 프로젝트 신뢰 정보가 저장됩니다. local(기본) 또는 user 스코프의 서버 정보를 포함합니다.",
    "example": "# claude mcp list 로 확인\n# claude mcp add -s local 명령으로 추가"
  },
  ".mcp.json": {
    "title": ".mcp.json — 프로젝트 MCP 설정",
    "desc": "프로젝트 루트에 위치하며 팀 공유용 MCP 서버를 정의합니다. Git에 커밋하면 팀원 모두가 같은 MCP 서버를 사용합니다.",
    "example": "{\n  \"mcpServers\": {\n    \"my-db\": {\n      \"command\": \"node\",\n      \"args\": [\"./mcp-server.js\"]\n    }\n  }\n}"
  },
  "claude mcp list": {
    "title": "claude mcp list — MCP 서버 목록",
    "desc": "설정된 모든 MCP 서버와 상태(연결됨/오류)를 표시합니다. 서버 이름, 전송 방식, 도구 수를 확인할 수 있습니다.",
    "example": "claude mcp list\nclaude mcp list --json"
  },
  "claude mcp serve": {
    "title": "claude mcp serve — Claude를 MCP 서버로 실행",
    "desc": "Claude Code 자체를 MCP 서버로 실행합니다. 다른 MCP 클라이언트(에이전트, IDE 등)에서 Claude를 도구로 사용할 수 있습니다.",
    "example": "claude mcp serve"
  },
  "--permission-mode plan": {
    "title": "--permission-mode plan — 플랜 모드로 시작",
    "desc": "세션을 플랜 모드로 시작합니다. Claude가 코드 편집 전에 반드시 계획을 수립하고 승인받아야 합니다.",
    "example": "claude --permission-mode plan"
  },
  "ultrathink": {
    "title": "ultrathink — 최대 노력 키워드",
    "desc": "프롬프트에 'ultrathink'를 포함하면 해당 턴에 최대 thinking 예산을 적용합니다. 매우 복잡한 문제 해결에 사용합니다.",
    "example": "ultrathink about this architecture and propose improvements\nthink harder about edge cases"
  },
  "--worktree name": {
    "title": "--worktree — 격리 Git 워크트리",
    "desc": "지정한 이름으로 Git 워크트리를 생성하고 그 안에서 세션을 시작합니다. 메인 브랜치를 유지하면서 안전하게 실험합니다.",
    "example": "claude --worktree feature-login\nclaude -w my-refactor"
  },
  "sparsePaths": {
    "title": "sparsePaths — 스파스 체크아웃 경로",
    "desc": "대규모 모노레포에서 --worktree 사용 시 필요한 디렉터리만 체크아웃합니다. settings.json의 worktree.sparsePaths 키에 정의합니다.",
    "example": "# settings.json\n{\n  \"worktree\": {\n    \"sparsePaths\": [\"packages/auth\", \"packages/api\"]\n  }\n}"
  },
  "claude -r \"name\"": {
    "title": "claude -r \"이름\" — 이름으로 세션 재개",
    "desc": "/rename으로 지정한 이름으로 세션을 재개합니다. --resume과 동일합니다.",
    "example": "claude -r \"auth-refactor\"\nclaude --resume my-feature"
  },
  "/btw question": {
    "title": "/btw — 사이드 질문",
    "desc": "현재 작업 컨텍스트 비용 없이 별도 질문을 처리합니다.",
    "example": "/btw fetch와 axios 차이?\n/btw 이 라이브러리 라이선스가 뭐야?"
  },
  "claude -p \"query\"": {
    "title": "claude -p — 헤드리스 실행",
    "desc": "대화형 UI 없이 쿼리를 실행하고 stdout으로 출력합니다. 스크립트, CI/CD, 파이프 등에 활용합니다.",
    "example": "claude -p \"코드 분석해\"\necho \"요약해줘\" | claude -p"
  },
  "--output-format json": {
    "title": "--output-format json — JSON 출력",
    "desc": "응답을 JSON 구조로 출력합니다. --json-schema와 함께 사용하면 스키마를 강제할 수 있습니다.",
    "example": "claude -p --output-format json \"분석해줘\""
  },
  "--max-budget-usd 5": {
    "title": "--max-budget-usd — 비용 상한 설정",
    "desc": "세션의 최대 API 비용을 USD로 제한합니다. 초과 시 자동 종료됩니다.",
    "example": "claude -p --max-budget-usd 5 \"전체 분석\""
  },
  "cat file | claude -p": {
    "title": "파이프 입력 — stdin으로 Claude 실행",
    "desc": "파일 내용이나 명령 출력을 파이프로 Claude에 전달합니다. -p(헤드리스)와 함께 스크립트 자동화에 사용합니다.",
    "example": "cat error.log | claude -p \"이 에러 분석해\"\ngit diff | claude -p \"변경사항 요약해\""
  },
  "/loop 5m msg": {
    "title": "/loop — 반복 예약 작업",
    "desc": "지정한 간격마다 메시지나 슬래시 명령을 자동 실행합니다. 5m(5분), 1h(1시간) 등 시간 단위를 지원합니다.",
    "example": "/loop 5m check the deploy status\n/loop 30m /simplify"
  },
  "/rc": {
    "title": "/rc — 원격 제어 (단축 별칭)",
    "desc": "/remote-control의 단축 명령입니다. 세션을 claude.ai/code로 브릿지해 다른 기기에서 제어합니다.",
    "example": "/rc\n/rc my-project"
  },
  "./CLAUDE.md": {
    "title": "./CLAUDE.md — 프로젝트 설정",
    "desc": "프로젝트 루트의 CLAUDE.md입니다. 빌드 명령, 코딩 규칙, 아키텍처 설명, 팀 규칙을 기록합니다. Git에 커밋해 팀과 공유합니다.",
    "example": "# CLAUDE.md 예시\n## Build\nnpm run build\n\n## Rules\n- 타입 안전성 우선"
  },
  "~/.claude/CLAUDE.md": {
    "title": "~/.claude/CLAUDE.md — 개인 전역 설정",
    "desc": "모든 프로젝트에서 로드되는 개인 CLAUDE.md입니다. 코딩 스타일, 선호 도구, 개인 규칙을 저장합니다.",
    "example": "# 모든 프로젝트에 적용\n항상 한국어로 응답해줘.\n주석은 영어로."
  },
  "/etc/claude-code/": {
    "title": "/etc/claude-code/ — 조직 관리 설정",
    "desc": "조직·기업이 관리하는 전역 managed settings 디렉터리입니다. 관리자가 정책 파일을 배포해 모든 사용자에게 적용합니다.",
    "example": "/etc/claude-code/managed-settings.json"
  },
  ".claude/rules/*.md": {
    "title": ".claude/rules/*.md — 프로젝트 규칙",
    "desc": "프로젝트별 세분화된 규칙 파일입니다. frontmatter의 paths: 로 특정 파일 유형에만 적용할 수 있습니다. CLAUDE.md보다 세밀한 제어가 가능합니다.",
    "example": "# .claude/rules/typescript.md\n---\npaths:\n  - **/*.ts\n---\n항상 strict mode를 사용하세요."
  },
  "~/.claude/rules/*.md": {
    "title": "~/.claude/rules/*.md — 사용자 전역 규칙",
    "desc": "모든 프로젝트에서 사용되는 개인 규칙 파일입니다. 코딩 스타일, 선호 패턴 등 개인 기본값을 설정합니다.",
    "example": "~/.claude/rules/style.md"
  },
  "paths:": {
    "title": "paths: — 경로별 조건부 로드",
    "desc": "CLAUDE.md나 rules/*.md에서 특정 파일 경로 패턴과 일치할 때만 해당 규칙을 로드합니다. glob 패턴을 YAML 목록으로 지정합니다.",
    "example": "---\npaths:\n  - src/**/*.ts\n  - '**/*.test.js'\n---"
  },
  "@path/to/file": {
    "title": "@path/to/file — CLAUDE.md 파일 임포트",
    "desc": "CLAUDE.md에서 다른 파일을 임포트해 컨텍스트에 포함합니다. 공통 규칙을 별도 파일로 관리하고 여러 CLAUDE.md에서 재사용합니다.",
    "example": "@./docs/architecture.md\n@~/.claude/common-rules.md"
  },
  // ─── HOOKS ───
  "SessionStart": {
    "title": "SessionStart — 세션 시작·재개 시",
    "desc": "새로운 대화 세션이 시작되거나 기존 세션이 재개될 때 실행됩니다. 초기 권한 설정이나 환경 구성, 환영 메시지 출력 등에 활용합니다.",
    "example": "{\"hooks\": {\"SessionStart\": [{\"command\": \"echo 'Welcome!'\"}]}}"
  },
  "UserPromptSubmit": {
    "title": "UserPromptSubmit — 프롬프트 제출 시",
    "desc": "사용자가 프롬프트를 제출한 직후, AI에게 전달되기 전에 실행됩니다. CLAUDE_PROMPT 변수로 입력을 검증하고 exit 2로 차단할 수 있습니다.",
    "example": "if (process.env.CLAUDE_PROMPT.includes('secret')) process.exit(2);"
  },
  "PreToolUse": {
    "title": "PreToolUse — 도구 실행 직전",
    "desc": "Claude가 특정 도구(Edit, Bash 등)를 사용하기 직전에 호출됩니다. exit 2 또는 {\"decision\":\"block\"}을 통해 도구 실행을 막을 수 있습니다.",
    "example": "{\"hooks\": {\"PreToolUse\": [{\"command\": \"check-auth.sh\", \"if\": \"tool_name === 'Bash'\"}]}}"
  },
  "PostToolUse": {
    "title": "PostToolUse — 도구 실행 직후",
    "desc": "도구 실행 결과가 Claude에게 전달되기 전에 실행됩니다. CLAUDE_TOOL_RESPONSE를 가공하거나 실행 로그를 남기는 데 유용합니다.",
    "example": "echo $CLAUDE_TOOL_RESPONSE >> tool_execution.log"
  },
  "PostToolUseFailure": {
    "title": "PostToolUseFailure — 도구 실행 실패 시",
    "desc": "도구 실행 중 에러가 발생했을 때 호출됩니다. CLAUDE_ERROR 변수에 저장된 에러 메시지를 바탕으로 복구 명령을 시도할 수 있습니다.",
    "example": "if (process.env.CLAUDE_ERROR.includes('ECONNREFUSED')) restart_server();"
  },
  "PreCompact": {
    "title": "PreCompact — 컨텍스트 압축 직전",
    "desc": "대화 내용이 한도에 도달해 요약(Compaction)이 일어나기 전에 실행됩니다. 중요 데이터 손실을 방지하기 위해 exit 2로 차단할 수 있습니다.",
    "example": "// 가급적 차단하지 않는 것이 좋으나 특정 상황에서 유용\n{\"decision\":\"block\"}"
  },
  "Stop": {
    "title": "Stop — 응답 완료 시",
    "desc": "Claude가 모든 작업을 마치고 다시 입력 대기 상태가 되었을 때 실행됩니다. 작업 완료 알림을 보내거나 대화 요약을 내보낼 때 사용합니다.",
    "example": "notify-send \"Claude finished the task!\""
  },
  "StopFailure": {
    "title": "StopFailure — 비정상 종료 시",
    "desc": "API 오류나 네트워크 중단 등으로 세션이 비정상적으로 끝날 때 실행됩니다. 세션 상태를 백업하거나 자동 재시도를 구성할 수 있습니다.",
    "example": "cp .claude/sessions/last.json ./backups/"
  },
  "PermissionRequest": {
    "title": "PermissionRequest — 권한 요청 시",
    "desc": "Claude가 파일 쓰기 등의 권한을 요청해 사용자 승인 창이 뜨기 직전에 실행됩니다. 특정 명령을 자동으로 승인하도록 구성 가능합니다.",
    "example": "{\"decision\": \"allow\", \"reason\": \"safe command\"}"
  },
  "PermissionDenied": {
    "title": "PermissionDenied — 권한 거부 시",
    "desc": "사용자 또는 훅에 의해 권한 요청이 거부되었을 때 실행됩니다. 거부 로그 기록이나 대체 작업 안내를 위해 사용합니다.",
    "example": "echo \"Permission denied for $CLAUDE_TOOL_NAME\""
  },
  "Elicitation": {
    "title": "Elicitation — 추가 입력 요청 시",
    "desc": "MCP 서버가 사용자에게 추가 정보(비동기 입력 등)를 요구할 때 실행됩니다. 자동 응답 시스템 연동에 활용됩니다.",
    "example": "{\"hooks\": {\"Elicitation\": [...]}}"
  },
  "ElicitationResult": {
    "title": "ElicitationResult — 추가 입력 결과 전송 시",
    "desc": "Elicitation에 대한 사용자의 응답이 전송되기 직전에 실행됩니다. 응답 데이터를 검증하거나 수정할 수 있습니다.",
    "example": "{\"hooks\": {\"ElicitationResult\": [...]}}"
  },
  "Notification": {
    "title": "Notification — 알림 발생 시",
    "desc": "Claude Code 내부 알림(Task 완료, 업데이트 등) 발생 시 실행됩니다. 시스템 알림이나 슬랙 연동 등으로 확장할 수 있습니다.",
    "example": "echo $CLAUDE_NOTIF_DATA | jq ."
  },
  // ─── ENV VARS ───
  "CLAUDE_PROMPT": {
    "title": "CLAUDE_PROMPT",
    "desc": "UserPromptSubmit 훅에서 사용자가 입력한 현재 프롬프트 텍스트를 담고 있습니다.",
    "example": "echo \"Current prompt: $CLAUDE_PROMPT\""
  },
  "CLAUDE_TOOL_NAME": {
    "title": "CLAUDE_TOOL_NAME",
    "desc": "현재 실행 중이거나 실행하려는 도구의 이름(예: Bash, Edit, Read)입니다.",
    "example": "if [ \"$CLAUDE_TOOL_NAME\" == \"Bash\" ]; then ... fi"
  },
  "CLAUDE_TOOL_INPUT": {
    "title": "CLAUDE_TOOL_INPUT",
    "desc": "도구에 전달된 입력 파라미터(JSON 형식)입니다.",
    "example": "echo $CLAUDE_TOOL_INPUT | jq ."
  },
  "CLAUDE_TOOL_RESPONSE": {
    "title": "CLAUDE_TOOL_RESPONSE",
    "desc": "PostToolUse 훅에서 사용 가능한 도구의 실행 결과 텍스트입니다.",
    "example": "echo \"Output size: ${#CLAUDE_TOOL_RESPONSE}\""
  },
  "CLAUDE_STOP_REASON": {
    "title": "CLAUDE_STOP_REASON",
    "desc": "Stop 훅에서 제공되는 종료 이유입니다. (success, failure, error, interrupt)",
    "example": "if [ \"$CLAUDE_STOP_REASON\" == \"success\" ]; then ... fi"
  },
  "CLAUDE_ERROR": {
    "title": "CLAUDE_ERROR",
    "desc": "오류 발생 시 전달되는 상세 에러 메시지입니다.",
    "example": "echo \"Error details: $CLAUDE_ERROR\""
  },
  "CLAUDE_SESSION_ID": {
    "title": "CLAUDE_SESSION_ID",
    "desc": "현재 세션의 고유 식별자(UUID)입니다.",
    "example": "echo \"Current session: $CLAUDE_SESSION_ID\""
  },
  "CLAUDE_NOTIF_TYPE": {
    "title": "CLAUDE_NOTIF_TYPE",
    "desc": "Notification 훅에서 전달되는 알림의 종류입니다.",
    "example": "echo \"Notice type: $CLAUDE_NOTIF_TYPE\""
  },
  "CLAUDE_NOTIF_DATA": {
    "title": "CLAUDE_NOTIF_DATA",
    "desc": "Notification 훅에서 전달되는 알림의 세부 정보(JSON)입니다.",
    "example": "echo $CLAUDE_NOTIF_DATA | jq ."
  },
  "claude agents": {
    "title": "claude agents — 서브에이전트 목록",
    "desc": "현재 구성된 모든 서브에이전트의 목록과 상태를 표시합니다. 서브에이전트 구성 확인 및 디버깅 시 사용합니다.",
    "example": "claude agents"
  },
  "--teleport": {
    "title": "--teleport — 웹 세션 터미널 동기화",
    "desc": "claude.ai 웹 UI에서 진행하던 세션을 로컬 터미널로 실시간 텔레포트하여 작업을 이어갑니다. 웹의 지능과 로컬의 도구를 결합하는 가장 강력한 방법입니다.",
    "example": "claude --teleport"
  },
  "--fork-session": {
    "title": "--fork-session — 세션 분기 시작",
    "desc": "기존 세션을 재개(--resume)할 때 원본을 유지하고 새로운 세션 ID로 분기하여 시작합니다. 기존 작업 흐름을 보존하면서 새로운 시도를 할 때 유용합니다.",
    "example": "claude -r auth-refactor --fork-session"
  },
  "--maintenance": {
    "title": "--maintenance — 훅 기반 유지보수",
    "desc": "세션 시작 시 Setup 훅 중 'maintenance' 트리거가 설정된 명령만 선택적으로 실행합니다. 환경 재구성이나 정기 점검 시 사용합니다.",
    "example": "claude --maintenance"
  },
  "--tmux": {
    "title": "--tmux — Worktree 전용 세션 격리",
    "desc": "Git 워크트리 격리(-w) 사용 시, 해당 작업 전용 tmux 세션을 자동으로 생성하고 연결합니다. 터미널 환경까지 완벽하게 분리된 개발 환경을 제공합니다.",
    "example": "claude -w feature-xyz --tmux"
  },
  "/recap": {
    "title": "/recap — 작업 복귀 요약",
    "desc": "일정 시간 자리를 비웠거나 세션이 중단된 후 돌아왔을 때, 마지막으로 수행한 작업과 현재 상태를 요약하여 보고받습니다. 컨텍스트 복구에 최적회된 기능입니다.",
    "example": "/recap"
  },
  "/focus": {
    "title": "/focus — 포커스 뷰 전환",
    "desc": "TUI의 fullscreen 모드에서 대화에만 집중할 수 있도록 사이드바나 부가 정보를 숨기고 프롬프트와 트랜스크립트를 강조하는 뷰로 전환합니다.",
    "example": "/focus"
  },
  "/review [PR]": {
    "title": "/review — 로컬 코드 검토",
    "desc": "지정한 GitHub PR 번호 또는 현재 브랜치의 변경사항을 로컬 에이전트가 검토합니다. /ultrareview와 달리 로컬 Sonnet 모델이 빠르게 분석합니다.",
    "example": "/review\n/review 42"
  },
  "/ide": {
    "title": "/ide — IDE 통합 진단",
    "desc": "현재 VS Code 또는 Cursor 등 IDE와의 통신 상태와 익스텐션 활성화 여부를 점검합니다. IDE 도구 사용이 원활하지 않을 때 실행하세요.",
    "example": "/ide"
  },
  "/tui fullscreen": {
    "title": "/tui fullscreen — 전체화면 모드",
    "desc": "깜박임 없는 전체화면 TUI 렌더링으로 전환합니다. 대화 흐름을 유지하면서 더 넓은 작업 공간을 제공합니다.",
    "example": "/tui fullscreen"
  },
  "sandbox.network.deniedDomains": {
    "title": "deniedDomains — 네트워크 접근 제한",
    "desc": "특정 도메인에 대한 네트워크 접근을 명시적으로 차단합니다. 보안 강화를 위해 .claude/settings.json에서 설정합니다.",
    "example": "{\"sandbox\": {\"network\": {\"deniedDomains\": [\"example.com\"]}}}"
  },
  "Setup": {
    "title": "Setup 훅 — 프로젝트 진입 시",
    "desc": "저장소에 처음 진입(init)하거나 주기적 유지보수(maintenance) 시점에 가장 먼저 실행되는 훅입니다. 프로젝트 지침 로드나 환경 변수 검증 등에 사용됩니다.",
    "example": "{\"hooks\": {\"Setup\": [{\"command\": \"./check-env.sh\"}]}}"
  },
  "SessionEnd": {
    "title": "SessionEnd 훅 — 세션 종료 시",
    "desc": "clear, logout, exit 등으로 세션이 완전히 끝날 때 실행됩니다. 사용된 임시 워크트리 정리, 토큰 사용량 최종 집계, 분석 리포트 생성 등에 적합합니다.",
    "example": "{\"hooks\": {\"SessionEnd\": [{\"command\": \"cat cost.txt\"}]}}"
  },
  "SubagentStart / Stop": {
    "title": "Subagent 훅 — 에이전트 라이프사이클",
    "desc": "/batch나 parallel 작업 시 서브에이전트가 생성되거나 성공적으로 작업을 마쳤을 때 호출됩니다. 멀티 에이전트 작업 모니터링에 활용됩니다.",
    "example": "{\"hooks\": {\"SubagentStop\": [...]}}"
  },
  "ConfigChange": {
    "title": "ConfigChange 훅 — 설정 변경 감지",
    "desc": "settings.json이나 .mcp.json 등 주요 설정 파일의 변경이 감지되는 즉시 실행됩니다. 실시간 설정 동기화 및 검증에 사용합니다.",
    "example": "{\"hooks\": {\"ConfigChange\": [...]}}"
  },
  "FileChanged": {
    "title": "FileChanged 훅 — 파일 변경 감지",
    "desc": "프로젝트 내 특정 파일이 외부 요인(IDE 편집 등)에 의해 수정되었을 때 실행됩니다. 변경 사항을 실시간으로 분석하여 컨텍스트에 반영할 수 있습니다.",
    "example": "{\"hashMode\": \"content\", \"hooks\": [...]}"
  },
  "MAX_THINKING_TOKENS": {
    "title": "MAX_THINKING_TOKENS 환경 변수",
    "desc": "Thinking 모드 사용 시 할당할 최대 토큰 예산을 설정합니다. 0으로 설정하면 Thinking 기능이 비활성화됩니다. (기본값: 10,000)",
    "example": "export MAX_THINKING_TOKENS=20000"
  },
  "CLAUDE_CODE_DEBUG_LOGS_DIR": {
    "title": "CLAUDE_CODE_DEBUG_LOGS_DIR",
    "desc": "상세한 디버그 로그가 저장될 위치를 지정합니다. 기본적으로 /tmp 하위나 설정된 캐시 경로에 저장되나, 분석 편의를 위해 고정 경로로 지정 가능합니다.",
    "example": "export CLAUDE_CODE_DEBUG_LOGS_DIR=./logs"
  },
  "MCP_TIMEOUT": {
    "title": "MCP_TIMEOUT",
    "desc": "MCP 서버가 명령에 응답하거나 초기화될 때까지 기다리는 최대 시간(ms)입니다. 원격 서버 응답이 느릴 경우 상향 조절합니다. (기본: 5000)",
    "example": "export MCP_TIMEOUT=15000"
  },
  ".claude/commands/": {
    "title": ".claude/commands/ — 프로젝트 커스텀 명령어",
    "desc": "현재 프로젝트에서만 사용 가능한 커스텀 슬래시 명령어들을 정의합니다. 쉘 스크립트나 마크다운 지침 파일을 추가하면 /project:name 형식으로 호출 가능합니다.",
    "example": ".claude/commands/fix-bugs.md"
  },
  "~/.claude/commands/": {
    "title": "~/.claude/commands/ — 전역 커스텀 명령어",
    "desc": "모든 프로젝트에서 공통으로 사용할 수 있는 사용자 정의 슬래시 명령어를 정의합니다. 반복되는 복잡한 작업(PR 생성, 로그 분석 등)을 자동화하기 좋습니다.",
    "example": "~/.claude/commands/pr-review.sh"
  }
}
;