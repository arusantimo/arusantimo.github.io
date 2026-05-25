const cursorContent = `
<!--  CURSOR PANE                                  -->
  <!-- ══════════════════════════════════════════════ -->
  <div id="tab-cursor" class="tab-pane cursor-pane">

    <div class="page-header">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <img src="cursor-logo.png" alt="Cursor Logo">
        <h1>Cursor <span>Cheat Sheet</span></h1>
        <span style="font-size:10px;color:var(--muted);">⊞ Windows/macOS 공용 · AI 에디터</span>
      </div>
      <div class="meta">
        <span class="meta-version">v0.45.8</span>
        <span style="font-size:10px;color:var(--muted2);">2026-05-24</span>
      </div>
    </div>

    <div class="changelog-wrap">
      <div class="changelog-toggle" onclick="toggleCL(this)">
        <span class="arrow">▶</span>
        <span>📋 최근 변경사항 (v0.45.8)</span>
      </div>
      <div class="changelog-body">
        <ul>
          <li class="cl-tip" data-tt-title=".cursor/rules/ 다중 규칙 지원 (v0.45.0)"
            data-tt-desc=".cursor/rules/ 디렉터리 내에 개별 .mdc 파일을 생성하여 특정 glob 패턴에 따라 가이드라인을 동적으로 적용합니다."
            data-tt-example="">.cursor/rules/ 내 멀티 .mdc 규칙 및 YAML 프론트매터 자동 활성화 적용 (v0.45.0) <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="Composer 전체 화면 모드 지원 (v0.45.2)"
            data-tt-desc="Ctrl+Shift+I 또는 Cmd+Shift+I로 큰 화면 전체를 사용하는 Control Panel식 컴포저 창을 활성화합니다."
            data-tt-example="Ctrl + Shift + I">Composer 전체 화면 뷰(Pane/Control Panel) 지원 및 UI 레이아웃 선택 기능 <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="cursor-agent 독립형 CLI 릴리스"
            data-tt-desc="터미널에서 직접 실행되는 AI 코딩 에이전트 CLI 도구인 cursor-agent가 릴리스되었습니다."
            data-tt-example="cursor-agent -p 'Prompt'">독립형 터미널 코딩 에이전트 <code>cursor-agent</code> 및 로그인 명령어 도입 <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="프로젝트 MCP 지원 확장"
            data-tt-desc="프로젝트 루트에 .cursor/mcp.json을 두어 해당 프로젝트에 종속적인 로컬 MCP 서버 구성을 자동 로드합니다."
            data-tt-example="">프로젝트 단위 MCP 설정 파일 <code>.cursor/mcp.json</code> 지원 <span class="badge-new">NEW</span></li>
        </ul>
      </div>
    </div>

    <div class="main">

      <div class="section wide">
        <div class="section-title">⚡ AI 인터랙션 &amp; Composer</div>
        <div class="cols2">
          <div>
            <div class="group">
              <div class="group-label">핵심 기능 단축키</div>
              <div class="row">
                <div class="row-key"><code>Ctrl + L</code></div>
                <div class="row-desc">AI Chat 사이드바 토글 (macOS: <code>Cmd + L</code>)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>Ctrl + K</code></div>
                <div class="row-desc">코드 영역 인라인 편집 (macOS: <code>Cmd + K</code>)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>Ctrl + I</code></div>
                <div class="row-desc">Composer 실행 — 플로팅 바 (macOS: <code>Cmd + I</code>)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>Ctrl + Shift + I</code></div>
                <div class="row-desc">Composer 실행 — 전체 화면 (macOS: <code>Cmd + Shift + I</code>)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>Ctrl + Shift + L</code></div>
                <div class="row-desc">선택된 코드를 AI Chat에 추가 (macOS: <code>Cmd + Shift + L</code>)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>Tab</code></div>
                <div class="row-desc">Cursor Tab 자동 완성 수락 (Inline Completion)</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">컨텍스트 기호 (@ 멘션)</div>
              <div class="row">
                <div class="row-key"><code>@Files</code></div>
                <div class="row-desc">특정 파일을 AI 컨텍스트에 첨부</div>
              </div>
              <div class="row">
                <div class="row-key"><code>@Folders</code></div>
                <div class="row-desc">폴더 내의 코드를 컨텍스트에 첨부</div>
              </div>
              <div class="row">
                <div class="row-key"><code>@Codebase</code></div>
                <div class="row-desc">프로젝트 전체 코드베이스 인덱스 검색</div>
              </div>
              <div class="row">
                <div class="row-key"><code>@Web</code></div>
                <div class="row-desc">실시간 웹 검색 결과를 컨텍스트로 활용</div>
              </div>
              <div class="row">
                <div class="row-key"><code>@Git</code></div>
                <div class="row-desc">최근 커밋, 디프(diff) 또는 PR 정보를 첨부</div>
              </div>
              <div class="row">
                <div class="row-key"><code>@Docs</code></div>
                <div class="row-desc">미리 색인된 프레임워크/라이브러리 공식 문서 참조</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">Composer 주요 제어</div>
              <div class="row">
                <div class="row-key">다중 파일 편집</div>
                <div class="row-desc">Composer 창에서 여러 개의 파일을 한꺼번에 수정/생성</div>
              </div>
              <div class="row">
                <div class="row-key">Accept / Reject</div>
                <div class="row-desc">각 파일의 AI 디프에 대해 <code>Ctrl + Enter</code>로 수락, <code>Ctrl + Backspace</code>로 거절</div>
              </div>
              <div class="row">
                <div class="row-key">View Modes</div>
                <div class="row-desc">Floating 바 / docked Pane / Full-screen Control Panel 간 전환 가능</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">터미널 AI</div>
              <div class="row">
                <div class="row-key">터미널 내 <code>Ctrl + K</code></div>
                <div class="row-desc">터미널 명령창에서 AI에게 셸 명령어 추천 및 자동 작성 요청</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">⚙️ AI 규칙 &amp; 설정</div>
        <div class="group">
          <div class="group-label">AI 가이드라인 (.cursorrules)</div>
          <div class="row">
            <div class="row-key">전역 규칙 (Global)</div>
            <div class="row-desc">Settings > General > Rules for AI에 입력하여 모든 프로젝트에 전역 설정</div>
          </div>
          <div class="row">
            <div class="row-key"><code>.cursorrules</code> (레거시)</div>
            <div class="row-desc">프로젝트 루트의 파일에 작성하여 해당 프로젝트의 단일 가이드라인 정의</div>
          </div>
          <div class="row">
            <div class="row-key"><code>.cursor/rules/*.mdc</code></div>
            <div class="row-desc">YAML frontmatter를 활용하여 특정 glob(예: <code>src/**/*.ts</code>)에 부합하는 파일이 편집될 때만 규칙이 로드되도록 다중 규칙 정의</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">설정 파일 경로</div>
          <div class="row">
            <div class="row-key">전역 설정 파일</div>
            <div class="row-desc"><code>~/.cursor/mcp.json</code> (macOS/Linux)<br><code>%USERPROFILE%\\.cursor\\mcp.json</code> (Windows)</div>
          </div>
          <div class="row">
            <div class="row-key">프로젝트 설정</div>
            <div class="row-desc">프로젝트 루트 내 <code>.cursor/mcp.json</code> 파일로 개별 설정</div>
          </div>
        </div>
      </div>

      <div class="section wide">
        <div class="section-title">🖥️ CLI &amp; 에이전트</div>
        <div class="cols2">
          <div>
            <div class="group">
              <div class="group-label">Cursor IDE CLI (에디터 실행)</div>
              <div class="row">
                <div class="row-key"><code>cursor .</code></div>
                <div class="row-desc">현재 폴더를 Cursor IDE 창으로 열기</div>
              </div>
              <div class="row">
                <div class="row-key"><code>cursor &lt;path&gt;</code></div>
                <div class="row-desc">지정한 폴더 또는 파일을 Cursor로 실행</div>
              </div>
              <div class="row">
                <div class="row-key"><code>cursor --help</code></div>
                <div class="row-desc">IDE CLI 사용 가능한 플래그 및 옵션 리스트 확인</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">cursor-agent CLI (독립 에이전트)</div>
              <div class="row">
                <div class="row-key"><code>cursor-agent</code></div>
                <div class="row-desc">터미널 대화형 코딩 에이전트 실행</div>
              </div>
              <div class="row">
                <div class="row-key"><code>cursor-agent login</code></div>
                <div class="row-desc">브라우저를 연동하여 CLI 계정 로그인 인증 진행</div>
              </div>
              <div class="row">
                <div class="row-key"><code>cursor-agent -p "Prompt"</code></div>
                <div class="row-desc">자동화 모드로 프롬프트의 요구사항을 즉각 실행</div>
              </div>
              <div class="row">
                <div class="row-key"><code>cursor-agent resume</code></div>
                <div class="row-desc">최근 실행하던 이전 세션을 불러와 이어하기</div>
              </div>
              <div class="row">
                <div class="row-key"><code>cursor-agent ls</code></div>
                <div class="row-desc">활성화된 이전 에이전트 세션의 리스트 출력</div>
              </div>
              <div class="row">
                <div class="row-key"><code>cursor-agent logout</code></div>
                <div class="row-desc">CLI 인증 정보 제거 및 로그아웃</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🔌 MCP (Model Context Protocol)</div>
        <div class="group">
          <div class="group-label">MCP 서버 정의</div>
          <div class="row">
            <div class="row-key"><code>mcpServers</code> 설정</div>
            <div class="row-desc">mcp.json 내에 JSON 오브젝트 형태로 서버 정보 구성</div>
          </div>
          <div class="row">
            <div class="row-key">설정 예시</div>
            <div class="row-desc"><code>{"mcpServers": {"db": {"command": "npx", "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db", "path"]}}}</code></div>
          </div>
          <div class="row">
            <div class="row-key">상태 확인</div>
            <div class="row-desc">Settings > Features > Tools &amp; MCP UI에서 초록색(정상) / 빨간색(오류) 점으로 상태 확인</div>
          </div>
        </div>
      </div>

    </div>
  </div>
`;

