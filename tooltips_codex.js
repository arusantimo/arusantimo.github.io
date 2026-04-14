window.CODEX_TIPS = {
  "codex": {
    "title": "codex — 대화형 TUI 시작",
    "desc": "현재 디렉터리를 컨텍스트로 대화형 Codex CLI 세션을 시작합니다. AGENTS.md, .mcp.json, .codex/config.toml을 자동으로 로드합니다.",
    "example": "cd my-project\ncodex"
  },
  "codex exec \"prompt\"": {
    "title": "codex exec — 헤드리스 태스크 실행",
    "desc": "대화형 TUI 없이 단일 태스크를 실행하고 결과를 출력합니다. CI/CD 파이프라인, 스크립트 에서 사용합니다.",
    "example": "codex exec \"auth.ts의 버그를 찾아 수정해\"\ncodex exec \"README를 한국어로 번역해\""
  },
  "codex exec resume --last": {
    "title": "codex exec resume --last — 마지막 태스크 재실행",
    "desc": "마지막으로 실행한 codex exec 태스크를 재개합니다. 이전 롤백이나 실패 후 중단된 지점에서 계속합니다.",
    "example": "codex exec resume --last"
  },
  "codex resume --last": {
    "title": "codex resume --last — 마지막 대화 재개",
    "desc": "가장 최근 대화형 세션을 재개합니다. 세션 ID 없이 직전 세션으로 돌아갑니다.",
    "example": "codex resume --last"
  },
  "codex fork --last": {
    "title": "codex fork --last — 마지막 세션 포크",
    "desc": "마지막 세션의 상태를 유지하면서 새 분기 세션을 시작합니다. 원본 세션을 변경하지 않고 다른 방향으로 실험합니다.",
    "example": "codex fork --last"
  },
  "codex apply TASK_ID": {
    "title": "codex apply — 클라우드 결과 적용",
    "desc": "codex cloud exec 또는 codex exec --async에서 생성된 태스크 결과를 로컬 워크스페이스에 적용합니다.",
    "example": "codex apply task_abc123"
  },
  "codex cloud list --json": {
    "title": "codex cloud list — 클라우드 태스크 목록",
    "desc": "클라우드에서 실행 중이거나 완료된 태스크 목록을 표시합니다. --json 옵션으로 JSON 형식으로 출력합니다.",
    "example": "codex cloud list\ncodex cloud list --json"
  },
  "codex mcp list": {
    "title": "codex mcp list — MCP 서버 목록",
    "desc": "설정된 모든 MCP 서버와 상태를 표시합니다. 서버 이름, 연결 방식, 도구 수를 확인합니다.",
    "example": "codex mcp list"
  },
  "codex features list": {
    "title": "codex features list — 기능 플래그 목록",
    "desc": "현재 설정된 실험적 기능 플래그 상태를 표시합니다. fast_mode, multi_agent 등 개별 기능의 활성화 여부를 확인합니다.",
    "example": "codex features list"
  },
  "codex completion powershell": {
    "title": "codex completion powershell — 자동완성 스크립트",
    "desc": "PowerShell 자동완성 스크립트를 출력합니다. 프로필에 추가하면 codex 명령어 자동완성이 활성화됩니다.",
    "example": "codex completion powershell >> $PROFILE"
  },
  "--model": {
    "title": "--model — 모델 지정",
    "desc": "사용할 GPT 모델을 지정합니다. gpt-5.4, gpt-5.4-mini, gpt-5.3-codex-spark 등을 지원합니다.",
    "example": "codex --model gpt-5.4 exec \"분석해\"\ncodex --model gpt-5.4-mini"
  },
  "--sandbox": {
    "title": "--sandbox — 샌드박스 모드",
    "desc": "파일 시스템 접근 제한 수준을 설정합니다. read-only(읽기 전용), workspace-write(작업공간 쓰기 가능). 기본값은 workspace-write입니다.",
    "example": "codex --sandbox read-only\ncodex --sandbox workspace-write"
  },
  "--ask-for-approval": {
    "title": "--ask-for-approval — 승인 정책",
    "desc": "파일 변경·명령 실행 시 승인을 요청하는 정책을 설정합니다. on-request: 각 작업마다, untrusted: 비신뢰 작업만.",
    "example": "codex -a on-request\ncodex --ask-for-approval untrusted"
  },
  "--full-auto": {
    "title": "--full-auto — 완전 자동 모드",
    "desc": "모든 작업에서 승인 없이 자동 실행합니다. --sandbox workspace-write --ask-for-approval never의 단축 플래그입니다. ⚠️ 자동화 환경에서만 사용.",
    "example": "codex --full-auto exec \"리팩토링 진행\""
  },
  "--yolo": {
    "title": "--yolo — 무제한 자동 모드 ⚠️",
    "desc": "모든 승인을 생략하고 최대 권한으로 실행합니다. --full-auto와 동일합니다. 신뢰할 수 있는 환경에서만 사용하세요.",
    "example": "codex --yolo exec \"테스트 자동 수정\""
  },
  "--search": {
    "title": "--search — 웹 검색 활성화",
    "desc": "Codex가 태스크 중 웹 검색 도구를 사용할 수 있도록 허용합니다. 최신 API 문서, 라이브러리 정보 조회 시 유용합니다.",
    "example": "codex --search exec \"최신 React 패턴 적용\""
  },
  "--add-dir": {
    "title": "--add-dir — 추가 디렉터리 접근",
    "desc": "기본 작업 디렉터리 외에 읽기/쓰기 접근을 허용할 디렉터리를 추가합니다. 여러 번 반복 사용 가능합니다.",
    "example": "codex --add-dir ../shared exec \"공유 라이브러리 수정\""
  },
  "-c key=value": {
    "title": "-c — 설정 값 런타임 재정의",
    "desc": "실행 시 config.toml 설정을 임시로 재정의합니다. key=value 형식으로 지정합니다.",
    "example": "codex -c model=gpt-5.4-mini exec \"빠른 분석\"\ncodex -c approval_policy=never"
  },
  "codex exec -": {
    "title": "codex exec - — stdin 입력",
    "desc": "프롬프트를 stdin에서 읽어 태스크를 실행합니다. 파이프를 통해 다른 명령의 출력을 프롬프트로 전달합니다.",
    "example": "echo \"이 코드를 리팩토링해\" | codex exec -\ncat prompt.txt | codex exec -"
  },
  "cat spec.md | codex exec \"Implement this\"": {
    "title": "파이프 입력 — 명세서로 구현",
    "desc": "GitHub 이슈, 설계 문서를 파이프로 전달해 구현을 요청합니다. 긴 명세서를 stdin으로 안전하게 전달합니다.",
    "example": "cat spec.md | codex exec \"Implement this\"\ngh issue view 42 --json body | codex exec \"Fix this issue\""
  },
  "--json": {
    "title": "--json — 구조화 JSON 출력",
    "desc": "codex exec 결과를 JSON 형식으로 출력합니다. 스크립트에서 결과를 파싱할 때 사용합니다.",
    "example": "codex exec --json \"분석 결과를 JSON으로\"\ncodex exec --json --output-schema schema.json \"구조화 분석\""
  },
  "--output-last-message out.txt": {
    "title": "--output-last-message — 마지막 응답 파일 저장",
    "desc": "codex exec의 마지막 응답 메시지를 파일로 저장합니다. 자동화 파이프라인에서 결과를 파일로 수집할 때 사용합니다.",
    "example": "codex exec --output-last-message result.txt \"분석해\""
  },
  "--output-schema schema.json": {
    "title": "--output-schema — 출력 JSON 스키마 지정",
    "desc": "응답 형식을 JSON Schema 파일로 강제합니다. --json 또는 --output-format json과 함께 사용합니다.",
    "example": "codex exec --json --output-schema schema.json \"분석해\""
  },
  "--skip-git-repo-check": {
    "title": "--skip-git-repo-check — Git 저장소 검사 생략",
    "desc": "Git 저장소가 아닌 디렉터리에서 코드 편집 시 경고를 생략합니다. 프로토타입, 임시 작업 디렉터리에서 사용합니다.",
    "example": "cd /tmp/temp-work\ncodex exec --skip-git-repo-check \"작업 진행\""
  },
  "--ephemeral": {
    "title": "--ephemeral — 임시 태스크",
    "desc": "태스크 결과를 저장하지 않는 임시 모드로 실행합니다. 기록이나 resume이 필요 없는 단순 쿼리에 사용합니다.",
    "example": "codex exec --ephemeral \"빠른 질문 답변\""
  },
  "codex mcp add name -- url": {
    "title": "codex mcp add — MCP 서버 추가",
    "desc": "새 MCP 서버를 설정에 추가합니다. 이름과 URL(또는 커맨드)을 지정합니다.",
    "example": "codex mcp add my-server -- https://my-server.com/mcp\ncodex mcp add local-db -- node ./mcp-server.js"
  },
  "codex mcp login name": {
    "title": "codex mcp login — MCP OAuth 인증",
    "desc": "MCP 서버에 OAuth 방식으로 인증합니다. 브라우저를 열어 인증을 완료하고 토큰을 저장합니다.",
    "example": "codex mcp login github-mcp"
  },
  "codex mcp-server": {
    "title": "codex mcp-server — Codex를 MCP 서버로 실행",
    "desc": "Codex CLI 자체를 MCP 서버로 실행합니다. 다른 MCP 클라이언트에서 Codex를 도구로 연결할 수 있습니다.",
    "example": "codex mcp-server\ncodex mcp-server --stdio"
  },
  "codex cloud exec --env ENV_ID": {
    "title": "codex cloud exec — 클라우드 환경에서 실행",
    "desc": "비동기적으로 클라우드 환경에서 태스크를 실행합니다. --env 로 환경 ID(개인/팀 클라우드 리소스)를 지정합니다.",
    "example": "codex cloud exec --env prod-env \"배포 검증해\"\ncodex cloud exec --env my-sandbox"
  },
  "codex app": {
    "title": "codex app — Codex App 열기",
    "desc": "Codex 데스크탑 앱을 열거나 웹 앱으로 이동합니다. 터미널 외부에서 Codex를 사용할 수 있습니다.",
    "example": "codex app"
  },
  "/clear": {
    "title": "/clear — 대화 초기화",
    "desc": "현재 대화 컨텍스트를 초기화합니다. 새 작업을 시작하거나 컨텍스트가 너무 길어졌을 때 사용합니다.",
    "example": "/clear"
  },
  "/new": {
    "title": "/new — 새 태스크 시작",
    "desc": "현재 대화를 닫고 완전히 새로운 태스크를 시작합니다. /clear와 달리 별도 세션으로 기록됩니다.",
    "example": "/new"
  },
  "/resume": {
    "title": "/resume — 이전 세션 재개",
    "desc": "저장된 이전 세션 목록을 표시하고 선택한 세션으로 전환합니다.",
    "example": "/resume"
  },
  "/fork": {
    "title": "/fork — 세션 포크",
    "desc": "현재 세션 상태를 유지하며 새 분기 세션을 만듭니다. 원본 세션을 보존하면서 다른 접근법을 시험합니다.",
    "example": "/fork"
  },
  "/compact": {
    "title": "/compact — 컨텍스트 압축",
    "desc": "긴 대화를 AI 기반으로 요약해 컨텍스트 토큰을 절약합니다. 자동 압축은 one AI 기반 요약을 수행합니다.",
    "example": "/compact"
  },
  "/copy": {
    "title": "/copy — 응답 복사",
    "desc": "마지막 응답 또는 특정 번호의 응답을 클립보드에 복사합니다. 코드 블록이 있으면 선택 피커를 표시합니다.",
    "example": "/copy\n/copy 2"
  },
  "/status": {
    "title": "/status — 현재 세션 상태",
    "desc": "토큰 사용량, 비용, 모델, 권한 정책, 실행 시간 등 세션의 현재 상태를 표시합니다.",
    "example": "/status"
  },
  "/debug-config": {
    "title": "/debug-config — 설정 상태 진단",
    "desc": "로드된 설정 파일, MCP 서버 상태, 플러그인, 기능 플래그 등 현재 config 상태를 상세 출력합니다.",
    "example": "/debug-config"
  },
  "/plan": {
    "title": "/plan — 플랜 모드",
    "desc": "실행 전 계획을 수립하는 플랜 모드를 활성화합니다. Codex가 코드를 변경하기 전에 단계별 계획을 제시하고 승인을 받습니다.",
    "example": "/plan\n/plan auth 시스템 리팩토링"
  },
  "/diff": {
    "title": "/diff — 변경사항 Diff 뷰",
    "desc": "이 세션에서 수정된 파일들의 Diff를 표시합니다. 변경사항을 검토하고 선택적으로 수락 또는 되돌립니다.",
    "example": "/diff"
  },
  "/review": {
    "title": "/review — 코드 리뷰",
    "desc": "현재 세션의 변경사항 또는 현재 브랜치를 코드 리뷰합니다. 버그, 보안, 스타일 이슈를 리포트합니다.",
    "example": "/review"
  },
  "/mention": {
    "title": "/mention — @ 멘션 자동완성",
    "desc": "@ 으로 시작해 에이전트, 파일, MCP 리소스를 타입어헤드로 멘션합니다.",
    "example": "/mention\n@agent-name\n@filepath"
  },
  "/agent": {
    "title": "/agent — 에이전트 지정 실행",
    "desc": "태스크를 특정 에이전트에게 위임합니다. 에이전트 이름 또는 타입어헤드 선택으로 지정합니다.",
    "example": "/agent Explore 코드베이스 분석해줘"
  },
  "/ps": {
    "title": "/ps — 실행 중인 프로세스",
    "desc": "백그라운드에서 실행 중인 서브에이전트 및 프로세스 목록을 표시합니다.",
    "example": "/ps"
  },
  "/mcp": {
    "title": "/mcp — MCP 서버 관리",
    "desc": "MCP 서버 목록을 확인하고 연결·해제·OAuth 인증을 관리합니다.",
    "example": "/mcp"
  },
  "/apps": {
    "title": "/apps — 연결된 앱 관리",
    "desc": ".app.json으로 등록된 앱 목록을 보고 연결·해제합니다. 플러그인 에코시스템의 앱 통합을 관리합니다.",
    "example": "/apps"
  },
  "/model": {
    "title": "/model — 모델 전환",
    "desc": "현재 세션에서 사용할 GPT 모델을 변경합니다. 목록에서 선택하거나 직접 모델 ID를 입력합니다.",
    "example": "/model\n/model gpt-5.4-mini"
  },
  "/fast": {
    "title": "/fast — 빠른 모드 전환",
    "desc": "fast_mode를 토글합니다. Fast mode는 경량 모델/추론 경로를 사용해 응답 속도를 높입니다.",
    "example": "/fast\n/fast on\n/fast off"
  },
  "/permissions": {
    "title": "/permissions — 권한 규칙 관리",
    "desc": "현재 세션의 허용·거부 규칙을 확인하고 관리합니다. 최근 자동 거부된 명령도 확인할 수 있습니다.",
    "example": "/permissions"
  },
  "/personality": {
    "title": "/personality — 어시스턴트 성격 설정",
    "desc": "Codex CLI의 응답 스타일과 성격을 변경합니다. friendly, professional, concise 등 프리셋을 선택합니다.",
    "example": "/personality\n/personality friendly"
  },
  "/experimental": {
    "title": "/experimental — 실험적 기능 토글",
    "desc": "실험적 기능들의 활성화 상태를 보고 변경합니다. [features] 섹션의 플래그를 인터랙티브로 관리합니다.",
    "example": "/experimental"
  },
  "/statusline": {
    "title": "/statusline — 상태 줄 표시",
    "desc": "TUI 하단 상태 줄에 표시되는 정보를 커스터마이징합니다. 모델, 토큰, 권한 정책 등을 표시할 수 있습니다.",
    "example": "/statusline"
  },
  "/logout": {
    "title": "/logout — 인증 해제",
    "desc": "현재 인증 세션을 종료하고 저장된 토큰을 삭제합니다. 다른 계정으로 전환하거나 보안을 위해 사용합니다.",
    "example": "/logout"
  },
  "--sandbox read-only -a on-request": {
    "title": "샌드박스 + 승인 조합: 최대 안전",
    "desc": "파일 시스템을 읽기 전용으로 제한하고, 모든 작업에서 승인을 요청합니다. 신뢰할 수 없는 코드베이스나 첫 실행 시 권장합니다.",
    "example": "codex --sandbox read-only -a on-request"
  },
  "--sandbox workspace-write -a untrusted": {
    "title": "샌드박스 + 승인 조합: 표준 안전",
    "desc": "작업 공간 내 파일 수정은 허용하고, 비신뢰 명령(curl, wget 등)만 승인을 요청합니다. 일반적인 개발 작업에 권장합니다.",
    "example": "codex --sandbox workspace-write -a untrusted"
  },
  "~/.codex/config.toml": {
    "title": "~/.codex/config.toml — 사용자 전역 설정",
    "desc": "사용자 홈 디렉터리의 Codex 전역 설정 파일입니다. 모델, 승인 정책, 샌드박스 모드, 개인화 설정을 저장합니다.",
    "example": "# ~/.codex/config.toml\nmodel = \"gpt-5.4\"\napproval_policy = \"on-request\""
  },
  ".codex/config.toml": {
    "title": ".codex/config.toml — 프로젝트 설정",
    "desc": "프로젝트 루트의 Codex 설정 파일입니다. 프로젝트별 모델, 샌드박스, 권한 정책을 오버라이드합니다. Git에 커밋해 팀과 공유합니다.",
    "example": "# 프로젝트별 설정\nmodel = \"gpt-5.4-mini\"\nsandbox_mode = \"workspace-write\""
  },
  "~/.codex/auth.json": {
    "title": "~/.codex/auth.json — 인증 토큰",
    "desc": "로그인 후 저장되는 인증 토큰 파일입니다. 직접 편집하지 마세요. codex login / codex logout으로 관리합니다.",
    "example": "# codex login 으로 자동 생성됨"
  },
  "AGENTS.md": {
    "title": "AGENTS.md — AI 에이전트 설명서",
    "desc": "프로젝트 루트에 위치하며 AI 에이전트(Codex, Claude 등)가 읽을 수 있는 설명서입니다. 빌드 명령, 코딩 규칙, 아키텍처를 기록합니다.",
    "example": "# AGENTS.md\n## Build\nnpm run build\n\n## Coding Style\n- TypeScript strict mode"
  },
  "~/.codex/skills": {
    "title": "~/.codex/skills — 사용자 전역 스킬",
    "desc": "모든 프로젝트에서 사용 가능한 사용자 전역 Codex 스킬을 저장합니다.",
    "example": "~/.codex/skills/my-skill/SKILL.md"
  },
  ".codex/skills": {
    "title": ".codex/skills — 프로젝트 스킬",
    "desc": "현재 프로젝트에서만 사용하는 커스텀 Codex 스킬을 저장합니다. Git 커밋으로 팀과 공유할 수 있습니다.",
    "example": ".codex/skills/deploy-check/SKILL.md"
  },
  "model = \"gpt-5.4\"": {
    "title": "model — 기본 모델 설정",
    "desc": "config.toml에서 기본으로 사용할 GPT 모델을 지정합니다. codex exec 및 대화 세션 모두에서 사용됩니다.",
    "example": "model = \"gpt-5.4\"\n# 또는\nmodel = \"gpt-5.4-mini\""
  },
  "approval_policy = \"on-request\"": {
    "title": "approval_policy — 승인 정책",
    "desc": "파일 변경이나 명령 실행 시 언제 승인을 요청할지 설정합니다. on-request(매번), untrusted(비신뢰만), never(없음).",
    "example": "approval_policy = \"on-request\"  # 안전\napproval_policy = \"untrusted\"   # 보통\napproval_policy = \"never\"       # 자동화"
  },
  "sandbox_mode = \"workspace-write\"": {
    "title": "sandbox_mode — 샌드박스 모드",
    "desc": "파일 시스템 접근 제한을 설정합니다. read-only: 읽기만, workspace-write: 작업공간 쓰기 가능, none: 제한 없음.",
    "example": "sandbox_mode = \"workspace-write\"  # 기본값\nsandbox_mode = \"read-only\"        # 안전"
  },
  "model_reasoning_effort = \"high\"": {
    "title": "model_reasoning_effort — 추론 노력 수준",
    "desc": "모델의 추론 예산(effort)을 설정합니다. low, medium, high, max 중 선택합니다. 높을수록 느리지만 정확합니다.",
    "example": "model_reasoning_effort = \"high\"\nmodel_reasoning_effort = \"low\"  # 빠른 작업"
  },
  "personality = \"friendly\"": {
    "title": "personality — 어시스턴트 성격",
    "desc": "Codex CLI의 기본 응답 스타일을 설정합니다. friendly(친근), professional(전문적), concise(간결) 등.",
    "example": "personality = \"friendly\"\npersonality = \"concise\""
  },
  "log_dir = \"./.codex-log\"": {
    "title": "log_dir — 로그 디렉터리",
    "desc": "세션 로그와 태스크 기록을 저장하는 디렉터리를 지정합니다. 기본값은 ~/.codex/logs 입니다.",
    "example": "log_dir = \"./.codex-log\"  # 프로젝트 내\nlog_dir = \"/var/log/codex\"  # 시스템 로그"
  },
  "cli_auth_credentials_store = \"keyring\"": {
    "title": "cli_auth_credentials_store — 인증 저장소",
    "desc": "인증 토큰을 저장하는 방법을 지정합니다. keyring: OS 키체인(권장), file: 파일로 저장.",
    "example": "cli_auth_credentials_store = \"keyring\"  # 기본값\ncli_auth_credentials_store = \"file\"     # 서버 환경"
  },
  "[features]": {
    "title": "[features] — 실험적 기능 섹션",
    "desc": "config.toml의 features 섹션입니다. 실험적 기능들의 활성화 여부를 true/false로 제어합니다.",
    "example": "[features]\nfast_mode = true\nmulti_agent = true"
  },
  "fast_mode = true": {
    "title": "fast_mode — 빠른 응답 모드",
    "desc": "경량 추론 경로를 사용해 응답 속도를 높입니다. 단순 작업, 빠른 확인이 필요할 때 활성화합니다.",
    "example": "[features]\nfast_mode = true"
  },
  "multi_agent = true": {
    "title": "multi_agent — 멀티 에이전트 실험",
    "desc": "여러 에이전트가 병렬로 협력해 복잡한 태스크를 처리하는 실험적 기능입니다.",
    "example": "[features]\nmulti_agent = true"
  },
  "shell_snapshot = true": {
    "title": "shell_snapshot — 셸 스냅샷",
    "desc": "실험적 셸 스냅샷 기능을 활성화합니다. 샌드박스 격리를 더 효율적으로 처리합니다.",
    "example": "[features]\nshell_snapshot = true"
  },
  "smart_approvals = false": {
    "title": "smart_approvals — 스마트 승인 비활성",
    "desc": "AI가 위험도를 평가해 안전한 명령을 자동 승인하는 실험적 기능입니다. false로 비활성화합니다.",
    "example": "[features]\nsmart_approvals = false"
  },
  "codex_hooks = false": {
    "title": "codex_hooks — 훅 실험 기능",
    "desc": "세션 이벤트(시작, 완료, 오류)에 반응하는 훅 기능을 활성화합니다. 실험 기능이므로 기본값은 false입니다.",
    "example": "[features]\ncodex_hooks = true"
  },
  ".codex-plugin/plugin.json": {
    "title": "plugin.json — 플러그인 정의 파일",
    "desc": "플러그인의 메타데이터, 스킬 경로, MCP 서버, 앱 설정을 정의합니다. 플러그인 루트에 위치해야 합니다.",
    "example": "{\n  \"name\": \"my-plugin\",\n  \"version\": \"1.0.0\",\n  \"skills\": [\"skills/\"]\n}"
  },
  "skills/": {
    "title": "skills/ — 플러그인 스킬 디렉터리",
    "desc": "플러그인 내 스킬을 모아두는 디렉터리입니다. 각 하위 폴더가 별도 스킬로 동작합니다.",
    "example": "skills/\n  my-skill/\n    SKILL.md"
  },
  ".mcp.json": {
    "title": ".mcp.json — 프로젝트 MCP 서버 설정",
    "desc": "프로젝트 루트에 위치하며 팀 공유용 MCP 서버를 정의합니다. Git 커밋으로 팀 전체에 적용됩니다.",
    "example": "{\n  \"mcpServers\": {\n    \"db\": {\n      \"command\": \"node\",\n      \"args\": [\"./mcp-db.js\"]\n    }\n  }\n}"
  },
  ".app.json": {
    "title": ".app.json — 앱 플러그인 정의",
    "desc": "플러그인이 외부 웹 앱·API와 통합할 때 사용하는 앱 정의 파일입니다. OAuth, API 엔드포인트, 권한을 정의합니다.",
    "example": "{\n  \"name\": \"my-app\",\n  \"auth\": \"oauth2\",\n  \"baseUrl\": \"https://api.example.com\"\n}"
  },
  "~/.agents/plugins/marketplace.json": {
    "title": "~/.agents/plugins/marketplace.json — 마켓플레이스 캐시",
    "desc": "플러그인 마켓플레이스의 목록 캐시 파일입니다. codex plugin list 또는 codex plugin install 시 사용합니다.",
    "example": "# 자동 관리됨, 직접 편집 불필요"
  },
  "~/.codex/plugins/": {
    "title": "~/.codex/plugins/ — 설치된 플러그인",
    "desc": "전역으로 설치된 Codex 플러그인을 저장합니다. codex plugin install로 추가한 플러그인이 여기에 위치합니다.",
    "example": "~/.codex/plugins/my-plugin/"
  },
  ".agents/plugins/marketplace.json": {
    "title": ".agents/plugins/marketplace.json — 프로젝트 마켓플레이스",
    "desc": "프로젝트 수준의 플러그인 마켓플레이스 설정입니다. 프로젝트 팀이 사용할 플러그인 소스를 정의합니다.",
    "example": "{\n  \"sources\": [\"https://plugins.my-company.com\"]\n}"
  },
  "./plugins/": {
    "title": "./plugins/ — 로컬 플러그인 디렉터리",
    "desc": "현재 프로젝트에만 적용되는 로컬 플러그인 디렉터리입니다. 팀 공유 플러그인을 Git 리포지토리에 포함할 때 사용합니다.",
    "example": "./plugins/\n  team-plugin/\n    .codex-plugin/plugin.json"
  },
  "[windows]": {
    "title": "[windows] — Windows 전용 설정",
    "desc": "config.toml의 Windows 전용 설정 섹션입니다. sandbox 격리 수준을 Windows 환경에 맞게 설정합니다.",
    "example": "[windows]\nsandbox = \"elevated\""
  },
  "sandbox = \"elevated\"": {
    "title": "sandbox = \"elevated\" — 높은 권한 샌드박스",
    "desc": "Windows에서 높은 권한(관리자 수준)의 샌드박스로 실행합니다. 시스템 파일 접근이 필요한 작업에 사용합니다.",
    "example": "[windows]\nsandbox = \"elevated\""
  },
  "sandbox = \"unelevated\"": {
    "title": "sandbox = \"unelevated\" — 일반 권한 샌드박스",
    "desc": "Windows에서 일반 사용자 권한의 샌드박스로 실행합니다. 기본값이며 가장 안전합니다.",
    "example": "[windows]\nsandbox = \"unelevated\""
  },
  "/sandbox-add-read-dir C:\\path": {
    "title": "/sandbox-add-read-dir — 샌드박스 읽기 경로 추가",
    "desc": "샌드박스 모드에서 추가로 읽기 접근을 허용할 Windows 경로를 지정합니다. UNC 경로도 지원합니다.",
    "example": "codex --sandbox-add-read-dir C:\\SharedData exec \"분석해\""
  },
  "wsl --install": {
    "title": "wsl --install — WSL 설치",
    "desc": "Windows Subsystem for Linux를 설치합니다. Windows에서 Linux 기반 Codex 기능을 사용하기 위한 전제 조건입니다.",
    "example": "# 관리자 PowerShell에서\nwsl --install"
  },
  "code .": {
    "title": "code . — VS Code 열기",
    "desc": "WSL 터미널에서 현재 디렉터리를 VS Code로 엽니다. VS Code가 WSL 원격 환경에서 자동으로 실행됩니다.",
    "example": "# WSL 터미널에서\ncd my-project && code ."
  },
  "npm i -g @openai/codex": {
    "title": "npm i -g @openai/codex — Codex CLI 설치 (npm)",
    "desc": "npm으로 Codex CLI를 전역 설치합니다. WSL 환경에서도 동일한 명령을 사용합니다.",
    "example": "npm i -g @openai/codex\n# 특정 버전\nnpm i -g @openai/codex@0.121.0"
  },
  "chatgpt.runCodexInWindowsSubsystemForLinux": {
    "title": "chatgpt.runCodexInWindowsSubsystemForLinux — VS Code WSL 설정",
    "desc": "VS Code 설정에서 Codex를 WSL 환경에서 실행하도록 지정합니다. Windows 환경에서 Linux 호환 기능을 활용합니다.",
    "example": "# VS Code settings.json\n{\n  \"chatgpt.runCodexInWindowsSubsystemForLinux\": true\n}"
  },
  "gpt-5.4": {
    "title": "gpt-5.4 — 플래그십 모델",
    "desc": "OpenAI의 최신 플래그십 GPT 모델입니다. 가장 강력한 추론과 코딩 능력을 제공합니다. 복잡한 태스크에 권장합니다.",
    "example": "codex --model gpt-5.4\nmodel = \"gpt-5.4\"  # config.toml"
  },
  "gpt-5.4-mini": {
    "title": "gpt-5.4-mini — 경량·빠른 모델",
    "desc": "빠른 응답과 낮은 비용을 위한 경량 모델입니다. 간단한 확인, 빠른 수정, 반복 작업에 적합합니다.",
    "example": "codex --model gpt-5.4-mini\ncodex -c model=gpt-5.4-mini exec \"빠른 수정\""
  },
  "gpt-5.3-codex-spark": {
    "title": "gpt-5.3-codex-spark — 코딩 특화 모델",
    "desc": "코딩·개발에 특화된 Codex Spark 모델입니다. 코드 생성, 리팩토링, 디버깅에 최적화되어 있습니다.",
    "example": "codex --model gpt-5.3-codex-spark exec \"함수 구현해\""
  },
  "codex --model gpt-5.4-mini": {
    "title": "codex --model — 세션 모델 지정",
    "desc": "특정 모델로 Codex를 실행합니다. 세션 전체에 해당 모델이 적용됩니다.",
    "example": "codex --model gpt-5.4-mini \"빠른 작업\"\ncodex --model gpt-5.4 \"복잡한 분석\""
  },
  "/fast on": {
    "title": "/fast on — 빠른 모드 켜기",
    "desc": "Fast mode를 활성화해 경량 추론 경로로 전환합니다. 응답이 빨라지지만 최대 능력은 감소합니다.",
    "example": "/fast on"
  },
  "/fast status": {
    "title": "/fast status — Fast mode 상태 확인",
    "desc": "현재 fast mode의 활성화 여부를 확인합니다.",
    "example": "/fast status"
  },
  "codex cloud exec --attempts 3": {
    "title": "--attempts — 재시도 횟수",
    "desc": "클라우드 태스크 실패 시 자동 재시도 횟수를 지정합니다. 네트워크 오류나 일시적 실패에 대한 안정성을 높입니다.",
    "example": "codex cloud exec --attempts 3 \"배포 검증\""
  },
  "brew install --cask codex": {
    "title": "brew install --cask codex — macOS 앱 설치",
    "desc": "Homebrew Cask로 Codex 데스크탑 앱을 macOS에 설치합니다. CLI와 별도의 GUI 앱입니다. (Windows에서는 해당 없음)",
    "example": "brew install --cask codex"
  },
  "npm i -g @openai/codex@latest": {
    "title": "npm i -g @openai/codex@latest — 최신 버전 업데이트",
    "desc": "Codex CLI를 최신 버전으로 업데이트합니다. @latest 태그로 항상 최신 stable 버전을 설치합니다.",
    "example": "npm i -g @openai/codex@latest"
  },
  "codex login": {
    "title": "codex login — ChatGPT 계정 로그인",
    "desc": "브라우저를 열어 ChatGPT/OpenAI 계정으로 OAuth 인증합니다. Plus, Pro 사용자는 추가 모델에 접근할 수 있습니다.",
    "example": "codex login"
  },
  "codex login --device-auth": {
    "title": "codex login --device-auth — 디바이스 코드 인증",
    "desc": "브라우저를 띄울 수 없는 환경(서버, WSL)에서 디바이스 코드 방식으로 인증합니다. 코드를 복사해 다른 기기에서 인증합니다.",
    "example": "codex login --device-auth"
  },
  "printenv OPENAI_API_KEY | codex login --with-api-key": {
    "title": "codex login --with-api-key — API 키로 로그인",
    "desc": "ChatGPT 계정이 아닌 OpenAI API 키로 인증합니다. CI/CD, 서버 환경에서 키 기반 인증에 사용합니다.",
    "example": "printenv OPENAI_API_KEY | codex login --with-api-key\n# 또는\necho $OPENAI_API_KEY | codex login --with-api-key"
  },
  "codex login status": {
    "title": "codex login status — 로그인 상태 확인",
    "desc": "현재 인증 상태, 연결된 계정, 만료 시간 등을 확인합니다.",
    "example": "codex login status"
  },
  "[sandbox_workspace_write]": {
    "title": "[sandbox_workspace_write] — 샌드박스 세부 설정",
    "desc": "workspace-write 샌드박스 모드에서 웹 검색 접근 등의 세부 권한을 설정합니다.",
    "example": "[sandbox_workspace_write]\nweb_search = \"cached\""
  },
  "web_search = \"cached\"": {
    "title": "web_search = \"cached\" — 캐시된 웹 검색",
    "desc": "샌드박스 모드에서 웹 검색을 캐시된 결과로 허용합니다. 실시간 인터넷 접근 없이 검색 기능을 제공합니다.",
    "example": "[sandbox_workspace_write]\nweb_search = \"cached\""
  },
  "web_search = \"live\"": {
    "title": "web_search = \"live\" — 실시간 웹 검색",
    "desc": "샌드박스 모드에서 실시간 웹 검색을 허용합니다. 최신 정보가 필요하지만 네트워크 접근이 허용된 환경에서 사용합니다.",
    "example": "[sandbox_workspace_write]\nweb_search = \"live\""
  }
}
;