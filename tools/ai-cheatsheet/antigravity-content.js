const antigravityContent = `
<!--  ANTIGRAVITY PANE                             -->
  <!-- ══════════════════════════════════════════════ -->
  <div id="tab-antigravity" class="tab-pane antigravity-pane">

    <div class="page-header">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <img src="antigravity-logo.webp" alt="Antigravity Logo">
        <h1>Antigravity <span>Cheat Sheet</span></h1>
        <span style="font-size:10px;color:var(--muted);">⊞ Windows 기준 · Agent-first 플랫폼</span>
      </div>
      <div class="meta">
        <span class="meta-version">v2.0.0</span>
        <span style="font-size:10px;color:var(--muted2);">2026-05-24</span>
      </div>
    </div>

    <div class="changelog-wrap">
      <div class="changelog-toggle" onclick="toggleCL(this)">
        <span class="arrow">▶</span>
        <span>📋 최근 변경사항 (v2.0.0)</span>
      </div>
      <div class="changelog-body">
        <ul>
          <li class="cl-tip" data-tt-title="Antigravity 2.0 릴리스"
            data-tt-desc="Gemini CLI의 후속 버전인 agy CLI와 단독 데스크톱 앱, SDK를 포함하는 Antigravity 2.0이 출시되었습니다."
            data-tt-example="">Gemini CLI에서 Antigravity 2.0 마이그레이션 통합 (v2.0.0) <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="task.md 동적 작업 명세서 도입"
            data-tt-desc="에이전트가 목표를 받으면 스스로 하위 과제를 체크리스트 마크다운 파일(task.md)로 자동 분류해 수행합니다."
            data-tt-example="">task.md 기반 자율 계획 수립 및 실시간 추적 라이브 연동 <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="비동기 작업 및 서브에이전트 관리"
            data-tt-desc="동적으로 subagent를 정의하고 백그라운드 태스크를 비동기로 예약하여 결과를 실시간 취합합니다."
            data-tt-example="">서브에이전트(Subagents) 정의, 메세징 및 비동기 작업 관리 기능 <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="산출물(Artifacts) 추적 가이드라인"
            data-tt-desc="작업 결과물에 대해 walkthrough.md 등의 산출물을 작업 영역 내에 저장하고 기록을 관리합니다."
            data-tt-example="">작업 증명 산출물(Artifacts) 저장 및 오디트 트레일 추적 <span class="badge-new">NEW</span></li>
        </ul>
      </div>
    </div>

    <div class="main">

      <div class="section wide">
        <div class="section-title">⚡ 슬래시 명령어</div>
        <div class="cols3">
          <div>
            <div class="group">
              <div class="group-label">수행 &amp; 기획</div>
              <div class="row cl-tip">
                <div class="row-key"><code>/goal</code></div>
                <div class="row-desc">최종 목표가 끝날 때까지 자율 턴 연속 동작</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/grill-me</code></div>
                <div class="row-desc">작업 전에 사용자에게 추가 질문을 던져 요구사항 구체화</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/plan</code></div>
                <div class="row-desc">계획 수립 모드로 전환 (구체적인 작업 분할)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/browser</code></div>
                <div class="row-desc">실제 웹 브라우저(Chrome 등) 제어 모드 켜기/끄기</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">설정 &amp; 관리</div>
              <div class="row">
                <div class="row-key"><code>/permissions</code></div>
                <div class="row-desc">보안 승인 감도 및 실행 모드 제어</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/config</code></div>
                <div class="row-desc">환경 설정 및 테마 수정 창 호출</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/settings</code></div>
                <div class="row-desc">전반적인 동작 및 선호 설정 관리</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/keybindings</code></div>
                <div class="row-desc">단축키 구성 설정 수정</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">세션 제어</div>
              <div class="row cl-tip">
                <div class="row-key"><code>/rewind</code></div>
                <div class="row-desc">작업 상태를 이전 체크포인트로 복원 (별칭: /undo)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/fork</code></div>
                <div class="row-desc">현재 세션을 복사해 병렬 테스트 공간으로 분기</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/resume</code></div>
                <div class="row-desc">이전 세션 대화 리스트 호출 및 전환 (별칭: /switch)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/clear</code></div>
                <div class="row-desc">현재 입력 창 및 화면 초기화</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">스케줄러</div>
              <div class="row">
                <div class="row-key"><code>/schedule</code></div>
                <div class="row-desc">주기적 백그라운드 태스크 등록 스케줄러 실행</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">특수 접두어</div>
              <div class="row">
                <div class="row-key"><code>! &lt;command&gt;</code></div>
                <div class="row-desc">프롬프트 맨 앞 ! 접두어로 로컬 셸 직접 실행</div>
              </div>
              <div class="row">
                <div class="row-key"><code>@ &lt;path&gt;</code></div>
                <div class="row-desc">특정 파일/폴더 자동완성 멘션 및 컨텍스트 첨부</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">⚙️ 설정 파일 &amp; 단축키</div>
        <div class="group">
          <div class="group-label">주요 설정 파일 위치</div>
          <div class="row">
            <div class="row-key">MCP 커넥터 설정</div>
            <div class="row-desc"><code>~/.gemini/antigravity-cli/mcp_config.json</code> (macOS/Linux)<br><code>C:\\Users\\&lt;사용자명&gt;\\.gemini\\antigravity-cli\\mcp_config.json</code> (Windows)</div>
          </div>
          <div class="row">
            <div class="row-key">기본 CLI 환경 설정</div>
            <div class="row-desc"><code>~/.gemini/antigravity-cli/settings.json</code></div>
          </div>
          <div class="row">
            <div class="row-key">단축키 커스텀 설정</div>
            <div class="row-desc"><code>~/.gemini/antigravity-cli/keybindings.json</code></div>
          </div>
          <div class="row">
            <div class="row-key">지침 정의 파일</div>
            <div class="row-desc">프로젝트 루트 of <code>AGENTS.md</code> 작성 시 전역 지침으로 자동 적용</div>
          </div>
          <div class="row">
            <div class="row-key">데스크톱 앱 단축키</div>
            <div class="row-desc"><code>%APPDATA%\\Antigravity\\User\\keybindings.json</code> (Windows)<br><code>~/Library/Application Support/Antigravity/User/keybindings.json</code> (macOS)</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">기본 단축키 (Keybindings)</div>
          <div class="row">
            <div class="row-key"><code>Ctrl + K</code> <code>Ctrl + S</code></div>
            <div class="row-desc">단축키 구성 메뉴 전체 열기 (macOS: <code>Cmd + K</code> <code>Cmd + S</code>)</div>
          </div>
          <div class="row">
            <div class="row-key"><code>Ctrl + ,</code></div>
            <div class="row-desc">환경 설정 창 열기 (macOS: <code>Cmd + ,</code>)</div>
          </div>
          <div class="row">
            <div class="row-key"><code>Cmd + L</code></div>
            <div class="row-desc">사이드바 에이전트 패널 토글</div>
          </div>
          <div class="row">
            <div class="row-key"><code>Ctrl + \`</code></div>
            <div class="row-desc">내장 터미널 토글 (Backtick)</div>
          </div>
          <div class="row">
            <div class="row-key"><code>Cmd + E</code></div>
            <div class="row-desc">에디터와 에이전트 매니저(Mission Control) 모드 간의 포커스 전환</div>
          </div>
          <div class="row">
            <div class="row-key"><code>Cmd + I</code></div>
            <div class="row-desc">인라인 코드 자동 완성 추천 제안 수락</div>
          </div>
        </div>
      </div>

      <div class="section wide">
        <div class="section-title">🖥️ CLI &amp; 실행 옵션</div>
        <div class="cols2">
          <div>
            <div class="group">
              <div class="group-label">핵심 CLI 명령어</div>
              <div class="row">
                <div class="row-key"><code>agy</code></div>
                <div class="row-desc">대화형 에이전트 모드(TUI) 가동</div>
              </div>
              <div class="row">
                <div class="row-key"><code>agy inspect</code></div>
                <div class="row-desc">현재 프로젝트 구조 및 에이전트 스킬 목록 요약 출력</div>
              </div>
              <div class="row">
                <div class="row-key"><code>agy plugin import gemini</code></div>
                <div class="row-desc">구형 Gemini CLI의 설정 및 인증 정보를 원클릭 마이그레이션</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">보안 및 도구 실행 플래그</div>
              <div class="row">
                <div class="row-key"><code>--sandbox</code></div>
                <div class="row-desc">호스트 OS 보호를 위해 격리된 샌드박스 내부에서만 도구 가동</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--dangerously-skip-permissions</code></div>
                <div class="row-desc">모든 파일 수정 및 민감한 도구 실행 시 주어지는 사용자 승인 단계를 생략</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🧩 에이전트 핵심 아키텍처</div>
        <div class="group">
          <div class="group-label">Core Concepts</div>
          <div class="row">
            <div class="row-key"><code>task.md</code></div>
            <div class="row-desc">목표를 기반으로 하위 과제 체크리스트를 자동 생성 및 실시간 수정 추적 관리</div>
          </div>
          <div class="row">
            <div class="row-key">서브에이전트 (Subagents)</div>
            <div class="row-desc">독립된 빈 에이전트를 동적으로 분기시켜 개별 태스크를 병렬로 실행하는 아키텍처</div>
          </div>
          <div class="row">
            <div class="row-key">비동기 작업 관리</div>
            <div class="row-desc">긴 패키지 다운로드나 빌드 시 백그라운드 태스크로 연동 및 작업 완료 시 알림 수신</div>
          </div>
          <div class="row">
            <div class="row-key">산출물 (Artifacts)</div>
            <div class="row-desc">수행 로그 및 walkthrough.md 등을 작업 공간 내 영구 보관해 오디트 트레일 확보</div>
          </div>
        </div>
      </div>

    </div>
  </div>
`;

