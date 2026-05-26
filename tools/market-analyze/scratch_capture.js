const { chromium } = require('playwright-core');
const fs = require('fs');

const chromeCandidates = [
  process.env.MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
].filter(Boolean);

let executablePath = "";
for (const cand of chromeCandidates) {
  if (fs.existsSync(cand)) {
    executablePath = cand;
    break;
  }
}

async function main() {
  if (!executablePath) {
    console.error("Chrome executable not found");
    return;
  }
  const browser = await chromium.launch({
    headless: true,
    executablePath,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('request', request => {
    const url = request.url();
    console.log('Request:', url);
  });

  console.log('Navigating...');
  await page.goto('https://m.stock.naver.com/domestic/index/upjong/261', {
    waitUntil: 'networkidle',
  });
  
  await browser.close();
}

main().catch(console.error);
