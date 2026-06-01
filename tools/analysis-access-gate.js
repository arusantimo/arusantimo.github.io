(function () {
  var SESSION_KEY = 'analysisToolAccessGranted';
  var PASSWORD = '0001';

  try {
    if (window.sessionStorage && window.sessionStorage.getItem(SESSION_KEY) === 'true') {
      return;
    }
  } catch (error) {
  }

  var message = '분석 툴 비밀번호를 입력하세요.';
  var entered = window.prompt(message, '');

  if (entered === PASSWORD) {
    try {
      if (window.sessionStorage) {
        window.sessionStorage.setItem(SESSION_KEY, 'true');
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