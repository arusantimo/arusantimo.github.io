import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadApiContext(fetchImpl) {
  const code = fs.readFileSync(new URL('./api.js', import.meta.url), 'utf8');
  const context = {
    console,
    fetch: fetchImpl,
    PROXIES: [
      'https://api.codetabs.com/v1/proxy?quest=',
      'https://api.allorigins.win/raw?url=',
      'https://corsproxy.io/?'
    ],
    AbortController,
    setTimeout,
    clearTimeout
  };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context;
}

test('price endpoint가 빈 응답일 때 allorigins get wrapper로 JSON을 복구한다', async () => {
  const targetUrl = 'https://m.stock.naver.com/api/stock/005930/price?pageSize=3&page=1';
  const calls = [];
  const fetchImpl = async url => {
    calls.push(url);
    if (String(url).startsWith('https://api.codetabs.com/')) {
      return {
        ok: true,
        status: 200,
        async text() {
          return '';
        }
      };
    }
    if (String(url).startsWith('https://api.allorigins.win/raw?url=')) {
      throw new Error('CORS blocked');
    }
    if (String(url).startsWith('https://corsproxy.io/?')) {
      return {
        ok: false,
        status: 403,
        async text() {
          return 'forbidden';
        }
      };
    }
    if (String(url).startsWith('https://api.allorigins.win/get?url=')) {
      return {
        ok: true,
        status: 200,
        async json() {
          return {
            contents: '[{\"closePrice\":\"100,000\",\"localTradedAt\":\"2026-05-20\"}]'
          };
        }
      };
    }
    throw new Error(`unexpected url: ${url}`);
  };
  const { fetchJsonWithProxyFallback } = loadApiContext(fetchImpl);
  const result = await fetchJsonWithProxyFallback(targetUrl, { timeoutMs: 100 });

  assert.equal(Array.isArray(result), true);
  assert.equal(result[0].closePrice, '100,000');
  assert.ok(calls.some(url => String(url).startsWith('https://api.allorigins.win/get?url=')));
});

test('Naver chart XML은 최신일 기준 내림차순 history로 변환된다', async () => {
  const xml = `<?xml version="1.0" encoding="EUC-KR" ?>
<protocol>
  <chartdata>
    <item data="20260518|100|110|90|105|1000" />
    <item data="20260519|106|112|101|111|1200" />
    <item data="20260520|112|115|108|109|900" />
  </chartdata>
</protocol>`;
  const fetchImpl = async url => ({
    ok: true,
    status: 200,
    async text() {
      return xml;
    }
  });
  const { fetchNaverPriceHistory } = loadApiContext(fetchImpl);
  const result = await fetchNaverPriceHistory('005930', { timeoutMs: 100, count: 3 });

  assert.equal(result.map(row => row.localTradedAt).join(','), '20260520,20260519,20260518');
  assert.equal(result[0].closePrice, '109');
  assert.equal(result[0].accumulatedTradingVolume, '900');
});
