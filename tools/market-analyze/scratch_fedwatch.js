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
  
  console.log('Navigating to CME FedWatch Tool...');
  try {
    await page.goto('https://kr.investing.com/central-banks/fed-rate-monitor', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    // 페이지 로드 후 5초간 대기하여 iframe 및 데이터가 렌더링되기를 기다립니다.
    await page.waitForTimeout(5000);
    
    // iframe들이 있는지 확인합니다.
    // CME FedWatch는 보통 QuickStrike iframe을 삽입하여 보여줍니다.
    const frames = page.frames();
    console.log(`Found ${frames.length} frames`);
    
    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      const url = frame.url();
      console.log(`Frame ${i}: ${url}`);
      
      // 만약 quickstrike 나 fedwatch 관련 iframe이면 내부 텍스트를 출력해 봅니다.
      if (url.includes('quickstrike') || url.includes('fedwatch')) {
        const text = await frame.locator('body').innerText().catch(() => "");
        console.log(`--- Frame ${i} Content Preview ---`);
        console.log(text.slice(0, 1000));
        console.log("----------------------------------");
      }
    }
    
    // 메인 페이지 바디 텍스트도 일부 출력
    const bodyText = await page.locator('body').innerText().catch(() => "");
    console.log("--- Main Page Content Preview ---");
    console.log(bodyText.slice(0, 1000));
    console.log("---------------------------------");

  } catch (error) {
    console.error("Error scraping:", error);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
