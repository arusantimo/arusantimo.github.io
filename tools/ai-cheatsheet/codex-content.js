const codexContent = `
<!--  CODEX CLI PANE                               -->
  <!-- ══════════════════════════════════════════════ -->
  <div id="tab-codex" class="tab-pane codex-pane">

    <div class="page-header">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <h1>OpenAI <span>Codex Cheat Sheet</span></h1>
        <span style="font-size:10px;color:var(--muted);">⊞ Windows 기준 · CLI 중심</span>
      </div>
      <div class="meta">
        <span class="meta-version">v0.125.0</span>
        <span style="font-size:10px;color:var(--muted2);">2026-04-24</span>
      </div>
    </div>

    <div class="changelog-wrap">
      <div class="changelog-toggle" onclick="toggleCL(this)">
        <span class="arrow">▶</span>
        <span>📋 최근 변경사항 (v0.125.0)</span>
      </div>
      <div class="changelog-body">
        <ul>
          <li class="cl-tip" data-tt-title="v0.125.0 주요 업데이트"
            data-tt-desc="Unix 소켓 전송 및 원격 스레드 지원, 원격 마켓플레이스 플러그인 설치 가능, 권한 프로필 유지 관리 개선, 모델 디스커버리 권한 변경(AWS/Bedrock 포함) 및 exec --json 사용 시 추론 토큰(reasoning-token) 사용량 보고가 추가되었습니다."
            data-tt-example="">v0.125.0 업데이트 — Unix 소켓/원격 플러그인 지원, 권한 관리 개선 및 추론 토큰 보고 추가 <span
              class="badge-new">NEW</span></li>
        </ul>

        <div class="hist-divider" onclick="toggleHist('codex')">🕰️ 이전 버전 히스토리 보기 <span class="hist-arrow">▼</span>
        </div>
        <div id="hist-codex" class="history-container">

          <details class="ver-group">
            <summary>v0.122.0</summary>
            <ul>
              <li class="cl-tip" data-tt-title="v0.122.0 업데이트"
                data-tt-desc="/side(사이드 대화창), !(실행 중 셸 명령 대기열) 추가. codex app 명령으로 데스크톱 앱을 관리하며, Plan Mode(격리 작업 공간)와 deny-read(보안 정책) 기능이 도입되었습니다."
                data-tt-example="">v0.122.0 업데이트 — <code>/side</code>, <code>!</code>, <code>codex app</code> 명령 추가 및
                <code>Plan Mode</code> 도입</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v0.124.0</summary>
            <ul>
              <li class="cl-tip" data-tt-title="v0.124.0 업데이트"
                data-tt-desc="TUI에서 Alt+, 와 Alt+. 로 추론(reasoning) 수준을 빠르게 조절할 수 있습니다. Amazon Bedrock(OpenAI 호환) 모델 제공자가 정식 지원되며, 훅(Hooks) 기능이 안정화되었습니다."
                data-tt-example="">v0.124.0 업데이트 — TUI 추론 레벨 단축키, Bedrock 정식 지원 및 Hooks 안정화</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v0.123.0</summary>
            <ul>
              <li class="cl-tip" data-tt-title="v0.123.0 업데이트"
                data-tt-desc="Amazon Bedrock 모델 제공자 내장 지원, /mcp verbose 상세 진단 명령 추가. 실시간 핸드오프 기능이 개선되어 백그라운드 에이전트가 트랜스크립트 델타를 수신합니다."
                data-tt-example="">v0.123.0 업데이트 — <code>amazon-bedrock</code> 모델 내장, <code>/mcp verbose</code> 상세 진단 추가</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v0.121.0</summary>
            <ul>
              <li class="cl-tip" data-tt-title="codex marketplace add (v0.121.0)"
                data-tt-desc="GitHub, git URL, 로컬 디렉터리, marketplace.json URL에서 플러그인 마켓플레이스를 설치할 수 있습니다."
                data-tt-example="codex marketplace add https://github.com/org/marketplace">
                <code>codex marketplace add</code> 명령 추가 — GitHub·git·로컬 마켓플레이스 설치</li>
              <li class="cl-tip" data-tt-title="TUI 히스토리 검색 Ctrl+R (v0.121.0)"
                data-tt-desc="TUI 프롬프트에서 Ctrl+R로 이전 명령 히스토리를 역방향 검색할 수 있습니다. 슬래시 명령어도 로컬 히스토리에 저장됩니다."
                data-tt-example="">TUI 입력창에서 <code>Ctrl+R</code> 역방향 히스토리 검색 지원</li>
              <li class="cl-tip" data-tt-title="메모리 모드 TUI 제어 (v0.121.0)"
                data-tt-desc="TUI와 app-server에서 메모리 모드 전환, 메모리 리셋·삭제, 메모리 확장 정리 등을 직접 제어할 수 있습니다." data-tt-example="">
                TUI/app-server에서 메모리 모드·리셋·삭제 직접 제어 가능</li>
              <li class="cl-tip" data-tt-title="MCP 병렬 호출 opt-in (v0.121.0)"
                data-tt-desc="MCP Apps에서 tool call 지원 확장: 네임스페이스 등록, 병렬 호출 opt-in, 샌드박스 상태 메타데이터 전달 등이 추가됐습니다."
                data-tt-example="">MCP Apps 기능 확장 — 네임스페이스 등록, 병렬 호출 opt-in</li>
              <li class="cl-tip" data-tt-title="보안 devcontainer 프로파일 (v0.121.0)"
                data-tt-desc="bubblewrap을 지원하는 보안 devcontainer 프로파일이 추가됐습니다. macOS 샌드박스에서 Unix 소켓 허용 목록도 지원합니다."
                data-tt-example="">bubblewrap 지원 보안 devcontainer 프로파일 추가</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v0.120.0</summary>
            <ul>
              <li class="cl-tip" data-tt-title="Realtime V2 에이전트 스트리밍 (v0.120.0)"
                data-tt-desc="백그라운드 에이전트 작업 진행 상황을 실시간으로 스트리밍합니다. 완료 전에도 중간 결과를 확인할 수 있습니다." data-tt-example="">Realtime
                V2 백그라운드 에이전트 진행상황 스트리밍 지원</li>
              <li class="cl-tip" data-tt-title="TUI 훅 활동 표시 개선 (v0.120.0)"
                data-tt-desc="실행 중인 훅과 완료된 훅이 분리 표시됩니다. 완료된 훅 출력은 유용한 경우에만 유지되어 화면이 깔끔해집니다." data-tt-example="">TUI 내 훅
                활동 표시 개선 — 실행 중 / 완료 훅 분리 표시</li>
              <li class="cl-tip" data-tt-title="TUI 상태줄 스레드 제목 (v0.120.0)"
                data-tt-desc="config.toml의 status_line에서 {thread_title} 변수로 현재 세션 제목을 상태줄에 표시할 수 있습니다."
                data-tt-example="# config.toml&#10;[tui]&#10;status_line = &quot;{thread_title} | {model}&quot;">TUI
                상태줄에 스레드 제목 포함 가능</li>
              <li class="cl-tip" data-tt-title="Windows 샌드박스 버그 수정 (v0.120.0)"
                data-tt-desc="Windows elevated 샌드박스에서 스플릿 파일시스템 정책과 심볼릭 링크가 있는 writable root 처리가 수정됐습니다."
                data-tt-example="">Windows 샌드박스 스플릿 파일시스템 관련 버그 수정</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v0.119.0</summary>
            <ul>
              <li class="cl-tip" data-tt-title="/resume ID·이름 지정 (v0.119.0)"
                data-tt-desc="TUI 내 /resume에 세션 ID나 이름을 직접 전달해 해당 세션으로 즉시 이동합니다."
                data-tt-example="/resume my-project-session&#10;/resume abc123def456"><code>/resume</code> 명령어로 TUI에서 ID
                및 이름으로 세션 직접 이동 가능</li>
              <li class="cl-tip" data-tt-title="Realtime 음성 v2 WebRTC 기본값 (v0.119.0)"
                data-tt-desc="음성 세션이 v2 WebRTC 경로를 기본으로 사용합니다."
                data-tt-example="# config.toml&#10;[voice]&#10;transport = 'webrtc'">Realtime 음성 세션 v2 WebRTC 경로 기본 적용
              </li>
              <li class="cl-tip" data-tt-title="MCP Apps 리소스·툴 강화 (v0.119.0)"
                data-tt-desc="MCP 서버에서 리소스 읽기, 도구 메타데이터, 파일 파라미터 업로드 등을 지원합니다."
                data-tt-example="codex mcp add myserver -- http://localhost:8080">MCP Apps 서버: 리소스 읽기·보다 풍부한 툴 지원</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>유지보수</summary>
            <ul>
              <li class="cl-tip" data-tt-title="Codex CLI 업그레이드"
                data-tt-desc="npm으로 전역 설치된 Codex CLI를 최신 버전으로 업그레이드합니다."
                data-tt-example="npm i -g @openai/codex@latest&#10;codex --version">업그레이드:
                <code>npm i -g @openai/codex@latest</code></li>
            </ul>
          </details>
        </div>
      </div>
    </div>

    <div class="main">

      <div class="section wide">
        <div class="section-title">🖥️ CLI &amp; 플래그</div>
        <div class="cols2">
          <div>
            <div class="group">
              <div class="group-label">핵심 명령</div>
              <div class="row">
                <div class="row-key"><code>codex</code></div>
                <div class="row-desc">대화형 TUI</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex exec "prompt"</code></div>
                <div class="row-desc">비대화형 실행</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex exec resume --last</code></div>
                <div class="row-desc">마지막 exec 세션 이어가기</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex resume --last</code></div>
                <div class="row-desc">대화형 세션 재개</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex fork --last</code></div>
                <div class="row-desc">최근 세션 포크</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex apply TASK_ID</code></div>
                <div class="row-desc">Cloud task diff 로컬 적용</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex cloud list --json</code></div>
                <div class="row-desc">최근 Cloud task 조회</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex mcp list</code></div>
                <div class="row-desc">MCP 서버 목록</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex features list</code></div>
                <div class="row-desc">기능 플래그 확인</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex completion powershell</code></div>
                <div class="row-desc">PowerShell completion 생성</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">전역 플래그</div>
              <div class="row">
                <div class="row-key"><code>--model</code></div>
                <div class="row-desc">모델 강제 지정 (예: <code>gpt-5.4</code>)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--sandbox</code></div>
                <div class="row-desc"><code>read-only</code> | <code>workspace-write</code></div>
              </div>
              <div class="row">
                <div class="row-key"><code>--ask-for-approval</code></div>
                <div class="row-desc"><code>untrusted</code> | <code>on-request</code> | <code>never</code></div>
              </div>
              <div class="row">
                <div class="row-key"><code>--full-auto</code></div>
                <div class="row-desc">Auto 프리셋</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--yolo</code></div>
                <div class="row-desc">승인/샌드박스 우회 <span class="badge-warn">위험</span></div>
              </div>
              <div class="row">
                <div class="row-key"><code>--search</code></div>
                <div class="row-desc">웹 검색 live 모드 전환</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--add-dir</code></div>
                <div class="row-desc">추가 디렉터리 쓰기 권한</div>
              </div>
              <div class="row">
                <div class="row-key"><code>-c key=value</code></div>
                <div class="row-desc">1회성 config override</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">exec / 자동화</div>
              <div class="row cl-tip">
                <div class="row-key"><code>codex apply ID</code></div>
                <div class="row-desc">태스크/클라우드 결과 적용</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>codex exec -</code></div>
                <div class="row-desc">stdin(표준입력) 처리</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>codex -i image.png</code></div>
                <div class="row-desc">멀티모달 이미지 입력 지원</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>cat spec.md | codex exec "Implement this"</code></div>
                <div class="row-desc">프롬프트 + stdin 병행</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--json</code></div>
                <div class="row-desc">JSONL 이벤트 출력 (추론 토큰 보고) <span class="badge-new">NEW</span></div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--output-last-message out.txt</code></div>
                <div class="row-desc">최종 응답 파일 저장</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--output-schema schema.json</code></div>
                <div class="row-desc">구조화 출력 검증</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--skip-git-repo-check</code></div>
                <div class="row-desc">Git 저장소 외부 실행 허용</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--ephemeral</code></div>
                <div class="row-desc">세션 상태를 디스크에 남기지 않음</div>
              </div>
            </div>
            <div class="group">
              <div class="row cl-tip">
                <div class="row-key"><code>codex mcp list</code></div>
                <div class="row-desc">MCP 서버 목록 확인</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>codex mcp add name -- url</code></div>
                <div class="row-desc">stdio 또는 HTTP MCP 등록</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>codex mcp login name</code></div>
                <div class="row-desc">OAuth형 MCP 로그인</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>codex mcp-server</code></div>
                <div class="row-desc">Codex 자체를 MCP 서버로 실행</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex cloud exec --env ENV_ID</code></div>
                <div class="row-desc">Cloud task 직접 제출</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex app</code></div>
                <div class="row-desc">데스크톱 앱 실행</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">⚡ 슬래시 명령어</div>
        <div class="group">
          <div class="group-label">세션 제어</div>
          <div class="row">
            <div class="row-key"><code>/clear</code></div>
            <div class="row-desc">화면과 대화 초기화</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/new</code></div>
            <div class="row-desc">새 대화 시작</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/resume</code></div>
            <div class="row-desc">저장된 대화 재개</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/fork</code></div>
            <div class="row-desc">현재 대화 분기</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/compact</code></div>
            <div class="row-desc">컨텍스트 절약</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/copy</code></div>
            <div class="row-desc">마지막 응답 복사</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/status</code></div>
            <div class="row-desc">모델/권한/토큰 확인</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/debug-config</code></div>
            <div class="row-desc">config 레이어 진단</div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>/side</code></div>
            <div class="row-desc">사이드 대화창 열기</div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>!</code></div>
            <div class="row-desc">셸 명령 대기열 입력</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">작업 흐름</div>
          <div class="row">
            <div class="row-key"><code>/plan</code></div>
            <div class="row-desc">계획 모드 전환</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/diff</code></div>
            <div class="row-desc">Git diff 검토</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/review</code></div>
            <div class="row-desc">작업 트리 리뷰</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/mention</code></div>
            <div class="row-desc">파일/폴더 첨부</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/agent</code></div>
            <div class="row-desc">에이전트 스레드 전환</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/ps</code></div>
            <div class="row-desc">백그라운드 터미널 상태</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/mcp [verbose]</code></div>
            <div class="row-desc">MCP 도구 목록 및 상세 진단 <span class="badge-new">NEW</span></div>
          </div>
          <div class="row">
            <div class="row-key"><code>/apps</code></div>
            <div class="row-desc">앱/커넥터 삽입</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">설정 전환</div>
          <div class="row">
            <div class="row-key"><code>/model</code></div>
            <div class="row-desc">모델 및 추론 수준 변경</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/fast</code></div>
            <div class="row-desc">Fast mode on/off/status</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/permissions</code></div>
            <div class="row-desc">승인 정책 변경</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/personality</code></div>
            <div class="row-desc">friendly / pragmatic / none</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/experimental</code></div>
            <div class="row-desc">실험 기능 토글</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/statusline</code></div>
            <div class="row-desc">하단 상태줄 항목 구성</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/logout</code></div>
            <div class="row-desc">로그아웃</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🔐 보안 &amp; 샌드박스</div>
        <div class="group">
          <div class="group-label">추천 조합</div>
          <div class="row cl-tip">
            <div class="row-key"><code>--sandbox read-only -a on-request</code></div>
            <div class="row-desc">안전한 브라우징/질의응답</div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>--sandbox workspace-write -a untrusted</code></div>
            <div class="row-desc">파일 편집 허용, 위험 명령 승인</div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>--sandbox danger-full-access</code></div>
            <div class="row-desc">완전 무제한 샌드박스 <span class="badge-warn">위험</span></div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>--full-auto</code></div>
            <div class="row-desc">로컬 자동화 프리셋</div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>--yolo</code></div>
            <div class="row-desc">완전 우회, 격리 환경에서만 <span class="badge-warn">위험</span></div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">네트워크 / 보호 경로</div>
          <div class="row cl-tip">
            <div class="row-key"><code>[sandbox_workspace_write]</code></div>
            <div class="row-desc">세부 샌드박스 설정</div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>web_search = "cached"</code></div>
            <div class="row-desc">기본 검색 캐시 모드</div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>web_search = "live"</code></div>
            <div class="row-desc">실시간 검색 또는 <code>--search</code></div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>deny-read</code></div>
            <div class="row-desc">파일 읽기 명시적 차단 규칙</div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>Plan Mode</code></div>
            <div class="row-desc">격리된 작업 공간 제공</div>
          </div>
        </div>
      </div>

      <div class="section wide">
        <div class="section-title">⚙️ 설정 &amp; 파일</div>
        <div class="cols2">
          <div>
            <div class="group">
              <div class="group-label">주요 파일 위치</div>
              <div class="row">
                <div class="row-key"><code>~/.codex/config.toml</code></div>
                <div class="row-desc">사용자 기본 설정</div>
              </div>
              <div class="row">
                <div class="row-key"><code>.codex/config.toml</code></div>
                <div class="row-desc">프로젝트별 설정</div>
              </div>
              <div class="row">
                <div class="row-key"><code>~/.codex/auth.json</code></div>
                <div class="row-desc">파일 기반 인증 캐시</div>
              </div>
              <div class="row">
                <div class="row-key"><code>AGENTS.md</code></div>
                <div class="row-desc">리포지토리 작업 지침</div>
              </div>
              <div class="row">
                <div class="row-key"><code>~/.codex/skills</code></div>
                <div class="row-desc">사용자 스킬</div>
              </div>
              <div class="row">
                <div class="row-key"><code>.codex/skills</code></div>
                <div class="row-desc">프로젝트 스킬</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">자주 바꾸는 옵션</div>
              <div class="row">
                <div class="row-key"><code>model = "gpt-5.4"</code></div>
                <div class="row-desc">기본 모델</div>
              </div>
              <div class="row">
                <div class="row-key"><code>approval_policy = "on-request"</code></div>
                <div class="row-desc">승인 정책</div>
              </div>
              <div class="row">
                <div class="row-key"><code>sandbox_mode = "workspace-write"</code></div>
                <div class="row-desc">샌드박스 정책</div>
              </div>
              <div class="row">
                <div class="row-key"><code>model_reasoning_effort = "high"</code></div>
                <div class="row-desc">추론 강도</div>
              </div>
              <div class="row">
                <div class="row-key"><code>personality = "friendly"</code></div>
                <div class="row-desc">응답 스타일</div>
              </div>
              <div class="row">
                <div class="row-key"><code>log_dir = "./.codex-log"</code></div>
                <div class="row-desc">로그 저장 경로</div>
              </div>
              <div class="row">
                <div class="row-key"><code>cli_auth_credentials_store = "keyring"</code></div>
                <div class="row-desc">인증 저장소</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">기능 플래그</div>
              <div class="row">
                <div class="row-key"><code>[features]</code></div>
                <div class="row-desc">옵션 기능 on/off</div>
              </div>
              <div class="row">
                <div class="row-key"><code>fast_mode = true</code></div>
                <div class="row-desc">Fast mode</div>
              </div>
              <div class="row">
                <div class="row-key"><code>multi_agent = true</code></div>
                <div class="row-desc">서브에이전트 협업</div>
              </div>
              <div class="row">
                <div class="row-key"><code>shell_snapshot = true</code></div>
                <div class="row-desc">반복 명령 가속</div>
              </div>
              <div class="row">
                <div class="row-key"><code>smart_approvals = false</code></div>
                <div class="row-desc">실험 기능</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex_hooks = false</code></div>
                <div class="row-desc">훅 엔진 (실험)</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">플러그인 · MCP</div>
              <div class="row">
                <div class="row-key"><code>.codex-plugin/plugin.json</code></div>
                <div class="row-desc">플러그인 manifest</div>
              </div>
              <div class="row">
                <div class="row-key"><code>skills/</code></div>
                <div class="row-desc">패키징된 스킬</div>
              </div>
              <div class="row">
                <div class="row-key"><code>.mcp.json</code></div>
                <div class="row-desc">MCP 매핑</div>
              </div>
              <div class="row">
                <div class="row-key"><code>.app.json</code></div>
                <div class="row-desc">App/connector 매핑</div>
              </div>
              <div class="row">
                <div class="row-key"><code>marketplace add</code></div>
                <div class="row-desc">마켓플레이스 원격 설치 <span class="badge-new">NEW</span></div>
              </div>
              <div class="row">
                <div class="row-key"><code>~/.codex/plugins/</code></div>
                <div class="row-desc">사용자 스코프 플러그인</div>
              </div>
              <div class="row">
                <div class="row-key"><code>./plugins/</code></div>
                <div class="row-desc">로컬 플러그인 디렉터리</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">⊞ Windows &amp; WSL</div>
        <div class="group">
          <div class="group-label">Windows 설정</div>
          <div class="row">
            <div class="row-key"><code>[windows]</code></div>
            <div class="row-desc">Windows 전용 섹션</div>
          </div>
          <div class="row">
            <div class="row-key"><code>sandbox = "elevated"</code></div>
            <div class="row-desc">높은 권한 샌드박스 (권장)</div>
          </div>
          <div class="row">
            <div class="row-key"><code>sandbox = "unelevated"</code></div>
            <div class="row-desc">일반 권한 대안</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/sandbox-add-read-dir C:\path</code></div>
            <div class="row-desc">Windows 읽기 경로 추가</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">WSL 사용</div>
          <div class="row">
            <div class="row-key"><code>wsl --install</code></div>
            <div class="row-desc">WSL 설치</div>
          </div>
          <div class="row">
            <div class="row-key"><code>code .</code></div>
            <div class="row-desc">WSL 터미널에서 VS Code 열기</div>
          </div>
          <div class="row">
            <div class="row-key"><code>npm i -g @openai/codex</code></div>
            <div class="row-desc">WSL 안에서 Codex 설치</div>
          </div>
          <div class="row">
            <div class="row-key"><code>chatgpt.runCodexInWindowsSubsystemForLinux</code></div>
            <div class="row-desc">VS Code WSL 설정</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">⌨️ TUI 단축키</div>
        <div class="group">
          <div class="group-label">제어</div>
          <div class="krow cl-tip" data-tt-title="Ctrl+C — 중단" data-tt-desc="실행 중인 명령을 강제 중단합니다.">
            <div class="kkey"><kbd>Ctrl</kbd><span class="plus">+</span><kbd>C</kbd></div>
            <div class="kdesc">실행 중단</div>
          </div>
          <div class="krow cl-tip" data-tt-title="Ctrl+D — 종료" data-tt-desc="세션을 안전하게 종료합니다.">
            <div class="kkey"><kbd>Ctrl</kbd><span class="plus">+</span><kbd>D</kbd></div>
            <div class="kdesc">종료</div>
          </div>
          <div class="krow cl-tip" data-tt-title="Ctrl+L — 화면 초기화" data-tt-desc="터미널 화면을 비우고 다시 그립니다.">
            <div class="kkey"><kbd>Ctrl</kbd><span class="plus">+</span><kbd>L</kbd></div>
            <div class="kdesc">화면 초기화</div>
          </div>
          <div class="krow cl-tip" data-tt-title="Ctrl+G — 전문 편집" data-tt-desc="외부 편집기에서 프롬프트를 작성합니다.">
            <div class="kkey"><kbd>Ctrl</kbd><span class="plus">+</span><kbd>G</kbd></div>
            <div class="kdesc">편집기 열기</div>
          </div>
          <div class="krow cl-tip" data-tt-title="Alt+, / Alt+. — 추론 조절" data-tt-desc="모델의 추론(reasoning) 강도를 임시로 낮추거나 높입니다.">
            <div class="kkey"><kbd>Alt</kbd><span class="plus">+</span><kbd>,</kbd> / <kbd>.</kbd></div>
            <div class="kdesc">추론 강도 조절 <span class="badge-new">NEW</span></div>
          </div>
          <div class="krow cl-tip" data-tt-title="Ctrl+R — 히스토리 검색" data-tt-desc="과거 입력 기록을 검색합니다.">
            <div class="kkey"><kbd>Ctrl</kbd><span class="plus">+</span><kbd>R</kbd></div>
            <div class="kdesc">히스토리 역방향 검색</div>
          </div>
          <div class="krow cl-tip" data-tt-title="Enter — 전송" data-tt-desc="프롬프트를 전송합니다.">
            <div class="kkey"><kbd>Enter</kbd></div>
            <div class="kdesc">전송</div>
          </div>
          <div class="krow cl-tip" data-tt-title="Shift+Enter — 새 줄" data-tt-desc="전송하지 않고 다음 줄로 이동합니다.">
            <div class="kkey"><kbd>Shift</kbd><span class="plus">+</span><kbd>Enter</kbd></div>
            <div class="kdesc">줄바꿈</div>
          </div>
          <div class="krow cl-tip" data-tt-title="Esc Esc — 되감기" data-tt-desc="상태 요약 또는 작업 되감기를 수행합니다.">
            <div class="kkey"><kbd>Esc</kbd><kbd>Esc</kbd></div>
            <div class="kdesc">되감기 / 요약</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">입력</div>
          <div class="krow">
            <div class="kkey"><kbd>/</kbd></div>
            <div class="kdesc">슬래시 명령어</div>
          </div>
          <div class="krow">
            <div class="kkey"><kbd>↑</kbd> <kbd>↓</kbd></div>
            <div class="kdesc">히스토리 탐색</div>
          </div>
          <div class="krow">
            <div class="kkey"><kbd>@</kbd></div>
            <div class="kdesc">파일/폴더 멘션</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🗄️ 메모리 시스템</div>
        <div class="group">
          <div class="group-label">TUI 제어</div>
          <div class="row">
            <div class="row-key">모드 전환</div>
            <div class="row-desc">TUI 메뉴에서 on / off / auto</div>
          </div>
          <div class="row">
            <div class="row-key">메모리 리셋</div>
            <div class="row-desc">현재 메모리 내용 초기화</div>
          </div>
          <div class="row">
            <div class="row-key">메모리 삭제</div>
            <div class="row-desc">메모리 영구 삭제</div>
          </div>
          <div class="row">
            <div class="row-key">확장 정리</div>
            <div class="row-desc">오래된 항목 압축</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">실험 기능 (features)</div>
          <div class="row">
            <div class="row-key"><code>codex_hooks = false</code></div>
            <div class="row-desc">훅 엔진 활성화 (opt-in)</div>
          </div>
          <div class="row">
            <div class="row-key"><code>smart_approvals = false</code></div>
            <div class="row-desc">스마트 승인 실험 기능</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">컨텍스트 파일</div>
          <div class="row cl-tip">
            <div class="row-key"><code>AGENTS.md</code></div>
            <div class="row-desc">리포지토리 작업 지침 (공유)</div>
          </div>
          <div class="row cl-tip">
            <div class="row-key"><code>.codex/instructions.md</code></div>
            <div class="row-desc">프로젝트 지침 (비공유 가능)</div>
          </div>
        </div>
      </div>

      <div class="section full">
        <div class="section-title">🧠 모델 · 워크플로 · 빠른 시작</div>
        <div class="cols3">
          <div>
            <div class="group">
              <div class="group-label">모델 선택</div>
              <div class="row">
                <div class="row-key"><code>gpt-5.4</code></div>
                <div class="row-desc">대부분의 전문 작업용 기본 선택</div>
              </div>
              <div class="row">
                <div class="row-key"><code>gpt-5.4-mini</code></div>
                <div class="row-desc">빠른 탐색, 경량 서브에이전트</div>
              </div>
              <div class="row">
                <div class="row-key"><code>gpt-5.3-codex-spark</code></div>
                <div class="row-desc">실시간/초저지연 연구 프리뷰</div>
              </div>
              <div class="row">
                <div class="row-key"><code>amazon-bedrock</code></div>
                <div class="row-desc">AWS 연동 모델 <span class="badge-new">NEW</span></div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex --model gpt-5.4-mini</code></div>
                <div class="row-desc">CLI에서 즉시 전환</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/model</code></div>
                <div class="row-desc">세션 중 모델 전환</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/fast on</code></div>
                <div class="row-desc">GPT-5.4 계열 빠른 경로</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/fast status</code></div>
                <div class="row-desc">현재 상태 확인</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">Cloud / 비동기</div>
              <div class="row">
                <div class="row-key"><code>codex cloud exec --attempts 3</code></div>
                <div class="row-desc">best-of-N 스타일 시도</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">권장 워크플로</div>
              <div class="row">
                <div class="row-desc">1. 깨끗한 Git 상태에서 시작</div>
              </div>
              <div class="row">
                <div class="row-desc">2. <code>/plan</code> 또는 read-only로 먼저 방향 확인</div>
              </div>
              <div class="row">
                <div class="row-desc">3. Auto 또는 workspace-write로 구현</div>
              </div>
              <div class="row">
                <div class="row-desc">4. <code>/diff</code> 와 <code>/review</code> 로 검토</div>
              </div>
              <div class="row">
                <div class="row-desc">5. 테스트 후 커밋/PR 생성</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">운영 팁</div>
              <div class="row">
                <div class="row-desc">API 키 자동화보다 로컬 사용은 ChatGPT 로그인 권장</div>
              </div>
              <div class="row">
                <div class="row-desc">원격/헤드리스 환경은 <code>--device-auth</code> 우선 검토</div>
              </div>
              <div class="row">
                <div class="row-desc">프로젝트 규칙은 <code>AGENTS.md</code> 와 <code>.codex/</code> 에 모음</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">설치 &amp; 로그인</div>
              <div class="row">
                <div class="row-key"><code>npm i -g @openai/codex</code></div>
                <div class="row-desc">Codex CLI 전역 설치</div>
              </div>
              <div class="row">
                <div class="row-key"><code>brew install --cask codex</code></div>
                <div class="row-desc">macOS 대안 설치</div>
              </div>
              <div class="row">
                <div class="row-key"><code>npm i -g @openai/codex@latest</code></div>
                <div class="row-desc">최신 버전 업그레이드</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex login</code></div>
                <div class="row-desc">기본 브라우저 OAuth 로그인</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex login --device-auth</code></div>
                <div class="row-desc">헤드리스/원격 장치용</div>
              </div>
              <div class="row">
                <div class="row-key"><code>printenv OPENAI_API_KEY | codex login --with-api-key</code></div>
                <div class="row-desc">API 키 인증</div>
              </div>
              <div class="row">
                <div class="row-key"><code>codex login status</code></div>
                <div class="row-desc">인증 상태 확인</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div><!-- /main (codex) -->

    <div class="footer-modes">
      <strong>핵심 설정:</strong>
      &nbsp;<code>model</code>
      &nbsp;·&nbsp;<code>approval_policy</code>
      &nbsp;·&nbsp;<code>sandbox_mode</code>
      &nbsp;·&nbsp;<code>web_search</code>
      &nbsp;·&nbsp;<code>model_reasoning_effort</code>
      &nbsp;·&nbsp;<code>personality</code>
      &nbsp;·&nbsp;<code>cli_auth_credentials_store</code>
      <br><br>
      <div style="text-align:center;font-size:11px;color:var(--muted2);margin-top:4px;">
        공식 참고: OpenAI Developers Codex Docs · openai/codex GitHub · Codex Changelog
      </div>
    </div>

  </div><!-- /tab-codex -->


  
`;
