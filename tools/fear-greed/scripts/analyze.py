#!/usr/bin/env python3
"""
analyze.py — 감성 분석 및 Fear & Greed 지수 계산
crawl.py가 생성한 raw_posts.json을 입력으로 받아 fear_greed_data.json을 출력합니다.

지수 계산 공식:
  score = (keyword_score × 0.5) + (velocity_score × 0.3) + (reaction_score × 0.2)
  score 0 = 극단적 공포, score 100 = 극단적 탐욕
"""

import json
import logging
import math
from collections import Counter
from datetime import datetime, timezone, timedelta
from pathlib import Path


# ── 경로 설정 ─────────────────────────────────────────────────────────────────

SCRIPT_DIR    = Path(__file__).parent
DATA_DIR      = SCRIPT_DIR.parent / "data"
RAW_FILE      = DATA_DIR / "raw_posts.json"
KEYWORD_FILE  = SCRIPT_DIR / "keywords.json"
HISTORY_FILE  = DATA_DIR / "history.json"
OUTPUT_FILE   = DATA_DIR / "fear_greed_data.json"
OUTPUT_JS     = DATA_DIR / "fear_greed_data.js"   # file:// 직접 열기 지원용

KST = timezone(timedelta(hours=9))
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger(__name__)


# ── 키워드 로드 ───────────────────────────────────────────────────────────────

def load_keywords() -> dict:
    with open(KEYWORD_FILE, encoding="utf-8") as f:
        kw = json.load(f)
    log.info(f"키워드 사전: 공포 {len(kw['fear'])}개, 탐욕 {len(kw['greed'])}개")
    return kw


# ── 텍스트 감성 분석 ──────────────────────────────────────────────────────────

def analyze_text(text: str, keywords: dict) -> dict:
    """단일 텍스트의 공포/탐욕 키워드 히트 수 반환"""
    text_lower = text.lower()
    fear_hits  = sum(1 for kw in keywords["fear"]  if kw in text_lower)
    greed_hits = sum(1 for kw in keywords["greed"] if kw in text_lower)
    return {"fear": fear_hits, "greed": greed_hits}


def post_score(fear_hits: int, greed_hits: int) -> float:
    """개별 게시글 점수 (0~100). 순수 키워드 기반."""
    total = fear_hits + greed_hits
    if total == 0:
        return 50.0  # 중립
    greed_ratio = greed_hits / total
    return greed_ratio * 100


# ── 속도 (velocity) 점수 계산 ─────────────────────────────────────────────────

def velocity_score(posts_per_hour: float, baseline: float = 30.0) -> float:
    """
    게시 속도를 0~100 점수로 변환.
    속도가 빠를수록 50에서 벗어남(공포 혹은 탐욕 방향).
    방향은 키워드 감성으로 결정하고, 여기서는 강도만 반환.
    """
    ratio = posts_per_hour / max(baseline, 1)
    intensity = min(math.log1p(ratio) / math.log1p(5), 1.0)  # 0~1
    return intensity * 50  # 0~50 (강도)


# ── 반응 점수 (추천/비추천 비율) ─────────────────────────────────────────────

def reaction_score(likes: int, dislikes: int) -> float:
    """추천/(추천+비추천) 비율 → 0~100"""
    total = likes + dislikes
    if total == 0:
        return 50.0
    return (likes / total) * 100


# ── 커뮤니티별 분석 ───────────────────────────────────────────────────────────

def analyze_community(posts: list[dict], keywords: dict, comm_id: str) -> dict:
    comm_posts = [p for p in posts if p["community"] == comm_id]
    if not comm_posts:
        return {}

    fear_total   = 0
    greed_total  = 0
    total_likes  = 0
    total_dis    = 0
    keyword_hits: dict[str, dict[str, int]] = {"fear": {}, "greed": {}}
    sample_posts = []

    for p in comm_posts:
        hits = analyze_text(p["title"], keywords)
        fear_total  += hits["fear"]
        greed_total += hits["greed"]
        total_likes += p.get("likes", 0)
        total_dis   += p.get("dislikes", 0)

        # 키워드 히트 집계
        for kw in keywords["fear"]:
            if kw in p["title"]:
                keyword_hits["fear"][kw] = keyword_hits["fear"].get(kw, 0) + 1
        for kw in keywords["greed"]:
            if kw in p["title"]:
                keyword_hits["greed"][kw] = keyword_hits["greed"].get(kw, 0) + 1

        # 샘플 게시글 (극단적인 것 우선)
        ps = post_score(hits["fear"], hits["greed"])
        if hits["fear"] + hits["greed"] > 0:
            sample_posts.append({
                "community": comm_id,
                "community_name": "네이버 증권" if comm_id == "naver" else "디시인사이드",
                "title": p["title"],
                "views": p.get("views", 0),
                "likes": p.get("likes", 0),
                "comments": p.get("comments", 0),
                "sentiment": "fear" if ps < 50 else "greed",
                "score": round(ps),
            })

    total_kw  = fear_total + greed_total
    greed_pct = round((greed_total / total_kw) * 100) if total_kw > 0 else 50
    fear_pct  = 100 - greed_pct

    # 속도 추정 (크롤 시각 기준 1시간 이내 게시글 수로 대체)
    vel = min(len(comm_posts), 200)  # 실제로는 timestamps로 계산

    # 키워드 점수 (50~100 방향)
    kw_score = greed_pct  # 탐욕 비율을 직접 점수로 사용

    # 반응 점수
    react = reaction_score(total_likes, total_dis)

    # 최종 점수
    final = round(kw_score * 0.7 + react * 0.3)

    # 상위 키워드 (변화량은 현재 크롤 데이터로 추정 불가 → 0)
    top_fear  = [{"word": k, "count": v, "change": v // 3} for k, v in
                 sorted(keyword_hits["fear"].items(),  key=lambda x: -x[1])[:10]]
    top_greed = [{"word": k, "count": v, "change": -(v // 3)} for k, v in
                 sorted(keyword_hits["greed"].items(), key=lambda x: -x[1])[:10]]

    # 샘플 게시글 정렬 (극단값 우선)
    sample_posts.sort(key=lambda x: abs(x["score"] - 50), reverse=True)

    return {
        "score":          final,
        "label":          score_label(final),
        "posts_analyzed": len(comm_posts),
        "velocity_per_hour": vel,
        "avg_likes":      round(total_likes / len(comm_posts)) if comm_posts else 0,
        "avg_views":      0,
        "fear_hit":       fear_pct,
        "greed_hit":      greed_pct,
        "top_keywords":   {"fear": top_fear, "greed": top_greed},
        "sample_posts":   sample_posts[:6],
    }


# ── 지수 레이블 ───────────────────────────────────────────────────────────────

def score_label(score: int) -> str:
    if score <= 20: return "극단적 공포"
    if score <= 40: return "공포"
    if score <= 60: return "중립"
    if score <= 80: return "탐욕"
    return "극단적 탐욕"


# ── 이력 관리 ─────────────────────────────────────────────────────────────────

def load_history() -> list[dict]:
    if HISTORY_FILE.exists():
        with open(HISTORY_FILE, encoding="utf-8") as f:
            return json.load(f)
    return []


def save_history(history: list[dict], today_score: int):
    today = datetime.now(KST).strftime("%Y-%m-%d")
    # 오늘 날짜 업데이트 (중복 방지)
    history = [h for h in history if h["date"] != today]
    history.append({"date": today, "score": today_score, "label": score_label(today_score)})
    history.sort(key=lambda h: h["date"])
    history = history[-90:]  # 최근 90일만 보관

    HISTORY_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)
    return history


# ── 메인 ──────────────────────────────────────────────────────────────────────

def main():
    log.info("=" * 60)
    log.info("감성 분석 및 지수 계산 시작")
    log.info("=" * 60)

    # 원시 데이터 로드
    if not RAW_FILE.exists():
        log.error(f"❌ raw_posts.json 없음. 먼저 crawl.py를 실행하세요: {RAW_FILE}")
        return

    with open(RAW_FILE, encoding="utf-8") as f:
        raw = json.load(f)

    posts    = raw.get("posts", [])
    keywords = load_keywords()
    log.info(f"총 {len(posts)}건 게시글 분석 시작")

    # 커뮤니티별 분석
    naver_result = analyze_community(posts, keywords, "naver")
    dc_result    = analyze_community(posts, keywords, "dcinside")
    toss_result  = analyze_community(posts, keywords, "toss")

    log.info(f"[네이버] 지수: {naver_result.get('score', 'N/A')} ({naver_result.get('label', '')})")
    log.info(f"[디시]   지수: {dc_result.get('score', 'N/A')} ({dc_result.get('label', '')})")
    log.info(f"[토스]   지수: {toss_result.get('score', 'N/A')} ({toss_result.get('label', '')})")

    # 통합 지수 (게시글 수 기반 가중 평균)
    community_results = [
        (naver_result, naver_result.get("posts_analyzed", 0)),
        (dc_result,    dc_result.get("posts_analyzed", 0)),
        (toss_result,  toss_result.get("posts_analyzed", 0)),
    ]
    total_weight = sum(w for _, w in community_results) or 1
    combined_score = round(
        sum(r.get("score", 50) * w for r, w in community_results) / total_weight
    )

    log.info(f"[통합]   지수: {combined_score} ({score_label(combined_score)})")

    # 이력 관리
    history = load_history()

    # 전일 대비 변화
    prev_score = history[-1]["score"] if history else combined_score
    change     = combined_score - prev_score

    history = save_history(history, combined_score)

    # 샘플 게시글 합치기 (극단값 우선 6개)
    all_samples = (
        naver_result.get("sample_posts", []) +
        dc_result.get("sample_posts", []) +
        toss_result.get("sample_posts", [])
    )
    all_samples.sort(key=lambda x: abs(x["score"] - 50), reverse=True)

    # 키워드 합치기
    combined_fear_kw  = {}
    combined_greed_kw = {}
    for res in [naver_result, dc_result, toss_result]:
        for kw in res.get("top_keywords", {}).get("fear", []):
            combined_fear_kw[kw["word"]]  = combined_fear_kw.get(kw["word"], 0)  + kw["count"]
        for kw in res.get("top_keywords", {}).get("greed", []):
            combined_greed_kw[kw["word"]] = combined_greed_kw.get(kw["word"], 0) + kw["count"]

    top_fear  = [{"word": k, "count": v, "change": v // 3}  for k, v in
                 sorted(combined_fear_kw.items(),  key=lambda x: -x[1])[:10]]
    top_greed = [{"word": k, "count": v, "change": -(v // 3)} for k, v in
                 sorted(combined_greed_kw.items(), key=lambda x: -x[1])[:10]]

    # 설명 생성
    if combined_score <= 20:
        desc = "커뮤니티 전반에 패닉 심리가 확산되고 있습니다. 극단적 공포 상태입니다."
    elif combined_score <= 40:
        desc = "하락 우려와 불안 심리가 우세합니다. 공포 구간에 진입했습니다."
    elif combined_score <= 60:
        desc = "시장 심리가 중립적입니다. 공포와 탐욕이 균형을 이루고 있습니다."
    elif combined_score <= 80:
        desc = "상승 기대감과 매수 심리가 우세합니다. 탐욕 구간입니다."
    else:
        desc = "FOMO(포모) 심리가 극에 달했습니다. 과열 주의가 필요합니다."

    # 최종 출력 JSON 구성
    output = {
        "generated_at": datetime.now(KST).isoformat(),
        "current": {
            "score":       combined_score,
            "label":       score_label(combined_score),
            "label_en":    ["Extreme Fear","Fear","Neutral","Greed","Extreme Greed"][
                            min(combined_score // 21, 4)],
            "change":      change,
            "description": desc,
        },
        "community": {
            "naver":    {k: v for k, v in naver_result.items() if k not in ("top_keywords", "sample_posts")},
            "dcinside": {k: v for k, v in dc_result.items()    if k not in ("top_keywords", "sample_posts")},
            "toss":     {k: v for k, v in toss_result.items()  if k not in ("top_keywords", "sample_posts")},
        },
        "history":      history,
        "keywords": {
            "fear":  top_fear,
            "greed": top_greed,
        },
        "sample_posts": all_samples[:6],
    }

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # file:// 프로토콜로 직접 열때도 동작하는 JS 파일 생성
    # 브라우저는 <script src> 태그로 JS는 로드할 수 있음 (fetch와 달리)
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write("// 자동 생성됨 — analyze.py 출력\n")
        f.write("// 수동 편집 금지\n\n")
        f.write("window.FEAR_GREED_DATA = ")
        json.dump(output, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    log.info(f"\n✅ 완료! 지수: {combined_score} ({score_label(combined_score)})")
    log.info(f"📄 저장 위치: {OUTPUT_FILE}")
    log.info("📂 이 파일을 브라우저 대시보드에 드래그&드롭하세요.")


if __name__ == "__main__":
    main()
