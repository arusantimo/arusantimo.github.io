---
description: Claude Code와 Codex CLI 치트시트를 최신 버전으로 자동 업데이트합니다
---

다음 통합 치트시트 파일을 최신 버전으로 업데이트해주세요:
- `tools/ai-cheatsheet.html` — Claude Code 탭(`.claude-pane`)과 Codex CLI 탭(`.codex-pane`) 모두 포함

## 단계별 작업

### 1단계: 최신 버전 확인

아래 URL에서 각 도구의 최신 릴리스 버전과 날짜를 확인하세요.

**Claude Code:**
- https://github.com/anthropics/claude-code/releases (최신 stable 태그 확인)
- https://code.claude.com/docs/en/changelog (릴리스 날짜·기능 목록)

**Codex CLI:**
- https://github.com/openai/codex/releases (Latest 태그 확인, Pre-release 제외)

### 2단계: 현재 버전 확인

`tools/ai-cheatsheet.html`에서 아래 두 탭의 `<span class="meta-version">` 태그 안의 버전을 읽어 업스트림 버전과 비교하세요.

- Claude Code 탭: `#tab-claude` 영역 내 `<span class="meta-version">`
- Codex CLI 탭: `#tab-codex` 영역 내 `<span class="meta-version">`

### 3단계: 변경사항이 있을 경우 업데이트

업스트림 버전이 더 새로우면 각 탭에서 아래 항목을 수정하세요. 이때 기존에 붙어있던 구버전의 `NEW` 뱃지들을 모두 제거하는 과정이 포함되어야 합니다.

**Claude Code 탭 (`#tab-claude`) 수정 위치:**
1. 탭 버튼: `<button class="tab-btn claude-tab" ...>🤖 Claude Code <span class="tab-ver">vX.X.XXX</span>` 버전
2. `<span class="meta-version">` 버전 번호
3. `<span style="font-size:10px;color:var(--muted2);">YYYY-MM-DD</span>` 날짜
4. changelog-toggle span: `📋 최근 변경사항 (vA.B.CC–XXX)` 범위 레이블
5. `<ul>` 안 `<li>` 목록 — 기존 항목 위에 신규 항목 삽입, 오래된 항목 정리 (`<span class="badge-new">NEW</span>` 뱃지 부여)

**Codex CLI 탭 (`#tab-codex`) 수정 위치:**
1. 탭 버튼: `<button class="tab-btn codex-tab" ...>⬡ Codex CLI <span class="tab-ver">vX.X.X</span>` 버전
2. `<span class="meta-version">` 버전 번호
3. `<span style="font-size:10px;color:var(--muted2);">YYYY-MM-DD</span>` 날짜
4. changelog-toggle span: `📋 최근 변경사항 (v0.xxx–xxx)` 범위 레이블
5. `<ul>` 안 `<li>` 목록 — 기존 항목 위에 신규 항목 삽입, 오래된 항목 정리 (`<span class="badge-new">NEW</span>` 뱃지 부여)

### 4단계: 툴팁 JS 파일 업데이트

changelog `<li>` 항목에 툴팁을 추가한 경우 `tools/tooltips_claude.js` 또는 `tools/tooltips_codex.js`를 함께 업데이트하세요.

각 파일 형식:
```js
window.CLAUDE_TIPS = { "키": { "title": "...", "desc": "...", "example": "..." }, ... }
window.CODEX_TIPS  = { "키": { "title": "...", "desc": "...", "example": "..." }, ... }
```

툴팁 키는 해당 `.row-key code` 안의 `textContent`와 정확히 일치해야 합니다.

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
3. **특수 기능/실험적 기능**:
   - 정식 기능이 아닌 실험적인 기능은 `<span class="badge-new">실험</span>` 또는 단순히 `(실험)` 텍스트를 병기하여 구분합니다.

### 8단계: 완료 보고

업데이트한 항목을 요약해서 알려주세요:
- Claude Code: 이전 버전 → 신규 버전, 릴리스 날짜
- Codex CLI: 이전 버전 → 신규 버전, 릴리스 날짜
- 이미 최신이면 "변경 없음"으로 보고
