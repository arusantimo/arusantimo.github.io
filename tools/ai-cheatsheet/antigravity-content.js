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
        <span class="meta-version">v2.1.3</span>
        <span style="font-size:10px;color:var(--muted2);">2026-06-12</span>
      </div>
    </div>

    <div class="changelog-wrap">
      <div class="changelog-toggle" onclick="toggleCL(this)">
        <span class="arrow">▶</span>
        <span>📋 최근 변경사항 (v2.1.3)</span>
      </div>
      <div class="changelog-body">
        <ul>
          <li class="cl-tip" data-tt-title="Gemini 모델 도구 호출 한도 상향 (v2.1.3)"
            data-tt-desc="Gemini 모델의 1턴당 최대 도구 호출 횟수 제한이 512회로 대폭 확장되어 복잡하고 자율적인 다단계 작업 처리가 가능합니다."
            data-tt-example="">Gemini 모델 1턴당 최대 도구 호출 수 512회 확장 지원 (v2.1.3) <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="MCP 서버 실행 타임아웃 구성 (v2.1.3)"
            data-tt-desc="MCP 서버 시작 시 타임아웃 제한 시간을 임의로 구성하거나 -1을 설정해 타임아웃을 완전 차단할 수 있습니다."
            data-tt-example="">MCP 서버 기동 대기 타임아웃 설정 지원 (비활성: <code>-1</code>) (v2.1.3) <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="아티팩트 뷰어 행 번호 매핑 개선 (v2.1.3)"
            data-tt-desc="줄바꿈 처리된 텍스트 및 축소된 Mermaid 다이어그램을 포함하여 뷰어의 행 번호와 실제 소스 라인 번호가 정확히 일치하도록 매핑을 개선했습니다."
            data-tt-example="">아티팩트 뷰어 행 번호 및 줄바꿈/Mermaid 라인 매핑 정교화 (v2.1.3) <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="GitHub subpath 플러그인 설치 (v2.1.3)"
            data-tt-desc="GitHub 리포지토리의 subpath 디렉터리 경로를 명시하여 브랜치 단위로 커스텀 플러그인을 직접 다운로드 및 설치할 수 있습니다."
            data-tt-example="">GitHub subpath를 통한 플러그인 직접 다운로드 설치 지원 (v2.1.3) <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="Linux Wayland 클립보드 네이티브 지원 (v2.1.3)"
            data-tt-desc="Linux 데스크톱 환경의 wl-paste를 네이티브 수준으로 우선 연동하며, 파일 매니저로부터 복사된 파일을 이미지 데이터보다 우선 취급합니다."
            data-tt-example="">Linux Wayland 클립보드(<code>wl-paste</code>) 지원 및 파일 복사 우선순위 개선 (v2.1.3) <span class="badge-new">NEW</span></li>
          <li class="cl-tip" data-tt-title="settings.json 미확인 필드 유실 패치 (v2.1.3)"
            data-tt-desc="설정 파일을 로드하거나 병합 후 저장할 때 알 수 없는 임의의 settings 필드가 영구적으로 삭제되는 현상을 수정했습니다."
            data-tt-example="">설정(settings.json) 병합 저장 시 미인지 필드 온전 보존 패치 (v2.1.3) <span class="badge-new">NEW</span></li>
        </ul>

<div class="hist-divider" onclick="toggleHist('antigravity')">🕰️ 이전 버전 히스토리 보기 <span class="hist-arrow">▼</span>
        </div>
        <div id="hist-antigravity" class="history-container">

          <details class="ver-group">
            <summary>v2.1.0</summary>
            <ul>
              <li class="cl-tip" data-tt-title="대화 및 런타임 성능 향상 (v2.1.0)"
                data-tt-desc="컨텍스트 자동 압축 기능을 통해 불필요한 토큰 사용량을 대폭 절감하고, 장기 실행 태스크에서의 메모리 누수 방지 및 성능이 강화되었습니다."
                data-tt-example="">컨텍스트 자동 압축 및 장기 실행 에이전트 성능 강화 (v2.1.0)</li>
              <li class="cl-tip" data-tt-title="task.md 동적 우선순위 재조정 (v2.1.0)"
                data-tt-desc="작업 수행 중 발생하는 예외 상황이나 사용자의 실시간 피드백에 맞춰 task.md의 작업 우선순위를 에이전트가 런타임에 동적으로 재조정합니다."
                data-tt-example=""><code>task.md</code> 런타임 동적 우선순위 재조정 (v2.1.0)</li>
              <li class="cl-tip" data-tt-title="MCP 서버 자동 탐지(Auto-Discovery) (v2.1.0)"
                data-tt-desc="로컬 환경에 설치된 호환 가능한 주요 MCP 서버(예: Chrome DevTools, Github 등)를 에이전트가 자동으로 탐지하고 연동을 제안합니다."
                data-tt-example="/mcp discover">MCP 서버 자동 탐지(Auto-Discovery) 및 제안 기능 (v2.1.0)</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v2.0.0</summary>
            <ul>
              <li class="cl-tip" data-tt-title="Antigravity 2.0 릴리스"
                data-tt-desc="Gemini CLI의 후속 버전인 agy CLI와 단독 데스크톱 앱, SDK를 포함하는 Antigravity 2.0이 출시되었습니다."
                data-tt-example="">Gemini CLI에서 Antigravity 2.0 마이그레이션 통합 (v2.0.0)</li>
              <li class="cl-tip" data-tt-title="task.md 동적 작업 명세서 도입"
                data-tt-desc="에이전트가 목표를 받으면 스스로 하위 과제를 체크리스트 마크다운 파일(task.md)로 자동 분류해 수행합니다."
                data-tt-example="">task.md 기반 자율 계획 수립 및 실시간 추적 라이브 연동 (v2.0.0)</li>
              <li class="cl-tip" data-tt-title="비동기 작업 및 서브에이전트 관리"
                data-tt-desc="동적으로 subagent를 정의하고 백그라운드 태스크를 비동기로 예약하여 결과를 실시간 취합합니다."
                data-tt-example="">서브에이전트(Subagents) 정의, 메세징 및 비동기 작업 관리 기능 (v2.0.0)</li>
              <li class="cl-tip" data-tt-title="산출물(Artifacts) 추적 가이드라인"
                data-tt-desc="작업 결과물에 대해 walkthrough.md 등의 산출물을 작업 영역 내에 저장하고 기록을 관리합니다."
                data-tt-example="">작업 증명 산출물(Artifacts) 저장 및 오디트 트레일 추적 (v2.0.0)</li>
            </ul>
          </details>
        </div>
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
              <div class="row cl-tip">
                <div class="row-key"><code>/mcp discover</code></div>
                <div class="row-desc">로컬 MCP 자동 탐지</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/permissions</code></div>
                <div class="row-desc">보안 승인 규칙 편집 및 실행 모드 제어</div>
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
              <div class="row cl-tip">
                <div class="row-key"><code>agy models</code></div>
                <div class="row-desc">사용 가능한 모델 목록 조회</div>
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
              <div class="row cl-tip">
                <div class="row-key"><code>--model</code></div>
                <div class="row-desc">기동 시 적용할 특정 AI 모델 강제 지정</div>
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

