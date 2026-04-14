---
description: Claude Code와 Codex CLI 치트시트를 최신 버전으로 자동 업데이트합니다
---

다음 두 치트시트 HTML 파일을 최신 버전으로 업데이트해주세요:
- `tools/claude_code_windows.html`
- `tools/codex_cli_windows.html`

## 단계별 작업

### 1단계: 최신 버전 확인

아래 URL에서 각 도구의 최신 릴리스 버전과 날짜를 확인하세요.

**Claude Code:**
- https://github.com/anthropics/claude-code/releases (최신 stable 태그 확인)
- https://code.claude.com/docs/en/changelog (릴리스 날짜·기능 목록)

**Codex CLI:**
- https://github.com/openai/codex/releases (Latest 태그 확인, Pre-release 제외)

### 2단계: 현재 버전 확인

각 파일에서 `<span class="meta-version">` 태그 안의 버전을 읽어 업스트림 버전과 비교하세요.

### 3단계: 변경사항이 있을 경우 업데이트

업스트림 버전이 더 새로우면 각 파일에서 아래 4곳을 수정하세요.

**`claude_code_windows.html` 수정 위치:**
1. `✏️ [1]` 주석 아래: `<span class="meta-version">` 버전 번호
2. `✏️ [2]` 주석 아래: 날짜 span (YYYY-MM-DD)
3. 상단 배너 `<div class="top-banner">` 안의 버전·날짜 텍스트
4. `✏️ [3]` 주석 아래: 변경사항 범위 레이블 (예: `v2.1.92–107`)
5. `✏️ [4]` 주석 사이: 변경사항 `<li>` 목록 — 기존 항목 위에 신규 항목 삽입, 오래된 항목 정리

**`codex_cli_windows.html` 수정 위치:**
1. `<span class="meta-version">` 버전 번호
2. 날짜 span (YYYY-MM-DD)
3. 변경사항 범위 레이블 span
4. 변경사항 `<ul>` 내 `<li>` 목록

### 4단계: 변경사항 내용 선별 기준

아래 카테고리를 우선으로 간결하게 작성하세요 (항목당 1줄):
- **신규 명령어·플래그·슬래시 커맨드** (Added `/xxx`, `--yyy`)
- **제거된 명령어** (Removed `/vim`)
- **주요 설정·환경변수 추가** (CLAUDE_CODE_*, 새 settings 키)
- **플랫폼 지원 추가** (Bedrock, Vertex, Windows 등)
- **보안·권한 관련 변경**
- 버그픽스·성능개선은 특별히 중요한 것만 포함

### 5단계: 완료 보고

업데이트한 항목을 요약해서 알려주세요:
- Claude Code: 이전 버전 → 신규 버전, 릴리스 날짜
- Codex CLI: 이전 버전 → 신규 버전, 릴리스 날짜
- 이미 최신이면 "변경 없음"으로 보고
