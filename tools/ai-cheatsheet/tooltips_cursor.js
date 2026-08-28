window.CURSOR_TIPS = {
  "agent": {
    "title": "agent — 터미널 대화형 코딩 에이전트",
    "desc": "터미널에서 직접 실행할 수 있는 독립형 대화형 코딩 에이전트 CLI입니다.",
    "example": "agent"
  },
  "agent --mode=plan": {
    "title": "agent --mode=plan — 플랜 모드 실행",
    "desc": "코드 수정 전 구현 계획을 먼저 작성하고 사용자 승인을 받은 후 실행합니다.",
    "example": "agent --mode=plan"
  },
  "& prompt": {
    "title": "& prompt — Cloud Agent 백그라운드 위임",
    "desc": "현재 프롬프트나 대화를 Cloud Agent로 넘겨 클라우드 환경에서 백그라운드로 실행합니다.",
    "example": "& test suite 통과하도록 수정해줘"
  },
  "/side": {
    "title": "/side — 병렬 사이드 대화 시작",
    "desc": "메인 대화의 컨텍스트를 오염시키지 않고 별도로 진행되는 사이드 대화를 엽니다.",
    "example": "/side 이 함수 설명해줘"
  },
  "/btw": {
    "title": "/btw — 부가 질문 사이드 대화",
    "desc": "메인 작업 진행 중 짧은 확인이나 단발성 질문을 위한 사이드 대화를 수행합니다.",
    "example": "/btw 이 라이브러리 라이선스가 뭐야?"
  },
  "/review": {
    "title": "/review — 코드 및 보안 사전 검토",
    "desc": "코드를 push하기 전 버그나 보안 위험 요소를 사전에 분석합니다. /review-bugbot 및 /review-security 명령어로 각각 독립적인 검토를 실행할 수도 있습니다.",
    "example": "/review\n/review-bugbot\n/review-security"
  },
  "Ctrl + L": {
    "title": "AI Chat 사이드바 토글",
    "desc": "에디터 화면 우측의 AI 채팅 창을 열거나 숨깁니다. 코딩 도중 질문이나 참조 자료를 찾을 때 활용합니다.",
    "example": ""
  },
  "Ctrl + K": {
    "title": "인라인 AI 코드 편집",
    "desc": "현재 포커스 또는 드래그한 선택 영역 안에서 인라인 프롬프트를 띄워 AI에 코드 변경 혹은 생성을 지시합니다.",
    "example": ""
  },
  "Ctrl + I": {
    "title": "Composer 플로팅 바 실행",
    "desc": "빠르게 여러 개의 파일을 한 번에 편집할 수 있도록 간편 플로팅 창 형태로 Composer를 호출합니다.",
    "example": ""
  },
  "Ctrl + Shift + I": {
    "title": "Composer 전체 화면 실행",
    "desc": "프로젝트의 아키텍처 리팩토링이나 대규모 다중 파일 수정을 수행하기 위해 넓은 전체 화면 패널 형태로 Composer를 실행합니다.",
    "example": ""
  },
  "Ctrl + Shift + L": {
    "title": "선택 영역 Chat에 첨부",
    "desc": "드래그하여 선택한 코드 블록을 현재 열려 있는 AI Chat 입력창의 참조 컨텍스트로 바로 추가합니다.",
    "example": ""
  },
  "Tab": {
    "title": "자동 완성 수락",
    "desc": "Cursor Tab이 제안한 AI 인라인 코드 완성을 즉시 승인하고 코드에 반영합니다.",
    "example": ""
  },
  "/in-cloud": {
    "title": "/in-cloud — 클라우드 VM 서브에이전트",
    "desc": "전용 클라우드 VM에 서브에이전트를 생성하여 CI 에러 픽스나 장시간의 조사 태스크를 위임하고 로컬 터미널의 반응성을 최대로 유지합니다.",
    "example": "/in-cloud fix compile error"
  },
  "클라우드 개발 환경": {
    "title": "클라우드 개발 환경 셋업",
    "desc": "클라우드상에서 10분 이내에 개발 환경을 구동할 수 있으며, 개발 환경을 스냅샷으로 저장해 기동 속도를 획기적으로 개선합니다.",
    "example": ""
  },
  "Canvas": {
    "title": "Canvas — 토큰 사용량 분석",
    "desc": "시스템 프롬프트, 도구 사양, 규칙, 스킬들이 차지하는 컨텍스트(토큰) 비중을 캔버스 내에서 인터랙티브한 그래프로 분석합니다.",
    "example": ""
  }
};
