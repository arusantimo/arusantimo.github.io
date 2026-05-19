#!/usr/bin/env python3
"""
crawl.py — 국내 주식 커뮤니티 크롤러
대상: 네이버 페이 증권 종목토론방 / 디시인사이드 주식갤러리 / 토스증권 국내주식 라운지

⚠️  주의사항
- 이 스크립트는 개인 로컬 사용을 전제합니다.
- 각 사이트의 이용 약관 및 robots.txt를 준수하세요.
- 서버 부하를 최소화하기 위해 요청 간 딜레이가 설정되어 있습니다.
- 수집 데이터를 무단으로 재배포하지 마세요.
- 토스증권 크롤링은 Playwright(headless Chromium)를 사용합니다.
  첫 실행 전: python -m playwright install chromium
"""

import time
import json
import random
import logging
from datetime import datetime, timezone, timedelta
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# ── 설정 ──────────────────────────────────────────────────────────────────────

KST = timezone(timedelta(hours=9))
OUTPUT_DIR = Path(__file__).parent.parent / "data"
OUTPUT_FILE = OUTPUT_DIR / "raw_posts.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "ko-KR,ko;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://finance.naver.com/",
}

REQUEST_DELAY_MIN = 1.2   # 최소 딜레이 (초)
REQUEST_DELAY_MAX = 2.5   # 최대 딜레이 (초)
MAX_PAGES_NAVER   = 5     # 네이버 크롤링 페이지 수 (페이지당 약 20건)
MAX_PAGES_DC      = 3     # 디시 크롤링 페이지 수
TOSS_SCROLL_COUNT = 5     # 토스 라운지 스크롤 횟수 (1회당 약 10~15건)

# ── 토스증권 라운지 URL ───────────────────────────────────────────────────────

TOSS_LOUNGE_URLS = [
    "https://www.tossinvest.com/community/lounges/LOUNGE_193404",  # 국내주식 토론
]

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger(__name__)


# ── 네이버 증권 종목토론방 ────────────────────────────────────────────────────

NAVER_BOARD_URLS = [
    # 코스피/코스닥 대표 토론방 (종목 코드별)
    # 삼성전자, SK하이닉스, KODEX 200 등 대형주 토론방
    "https://finance.naver.com/item/board.nhn?code=005930",  # 삼성전자
    "https://finance.naver.com/item/board.nhn?code=000660",  # SK하이닉스
    "https://finance.naver.com/item/board.nhn?code=035420",  # NAVER
    "https://finance.naver.com/item/board.nhn?code=005380",  # 현대차
    "https://finance.naver.com/item/board.nhn?code=051910",  # LG화학
    "https://finance.naver.com/item/board.nhn?code=000270",  # 기아
]


def crawl_naver_board(url: str, max_pages: int = MAX_PAGES_NAVER) -> list[dict]:
    """네이버 증권 종목토론방 게시글 수집"""
    posts = []
    session = requests.Session()
    session.headers.update(HEADERS)

    for page in range(1, max_pages + 1):
        try:
            target_url = f"{url}&page={page}"
            log.info(f"[네이버] {target_url}")
            resp = session.get(target_url, timeout=10)
            resp.raise_for_status()
            resp.encoding = "euc-kr"

            soup = BeautifulSoup(resp.text, "html.parser")
            rows = soup.select("table.type2 tr")

            for row in rows:
                # 제목 열
                title_td = row.select_one("td.title a")
                if not title_td:
                    continue

                title = title_td.get_text(strip=True)
                if not title:
                    continue

                tds = row.select("td")
                try:
                    views    = int(tds[3].get_text(strip=True).replace(",", "")) if len(tds) > 3 else 0
                    likes    = int(tds[4].get_text(strip=True).replace(",", "")) if len(tds) > 4 else 0
                    dislikes = int(tds[5].get_text(strip=True).replace(",", "")) if len(tds) > 5 else 0
                except (ValueError, IndexError):
                    views, likes, dislikes = 0, 0, 0

                posts.append({
                    "community": "naver",
                    "title": title,
                    "views": views,
                    "likes": likes,
                    "dislikes": dislikes,
                    "comments": 0,
                    "crawled_at": datetime.now(KST).isoformat(),
                })

            delay = random.uniform(REQUEST_DELAY_MIN, REQUEST_DELAY_MAX)
            time.sleep(delay)

        except Exception as e:
            log.warning(f"[네이버] 크롤링 실패: {e}")
            continue

    log.info(f"[네이버] {url} → {len(posts)}건 수집")
    return posts


# ── 디시인사이드 주식 갤러리 ──────────────────────────────────────────────────

DC_GALLERY_IDS = [
    "stockus",     # 미국 주식 갤러리
    "stock_new10", # 주식 갤러리 (신)
]


def crawl_dcinside(gallery_id: str, max_pages: int = MAX_PAGES_DC) -> list[dict]:
    """디시인사이드 갤러리 게시글 수집"""
    posts = []
    base_url = f"https://gall.dcinside.com/board/lists/?id={gallery_id}"

    headers = dict(HEADERS)
    headers["Referer"] = f"https://gall.dcinside.com/board/lists/?id={gallery_id}"

    session = requests.Session()
    session.headers.update(headers)

    for page in range(1, max_pages + 1):
        try:
            url = f"{base_url}&page={page}"
            log.info(f"[디시] {url}")
            resp = session.get(url, timeout=10)
            resp.raise_for_status()

            soup = BeautifulSoup(resp.text, "html.parser")
            rows = soup.select("tr.ub-content")

            for row in rows:
                title_el = row.select_one(".ub-word")
                if not title_el:
                    continue
                title = title_el.get_text(strip=True)
                if not title:
                    continue

                try:
                    view_el    = row.select_one(".gall_count")
                    likes_el   = row.select_one(".gall_recommend")
                    comment_el = row.select_one(".reply_num")
                    views    = int((view_el.get_text(strip=True)    if view_el    else "0").replace(",", ""))
                    likes    = int((likes_el.get_text(strip=True)   if likes_el   else "0").replace(",", ""))
                    comments = int((comment_el.get_text(strip=True) if comment_el else "0").strip("[]").replace(",", ""))
                except (ValueError, AttributeError):
                    views, likes, comments = 0, 0, 0

                posts.append({
                    "community": "dcinside",
                    "gallery_id": gallery_id,
                    "title": title,
                    "views": views,
                    "likes": likes,
                    "dislikes": 0,
                    "comments": comments,
                    "crawled_at": datetime.now(KST).isoformat(),
                })

            delay = random.uniform(REQUEST_DELAY_MIN, REQUEST_DELAY_MAX)
            time.sleep(delay)

        except Exception as e:
            log.warning(f"[디시] {gallery_id} 크롤링 실패: {e}")
            continue

    log.info(f"[디시] {gallery_id} → {len(posts)}건 수집")
    return posts


# ── 토스증권 라운지 (Playwright headless) ─────────────────────────────────────

def crawl_toss_lounge(url: str, scroll_count: int = TOSS_SCROLL_COUNT) -> list[dict]:
    """
    토스증권 라운지 게시글 수집 (Playwright headless Chromium 방식)
    SPA 구조로 인해 requests 방식 대신 실제 브라우저를 백그라운드로 구동합니다.
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        log.error("playwright 미설치. `python -m pip install playwright` 후 `python -m playwright install chromium` 실행 필요")
        return []

    posts = []
    log.info(f"[토스] Playwright 시작: {url}")

    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(
                headless=True,
                args=["--no-sandbox", "--disable-dev-shm-usage"]
            )
            context = browser.new_context(
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/124.0.0.0 Safari/537.36"
                ),
                locale="ko-KR",
                viewport={"width": 1280, "height": 900},
            )
            page = context.new_page()

            # 페이지 이동 및 콘텐츠 로드 대기
            page.goto(url, wait_until="domcontentloaded", timeout=30000)

            # 게시글 목록 엘리먼트가 렌더링될 때까지 대기 (최대 10초)
            try:
                page.wait_for_selector("[data-testid='post-item'], article, .feed-item, li", timeout=10000)
            except Exception:
                log.warning("[토스] 게시글 셀렉터 대기 타임아웃 — DOM 파싱 시도")

            time.sleep(2)  # JS 렌더링 안정화

            # 스크롤로 추가 게시글 로드
            for i in range(scroll_count):
                page.evaluate("window.scrollBy(0, 800)")
                time.sleep(1.0)
                log.info(f"[토스] 스크롤 {i + 1}/{scroll_count}")

            # 렌더링된 HTML 파싱
            html = page.content()
            browser.close()

        soup = BeautifulSoup(html, "html.parser")

        # ── 게시글 엘리먼트 탐색 ─────────────────────────────────────────────
        # 토스증권 라운지는 피드 형태로 게시글이 렌더링됩니다.
        # 제목 텍스트 역할을 하는 요소들을 폭넓게 수집합니다.
        collected_texts = set()

        # 전략 1: aria-label, data-testid 등 시맨틱 어트리뷰트가 있는 요소
        for el in soup.find_all(["p", "span", "div"], attrs={"class": True}):
            cls = " ".join(el.get("class", []))
            # 토스 UI 컴포넌트명 패턴 필터링 (내부 클래스명 특성상 포괄적으로 처리)
            if any(kw in cls.lower() for kw in ["content", "body", "text", "post", "comment", "feed", "title"]):
                text = el.get_text(separator=" ", strip=True)
                # 의미 있는 길이(10자 이상 150자 이하)의 텍스트만 수집
                if 10 <= len(text) <= 150 and text not in collected_texts:
                    collected_texts.add(text)
                    posts.append({
                        "community": "toss",
                        "community_name": "토스증권",
                        "title": text,
                        "views": 0,
                        "likes": 0,
                        "dislikes": 0,
                        "comments": 0,
                        "crawled_at": datetime.now(KST).isoformat(),
                    })

        # 전략 2: 일반 텍스트 블록이 많은 li / article 하위 텍스트 추출
        if len(posts) < 5:
            for el in soup.find_all(["li", "article"]):
                text = el.get_text(separator=" ", strip=True)
                if 10 <= len(text) <= 150 and text not in collected_texts:
                    collected_texts.add(text)
                    posts.append({
                        "community": "toss",
                        "community_name": "토스증권",
                        "title": text,
                        "views": 0,
                        "likes": 0,
                        "dislikes": 0,
                        "comments": 0,
                        "crawled_at": datetime.now(KST).isoformat(),
                    })

    except Exception as e:
        log.warning(f"[토스] 크롤링 실패: {e}")

    log.info(f"[토스] {url} → {len(posts)}건 수집")
    return posts


# ── 메인 ──────────────────────────────────────────────────────────────────────

def main():
    log.info("=" * 60)
    log.info("한국 주식 커뮤니티 크롤러 시작")
    log.info(f"시작 시각: {datetime.now(KST).strftime('%Y-%m-%d %H:%M:%S KST')}")
    log.info("=" * 60)

    all_posts = []
    crawl_start = datetime.now(KST)

    # 네이버 증권 크롤링
    log.info("\n[1/3] 네이버 증권 종목토론방 크롤링 시작")
    for url in NAVER_BOARD_URLS:
        posts = crawl_naver_board(url, max_pages=MAX_PAGES_NAVER)
        all_posts.extend(posts)
        time.sleep(random.uniform(1.5, 3.0))

    # 디시인사이드 크롤링
    log.info("\n[2/3] 디시인사이드 갤러리 크롤링 시작")
    for gid in DC_GALLERY_IDS:
        posts = crawl_dcinside(gid, max_pages=MAX_PAGES_DC)
        all_posts.extend(posts)
        time.sleep(random.uniform(1.5, 3.0))

    # 토스증권 라운지 크롤링 (Playwright)
    log.info("\n[3/3] 토스증권 라운지 크롤링 시작 (Playwright headless)")
    for url in TOSS_LOUNGE_URLS:
        posts = crawl_toss_lounge(url, scroll_count=TOSS_SCROLL_COUNT)
        all_posts.extend(posts)
        time.sleep(random.uniform(2.0, 4.0))

    crawl_end = datetime.now(KST)
    elapsed   = (crawl_end - crawl_start).total_seconds()

    # 출력
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    result = {
        "crawled_at":    crawl_end.isoformat(),
        "elapsed_sec":   round(elapsed, 1),
        "total_posts":   len(all_posts),
        "posts":         all_posts,
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    log.info(f"\n✅ 완료! 총 {len(all_posts)}건 수집 ({elapsed:.1f}초)")
    log.info(f"📄 저장 위치: {OUTPUT_FILE}")
    log.info("다음 단계: python analyze.py 실행")


if __name__ == "__main__":
    main()
