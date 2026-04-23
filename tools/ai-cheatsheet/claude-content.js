const claudeContent = `
<!--  CLAUDE CODE PANE                             -->
  <!-- ══════════════════════════════════════════════ -->
  <div id="tab-claude" class="tab-pane claude-pane active">

    <div class="page-header">
      <div style="display:flex;align-items:center;gap:10px;">
        <h1>Claude Code <span>Cheat Sheet</span></h1>
        <span style="font-size:10px;color:var(--muted);">⊞ Windows 단축키 기준</span>
      </div>
      <div class="meta">
        <span class="meta-version">v2.1.116</span>
        <span style="font-size:10px;color:var(--muted2);">2026-04-21</span>
      </div>
    </div>

    <div class="changelog-wrap">
      <div class="changelog-toggle" onclick="toggleCL(this)">
        <span class="arrow">▶</span>
        <span>📋 최근 변경사항 (v2.1.116)</span>
      </div>
      <div class="changelog-body">
        <ul>
          <li class="cl-tip" data-tt-title="v2.1.113~v2.1.116 업데이트"
            data-tt-desc="sandbox.network.deniedDomains 설정 추가, Ctrl+A/E, Ctrl+Backspace(Win) 단축키 지원. /ultrareview는 이제 병렬 체크 및 diffstat을 표시합니다. 네이티브 바이너리로 실행 방식이 최적화되었습니다."
            data-tt-example="">v2.1.113~v2.1.116 업데이트 — <code>deniedDomains</code> 설정, 신규 단축키 및 네이티브 바이너리 도입 <span
              class="badge-new">NEW</span></li>
        </ul>

        <div class="hist-divider" onclick="toggleHist('claude')">🕰️ 이전 버전 히스토리 보기 <span class="hist-arrow">▼</span>
        </div>
        <div id="hist-claude" class="history-container">

          <details class="ver-group">
            <summary>v2.1.112</summary>
            <ul>
              <li class="cl-tip" data-tt-title="claude-opus-4.7 auto 모드 수정 (v2.1.112)"
                data-tt-desc="auto 모드에서 claude-opus-4-7이 일시적으로 사용 불가하다는 오류가 수정됐습니다." data-tt-example="">auto 모드에서
                <code>claude-opus-4-7</code> 일시 사용 불가 오류 수정</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v2.1.111</summary>
            <ul>
              <li class="cl-tip" data-tt-title="/ultrareview 명령어 (v2.1.111)"
                data-tt-desc="병렬 멀티에이전트 분석으로 클라우드에서 종합 코드 리뷰를 실행합니다. PR 번호를 지정하면 GitHub PR을 바로 리뷰합니다."
                data-tt-example=""><code>/ultrareview</code> 명령어 추가 — 클라우드 병렬 멀티에이전트 코드 리뷰</li>
              <li class="cl-tip" data-tt-title="/ultraplan 명령어 (v2.1.111)"
                data-tt-desc="로컬 터미널과 분리하여 클라우드에서 병렬 멀티에이전트 플래닝을 실행합니다. 웹 UI에서 검토 및 실시간 수정이 가능하며 완료 후 로컬로 텔레포트할 수 있습니다."
                data-tt-example="/ultraplan &quot;플랫폼 리팩토링 계획 수립&quot;"><code>/ultraplan</code> 명령어 추가 — 클라우드 병렬 멀티에이전트
                플래닝</li>
              <li class="cl-tip" data-tt-title="xhigh effort 레벨 (v2.1.111)"
                data-tt-desc="Opus 4.7 전용 xhigh effort가 추가됩니다. high와 max 사이에 위치하며 /effort, --effort, 모델 피커에서 선택할 수 있습니다. 다른 모델은 high로 폴백됩니다."
                data-tt-example="/effort xhigh">Opus 4.7 전용 <code>xhigh</code> effort 레벨 추가</li>
              <li class="cl-tip" data-tt-title="/less-permission-prompts 스킬 (v2.1.111)"
                data-tt-desc="트랜스크립트를 분석해 자주 쓰이는 읽기 전용 Bash·MCP 도구 호출을 파악하고, .claude/settings.json에 추가할 allowlist를 자동 제안합니다."
                data-tt-example="/less-permission-prompts"><code>/less-permission-prompts</code> 스킬 추가 — allowlist 자동 제안
              </li>
              <li class="cl-tip" data-tt-title="/effort 인터랙티브 슬라이더 (v2.1.111)"
                data-tt-desc="/effort를 인자 없이 사용하면 화살표 키로 레벨을 선택하고 Enter로 확인하는 인터랙티브 슬라이더가 열립니다."
                data-tt-example="/effort"><code>/effort</code> 인자 없이 실행 시 인터랙티브 슬라이더 표시</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v2.1.110</summary>
            <ul>
              <li class="cl-tip" data-tt-title="/tui fullscreen (v2.1.110)"
                data-tt-desc="/tui fullscreen 명령으로 동일 대화를 유지한 채 깜박임 없는 전체화면 렌더링으로 전환합니다. tui 설정으로도 기본값 지정 가능합니다."
                data-tt-example="/tui fullscreen"><code>/tui fullscreen</code> 명령 추가 — 깜박임 없는 전체화면 TUI 전환</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v2.1.107</summary>
            <ul>
              <li class="cl-tip" data-tt-title="thinking 힌트 조기 표시 (v2.1.107)"
                data-tt-desc="확장 사고 중 긴 작업에서 상태 힌트가 훨씬 빠르게 나타납니다. 응답 대기 중 상태를 더 빨리 확인할 수 있습니다." data-tt-example="">긴 작업
                중 thinking 힌트를 더 빠르게 표시</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v2.1.105</summary>
            <ul>
              <li class="cl-tip" data-tt-title="PreCompact 훅 지원 (v2.1.105)"
                data-tt-desc="컴팩션 직전에 훅을 실행합니다. exit 2 또는 JSON decision:block으로 컴팩션을 차단할 수 있습니다."
                data-tt-example="{&quot;hooks&quot;:{&quot;PreCompact&quot;:[{&quot;command&quot;:&quot;./check.sh&quot;}]}}">
                PreCompact 훅 지원 추가 — 컴팩션 차단 가능 (exit 2 또는 <code>{"decision":"block"}</code>)</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v2.1.101</summary>
            <ul>
              <li class="cl-tip" data-tt-title="/team-onboarding (v2.1.101)"
                data-tt-desc="현재 프로젝트의 Claude Code 사용 패턴을 분석해 신규 팀원용 온보딩 가이드를 자동 생성합니다."
                data-tt-example="/team-onboarding"><code>/team-onboarding</code> 명령어 추가 — 팀원 온보딩 가이드 생성</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v2.1.94</summary>
            <ul>
              <li class="cl-tip" data-tt-title="기본 effort high로 상향 (v2.1.94)"
                data-tt-desc="API키·Bedrock·Vertex·Team·Enterprise 사용자의 기본 effort가 medium → high로 변경됐습니다. /effort 명령으로 조정 가능합니다."
                data-tt-example="/effort medium  # 속도 우선&#10;/effort high    # 새 기본값">기본 노력 수준이
                API키·Bedrock·Vertex·Enterprise 사용자는 <code>medium</code>에서 <code>high</code>로 변경</li>
            </ul>
          </details>

          <details class="ver-group">
            <summary>v2.1.92</summary>
            <ul>
              <li class="cl-tip" data-tt-title="/vim 제거 (v2.1.92)"
                data-tt-desc="/vim 명령어가 제거됐습니다. Vim 모드는 /config → Editor mode에서 설정합니다."
                data-tt-example="/config  # → Editor mode → Vim"><code>/vim</code> 명령어 제거됨 — Vim 모드는
                <code>/config</code> → Editor mode에서 설정</li>
            </ul>
          </details>
        </div>
      </div>
    </div>

    <div class="main">

      <div class="section">
        <div class="section-title">🔧 스킬 &amp; 에이전트</div>
        <div class="group">
          <div class="group-label">내장 스킬</div>
          <div class="row">
            <div class="row-key"><code>/simplify</code></div>
            <div class="row-desc">코드 리뷰 (병렬 에이전트 3개)</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/ultrareview</code></div>
            <div class="row-desc">종합 코드 리뷰 (클라우드 병렬) <span class="badge-new">NEW</span></div>
          </div>
          <div class="row">
            <div class="row-key"><code>/ultraplan</code></div>
            <div class="row-desc">클라우드 병렬 플래닝 (분리 실행) <span class="badge-new">NEW</span></div>
          </div>
          <div class="row">
            <div class="row-key"><code>/batch</code></div>
            <div class="row-desc">대규모 병렬 변경 (5-30 워크트리)</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/debug [desc]</code></div>
            <div class="row-desc">디버그 로그로 문제 해결</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/loop [interval]</code></div>
            <div class="row-desc">반복 예약 작업</div>
          </div>
          <div class="row">
            <div class="row-key"><code>/claude-api</code></div>
            <div class="row-desc">API + SDK 참조 로드</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">커스텀 스킬 위치</div>
          <div class="row">
            <div class="row-key"><code>.claude/skills/&lt;n&gt;/</code></div>
            <div class="row-desc">프로젝트 스킬</div>
          </div>
          <div class="row">
            <div class="row-key"><code>~/.claude/skills/&lt;n&gt;/</code></div>
            <div class="row-desc">개인 스킬</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">스킬 프론트매터</div>
          <div class="row">
            <div class="row-key"><code>description</code></div>
            <div class="row-desc">자동 호출 트리거</div>
          </div>
          <div class="row">
            <div class="row-key"><code>allowed-tools</code></div>
            <div class="row-desc">권한 프롬프트 생략</div>
          </div>
          <div class="row">
            <div class="row-key"><code>model</code></div>
            <div class="row-desc">스킬용 모델 재정의</div>
          </div>
          <div class="row">
            <div class="row-key"><code>effort</code></div>
            <div class="row-desc">노력 수준 재정의</div>
          </div>
          <div class="row">
            <div class="row-key"><code>paths: [globs]</code></div>
            <div class="row-desc">경로별 적용</div>
          </div>
          <div class="row">
            <div class="row-key"><code>context: fork</code></div>
            <div class="row-desc">서브에이전트에서 실행</div>
          </div>
          <div class="row">
            <div class="row-key"><code>$ARGUMENTS</code></div>
            <div class="row-desc">사용자 입력 플레이스홀더</div>
          </div>
          <div class="row">
            <div class="row-key"><code>\${CLAUDE_SKILL_DIR}</code></div>
            <div class="row-desc">스킬 자신의 디렉터리</div>
          </div>
          <div class="row">
            <div class="row-key"><code>!\`cmd\`</code></div>
            <div class="row-desc">동적 컨텍스트 주입</div>
          </div>
          <div class="row">
            <div class="row-key"><code>plugin bin/</code></div>
            <div class="row-desc">Bash 도구용 실행 파일</div>
          </div>
        </div>
      </div>

      <div class="section wide">
        <div class="section-title">🖥️ CLI &amp; 플래그</div>
        <div class="cols2">
          <div>
            <div class="group">
              <div class="group-label">핵심 명령</div>
              <div class="row">
                <div class="row-key"><code>claude</code></div>
                <div class="row-desc">대화형 시작</div>
              </div>
              <div class="row">
                <div class="row-key"><code>claude "q"</code></div>
                <div class="row-desc">프롬프트와 함께 시작</div>
              </div>
              <div class="row">
                <div class="row-key"><code>claude -p "q"</code></div>
                <div class="row-desc">헤드리스 (비대화형)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>claude -c</code></div>
                <div class="row-desc">마지막 대화 이어가기</div>
              </div>
              <div class="row">
                <div class="row-key"><code>claude -r "n"</code></div>
                <div class="row-desc">이름으로 세션 재개</div>
              </div>
              <div class="row">
                <div class="row-key"><code>claude update</code></div>
                <div class="row-desc">업데이트</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">내장 에이전트</div>
              <div class="row cl-tip">
                <div class="row-key"><code>Explore</code></div>
                <div class="row-desc">빠른 읽기 전용 (Haiku)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>Plan</code></div>
                <div class="row-desc">플랜 모드용 리서치</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>General</code></div>
                <div class="row-desc">전체 도구, 복잡한 태스크</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>Bash</code></div>
                <div class="row-desc">터미널 별도 컨텍스트</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>claude agents</code></div>
                <div class="row-desc">서브에이전트 목록 확인</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">에이전트 프론트매터</div>
              <div class="row">
                <div class="row-key"><code>permissionMode</code></div>
                <div class="row-desc">default/acceptEdits/plan/bypass</div>
              </div>
              <div class="row">
                <div class="row-key"><code>isolation: worktree</code></div>
                <div class="row-desc">git 워크트리에서 실행</div>
              </div>
              <div class="row">
                <div class="row-key"><code>memory:</code></div>
                <div class="row-desc">user|project|local 영구 메모리</div>
              </div>
              <div class="row">
                <div class="row-key"><code>background: true</code></div>
                <div class="row-desc">백그라운드 태스크</div>
              </div>
              <div class="row">
                <div class="row-key"><code>maxTurns</code></div>
                <div class="row-desc">에이전트 턴 제한</div>
              </div>
              <div class="row">
                <div class="row-key"><code>initialPrompt</code></div>
                <div class="row-desc">첫 턴 자동 제출</div>
              </div>
              <div class="row">
                <div class="row-key"><code>SendMessage</code></div>
                <div class="row-desc">에이전트 재개 (resume 대체)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>@agent-name</code></div>
                <div class="row-desc">하위 에이전트 멘션</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">주요 플래그</div>
              <div class="row">
                <div class="row-key"><code>--model</code></div>
                <div class="row-desc">모델 지정</div>
              </div>
              <div class="row">
                <div class="row-key"><code>-w</code></div>
                <div class="row-desc">Git 워크트리</div>
              </div>
              <div class="row">
                <div class="row-key"><code>-n / --name</code></div>
                <div class="row-desc">세션 이름 지정</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--add-dir</code></div>
                <div class="row-desc">작업 디렉터리 추가</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--agent</code></div>
                <div class="row-desc">에이전트 사용</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--allowedTools</code></div>
                <div class="row-desc">도구 사전 승인</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--output-format</code></div>
                <div class="row-desc">json/stream 출력</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--json-schema</code></div>
                <div class="row-desc">구조화 출력 스키마</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--max-turns</code></div>
                <div class="row-desc">최대 턴 수 제한</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--max-budget-usd</code></div>
                <div class="row-desc">비용 상한</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--console</code></div>
                <div class="row-desc">Anthropic Console 인증</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--verbose</code></div>
                <div class="row-desc">상세 로그</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--bare</code></div>
                <div class="row-desc">최소 헤드리스 (훅/LSP 없음)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--channels</code></div>
                <div class="row-desc">권한 릴레이 / MCP 푸시</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--remote</code></div>
                <div class="row-desc">웹 세션 연결</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--effort</code></div>
                <div class="row-desc">low/medium/high/xhigh/max <span class="badge-new">NEW</span></div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--teleport</code></div>
                <div class="row-desc">웹 세션을 터미널에서 재개</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--fork-session</code></div>
                <div class="row-desc">재개 시 새 세션 ID 생성</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--permission-mode</code></div>
                <div class="row-desc">plan/default/acceptEdits…</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--dangerously-skip-permissions</code></div>
                <div class="row-desc">모든 프롬프트 생략 <span class="badge-warn">⚠️</span></div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--chrome</code></div>
                <div class="row-desc">Chrome 연동</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--maintenance</code></div>
                <div class="row-desc">유지보수 훅 실행</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>--tmux</code></div>
                <div class="row-desc">Worktree용 tmux 세션 생성</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section" style="padding:14px 16px 16px;">
        <div class="section-title">⌨️ 키보드 단축키</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 16px;">
          <div>
            <div class="group">
              <div class="group-label">일반 제어</div>
              <div class="row cl-tip" data-tt-title="Ctrl+C — 입력 취소"
                data-tt-desc="현재 입력 중인 텍스트를 모두 지우거나, 실행 중인 AI의 응답 생성을 강제로 중단합니다.">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>C</kbd></div>
                <div class="kdesc">입력/생성 취소</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+D — 세션 종료"
                data-tt-desc="현재 작업을 저장하고 세션을 종료합니다. 터미널의 EOF 명령과 동일하게 동작합니다.">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>D</kbd></div>
                <div class="kdesc">세션 종료</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+L — 화면 다시그리기"
                data-tt-desc="화면의 모든 내용을 지우고 프롬프트를 맨 위로 올립니다. TUI 렌더링이 깨졌을 때 유용합니다.">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>L</kbd></div>
                <div class="kdesc">입력 초기화 + 화면 다시그리기</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+O — 트랜스크립트 뷰어"
                data-tt-desc="실행된 도구의 상세 입출력 로그(트랜스크립트)를 볼 수 있는 데이터 뷰어를 토글합니다.">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>O</kbd></div>
                <div class="kdesc">트랜스크립트 뷰어 토글</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+U — 버퍼 지우기" data-tt-desc="입력 창에 작성된 모든 내용을 한 번에 지웁니다.">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>U</kbd></div>
                <div class="kdesc">전체 입력 버퍼 지우기</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+Y — 삭제 복원" data-tt-desc="Ctrl+U 등으로 지운 텍스트를 다시 불러옵니다. (Yank)">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>Y</kbd></div>
                <div class="kdesc">지운 입력 복원</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+R — 히스토리 검색"
                data-tt-desc="이전 세션에서 입력했던 프롬프트 기록을 역방향으로 검색합니다.">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>R</kbd></div>
                <div class="kdesc">히스토리 검색</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+G — 편집기 열기"
                data-tt-desc="시스템 기본 에디터(VS Code 등)를 열어 긴 프롬프트나 코드를 자유롭게 편집합니다.">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>G</kbd></div>
                <div class="kdesc">프롬프트 편집기 열기</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+B — 백그라운드 전환"
                data-tt-desc="현재 실행 중인 작업을 백그라운드로 돌리고 다른 명령을 입력할 수 있게 합니다.">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>B</kbd></div>
                <div class="kdesc">백그라운드 실행</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+X Ctrl+K — 에이전트 중지"
                data-tt-desc="실행 중인 모든 백그라운드 에이전트와 서브태스크를 즉시 강제 중지합니다.">
                <div class="row-key"><code>Ctrl+X</code> <code>Ctrl+K</code></div>
                <div class="kdesc">모든 백그라운드 에이전트 중지</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+T — 작업 목록" data-tt-desc="현재 진행 중이거나 대기 중인 모든 태스크 목록 창을 엽니다.">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>T</kbd></div>
                <div class="kdesc">태스크 목록 전환</div>
              </div>
              <div class="row cl-tip" data-tt-title="Ctrl+V — 이미지 첨부" data-tt-desc="클립보드의 이미지를 현재 프롬프트에 즉시 첨부합니다.">
                <div class="row-key"><code>Ctrl</code><span class="plus">+</span><kbd>V</kbd></div>
                <div class="kdesc">이미지 붙여넣기</div>
              </div>
              <div class="row cl-tip" data-tt-title="Esc Esc — 요약 및 되감기"
                data-tt-desc="현재 진행 과정을 중단하고 요약하거나, 최근 체크포인트로 되돌립니다.">
                <div class="row-key"><kbd>Esc</kbd><kbd>Esc</kbd></div>
                <div class="kdesc">되감기 / 요약</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">모드 전환</div>
              <div class="krow">
                <div class="kkey"><kbd>Shift</kbd><span class="plus">+</span><kbd>Tab</kbd></div>
                <div class="kdesc">권한 모드 순환</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>Alt</kbd><span class="plus">+</span><kbd>P</kbd></div>
                <div class="kdesc">모델 전환</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>Alt</kbd><span class="plus">+</span><kbd>T</kbd></div>
                <div class="kdesc">Thinking 모드</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>Alt</kbd><span class="plus">+</span><kbd>O</kbd></div>
                <div class="kdesc">빠른 모드</div>
              </div>
              <div class="krow">
                <div class="kkey"><code>/tui</code></div>
                <div class="kdesc">TUI 전체화면 전환 <span class="badge-new">NEW</span></div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">입력</div>
              <div class="krow">
                <div class="kkey"><kbd>\</kbd><kbd>Enter</kbd></div>
                <div class="kdesc">줄바꿈 (빠른)</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>Ctrl</kbd><span class="plus">+</span><kbd>J</kbd></div>
                <div class="kdesc">줄바꿈 (제어)</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>/</kbd></div>
                <div class="kdesc">슬래시 명령어</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>!</kbd></div>
                <div class="kdesc">직접 Bash 실행</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>@</kbd></div>
                <div class="kdesc">파일 자동완성</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">세션 선택기</div>
              <div class="krow">
                <div class="kkey"><kbd>↑</kbd><kbd>↓</kbd></div>
                <div class="kdesc">탐색</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>←</kbd><kbd>→</kbd></div>
                <div class="kdesc">확장/축소</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>P</kbd></div>
                <div class="kdesc">미리보기</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>R</kbd></div>
                <div class="kdesc">이름 변경</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>/</kbd></div>
                <div class="kdesc">검색</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">트랜스크립트 (Ctrl+O)</div>
              <div class="krow">
                <div class="kkey"><kbd>/</kbd></div>
                <div class="kdesc">검색</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>N</kbd> / <kbd>⇧N</kbd></div>
                <div class="kdesc">다음/이전</div>
              </div>
              <div class="krow">
                <div class="kkey"><kbd>Q</kbd> / <kbd>Esc</kbd></div>
                <div class="kdesc">종료</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section wide">
        <div class="section-title">⚡ 슬래시 명령어</div>
        <div class="cols3">
          <div>
            <div class="group">
              <div class="group-label">세션 (Session)</div>
              <div class="row cl-tip">
                <div class="row-key"><code>/clear</code></div>
                <div class="row-desc">대화 내용 초기화</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/compact [focus]</code></div>
                <div class="row-desc">컨텍스트 압축</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/recap</code></div>
                <div class="row-desc">세션 복귀 시 요약 보고</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/resume</code></div>
                <div class="row-desc">세션 재개/전환</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/rename [name]</code></div>
                <div class="row-desc">현재 세션 이름 변경</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/branch [name]</code></div>
                <div class="row-desc">대화 브랜치 생성 (/fork)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/cost</code></div>
                <div class="row-desc">토큰 사용량 통계</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/context</code></div>
                <div class="row-desc">컨텍스트 시각화 (그리드)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/diff</code></div>
                <div class="row-desc">인터랙티브 diff 뷰어</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/copy [N]</code></div>
                <div class="row-desc">마지막(N번째) 응답 복사</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/rewind</code></div>
                <div class="row-desc">코드/체크포인트 되감기 (/undo)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/export</code></div>
                <div class="row-desc">대화 내보내기</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">설정 (Config)</div>
              <div class="row">
                <div class="row-key"><code>/config</code></div>
                <div class="row-desc">설정 열기</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/model [model]</code></div>
                <div class="row-desc">모델 전환 (←→ effort)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/fast [on|off]</code></div>
                <div class="row-desc">빠른 모드 전환</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/theme</code></div>
                <div class="row-desc">컬러 테마 변경</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/permissions</code></div>
                <div class="row-desc">권한 보기/수정</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/effort [level]</code></div>
                <div class="row-desc">노력 수준 (xhigh 추가) <span class="badge-new">NEW</span></div>
              </div>
              <div class="row">
                <div class="row-key"><code>/color [color]</code></div>
                <div class="row-desc">프롬프트 바 색상 설정</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/keybindings</code></div>
                <div class="row-desc">키보드 단축키 커스텀</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/terminal-setup</code></div>
                <div class="row-desc">터미널 키바인딩 설정</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">도구 (Tools)</div>
              <div class="row cl-tip">
                <div class="row-key"><code>/init</code></div>
                <div class="row-desc">CLAUDE.md 생성</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/memory</code></div>
                <div class="row-desc">CLAUDE.md 및 메모리 파일 편집</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/mcp</code></div>
                <div class="row-desc">MCP 서버 관리</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/hooks</code></div>
                <div class="row-desc">훅 관리 (브라우저)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/skills</code></div>
                <div class="row-desc">사용 가능한 스킬 목록</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/agents</code></div>
                <div class="row-desc">에이전트 관리</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/chrome</code></div>
                <div class="row-desc">Chrome 연동</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/ide</code></div>
                <div class="row-desc">IDE 통합 상태 확인</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/reload-plugins</code></div>
                <div class="row-desc">플러그인 핫 리로드</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/add-dir &lt;path&gt;</code></div>
                <div class="row-desc">작업 디렉터리 추가</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">특수 (Special)</div>
              <div class="row">
                <div class="row-key"><code>/powerup</code></div>
                <div class="row-desc">인터랙티브 기능 학습</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/btw &lt;question&gt;</code></div>
                <div class="row-desc">컨텍스트 없는 사이드 질문</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/plan [desc]</code></div>
                <div class="row-desc">플랜 모드 (+ 자동 시작)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/review [PR]</code></div>
                <div class="row-desc">로컬 PR/파일 검토</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/loop [interval]</code></div>
                <div class="row-desc">반복 작업 스케줄링</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/voice</code></div>
                <div class="row-desc">음성 입력 (20개 언어)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/doctor</code></div>
                <div class="row-desc">설치 상태 진단</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/pr-comments [PR]</code></div>
                <div class="row-desc">GitHub PR 코멘트 가져오기</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/ultrareview</code></div>
                <div class="row-desc">멀티에이전트 코드 리뷰 <span class="badge-new">NEW</span></div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/ultraplan</code></div>
                <div class="row-desc">멀티에이전트 클라우드 플래닝 <span class="badge-new">NEW</span></div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">특수 (계속)</div>
              <div class="row">
                <div class="row-key"><code>/stats</code></div>
                <div class="row-desc">사용량 스트릭 &amp; 설정</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/insights</code></div>
                <div class="row-desc">세션 분석 리포트</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/focus</code></div>
                <div class="row-desc">포커스 뷰 전환 (fullscreen전용)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/desktop</code></div>
                <div class="row-desc">데스크탑 앱에서 계속</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/remote-control</code></div>
                <div class="row-desc">claude.ai/code 브릿지 (/rc)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/usage</code></div>
                <div class="row-desc">플랜 한도 &amp; 상태</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/schedule</code></div>
                <div class="row-desc">클라우드 예약 작업</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/security-review</code></div>
                <div class="row-desc">변경사항 보안 분석</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/help</code></div>
                <div class="row-desc">도움말 + 명령어 목록</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/feedback</code></div>
                <div class="row-desc">피드백 제출 (별칭: /bug)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/release-notes</code></div>
                <div class="row-desc">전체 변경 내역 보기</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/tui fullscreen</code></div>
                <div class="row-desc">전체화면 TUI <span class="badge-new">NEW</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🔌 MCP 서버</div>
        <div class="group">
          <div class="group-label">서버 추가</div>
          <div class="row">
            <div class="row-key"><code>--transport http</code></div>
            <div class="row-desc">원격 HTTP <strong style="color:var(--new-text)">권장</strong></div>
          </div>
          <div class="row">
            <div class="row-key"><code>--transport stdio</code></div>
            <div class="row-desc">로컬 프로세스</div>
          </div>
          <div class="row">
            <div class="row-key"><code>--transport sse</code></div>
            <div class="row-desc">원격 SSE</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">스코프</div>
          <div class="row">
            <div class="row-key"><code>~/.claude.json</code></div>
            <div class="row-desc">로컬 (본인만)</div>
          </div>
          <div class="row">
            <div class="row-key"><code>.mcp.json</code></div>
            <div class="row-desc">프로젝트 (VCS 공유)</div>
          </div>
        </div>
        <div class="group">
          <div class="group-label">관리</div>
          <div class="row">
            <div class="row-key"><code>/mcp</code></div>
            <div class="row-desc">인터랙티브 UI</div>
          </div>
          <div class="row">
            <div class="row-key"><code>claude mcp list</code></div>
            <div class="row-desc">전체 서버 목록</div>
          </div>
          <div class="row">
            <div class="row-key"><code>claude mcp serve</code></div>
            <div class="row-desc">CC를 MCP 서버로 실행</div>
          </div>
        </div>
      </div>

      <div class="section wide">
        <div class="section-title">🧠 워크플로 &amp; 팁</div>
        <div class="cols3">
          <div>
            <div class="group">
              <div class="group-label">Plan Mode</div>
              <div class="row">
                <div class="row-key"><kbd>Shift</kbd><span class="plus">+</span><kbd>Tab</kbd></div>
                <div class="row-desc">일반 → 자동수락 → 계획 모드</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--permission-mode plan</code></div>
                <div class="row-desc">플랜 모드로 시작</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">Thinking &amp; Effort</div>
              <div class="row">
                <div class="row-key"><kbd>Alt</kbd><span class="plus">+</span><kbd>T</kbd></div>
                <div class="row-desc">사고 모드 켜기/끄기</div>
              </div>
              <div class="row">
                <div class="row-key"><code>ultrathink</code></div>
                <div class="row-desc">해당 턴 최대 노력 모드</div>
              </div>
              <div class="row">
                <div class="row-key"><code>ultraplan</code></div>
                <div class="row-desc">키워드로 클라우드 플래닝 트리거 <span class="badge-new">NEW</span></div>
              </div>
              <div class="row">
                <div class="row-key"><code>/effort</code></div>
                <div class="row-desc">○ low · ◐ medium · ● high · ★ max</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">Git Worktrees</div>
              <div class="row">
                <div class="row-key"><code>--worktree name</code></div>
                <div class="row-desc">기능별 격리 브랜치</div>
              </div>
              <div class="row">
                <div class="row-key"><code>sparsePaths</code></div>
                <div class="row-desc">필요한 디럭터리만 체크아웃</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/batch</code></div>
                <div class="row-desc">워크트리 자동 생성</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">세션 파워 무브</div>
              <div class="row">
                <div class="row-key"><code>/help</code></div>
                <div class="row-desc">실시간 전체 명령어 및 도움말 확인</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>claude -r "name"</code></div>
                <div class="row-desc">이름으로 세션 재개</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>/btw question</code></div>
                <div class="row-desc">컨텍스트 비용 없는 사이드 질문</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">SDK / Headless</div>
              <div class="row">
                <div class="row-key"><code>claude -p "query"</code></div>
                <div class="row-desc">비대화형 실행</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--output-format json</code></div>
                <div class="row-desc">구조화 출력</div>
              </div>
              <div class="row">
                <div class="row-key"><code>--max-budget-usd 5</code></div>
                <div class="row-desc">비용 상한 설정</div>
              </div>
              <div class="row">
                <div class="row-key"><code>cat file | claude -p</code></div>
                <div class="row-desc">파이프 입력</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">스케줄링 &amp; 원격</div>
              <div class="row">
                <div class="row-key"><code>/loop 5m msg</code></div>
                <div class="row-desc">반복 작업 예약</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/rc</code></div>
                <div class="row-desc">원격 제어</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">📁 메모리 &amp; 파일</div>
              <div class="row">
                <div class="row-key"><code>./CLAUDE.md</code></div>
                <div class="row-desc">프로젝트 (팀 공유)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>~/.claude/CLAUDE.md</code></div>
                <div class="row-desc">개인 (전체 프로젝트)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>/etc/claude-code/</code></div>
                <div class="row-desc">조직 관리 (Managed)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>.claude/rules/*.md</code></div>
                <div class="row-desc">프로젝트 규칙</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>.claude/commands/</code></div>
                <div class="row-desc">프로젝트 커스텀 명령어 위치</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>~/.claude/rules/*.md</code></div>
                <div class="row-desc">사용자 규칙</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>~/.claude/commands/</code></div>
                <div class="row-desc">전역 커스텀 명령어 위치</div>
              </div>
              <div class="row">
                <div class="row-key"><code>paths:</code></div>
                <div class="row-desc">프론트매터 경로별 규칙</div>
              </div>
              <div class="row">
                <div class="row-key"><code>@path/to/file</code></div>
                <div class="row-desc">CLAUDE.md에서 파일 임포트</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section full">
        <div class="section-title">🪝 훅 (Hooks)</div>
        <div class="cols3">
          <div>
            <div class="group">
              <div class="group-label">훅 이벤트</div>
              <div class="row cl-tip">
                <div class="row-key"><code>Setup</code></div>
                <div class="row-desc">프로젝트 진입 또는 유지보수 시</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>SessionStart</code></div>
                <div class="row-desc">세션 시작·재개 시 (startup, resume 등)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>SessionEnd</code></div>
                <div class="row-desc">세션 종료 시 (정리·분석)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>UserPromptSubmit</code></div>
                <div class="row-desc">프롬프트 제출 시 — 입력 검증 및 차단 가능</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>PreToolUse</code></div>
                <div class="row-desc">도구 실행 전 — exit 2로 차단 가능 (이전: PreToolCall)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>PostToolUse</code></div>
                <div class="row-desc">도구 실행 후 — 결과 처리 (이전: PostToolCall)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>PostToolUseFailure</code></div>
                <div class="row-desc">도구 실행 실패 시 — 에러 로그 및 대응 가능</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>SubagentStart</code> / <code>Stop</code></div>
                <div class="row-desc">서브에이전트 라이프사이클 훅</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>PreCompact</code></div>
                <div class="row-desc">컴팩션 직전 — exit 2로 차단 가능</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>Stop</code></div>
                <div class="row-desc">응답 완료 시 — 후처리·알림</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>StopFailure</code></div>
                <div class="row-desc">API 오류 등 비정상 종료 시 — 상태 복구·재시도</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>PermissionRequest</code></div>
                <div class="row-desc">권한 요청 시 — 자동 승인/거부 로직 구현 가능</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>PermissionDenied</code></div>
                <div class="row-desc">권한 요청 거부 시 — 대체 로직 실행</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>ConfigChange</code></div>
                <div class="row-desc">설정 파일 변경 감지 시</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>FileChanged</code></div>
                <div class="row-desc">모니터링 파일 변경 시</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>Elicitation</code></div>
                <div class="row-desc">MCP 구조화 입력(비동기) 요청 시</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>Notification</code></div>
                <div class="row-desc">알림 발생 시 (Task 완료 등)</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">훅 파일 위치</div>
              <div class="row">
                <div class="row-key"><code>~/.claude/settings.json</code></div>
                <div class="row-desc">사용자 전체 적용</div>
              </div>
              <div class="row">
                <div class="row-key"><code>.claude/settings.json</code></div>
                <div class="row-desc">프로젝트 공유</div>
              </div>
              <div class="row">
                <div class="row-key"><code>.claude/settings.local.json</code></div>
                <div class="row-desc">로컬 전용</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">관리</div>
              <div class="row">
                <div class="row-key"><code>/hooks</code></div>
                <div class="row-desc">인터랙티브 훅 관리 UI</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">종료 코드 (Exit Code)</div>
              <div class="row">
                <div class="row-key"><code>exit 0</code></div>
                <div class="row-desc">성공 — 정상 진행</div>
              </div>
              <div class="row">
                <div class="row-key"><code>exit 2</code></div>
                <div class="row-desc">차단 — 도구·컴팩션 실행 중단</div>
              </div>
              <div class="row">
                <div class="row-key">기타 exit</div>
                <div class="row-desc">비차단 오류 — 진행은 허용</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">JSON 응답 (stdout)</div>
              <div class="row">
                <div class="row-key"><code>{"decision":"block"}</code></div>
                <div class="row-desc">실행 차단 (exit 2 대체 가능)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>{"decision":"allow"}</code></div>
                <div class="row-desc">실행 허용</div>
              </div>
              <div class="row">
                <div class="row-key"><code>{"reason":"..."}</code></div>
                <div class="row-desc">Claude에게 전달할 차단 이유</div>
              </div>
              <div class="row">
                <div class="row-key"><code>{"stopReason":"..."}</code></div>
                <div class="row-desc">Stop 훅 — 종료 이유 전달</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">조건부 훅 (if 필드)</div>
              <div class="row">
                <div class="row-key"><code>tool_name</code></div>
                <div class="row-desc">특정 도구만 적용</div>
              </div>
              <div class="row">
                <div class="row-key"><code>command_contains</code></div>
                <div class="row-desc">Bash 명령 내용으로 필터</div>
              </div>
              <div class="row">
                <div class="row-key"><code>"defer"</code></div>
                <div class="row-desc">헤드리스 일시정지 → 나중에 재개</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">환경 변수 (훅 내부 주입)</div>
              <div class="row cl-tip">
                <div class="row-key"><code>CLAUDE_PROMPT</code></div>
                <div class="row-desc">사용자 입력 텍스트 (UserPromptSubmit)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>CLAUDE_TOOL_NAME</code></div>
                <div class="row-desc">실행 도구 이름</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>CLAUDE_TOOL_INPUT</code></div>
                <div class="row-desc">도구 입력 (JSON)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>CLAUDE_TOOL_RESPONSE</code></div>
                <div class="row-desc">도구 응답 (PostToolUse)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>CLAUDE_STOP_REASON</code></div>
                <div class="row-desc">종료 이유 (success/failure/error/interrupt)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>CLAUDE_ERROR</code></div>
                <div class="row-desc">오류 메시지 (Failure 이벤트)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>MAX_THINKING_TOKENS</code></div>
                <div class="row-desc">최대 생각 토큰 설정 (0=비활성)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>CLAUDE_CODE_DEBUG_LOGS_DIR</code></div>
                <div class="row-desc">디버그 로그 디렉토리</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>MCP_TIMEOUT</code></div>
                <div class="row-desc">MCP 서버 시작 타임아웃 (ms)</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>CLAUDE_SESSION_ID</code></div>
                <div class="row-desc">현재 세션 ID</div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">설정 구조 예시</div>
              <div class="row" style="display:block">
                <code
                  style="white-space:pre;font-size:9px;display:block;padding:6px 8px;line-height:1.5;border-radius:4px">{
  "hooks": {
    "PreToolCall": [{
      "if": {"tool_name": "Bash"},
      "command": "./audit.sh"
    }],
    "PostToolCall": [{
      "command": "echo done >> log.txt"
    }],
    "PreCompact": [{
      "command": "./save-summary.sh"
    }],
    "Stop": [{
      "command": "notify.sh"
    }],
    "PermissionDenied": [{
      "command": "./handle-deny.sh"
    }]
  }
}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section full">
        <div class="section-title">⚙️ 설정 &amp; 환경 변수</div>
        <div class="cols2">
          <div>
            <div class="group">
              <div class="group-label">설정 파일</div>
              <div class="row">
                <div class="row-key"><code>~/.claude/settings.json</code></div>
                <div class="row-desc">사용자 설정</div>
              </div>
              <div class="row">
                <div class="row-key"><code>.claude/settings.json</code></div>
                <div class="row-desc">프로젝트 (공유)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>.claude/settings.local.json</code></div>
                <div class="row-desc">로컬 전용</div>
              </div>
              <div class="row">
                <div class="row-key"><code>~/.claude.json</code></div>
                <div class="row-desc">OAuth, MCP, 상태</div>
              </div>
              <div class="row">
                <div class="row-key"><code>.mcp.json</code></div>
                <div class="row-desc">프로젝트 MCP 서버</div>
              </div>
            </div>
            <div class="group">
              <div class="group-label">핵심 설정 항목</div>
              <div class="row">
                <div class="row-key"><code>modelOverrides</code></div>
                <div class="row-desc">모델 피커 → 커스텀 ID 매핑</div>
              </div>
              <div class="row">
                <div class="row-key"><code>worktree.sparsePaths</code></div>
                <div class="row-desc">스파스 체크아웃 경로</div>
              </div>
              <div class="row">
                <div class="row-key"><code>hooks: if</code></div>
                <div class="row-desc">조건부 훅 (권한 규칙 문법)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>PermissionDenied</code></div>
                <div class="row-desc">자동 모드 거부 훅</div>
              </div>
              <div class="row">
                <div class="row-key"><code>showThinkingSummaries</code></div>
                <div class="row-desc">사고 요약 표시 (기본 off)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>hooks: "defer"</code></div>
                <div class="row-desc">헤드리스 일시정지 → 나중에 재개</div>
              </div>
              <div class="row">
                <div class="row-key"><code>disableSkillShellExec</code></div>
                <div class="row-desc">스킬/플러그인 !\`cmd\` 차단</div>
              </div>
              <div class="row cl-tip">
                <div class="row-key"><code>sandbox.network.deniedDomains</code></div>
                <div class="row-desc">네트워크 차단 도메인 설정 <span class="badge-new">NEW</span></div>
              </div>
            </div>
          </div>
          <div>
            <div class="group">
              <div class="group-label">핵심 환경 변수</div>
              <div class="row">
                <div class="row-key"><code>ANTHROPIC_API_KEY</code></div>
                <div class="row-desc">API 키</div>
              </div>
              <div class="row">
                <div class="row-key"><code>ANTHROPIC_MODEL</code></div>
                <div class="row-desc">모델 지정</div>
              </div>
              <div class="row">
                <div class="row-key"><code>CLAUDE_CODE_EFFORT_LEVEL</code></div>
                <div class="row-desc">low/medium/high/max/auto</div>
              </div>
              <div class="row">
                <div class="row-key"><code>MAX_THINKING_TOKENS</code></div>
                <div class="row-desc">0 = 사고 비활성화</div>
              </div>
              <div class="row">
                <div class="row-key"><code>ANTHROPIC_CUSTOM_MODEL_OPTION</code></div>
                <div class="row-desc">커스텀 /model 항목</div>
              </div>
              <div class="row">
                <div class="row-key"><code>CLAUDE_CODE_SUBPROCESS_ENV_SCRUB</code></div>
                <div class="row-desc">서브프로세스 크리덴셜 제거</div>
              </div>
              <div class="row">
                <div class="row-key"><code>CLAUDE_STREAM_IDLE_TIMEOUT_MS</code></div>
                <div class="row-desc">스트리밍 감시 (기본 90s)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>CLAUDE_CODE_NO_FLICKER</code></div>
                <div class="row-desc">대체 화면 렌더링 (=1)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>MCP_CONNECTION_NONBLOCKING</code></div>
                <div class="row-desc"><code>-p</code>에서 MCP 대기 생략</div>
              </div>
              <div class="row">
                <div class="row-key"><code>CLAUDECODE</code></div>
                <div class="row-desc">CC 셸 감지 (=1)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>CLAUDE_CODE_MAX_OUTPUT_TOKENS</code></div>
                <div class="row-desc">최대 출력 토큰 (기본 32K)</div>
              </div>
              <div class="row">
                <div class="row-key"><code>CLAUDE_CODE_DISABLE_CRON</code></div>
                <div class="row-desc">크론 비활성화</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div><!-- /main (claude) -->

    <div class="footer-modes">
      <strong>권한 모드:</strong>
      &nbsp;<code>default</code> 프롬프트 표시
      &nbsp;·&nbsp;<code>acceptEdits</code> 편집 자동 수락
      &nbsp;·&nbsp;<code>plan</code> 읽기 전용
      &nbsp;·&nbsp;<code>bypassPermissions</code> 전체 생략
      &nbsp;·&nbsp;<code>--dangerously-skip-permissions</code> CLI 플래그
      <br><br>
      <div style="text-align:center;font-size:11px;color:var(--muted2);margin-top:4px;">
        공식 참고: Anthropic Claude Code Docs · GitHub CHANGELOG.md · cc.storyfox.cz
      </div>
    </div>

  </div><!-- /tab-claude -->

  <!-- ══════════════════════════════════════════════ -->
  
`;
