/**
 * Playwright scenario: Naver overtime single-price board.
 * Invoked from playwright_fetch_worker when request.scenario === "overtime_board".
 */
export async function runOvertimeBoard(page) {
  const url = "https://finance.naver.com/sise/sise_quant_overtime.naver";
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  await page.waitForSelector("table", { timeout: 15000 }).catch(() => null);
  const rows = await page.evaluate(() => {
    const results = [];
    for (const tr of document.querySelectorAll("table tr")) {
      const cells = [...tr.querySelectorAll("td, th")].map((el) => el.textContent?.trim() || "");
      if (cells.length < 4) continue;
      const joined = cells.join(" ");
      const codeMatch = joined.match(/\b(\d{6})\b/);
      if (!codeMatch) continue;
      let ahChangePct = null;
      for (const cell of cells) {
        if (cell.includes("%")) {
          ahChangePct = parseFloat(cell.replace(/[^\d.+-]/g, ""));
          break;
        }
      }
      results.push({
        code: codeMatch[1],
        name: cells[1] || "",
        ahChangePct,
        raw: cells,
      });
    }
    return results;
  });
  return { rows, count: rows.length };
}
