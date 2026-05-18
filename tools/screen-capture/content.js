// Keydown listener for 'p' key
document.addEventListener('keydown', (event) => {
  // If the user is typing in an input field, textarea, or contenteditable element, ignore
  const activeEl = document.activeElement;
  if (
    activeEl &&
    (activeEl.tagName === 'INPUT' ||
     activeEl.tagName === 'TEXTAREA' ||
     activeEl.isContentEditable ||
     activeEl.tagName === 'SELECT')
  ) {
    return;
  }

  // Check if key is 'p' or 'P' (case-insensitive)
  if (event.key.toLowerCase() === 'p') {
    // Send message to background to check if enabled and capture
    chrome.runtime.sendMessage({ action: 'check_and_capture' });
  }
});

// Receive success notification from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'show_notification') {
    showCaptureNotification(request.fileName);
  }
});

function showCaptureNotification(fileName) {
  // Check if notification already exists, remove it
  const existing = document.getElementById('csc-toast-container');
  if (existing) {
    existing.remove();
  }

  // Create toast container
  const toast = document.createElement('div');
  toast.id = 'csc-toast-container';
  toast.innerHTML = `
    <div class="csc-icon">📸</div>
    <div class="csc-content">
      <div class="csc-title">화면 캡처 완료</div>
      <div class="csc-desc">${fileName}</div>
    </div>
  `;

  // Apply elegant styling directly
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: 'rgba(15, 15, 20, 0.9)',
    color: '#ffffff',
    padding: '14px 20px',
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)',
    webkitBackdropFilter: 'blur(16px)',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    fontFamily: '"Outfit", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    zIndex: '2147483647',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: 'translateY(100px) scale(0.9)',
    opacity: '0'
  });

  // Inject sub-styles
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    #csc-toast-container .csc-icon {
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #a78bfa, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.4));
    }
    #csc-toast-container .csc-content {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    #csc-toast-container .csc-title {
      font-weight: 600;
      color: #f4f4f5;
      font-size: 13px;
    }
    #csc-toast-container .csc-desc {
      color: #a1a1aa;
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
    }
  `;
  document.head.appendChild(styleEl);
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.style.transform = 'translateY(0) scale(1)';
    toast.style.opacity = '1';
  }, 50);

  // Fade out and remove
  setTimeout(() => {
    toast.style.transform = 'translateY(20px) scale(0.95)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
      styleEl.remove();
    }, 400);
  }, 3500);
}
