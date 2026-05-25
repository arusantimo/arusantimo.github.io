---
name: "source-command-update-cheatsheets"
description: "Codex, Claude, Cursor 및 Antigravity 치트시트를 최신 버전으로 자동 업데이트합니다"
---

# source-command-update-cheatsheets

Use this skill when the user asks to run the migrated source command `update-cheatsheets`.

## Command Template

다음 통합 치트시트 파일들을 최신 버전으로 업데이트해주세요:
- `tools/ai-cheatsheet/index.html` — 상단 탭 버튼의 버전 업데이트
- `tools/ai-cheatsheet/claude-content.js` — Claude Code 콘텐츠 영역
- `tools/ai-cheatsheet/codex-content.js` — Codex CLI 콘텐츠 영역
- `tools/ai-cheatsheet/cursor-content.js` — Cursor 콘텐츠 영역
- `tools/ai-cheatsheet/antigravity-content.js` — Antigravity 콘텐츠 영역
- `tools/ai-cheatsheet/tooltips_claude.js` — Claude Code 툴팁 (변경사항이 있을 때)
- `tools/ai-cheatsheet/tooltips_codex.js` — Codex CLI 툴팁 (변경사항이 있을 때)
- `tools/ai-cheatsheet/tooltips_cursor.js` — Cursor 툴팁 (변경사항이 있을 때)
- `tools/ai-cheatsheet/tooltips_antigravity.js` — Antigravity 툴팁 (변경사항이 있을 때)

## 단계별 작업

### 1단계: 최신 버전 확인 및 중간 업데이트 내역 검토

아래 URL에서 각 도구의 최신 릴리스 버전과 날짜를 확인하세요.
**중요 규칙**: 현재 치트시트의 버전과 최신 버전 사이에 누락된 중간 릴리스(버전)가 있는지 반드시 확인하세요. 중간에 건너뛴 버전들이 있다면, 해당 버전들의 변경 내역과 주요 기능 추가 사항도 빠짐없이 확인하여 히스토리와 현재 치트시트 본문에 모두 업데이트해야 합니다.

**Claude Code:**
- https://github.com/anthropics/claude-code/releases (최신 stable 태그 확인)
- https://code.claude.com/docs/en/changelog (릴리스 날짜·기능 목록)
- **로컬 확인**: `claude` 실행 후 `/help`를 입력하여 문서에 반영되지 않은 최신 명령어 목록 확인

**Codex CLI:**
- https://github.com/openai/codex/releases (Latest 태그 확인, Pre-release 제외)
- 필요 시 GitHub Releases의 개별 버전 노트에서 추가/삭제된 명령어·플래그 확인

**Cursor:**
- https://cursor.com/changelog (공식 버전, 날짜, 릴리스 노트 확인)
- https://cursor.com/docs (기능 설명 및 세부 동작 확인)
- https://cursor.com/cli 또는 https://cursor.com/docs/cli/overview (Cursor CLI / cursor-agent 관련 문서 확인)
- **로컬 확인**: 설치되어 있으면 `cursor --version`, `cursor-agent --help`로 문서에 아직 반영되지 않은 명령어·워크플로우 존재 여부 확인

**Antigravity:**
- https://antigravity.google/changelog (공식 변경 내역 확인)
- https://antigravity.google/releases (최신 릴리스, 날짜, 배포 단위 확인)
- https://antigravity.google/product 및 https://antigravity.google/docs (IDE/CLI/SDK 기능 설명 확인)
- **로컬 확인**: 설치되어 있으면 `agy --help`로 신규 명령어·서브커맨드가 치트시트에 반영되어 있는지 확인

### 2단계: 현재 버전 확인

아래 파일들에서 `<span class="meta-version">` 태그 안의 버전을 읽어 업스트림 버전과 비교하세요.

- Claude Code: `tools/ai-cheatsheet/claude-content.js` 내 `<span class="meta-version">`
- Codex CLI: `tools/ai-cheatsheet/codex-content.js` 내 `<span class="meta-version">`
- Cursor: `tools/ai-cheatsheet/cursor-content.js` 내 `<span class="meta-version">`
- Antigravity: `tools/ai-cheatsheet/antigravity-content.js` 내 `<span class="meta-version">`

### 3단계: 변경사항이 있을 경우 업데이트

업스트림 버전이 더 새로우면 각 파일에서 아래 항목을 수정하세요. (중간에 누락된 버전이 있다면 그 버전들의 내역도 포함해서 처리합니다.)
이때 기존에 붙어있던 구버전의 `NEW` 뱃지들을 모두 제거하는 과정이 포함되어야 합니다.

**`tools/ai-cheatsheet/index.html` 수정 위치:**
1. 탭 버튼 영역 내 `<span class="tab-ver">vX.X.XXX</span>` 버전 업데이트 (Claude Code, Codex CLI, Cursor, Antigravity)

**`tools/ai-cheatsheet/claude-content.js` 수정 위치:**
1. `<span class="meta-version">` 버전 번호
2. `<span style="font-size:10px;color:var(--muted2);">YYYY-MM-DD</span>` 날짜
3. changelog-toggle span: `📋 최근 변경사항 (vX.X.XXX)` — 최신 버전만 표시하도록 레이블 수정
4. `<ul>` 안 `<li>` 목록 — 기존 최신 항목을 아래 `<div id="hist-claude" class="history-container">`로 이동시킨 후, 신규 항목을 상단 `<ul>`에 삽입 (`<span class="badge-new">NEW</span>` 뱃지 부여). 이때 이전 내역은 `<details class="ver-group">` 태그를 사용하여 버전별로 그룹화하여 보관합니다.

**`tools/ai-cheatsheet/codex-content.js` 수정 위치:**
1. `<span class="meta-version">` 버전 번호
2. `<span style="font-size:10px;color:var(--muted2);">YYYY-MM-DD</span>` 날짜
3. changelog-toggle span: `📋 최근 변경사항 (vX.X.X)` — 최신 버전만 표시하도록 레이블 수정
4. `<ul>` 안 `<li>` 목록 — 기존 최신 항목을 아래 `<div id="hist-codex" class="history-container">`로 이동시킨 후, 신규 항목을 상단 `<ul>`에 삽입 (`<span class="badge-new">NEW</span>` 뱃지 부여). 이때 이전 내역은 `<details class="ver-group">` 태그를 사용하여 버전별로 그룹화하여 보관합니다.

**`tools/ai-cheatsheet/cursor-content.js` 수정 위치:**
1. `<span class="meta-version">` 버전 번호
2. `<span style="font-size:10px;color:var(--muted2);">YYYY-MM-DD</span>` 날짜
3. changelog-toggle span: `📋 최근 변경사항 (vX.X.X)` — 최신 버전만 표시하도록 레이블 수정
4. `<ul>` 안 `<li>` 목록 — 신규 항목을 상단에 삽입하고 `NEW` 뱃지를 부여합니다.
5. 현재 파일에 이전 버전 히스토리 영역이 없다면 Claude/Codex와 같은 패턴으로 `<div class="hist-divider" ...>` 및 `<div id="hist-cursor" class="history-container">`를 추가하고, 기존 최신 항목을 `<details class="ver-group">`로 버전별 그룹화하여 이동합니다.

**`tools/ai-cheatsheet/antigravity-content.js` 수정 위치:**
1. `<span class="meta-version">` 버전 번호
2. `<span style="font-size:10px;color:var(--muted2);">YYYY-MM-DD</span>` 날짜
3. changelog-toggle span: `📋 최근 변경사항 (vX.X.X)` — 최신 버전만 표시하도록 레이블 수정
4. `<ul>` 안 `<li>` 목록 — 신규 항목을 상단에 삽입하고 `NEW` 뱃지를 부여합니다.
5. 현재 파일에 이전 버전 히스토리 영역이 없다면 Claude/Codex와 같은 패턴으로 `<div class="hist-divider" ...>` 및 `<div id="hist-antigravity" class="history-container">`를 추가하고, 기존 최신 항목을 `<details class="ver-group">`로 버전별 그룹화하여 이동합니다.

### 4단계: 툴팁 JS 파일 업데이트

changelog `<li>` 항목에 툴팁을 추가한 경우 해당 도구의 tooltip 파일도 함께 업데이트하세요.

각 파일 형식:
```js
window.CLAUDE_TIPS = { "키": { "title": "...", "desc": "...", "example": "..." }, ... }
window.CODEX_TIPS  = { "키": { "title": "...", "desc": "...", "example": "..." }, ... }
window.CURSOR_TIPS = { "키": { "title": "...", "desc": "...", "example": "..." }, ... }
window.ANTIGRAVITY_TIPS = { "키": { "title": "...", "desc": "...", "example": "..." }, ... }
```

툴팁 키는 해당 `.row-key code` 안의 `textContent`와 정확히 일치해야 합니다.

대응 파일:
- Claude Code: `tools/ai-cheatsheet/tooltips_claude.js`
- Codex CLI: `tools/ai-cheatsheet/tooltips_codex.js`
- Cursor: `tools/ai-cheatsheet/tooltips_cursor.js`
- Antigravity: `tools/ai-cheatsheet/tooltips_antigravity.js`

### 5단계: 변경사항 내용 선별 기준

아래 카테고리를 우선으로 간결하게 작성하세요 (항목당 1줄):
- **신규 명령어·플래그·슬래시 커맨드** (Added `/xxx`, `--yyy`)
- **제거된 명령어** (Removed `/vim`)
- **주요 설정·환경변수 추가** (CLAUDE_CODE_*, 새 settings 키)
- **플랫폼 지원 추가** (Bedrock, Vertex, Windows 등)
- **보안·권한 관련 변경**
- 버그픽스·성능개선은 특별히 중요한 것만 포함

`<li>` 형식 예시:
```html
<li class="cl-tip"
  data-tt-title="기능명 (vX.X.XX)"
  data-tt-desc="상세 설명"
  data-tt-example="예시 코드">
  <code>명령어</code> — 한 줄 요약 (vX.X.XX)
</li>
```

### 7단계: 뱃지(Badge) 업데이트 규칙

새로운 버전으로 업데이트할 때, 사용자가 변경 사항을 쉽게 인지할 수 있도록 `<span class="badge-new">NEW</span>` 뱃지를 관리해야 합니다.

1. **신규 항목 뱃지 추가**:
   - **Changelog**: 이번 업데이트 주기에 새로 추가된 모든 `<li>` 항목 끝에 `NEW` 뱃지를 추가합니다.
   - **메인 참조 테이블**: 신규 명령어, 플래그, 설정 키 등이 메인 테이블 본문에 반영될 때 설명 옆에 `NEW` 뱃지를 추가하여 시인성을 높입니다.
2. **이전 뱃지 제거**:
   - 업데이트를 시작할 때, 이전 버전에 붙어 있던 **모든** `NEW` 뱃지를 제거합니다. 파일 전체에서 `badge-new`를 검색하여 새로 업데이트할 항목 외에는 남지 않도록 합니다.
3. **히스토리 보존 (중요)**:
   - 새로운 변경 사항을 추가할 때 기존에 있던 항목들을 삭제하지 마십시오.
   - 가장 최근 버전의 변경 사항만 상단 `<ul>`에 남기고, 이전 버전의 항목들은 `<div class="history-container">` 영역 내부에 `<details class="ver-group">` 태그를 사용하여 버전별로 그룹화하여 이동시키십시오. 이를 통해 전체 히스토리가 체계적으로 보존되도록 합니다.
4. **특수 기능/실험적 기능**:
   - 정식 기능이 아닌 실험적인 기능은 `<span class="badge-new">실험</span>` 또는 단순히 `(실험)` 텍스트를 병기하여 구분합니다.

### 8단계: 완료 보고

업데이트한 항목을 요약해서 알려주세요:
- Claude Code: 이전 버전 → 신규 버전, 릴리스 날짜
- Codex CLI: 이전 버전 → 신규 버전, 릴리스 날짜
- Cursor: 이전 버전 → 신규 버전, 릴리스 날짜
- Antigravity: 이전 버전 → 신규 버전, 릴리스 날짜
- 이미 최신이면 "변경 없음"으로 보고
