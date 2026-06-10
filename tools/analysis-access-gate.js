(function () {
  var STORAGE_KEY = 'analysisToolAccessGrantedTimestamp';
  var PASSWORD = '0001';
  var EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

  try {
    if (window.localStorage) {
      var storedTimestamp = window.localStorage.getItem(STORAGE_KEY);
      if (storedTimestamp && (new Date().getTime() - parseInt(storedTimestamp, 10) < EXPIRATION_MS)) {
        return;
      }
    }
  } catch (error) {
  }

  var message = '분석 툴 비밀번호를 입력하세요.\n(한 번 입력 시 7일간 유지됩니다)';
  var entered = window.prompt(message, '');

  if (entered === PASSWORD) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, new Date().getTime().toString());
      }
    } catch (error) {
    }
    return;
  }

  window.alert('비밀번호가 올바르지 않습니다.');

  var script = document.currentScript;
  var redirectUrl = script && script.dataset && script.dataset.redirect
    ? script.dataset.redirect
    : '../../index.html';

  window.location.replace(redirectUrl);
})();