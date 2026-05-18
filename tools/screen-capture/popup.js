document.addEventListener('DOMContentLoaded', () => {
  const enabledToggle = document.getElementById('enabled-toggle');
  const statusText = document.getElementById('status-text');
  const folderNameInput = document.getElementById('folder-name');
  
  // Naming Mode selectors
  const modeTabs = document.querySelectorAll('.mode-tab');
  const dateModePanel = document.getElementById('date-mode-panel');
  const counterModePanel = document.getElementById('counter-mode-panel');
  
  // Date mode elements
  const filenamePatternInput = document.getElementById('filename-pattern');
  const tagBtns = document.querySelectorAll('.tag-btn');
  
  // Counter mode elements
  const counterPrefixInput = document.getElementById('counter-prefix');
  const counterValueInput = document.getElementById('counter-value');
  const resetCounterBtn = document.getElementById('reset-counter-btn');
  
  // Save button
  const saveBtn = document.getElementById('save-btn');

  let activeMode = 'date'; // default mode

  // Load saved settings
  chrome.storage.sync.get({
    enabled: true,
    folderName: 'ScreenCaptures',
    namingMode: 'date',
    fileNamePattern: 'capture_{yyyy}{MM}{dd}_{hh}{mm}{ss}',
    counterPrefix: 'capture_',
    counterValue: 1
  }, (items) => {
    enabledToggle.checked = items.enabled;
    updateStatusUI(items.enabled);
    
    folderNameInput.value = items.folderName;
    
    // Set active naming mode
    activeMode = items.namingMode;
    switchMode(activeMode);
    
    // Set date mode settings
    filenamePatternInput.value = items.fileNamePattern;
    
    // Set counter mode settings
    counterPrefixInput.value = items.counterPrefix;
    counterValueInput.value = items.counterValue;
  });

  // Handle status toggle changes
  enabledToggle.addEventListener('change', (e) => {
    updateStatusUI(e.target.checked);
  });

  function updateStatusUI(isEnabled) {
    if (isEnabled) {
      statusText.textContent = '활성화됨';
      statusText.className = 'status-indicator enabled';
    } else {
      statusText.textContent = '비활성화됨';
      statusText.className = 'status-indicator disabled';
    }
  }

  // Handle Naming Mode tab switching
  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.getAttribute('data-mode');
      switchMode(mode);
    });
  });

  function switchMode(mode) {
    activeMode = mode;
    
    // Update active tab styling
    modeTabs.forEach(t => {
      if (t.getAttribute('data-mode') === mode) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // Toggle panels visibility
    if (mode === 'date') {
      dateModePanel.classList.remove('hidden');
      counterModePanel.classList.add('hidden');
    } else {
      dateModePanel.classList.add('hidden');
      counterModePanel.classList.remove('hidden');
    }
  }

  // Insert tags into filename pattern input at cursor position
  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.getAttribute('data-tag');
      insertTextAtCursor(filenamePatternInput, tag);
    });
  });

  function insertTextAtCursor(inputEl, text) {
    const startPos = inputEl.selectionStart;
    const endPos = inputEl.selectionEnd;
    const currentValue = inputEl.value;

    inputEl.value = currentValue.substring(0, startPos) + text + currentValue.substring(endPos);
    
    // Reposition cursor after the inserted tag
    const newCursorPos = startPos + text.length;
    inputEl.selectionStart = newCursorPos;
    inputEl.selectionEnd = newCursorPos;
    inputEl.focus();
  }

  // Reset Counter Button Action
  resetCounterBtn.addEventListener('click', () => {
    counterValueInput.value = 1;
    
    // Quick visual success feedback on the reset button
    const originalText = resetCounterBtn.textContent;
    resetCounterBtn.textContent = '초기화됨 ✓';
    resetCounterBtn.style.borderColor = 'var(--success)';
    resetCounterBtn.style.color = 'var(--success)';
    
    setTimeout(() => {
      resetCounterBtn.textContent = originalText;
      resetCounterBtn.style.borderColor = '';
      resetCounterBtn.style.color = '';
    }, 1000);
  });

  // Save Settings with micro-animation feedback
  saveBtn.addEventListener('click', () => {
    const enabled = enabledToggle.checked;
    const folderName = folderNameInput.value.trim();
    const fileNamePattern = filenamePatternInput.value.trim();
    const counterPrefix = counterPrefixInput.value.trim();
    const counterValue = parseInt(counterValueInput.value, 10) || 1;

    // Store settings in chrome.storage.sync
    chrome.storage.sync.set({
      enabled,
      folderName,
      namingMode: activeMode,
      fileNamePattern,
      counterPrefix,
      counterValue
    }, () => {
      // Trigger success animation on button
      const originalText = saveBtn.querySelector('span').textContent;
      
      saveBtn.classList.add('success');
      saveBtn.querySelector('span').textContent = '저장 완료 ✓';
      saveBtn.disabled = true;

      // Reset button state after delay
      setTimeout(() => {
        saveBtn.classList.remove('success');
        saveBtn.querySelector('span').textContent = originalText;
        saveBtn.disabled = false;
      }, 1500);
    });
  });
});
