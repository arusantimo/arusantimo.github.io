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
        <span class="meta-version">v3.7.36</span>
        <span style="font-size:10px;color:var(--muted2);">2026-06-13</span>
      </div>
    </div>

    <div class="changelog-wrap">
      <div class="changelog-toggle" onclick="toggleCL(this)">
        <span class="arrow">▶</span>
        <span>📋 최근 변경사항 (v3.7.36)</span>
      </div>
      <div class="changelog-body">
        <ul>
          <li class="cl-tip" data-tt-title="MCP 연결 안정성 강화 (v3.7.36)"
            data-tt-desc="Model Context Protocol(MCP) 서버와의 커넥션 생명주기를 안정적으로 개선하고 다중 백엔드 연결 시 발생하던 간헐적 연결 끊김 버그를 해결했습니다."
            data-tt-example="">MCP(Model Context Protocol) 서버 연동 안전성 및 커넥션 복구 메커니즘 강화 (v3.7.36) <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="Bugbot 성능 개선 및 /review 커맨드 추가 (2026-06-10)"
            data-tt-desc="Bugbot이 Composer 2.5를 탑재하여 속도 ~3.5배 향상, 비용 ~22% 절감, 탐지율 10% 증가가 적용되었으며, push 전 코드/보안 검토를 위한 /review 슬래시 커맨드가 도입되었습니다."
            data-tt-example="/review">Bugbot 성능 혁신 및 사전 PR/코드 검토를 위한 <code>/review</code> 명령어 추가 (2026-06-10)</li>
          <li class="cl-tip" data-tt-title="Design Mode 다중 선택 및 음성 입력 (v3.7)"
            data-tt-desc="브라우저 Design Mode에서 여러 요소를 다중 선택(Multi-select)하여 비교/조정 피드백을 전달할 수 있고, 실행 도중 음성 입력 큐잉이 가능합니다."
            data-tt-example="">Design Mode 다중 선택(Multi-select) 및 음성(Voice) 입력 큐잉 지원 (v3.7)</li>
          <li class="cl-tip" data-tt-title="Cursor SDK 대규모 기능 개선 (2026-06-04)"
            data-tt-desc="@cursor/sdk 릴리스에서 SQLite 외에 JSONL/PG 커스텀 스토어, customTools 전달, local auto-review 샌드박스 정책 설정 등이 지원됩니다."
            data-tt-example="npm install @cursor/sdk"><code>@cursor/sdk</code> 업데이트 — 커스텀 스토어, customTools 및 auto-review 지원 (2026-06-04)</li>
          <li class="cl-tip" data-tt-title="Canvas 토큰 사용량 탐색기 및 디버그 버튼 (2026-06-04)"
            data-tt-desc="컨버스의 토큰 할당(System, Tool, Rules, Skills) 분석 보고서를 인터랙티브 캔버스로 열어 디버깅할 수 있습니다."
            data-tt-example="">Canvas 토큰 사용량 시각화 보고서 및 Debug with Agent 지원 (2026-06-04)</li>
        </ul>

        <div class="hist-divider" onclick="toggleHist('cursor')">🕰️ 이전 버전 히스토리 보기 <span class="hist-arrow">▼</span>
        </div>
        <div id="hist-cursor" class="history-container">

          <details class="ver-group">
            <summary>v3.7 (초기 버전)</summary>
            <ul>
              <li class="cl-tip" data-tt-title="Canvas Improvements (v3.7)"
                data-tt-desc="캔버스에 Design Mode가 도입되어 UI 요소를 직접 선택해 주석을 달 수 있으며, Context Usage Report로 토큰 사용량을 시각적으로 분석할 수 있습니다."
                data-tt-example="Canvas > Design Mode">Canvas 기능 강화 — Design Mode 및 Context Usage Report (v3.7)</li>
              <li class="cl-tip" data-tt-title="Cursor Enterprise Organizations (v3.7)"
                data-tt-desc="엔터프라이즈 고객을 위한 다중 팀 관리, 보안, 예산 및 거버넌스 제어를 통합한 중앙 집중식 조직 허브가 제공됩니다."
                data-tt-example="Settings > Organization">Cursor Enterprise 조직 허브 도입 — 보안 및 다중 팀 관리 (v3.7)</li>
              <li class="cl-tip" data-tt-title="Teams Pricing & Controls (v3.7)"
                data-tt-desc="에이전트를 많이 사용하는 유저를 위한 신규 Premium seat가 도입되었으며, 사용 비용 예측 및 가시성이 향상되었습니다."
                data-tt-example="">Teams 플랜 개선 — 신규 Premium Seat 및 비용 가시성 향상 (v3.7)</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v3.6</summary>
            <ul>
              <li class="cl-tip" data-tt-title="Auto-review Run Mode (v3.6)"
                data-tt-desc="Auto-review는 더 적은 승인 프롬프트와 더 안전한 실행으로 Cursor가 더 오래 작동할 수 있는 새 실행 모드입니다. Shell, MCP, Fetch 툰 콜에 적용되며, 허용된 콜은 즉시 실행하고 샌드박스에서 실행 가능한 콜은 샌드박스에서 실행됩니다. Settings > Cursor Settings > Agents > Run Mode에서 구성."
                data-tt-example="Settings > Cursor Settings > Agents > Run Mode">Auto-review Run Mode 추가 — 승인 프롬프트 최소화 + 안전 실행 (v3.6)</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v3.5</summary>
            <ul>
              <li class="cl-tip" data-tt-title="Shared Canvases (v3.5)"
                data-tt-desc="에이전트가 생성한 인터랙티브 쮔트리팩트(리포트, 대시보드, 코드 UI 등)를 팀원과 공유할 수 있습니다. Pro, Teams, Enterprise 플랜에서 사용 가능."
                data-tt-example="">Shared Canvases — 에이전트 생성 캔버스 팀 공유 (v3.5)</li>
              <li class="cl-tip" data-tt-title="/loop 스킬 (v3.5)"
                data-tt-desc="/loop로 Cursor가 로컈 스케줄에서 주기적으로 프롬프트를 실행하도록 할 수 있습니다. 실행 간격을 지정하지 않으면 에이전트가 스스로 웨이크업 시점을 결정합니다."
                data-tt-example="/loop"><code>/loop</code> 스킬 — 로컈 렌투루 에이전트 (간격/시간/조건 지정) (v3.5)</li>
              <li class="cl-tip" data-tt-title="Composer 2.5 (v3.5 설치 이후)"
                data-tt-desc="Composer 2.5는 Composer 2에 비해 주목할 만한 지능 및 행동 개선이 이뤄어졌습니다. 장기 실행 작업, 복잡한 지시 수행에 더 우수합니다."
                data-tt-example="">Composer 2.5 릴리스 — 장기 작업 및 복잡한 지시 수행 능력 개선</li>
              <li class="cl-tip" data-tt-title="Cursor in Jira (2026-05-19)"
                data-tt-desc="Jira에서 Cursor를 슬렇하거나 @Cursor를 멘션하면 클라우드 에이전트가 케스크를 시작합니다. Cursor 관리자 권한 및 Jira Commercial Cloud + Rovo 권한이 필요합니다."
                data-tt-example="@Cursor">Cursor in Jira 통합 — Jira 퓰에서 @Cursor 멘션으로 클라우드 에이전트 실행</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v0.45.0~v0.45.8</summary>
            <ul>
              <li class="cl-tip" data-tt-title=".cursor/rules/ 다중 규칙 지원 (v0.45.0)"
                data-tt-desc=".cursor/rules/ 디렉터리 내에 개별 .mdc 파일을 생성하여 특정 glob 패턴에 따라 가이드라인을 동적으로 적용합니다."
                data-tt-example="">.cursor/rules/ 내 멀티 .mdc 규칙 및 YAML 프론트매터 자동 활성화 적용 (v0.45.0)</li>
              <li class="cl-tip" data-tt-title="Composer 전체 화면 모드 지원 (v0.45.2)"
                data-tt-desc="Ctrl+Shift+I 또는 Cmd+Shift+I로 큰 화면 전체를 사용하는 Control Panel식 컴포저 창을 활성화합니다."
                data-tt-example="Ctrl + Shift + I">Composer 전체 화면 뷰(Pane/Control Panel) 지원 및 UI 레이아웃 선택 기능 (v0.45.2)</li>
              <li class="cl-tip" data-tt-title="cursor-agent 독립형 CLI 릴리스"
                data-tt-desc="터미널에서 직접 실행되는 AI 코딩 에이전트 CLI 도구인 cursor-agent가 릴리스되었습니다."
                data-tt-example="cursor-agent -p 'Prompt'">독립형 터미널 코딩 에이전트 <code>cursor-agent</code> 및 로그인 명령어 도입</li>
              <li class="cl-tip" data-tt-title="프로젝트 MCP 지원 확장"
                data-tt-desc="프로젝트 루트에 .cursor/mcp.json을 두어 해당 프로젝트에 종속적인 로컈 MCP 서버 구성을 자동 로드합니다."
                data-tt-example="">프로젝트 단위 MCP 설정 파일 <code>.cursor/mcp.json</code> 지원</li>
            </ul>
          </details>

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
                <div class="row-key"><code>/review</code></div>
                <div class="row-desc">코드 및 보안 사전 검토 (/review-bugbot, /review-security)</div>
              </div>
              <div class="row">
                <div class="row-key">Canvas Design Mode</div>
                <div class="row-desc">UI 선택 및 컨텍스트 리포트</div>
              </div>
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

