// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'check_and_capture') {
    // Get stored configurations
    chrome.storage.sync.get({
      enabled: true,
      folderName: 'ScreenCaptures',
      namingMode: 'date', // 'date' or 'counter'
      fileNamePattern: 'capture_{yyyy}{MM}{dd}_{hh}{mm}{ss}',
      counterPrefix: 'capture_',
      counterValue: 1
    }, (settings) => {
      if (!settings.enabled) return;

      // Capture the visible area of the active window/tab
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
        if (chrome.runtime.lastError || !dataUrl) {
          console.error('Screen capture failed:', chrome.runtime.lastError?.message || 'Unknown error');
          return;
        }

        let fileName = '';

        if (settings.namingMode === 'date') {
          // Format Date & Time
          const now = new Date();
          const yyyy = now.getFullYear();
          const MM = String(now.getMonth() + 1).padStart(2, '0');
          const dd = String(now.getDate()).padStart(2, '0');
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          const ss = String(now.getSeconds()).padStart(2, '0');

          // Apply file name pattern
          fileName = settings.fileNamePattern
            .replaceAll('{yyyy}', yyyy)
            .replaceAll('{MM}', MM)
            .replaceAll('{dd}', dd)
            .replaceAll('{hh}', hh)
            .replaceAll('{mm}', mm)
            .replaceAll('{ss}', ss);
        } else {
          // Auto-increment mode
          fileName = `${settings.counterPrefix}${settings.counterValue}`;

          // Increment and save the counter value
          chrome.storage.sync.set({
            counterValue: settings.counterValue + 1
          });
        }

        // Sanitize filename to remove invalid characters
        fileName = fileName.replace(/[\\/:*?"<>|]/g, '_');

        if (!fileName.endsWith('.png')) {
          fileName += '.png';
        }

        // Sanitize subfolder path (slashes are allowed for folders, but not backslashes or other invalid characters)
        let cleanFolder = settings.folderName.trim()
          .replace(/\\/g, '/') // Replace backslashes with forward slashes
          .replace(/[?:*?"<>|]/g, '_') // Remove other invalid characters
          .replace(/\/+/g, '/') // Deduplicate multiple slashes
          .replace(/^\/+|\/+$/g, ''); // Trim leading and trailing slashes

        const fullPath = cleanFolder ? `${cleanFolder}/${fileName}` : fileName;

        // Download captured image using chrome.downloads API
        chrome.downloads.download({
          url: dataUrl,
          filename: fullPath,
          saveAs: false // Automatically download to configured directory
        }, (downloadId) => {
          if (chrome.runtime.lastError) {
            console.error('Download trigger failed:', chrome.runtime.lastError.message);
          } else {
            // Send feedback back to the active tab
            if (sender.tab && sender.tab.id) {
              chrome.tabs.sendMessage(sender.tab.id, { 
                action: 'show_notification', 
                fileName: fileName 
              });
            }
          }
        });
      });
    });
  }
});
