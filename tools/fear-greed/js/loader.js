/**
 * loader.js — JSON 파일 드래그&드롭 / 파일 선택 로더
 * 데모 데이터 로드 기능 포함
 */

const DataLoader = (() => {

  const DEMO_PATH = '../fear-greed/data/demo.json';

  function init({ dropZone, fileInput, onLoad }) {
    if (!dropZone || !fileInput) return;

    // 드래그 이벤트
    dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-over');
    });
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) readFile(file, onLoad);
    });

    // 파일 선택
    fileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) readFile(file, onLoad);
    });
  }

  function readFile(file, cb) {
    if (!file.name.endsWith('.json')) {
      alert('JSON 파일만 로드할 수 있습니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        cb(data);
      } catch (err) {
        alert('JSON 파싱 오류: ' + err.message);
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  async function loadRealData(cb, onNotFound) {
    // file:// 직접 열기 환경에서는 analyze.py가 생성한 JS 전역 데이터를 우선 사용
    if (location.protocol === 'file:') {
      if (window.FEAR_GREED_DATA && typeof window.FEAR_GREED_DATA === 'object') {
        cb(window.FEAR_GREED_DATA);
        return;
      }
      if (onNotFound) onNotFound('file_protocol_data_missing');
      return;
    }

    if (window.FEAR_GREED_DATA && typeof window.FEAR_GREED_DATA === 'object') {
      cb(window.FEAR_GREED_DATA);
      return;
    }

    const paths = [
      './data/fear_greed_data.json',
      '../fear-greed/data/fear_greed_data.json',
    ];
    for (const path of paths) {
      try {
        const res = await fetch(path);
        if (res.ok) {
          const data = await res.json();
          cb(data);
          return;
        }
      } catch (_) { /* 다음 경로 시도 */ }
    }
    // 파일 없음
    if (onNotFound) onNotFound('not_found');
  }

  async function loadDemo(cb) {
    try {
      // GitHub Pages 경로와 로컬 경로 모두 대응
      const base = location.pathname.replace(/\/[^/]*$/, '');
      const paths = [
        './data/demo.json',
        base + '/data/demo.json',
        DEMO_PATH,
      ];

      let data = null;
      for (const path of paths) {
        try {
          const res = await fetch(path);
          if (res.ok) {
            data = await res.json();
            break;
          }
        } catch (_) { /* 다음 경로 시도 */ }
      }

      if (data) {
        cb(data);
      } else {
        alert('데모 데이터를 불러올 수 없습니다.');
      }
    } catch (err) {
      alert('데모 데이터 로드 실패: ' + err.message);
    }
  }

  return { init, loadDemo, loadRealData };
})();
