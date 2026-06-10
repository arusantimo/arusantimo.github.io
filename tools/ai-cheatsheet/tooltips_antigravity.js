window.ANTIGRAVITY_TIPS = {
  "/permissions": {
    "title": "/permissions — 보안 승인 규칙 관리",
    "desc": "CLI 환경 내에서 직접 보안 승인 규칙을 편집하거나 삭제할 수 있도록 지원하는 명령어입니다.",
    "example": "/permissions"
  },
  "models": {
    "title": "models — 사용 가능 모델 조회 및 설정",
    "desc": "Antigravity CLI에서 사용 가능한 AI 모델 목록을 조회하고, --model 옵션을 통해 기동 시 특정 모델을 강제로 지정할 수 있습니다.",
    "example": "agy models\nagy --model gemini-1.5-pro"
  },
  "path_autocomplete": {
    "title": "path_autocomplete — 경로 자동완성",
    "desc": "/open 및 /add-dir 명령어 등을 사용할 때 셸 스타일의 파일 시스템 경로 자동완성(Tab 자동완성) 기능을 제공합니다.",
    "example": ""
  },
  "fuzzy_matching": {
    "title": "fuzzy_matching — 슬래시 커맨드 자동완성 및 퍼지 검색",
    "desc": "슬래시 커맨드 입력 시 퍼지(Fuzzy) 매칭 및 부분 문자열 매칭을 통해 명령어 자동 추천 및 자가 제안을 지원합니다.",
    "example": ""
  },
  "/mcp discover": {
    "title": "/mcp discover — 자동 탐지",
    "desc": "로컬 시스템에서 사용 가능한 MCP 서버를 자동으로 탐지하고 제안합니다.",
    "example": "/mcp discover"
  },
  "/goal": {
    "title": "자율 턴 자동화 동작 (/goal)",
    "desc": "사용자의 매번 승인하는 수동 대기 과정 없이, 에이전트가 완료 조건이 충족될 때까지 연속으로 자율 탐색 및 실행을 지속합니다.",
    "example": "/goal 'npm 테스트 패스할 때까지 에러 수정'"
  },
  "/grill-me": {
    "title": "인터랙티브 기획 인터뷰 (/grill-me)",
    "desc": "구체적인 아키텍처 구현 전에 사용자가 지닌 의도나 설계를 분석하기 위해 에이전트가 사용자에게 직접 역질문을 수행하게 합니다.",
    "example": "/grill-me"
  },
  "/plan": {
    "title": "계획 수립 모드 전환 (/plan)",
    "desc": "작업 수행 단계 이전에 상세한 구현 계획(implementation plan)을 작성하고 사용자 검토를 요청하는 단계로 전환합니다.",
    "example": "/plan"
  },
  "/browser": {
    "title": "웹 브라우저 자동화 토글 (/browser)",
    "desc": "에이전트가 헤드리스 크롬(Chrome) 등을 띄워 웹 사이트 크롤링이나 웹 앱의 프론트엔드 UI 검증을 수행할 수 있도록 설정합니다.",
    "example": "/browser"
  }
};
