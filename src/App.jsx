import React, { useState, useRef, useEffect } from "react";
import { Home as HomeIcon, ShieldCheck, Skull, Trophy, Phone, Coins, Clock3, Sparkles } from "lucide-react";

const sonImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABtQTFRFAAAAi5u0JitE4Zpldjs2wMvc98KCvWxKPyYxHCVAtQAAAAF0Uk5TAEDm2GYAAABpSURBVAjXRc3BCcAgDAVQjy7QCQQXKJRuUK8ehE4QFyj9HoVazNhNcum/5PEJiXN/WKLTK7oWA0ha8QFcBlRUw01EBooUDVtYg+HZaGc9k4FFDvFbJCfL7lJKJsUEmoJHGkneep5tNu4fSh4qTrVfKjgAAAAASUVORK5CYII="; // tile_0085 (Kenney Tiny Dungeon)
const papaImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABtQTFRFAAAAi5u0JitE4ZplwMvcdjs2vWxK98KCPyYxqlFl6gAAAAF0Uk5TAEDm2GYAAABjSURBVAjXY2BAgA4gANEcIEYDSKC5vNwCJNRhXl5eDGakl5eXoTLKlYrUwYzwsrBSMKM1tDSiA2SMW2hoCNCgjhY3F5cUjw6gWtG0tMByEKMtLS0DxAAqDo0AWsvRARLpaAAAnUUrTOxRKb0AAAAASUVORK5CYII="; // tile_0086 (Kenney Tiny Dungeon)
const grandmaImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABtQTFRFAAAAJitE4ZplvWxKwMvcdjs298KCi5u0PyYx2oMaEAAAAAF0Uk5TAEDm2GYAAABzSURBVAjXY2BAgI6OjgYQzdEBZXW0l7hXdIAY5eUu5R0gmfIS93KgHEd7uZJ6eQWQ0VKUllbuAWK4CSaKgBllaWppHmA1aWnpQDUdbeFKSqUZHQwdaamhpmFpIEazcbFFMpDR0RoaGmHRATQ5NNQ0wqIBANQWKpjCoiiYAAAAAElFTkSuQmCC"; // tile_0100 (Kenney Tiny Dungeon)
const scammerImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRFAAAAi5u0wMvcPyYxKaGK/AAAAAF0Uk5TAEDm2GYAAABPSURBVAjXY2AAg///GRiY//8/wMB/a/kHBv6slUBi1SogsX4flLBfteoPw//Vv/4z/F796z3Dr+yd6xl+Za0EEq9Wr2f49zV8P4P9q/V/AJcrKOLbimK6AAAAAElFTkSuQmCC"; // tile_0121 (Kenney Tiny Dungeon)
const doorClosedImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAABOUlEQVR4nMWUvU6DUBiGH0i9AsvgDRgSHehABFmNHdy8ApZOJoYLUAbXLk2TTiy9CBzqrtIw1KGDd+BgvQIHHMohBA8//UGfiXzvyznvOfnOp1y7dwnAMo74S05NCwBlGIRJMBpVmmThhCao8pQdbuB5KMcnF0m+IDANnfFkCsDtjUv89i7VBFWeopY/cBZg4Hm8Pkd8vTxK0+6Lw/MrbMfKQqh5se3NZXt0ZKYz7YB+r1u72MPTBwD+5VGtd7ZYMf/8/lXPApiGTph+93tdZotV5YLFgE388zSwaegEaV2FdbcWm6pNxpNp9kLUGm/rqLB+p7Zj1Xn3hu1Y2WzY6AY010dz/a11GVkA09A3+nEX8nt1oHkThsN7YP1Mt9EFogmXcSSfA2XULVyny/j3Jiy9gSaTcBe/4Af10XFx18KVbgAAAABJRU5ErkJggg==";
const keyIconImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAoklEQVR4nGNgGLaAkYGBgSHfzvk/PkUTD+1lJGQQEyFDiLGIgYGBgQXGiHGWZtA03osief2sM8OSvU8JmYFqELohcLG9GgRdNfHQXkYmdMHqLg2G6i4NolwBA/l2zv9ZCClqLbuBVx5mKYaLyAUEXYTszRhnaSwqnmI3CJ9XsEUILDLgXrt+1hlDDTYxdFfCACMxiY0YwERM8iekhhgzhjAAAISxMBl3paqDAAAAAElFTkSuQmCC"; // tile_0027 Kenney Pixel Platformer
const heartFullImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAABGdBTUEAALGPC/xhBQAAAAxQTFRFAAAA3UQs/Gg7fjElSmUC5gAAAAF0Uk5TAEDm2GYAAABCSURBVAjXY2DABP/5PzAwMP///4eBgf/1v/1ActWv9SByFYJ8GgoUZ/4aClTD8DccqJ7BPv4AkOT/DzKB+Q8WYxkAjmcYOe8jc8MAAAAASUVORK5CYII="; // tile_0044 Kenney Pixel Platformer
const heartEmptyImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAQMAAABsABwUAAAABGdBTUEAALGPC/xhBQAAAAZQTFRFAAAAQ0pfJvlhvAAAAAF0Uk5TAEDm2GYAAAA3SURBVAjXY2BAAvw2DAzy/xgYLJ8zMBgcBmJmCLZgZ2CQ4WNg4JNhYGC3YGBg/sDAwPgAWScDAPb+Boh3uhZ8AAAAAElFTkSuQmCC"; // tile_0046 Kenney Pixel Platformer
const lockIconImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAAy4Fe/uSB9LQbbz5DCYK37QAAAAF0Uk5TAEDm2GYAAAA5SURBVAjXY2BxgQAHBhcYYHBRggAUljEEAFmGwkDaUBiFBZKByBobm7g4Y7DwyeIwD2ob3FVwlwIA+lkiqwNuG8kAAAAASUVORK5CYII="; // tile_0028 Kenney Pixel Platformer（南京錠アイコン）
const doorSealImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABdklEQVR4nO2WsUoDQRCGf8VSyAMkvQoWAbG9Zt9Cgq9w2NhYiIWNjfgKIr7FNWlFSCGofXyAgP1ZTdhcZnb21glKmK/c2/3599/duQEcx3EckboKbV2F9i/1d3OFbCz119yRPrzcnLcA8NR8rYw/TBtxTYmxSRgCAE6vH1lddrCuQksLia7R3zIeDQAAxwf7S31u82sD3R2SEADM5gtzc9oJiQlygmTw/rkqMnZxNmX1JHMAsMcJ0UQyOpsvVpK0IDaXutfqhede2+3lR5Gpq7vDtTHt0bEJcgJdo++vAQBwdNIk10vzcqtBVh3sI2itpSYowSVHRxhfAS1hjewENeL7xd21UswMbgozg/Gxlr5yju05YsuOpo+W+oolsW59k45VqoOkq5WcZIKxOctfXaylpckmmOpoiNz6Js0bjwbL/3EqTbXdmoQh3j6/Adi3W5xmdrtFDau1OYJriLMSJP51y8+JWTYLfbSz6qC1uU1pOo7jbCM/ZOG7ESUIqJEAAAAASUVORK5CYII="; // 木材交差＋南京錠（合成画像）
const doorOpenImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAACJklEQVR4nJWVP2gTURzHPznULGZJSiAQ4aJwBFIkFA6SRjJICYF2EpxcunRQQbN00wp2EpdS6FSHTq4uLYS6Bf8EAiISpAQkHQKB0ma5KRYah/J7fXf3cqlfOO7H+/19v38v9mj11QSg22kThO2lOU6chM5NGPV7JHOOT68er9Ict4zy824JAKtcKYWcWwMPgNsP7ypBkwH9E+eACnpw/69Pvx6vKjr76xblSomYU1iayOFao6EE3GKe7Z09AF48X6Xz88jIE0TJBHm7W1uKvqE7//61zdm3AwD2gdTisvH2/4s3Tx4rOrW4zFqjwbuXz1iYe3CZgXq8yp2nC+y/fx1SHt5MAdH9YHtpACM/c34WOltZ31RZsAA+Hn3wCWzUMiEl3bheS+Hp/FG/F9I32QSw6vEqyZyDW8wbBYKwvTTNcSsUhA69IU3QfVmHfw6Yd0uhppoGuWlUEDJF07C9s3c1htfyakDUjF9kE4C5FDpsL411kU3Q7bQpV8zzbmoiCPdNMDhr4FHIpoz8cqXE70+fOU6cTM/AyvqmL1JJ96jfw/bSkXVujlsqC0Fbgtq9yxFXAUQ14Y/TL4pO5hy1ZiU4+Qs9K/VuMa/KF3MKSxNpCFlCG7UMbw+HSkF2gUDfCdbA4/R8aMyIXj7dpiy4bqc9uwmDzsG/E8S53H6WbhDWqN+LbEKByQFczbwe1DRZgf4AWsmcEzm3Yiw/py2PGXN+3Scc4B9sdN28hugToAAAAABJRU5ErkJggg==";
const papaDefeatedImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABBklEQVR4nKWSsY2EMBBFH6sLtwECEjeAhFwF1LDJCppwYpFQAgm0AVVYSI7INqGQuwifjb0nre5H1h+/75kB+Keyq1GW5fdfgLU2YG6fwKk7WaqglEIIEYCv14thGKJOgg7ewQBCCJRSkR8F7Pv+tv1ULQr4VFFA0zQA3J8P7s9HcD5rvqIlFkWB1hqAZVkwxiClpGka+r7nOA7gd4nJr1AUhXtBa03f9wAO9gNuV3iaJqSU7uIJn7Xrg9kVBljXlbqug1l9r+s653+dh3meAdi2DWMMVxljyPOcqqqY55m2bXEj+BrHMRjhlJSScRwjP0v9//4SfflLdCNYa6OQVAepAGtt9gM8i2wiWzDj3wAAAABJRU5ErkJggg=="; // 失敗時（グレースケール＋赤い目）
const sonDefeatedImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8klEQVR4nKWTvY2EMBCF36w2vAYInFDAISR34YgCLjmJJiiAEkhwD24EaeQGSAgo4y5YjeU/VrvaFzEPf88jewx8KMqNruv+ngHe+4S5vQPX1lDth1IKWusE3LYNx3EUnSQdXMEAoLWGUqrwiwCBjTGJb4ypBt8LJ4JrIc655x0I9PX7k/h5fdnBvu9o2zZ8i76zWlS9hWmaACAESdg8z6GWW6AcXtcVzIzzPJOdmqZB3/cYxzEJoRx+RXFIOERrLYgIzHwJMjOICNba4BWHuCwLhmGoBjjnEhgAqDb/MnEyunkd65a/LuAxjfHU5bXIe0//XjFfLtNTSHcAAAAASUVORK5CYII="; // 失敗時（グレースケール＋赤い目）
const grandmaDefeatedImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABLklEQVR4nKWTMY6DMBBFn9GWKWhT0HABhOV678AB0kRUuUSUS6TyptgcIAXKLSJbXAAKjpD0bLP2GgNpdiRL45n5f77HNvzTRBwoimJcK27bdlY/CbwDrxF5JwQfDgcAyrIEwFoLwPl8npEkMbsDh0BHFOacJe+kxwpCc5iJgrBDmqb0fU/f96sKAT7ijtZa0jQlz/NJoTFmomqRwBUIIdjsdwC8Llc2+x2fwPPre3aUGYG1Fiklr8sVgK7ryH99AYzjdFxJDA7lApOjGGNmA03CG5BS0jSN7xwuYwxN0yCl9OCiKEbhCLTWPnE6nbyvlOLxeABwPB59vK7r5RnUdU1VVX6/3W5RSvmc1pr7/e7zYukRZVkWhwAYhoGqqrjdbn8ziH9YDHbdl6xtW/ED1Jd+p+KITBQAAAAASUVORK5CYII="; // 失敗時（グレースケール＋赤い目）
const livingRoomImg = "data:image/png;base64,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"; // ダンジョン背景v7（柱なし・石壁一面）

const C = {
  bg: "#0c1220",
  bg2: "#121a2d",
  navy: "#182540",
  navy2: "#203253",
  cyan: "#7fd6ff",
  card: "#fff8ef",
  card2: "#f4e7d5",
  ink: "#2c1f1d",
  inkSoft: "#6e5d5c",
  gold: "#ffcc6b",
  goldDeep: "#b77a1f",
  red: "#ff584f",
  redDeep: "#b92128",
  safe: "#47b37d",
  safeDeep: "#2d7f59",
  sky: "#c7efff",
  bubbleLeft: "#ffffff",
  bubbleRight: "#fff1bf",
  outline: "#2a2020",
  panel: "rgba(14,18,30,.78)",
};

const MEMBERS = [
  { id: "papa", name: "男性", subtitle: "家計の守り手", x: 19, y: 1, img: papaImg, accent: "#7fd6ff" },
  { id: "son", name: "青年", subtitle: "SNS好き", x: 50, y: 0, img: sonImg, accent: "#8ce99a" },
  { id: "grandma", name: "女性", subtitle: "電話に出がち", x: 81, y: 2, img: grandmaImg, accent: "#f7b6d2" },
];

const MAX_CONCURRENT = 2;
const DAMAGE_LIMIT = 3; // このダメージ数でOUT（時間は一切使わない）
const DOOR_DEPTH = [
  { scale: 1.0, bottom: 150, z: 1 },  // 左（パパ）：少し小さめに
  { scale: 1.4, bottom: 126, z: 3 },  // 中央（息子）：もっと手前・大きめに
  { scale: 1.15, bottom: 150, z: 1 }, // 右（女性）：気持ち手前に
];
const SPAWN_ORDER = ["grandma", "papa", "son"]; // 1日の開始時、この順で優先的に会話が始まる

const TEMPLATE_BY_MEMBER = { grandma: "cardsecurity", papa: "kanpu", son: "yamibaito" }; // ①は女性専用、②はパパ専用、③は息子専用

const TEMPLATES = [
  {
    id: "cardsecurity",
    label: "カード詐欺盗（セキュリティセンター詐称）",
    amount: 500000,
    trait: "会社を騙って連絡し、不安を煽って急がせ、カード番号などの情報を聞き出そうとするタイプ",
    turns: [
      { speaker: "scammer", chunks: [{ t: "お世話になっております。" }, { t: "こちらトラストカードです。", kw: true }, { t: "田中様でしょうか？" }] },
      { speaker: "family", t: "はい、田中ですが…。" },
      { speaker: "scammer", chunks: [{ t: "お客様のカードに不正利用の痕跡がございました。" }, { t: "早急に対応しないと被害拡大", kw: true }, { t: "の恐れがあります。" }] },
      { speaker: "family", t: "ええっ…そんな…どうすればいいの…" },
      { speaker: "scammer", chunks: [{ t: "まずは" }, { t: "ご本人様確認のため、" }, { t: "カード番号をお教えください。", kw: true }] },
      { speaker: "family", t: "わかりました…ちょっと待っててくださいね", fail: true },
    ],
  },
  {
    id: "kanpu",
    label: "還付金詐欺",
    amount: 300000,
    trait: "役所を騙って「お得な話」を持ちかけ、期限で急がせて、ATMなど特定の行動に誘導するタイプ",
    turns: [
      { speaker: "scammer", chunks: [{ t: "こちら市役所です。", kw: true }, { t: "医療費の還付金のご案内で", kw: true }, { t: "お電話しました" }] },
      { speaker: "family", t: "還付金？それはありがたいですね。" },
      { speaker: "scammer", chunks: [{ t: "本日中の", kw: true }, { t: "お手続きでのみ" }, { t: "お受け取りが可能です" }] },
      { speaker: "family", t: "今日中…急いだほうがいいですね。" },
      { speaker: "scammer", chunks: [{ t: "お電話口でご案内しますので、" }, { t: "電話を切らずに" }, { t: "お近くのATMへ向かってください", kw: true }] },
      { speaker: "family", t: "わかりました、ATMに向かいます", fail: true },
    ],
  },
  {
    id: "yamibaito",
    label: "闇バイト勧誘",
    amount: 200000,
    trait: "SNSのDMでうまい話を持ちかけ、期限で急がせて、外部サイトへ誘導するタイプ",
    turns: [
      { speaker: "scammer", chunks: [{ t: "初めまして！" }, { t: "スマホだけで一日10万円稼げる仕事", kw: true }, { t: "にご興味ないですか？" }] },
      { speaker: "family", t: "（おや、知らないアカウントからメッセージだ。）" },
      { speaker: "scammer", chunks: [{ t: "大好評につき、" }, { t: "10分以内にご応募いただいた方のみ", kw: true }, { t: "対象とさせていただきます。" }] },
      { speaker: "family", t: "（なんだって？すぐ登録しないと。）" },
      { speaker: "scammer", chunks: [{ t: "応募方法はカンタン。" }, { t: "「sagisagi.ne.jp」で友達登録するだけ！", kw: true }, { t: "今すぐチェック★" }] },
      { speaker: "family", t: "（よし、アクセスしてみよう！）", fail: true },
    ],
  },
];

function getKeywords(tpl) {
  const out = [];
  tpl.turns.forEach((turn) => {
    if (turn.speaker !== "scammer") return;
    turn.chunks.forEach((c) => { if (c.kw) out.push(c.t.replace(/[。、]$/, "")); });
  });
  return out;
}

const HOWTO_TIPS = [
  { label: "騙る", desc: "役所・会社・警察などを名乗って信じ込ませる", example: "例：「こちら市役所です」" },
  { label: "急かす", desc: "考える時間を与えず、焦らせて判断を鈍らせる", example: "例：「本日中に」「10分以内に」" },
  { label: "誘導する", desc: "ATMや外部サイトなど、特定の行動に導く", example: "例：「お近くのATMへ」" },
  { label: "情報を引き出す", desc: "個人情報やカード番号などを聞き出そうとする", example: "例：「カード番号をお教えください」" },
];

const START_ASSET = 8000000;
const TOTAL_DAYS = 7;

function fmtYen(n) {
  return "¥" + n.toLocaleString("ja-JP");
}

export default function ScamDefenseGame() {
  // GA4/GTM計測用ヘルパー：dataLayerにイベントをpushする
  function pushDL(event, params = {}) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  }

  const [scams, setScams] = useState({});
  const [openMember, setOpenMember] = useState(null);
  const [status, setStatus] = useState("start");
  const [showHowTo, setShowHowTo] = useState(false);
  const [showDex, setShowDex] = useState(false);
  const [autoDexFromDefeat, setAutoDexFromDefeat] = useState(false); // 撃退直後の自動オープンかどうか（閉じた時の挙動を分けるため）
  const [pendingCloseAfterDex, setPendingCloseAfterDex] = useState(null); // 自動オープン後に閉じる対象の家族id
  const [dex, setDex] = useState({}); // サギ辞典：撃退済みの詐欺タイプを記録
  const [seenDex, setSeenDex] = useState({}); // 辞典を開いて演出を見終わったものを記録（二重再生防止）
  const [doorState, setDoorState] = useState({}); // memberId -> 'locked'(撃退済)
  const [flash, setFlash] = useState(null);
  const [wrongFlash, setWrongFlash] = useState(null);
  const [burst, setBurst] = useState(null); // {kind: 'correct'|'wrong'|'objection'|'fail'} 大きく出て消える一瞬の演出用

  const scamsRef = useRef(scams);
  scamsRef.current = scams;
  const dexRef = useRef(dex);
  dexRef.current = dex;
  const doorStateRef = useRef(doorState);
  doorStateRef.current = doorState;
  const chatScrollRef = useRef(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [openMember, scams[openMember]?.revealedCount, scams[openMember]?.outcome]);

  function spawnFor(id) {
    const tpl = TEMPLATES.find((t) => t.id === TEMPLATE_BY_MEMBER[id]);
    return { templateId: tpl.id, label: tpl.label, turns: tpl.turns, amount: tpl.amount, found: [], damage: 0, outcome: null, revealedCount: 1 };
  }

  function closeScamModal(explicitId) {
    const memberId = explicitId || openMember;
    if (!memberId) return;
    if (openMember === memberId) setOpenMember(null);

    const remainingScams = { ...scamsRef.current };
    delete remainingScams[memberId];

    if (Object.keys(dexRef.current).length >= TEMPLATES.length) {
      setScams(remainingScams);
      setStatus("win");
      return;
    }

    const activeCount = Object.keys(remainingScams).length;
    const slotsFree = MAX_CONCURRENT - activeCount;
    if (slotsFree > 0) {
      const candidates = SPAWN_ORDER.filter((id) => !remainingScams[id] && doorStateRef.current[id] !== "locked");
      candidates.slice(0, slotsFree).forEach((id) => { remainingScams[id] = spawnFor(id); });
    }

    setScams(remainingScams);
  }

  const burstTimeoutRef = useRef(null);
  function showBurst(kind, duration = 700, extra = null) {
    if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
    setBurst({ kind, key: Date.now(), duration, extra });
    burstTimeoutRef.current = setTimeout(() => setBurst(null), duration);
  }

  function tapChunk(memberId, turnIdx, chunk) {
    const s = scamsRef.current[memberId];
    if (!s || s.outcome || s.found.includes(turnIdx)) return;
    if (chunk.kw) {
      pushDL("keyword_tap", { member: memberId, correct: true, keyword: chunk.t });
      const newFound = [...s.found, turnIdx];
      if (newFound.length >= 3) {
        finalizeSuccess(memberId, newFound);
      } else {
        const newRevealed = Math.min(s.turns.length - 1, s.revealedCount + 2); // 本来のセリフ（最後の家族の発言）は成功時には見せない
        setScams((prev) => ({ ...prev, [memberId]: { ...prev[memberId], found: newFound, revealedCount: newRevealed } }));
        showBurst("correct");
      }
    } else {
      pushDL("keyword_tap", { member: memberId, correct: false, keyword: chunk.t });
      const newDamage = s.damage + 1;

      if (newDamage >= DAMAGE_LIMIT) {
        pushDL("scam_fail", { member: memberId, template: s.templateId });
        setScams((prev) => ({ ...prev, [memberId]: { ...prev[memberId], damage: newDamage, outcome: "fail" } }));
        setFlash({ memberId, kind: "fail" });
        setTimeout(() => setFlash(null), 900);
        showBurst("fail", 2000);
        setTimeout(() => {
          // 失敗しても詐欺師はもう一度現れる：会話をリセットして再挑戦させる
          setScams((prev) => (prev[memberId] ? { ...prev, [memberId]: spawnFor(memberId) } : prev));
        }, 2000);
      } else {
        const key = `${memberId}-${turnIdx}-${chunk.t}`;
        setWrongFlash(key);
        setTimeout(() => setWrongFlash((cur) => (cur === key ? null : cur)), 350);
        showBurst("wrong");
        setScams((prev) => ({ ...prev, [memberId]: { ...prev[memberId], damage: newDamage } }));
      }
    }
  }

  function finalizeSuccess(memberId, newFound) {
    const s = scamsRef.current[memberId];
    const isNewToDex = !dexRef.current[s.templateId];
    pushDL("scam_defeat", { member: memberId, template: s.templateId, new_dex_entry: isNewToDex });
    setScams((prev) => ({ ...prev, [memberId]: { ...prev[memberId], found: newFound, outcome: "success", newDexEntry: isNewToDex } }));
    setDoorState((prev) => ({ ...prev, [memberId]: "locked" }));
    if (isNewToDex) setDex((prev) => ({ ...prev, [s.templateId]: { unlocked: true } }));
    setFlash({ memberId, kind: "success" });
    setTimeout(() => setFlash(null), 900);
    showBurst("objection", 2700); // 通常より2秒長く表示
  }

  function startGame() {
    pushDL("game_start");
    const initial = {};
    SPAWN_ORDER.slice(0, MAX_CONCURRENT).forEach((id) => { initial[id] = spawnFor(id); });
    setScams(initial);
    setDoorState({});
    setStatus("playing");
  }

  function restart() {
    pushDL("restart_click");
    setScams({});
    setDex({});
    setSeenDex({});
    setDoorState({});
    setShowDex(false);
    setAutoDexFromDefeat(false);
    setPendingCloseAfterDex(null);
    setStatus("start");
  }

  const openScam = openMember ? scams[openMember] : null;
  const openMeta = openMember ? MEMBERS.find((m) => m.id === openMember) : null;
  const revealedCount = openScam ? openScam.revealedCount : 0;

  return (
    <div style={ui.app}>
      <div style={ui.shell}>
        <div style={ui.chromeGlow} />

        <header style={ui.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div>
              <div style={ui.headerTitle}>サギのカギ</div>
              <div style={ui.headerSub}>詐欺師との会話からキーワードを探せ</div>
            </div>
          </div>
        </header>

        <div style={ui.collectedKeysRowOuter}>
          <div style={ui.collectedKeysButton}>
            <span style={ui.collectedKeysLabel}>集めたカギ</span>
            <div style={ui.collectedKeysRow}>
              {TEMPLATES.map((tpl) => (
                <img
                  key={tpl.id}
                  src={keyIconImg}
                  alt=""
                  style={{
                    width: 18,
                    height: 18,
                    imageRendering: "pixelated",
                    transform: "rotate(90deg)",
                    filter: dex[tpl.id] ? "none" : "grayscale(1) brightness(1.3) opacity(.5)",
                  }}
                />
              ))}
            </div>
          </div>
          <button onClick={() => { pushDL("dex_open", { source: "header" }); setShowDex(true); }} style={ui.dexButton}>📖 サギのカギ辞典</button>
        </div>

        <section style={ui.stageWrap}>
          <div style={ui.roomBackdrop}>
            <img src={livingRoomImg} alt="ダンジョン背景" style={ui.roomImg} />
            <div style={ui.roomShade} />
            <div style={ui.roomLightA} />
            <div style={ui.roomLightB} />

            {MEMBERS.map((m, idx) => {
              const s = scams[m.id];
              const isFlashing = flash && flash.memberId === m.id;
              const inDanger = s && s.damage > 0 && !s.outcome;
              const isActive = s && !s.outcome; // 詐欺進行中＝扉が開いて詐欺師が出ている
              const doorLocked = doorState[m.id] === "locked";
              const isDoorOpen = !!s;
              const depth = DOOR_DEPTH[idx] || DOOR_DEPTH[0];
              return (
                <div
                  key={m.id}
                  style={{
                    position: "absolute",
                    left: `${m.x}%`,
                    bottom: `${depth.bottom}px`,
                    transform: `translateX(-50%) scale(${depth.scale})`,
                    zIndex: depth.z,
                    textAlign: "center",
                  }}
                >
                  {isActive && <AlertBadge size={34} urgent={false} />}

                  <button
                    onClick={() => { if (isActive) { pushDL("door_tap", { member: m.id }); setOpenMember(m.id); } }}
                    aria-label={`${m.name}の扉を開く`}
                    style={{
                      position: "relative",
                      border: "none",
                      background: "none",
                      padding: 0,
                      cursor: isActive ? "pointer" : "default",
                      filter: isFlashing
                        ? flash.kind === "success"
                          ? "drop-shadow(0 0 10px rgba(95,207,154,.85))"
                          : "drop-shadow(0 0 10px rgba(255,88,79,.85))"
                        : "none",
                    }}
                  >
                    <img src={isDoorOpen ? doorOpenImg : doorClosedImg} alt="扉" style={ui.doorImg} />
                    {isActive && (
                      <img src={scammerImg} alt={`${m.name}を狙う詐欺師`} style={{ ...ui.doorGhost, animation: "ghostFloat 1.8s ease-in-out infinite" }} />
                    )}
                    {doorLocked && (
                      <img src={doorSealImg} alt="封鎖済み" style={ui.doorSeal} />
                    )}
                  </button>
                </div>
              );
            })}

            {/* 中央（息子）ドアの右手前に、息子本人を立たせる */}
            <img
              src={sonImg}
              alt="青年"
              style={{
                position: "absolute",
                left: "62%",
                bottom: "108px",
                width: 46,
                transform: "translateX(-50%)",
                imageRendering: "pixelated",
                filter: "drop-shadow(0 6px 8px rgba(0,0,0,.4))",
                zIndex: 4,
              }}
            />
            <img
              src={papaImg}
              alt="男性"
              style={{
                position: "absolute",
                left: "24%",
                bottom: "132px",
                width: 40,
                transform: "translateX(-50%)",
                imageRendering: "pixelated",
                filter: "drop-shadow(0 6px 8px rgba(0,0,0,.4))",
                zIndex: 2,
              }}
            />
            <img
              src={grandmaImg}
              alt="女性"
              style={{
                position: "absolute",
                left: "90%",
                bottom: "132px",
                width: 40,
                transform: "translateX(-50%)",
                imageRendering: "pixelated",
                filter: "drop-shadow(0 6px 8px rgba(0,0,0,.4))",
                zIndex: 2,
              }}
            />
          </div>
        </section>

        <div style={ui.bottomTip}>
          扉から出てきた詐欺師をタップ → 会話の中からキーワードを3つみつけよう
        </div>

        {openScam && openMeta && (
          <div style={ui.overlay}>
            <div style={ui.dialogShell}>
              <div style={ui.dialogHeader}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <AlertBadge size={42} urgent={openScam.damage > 0 && !openScam.outcome} />
                  <div>
                    <div style={ui.dialogTitle}>{openMeta.name}に詐欺師の魔の手が！</div>
                    <div style={ui.dialogSub}>詐欺師の言葉から詐欺のキーワードを見つけよう</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (openScam.outcome === null) {
                      pushDL("chat_close", { member: openMember, resolved: false });
                      setOpenMember(null); // 未対応のまま。詐欺師とドアはそのまま残る
                    } else {
                      pushDL("chat_close", { member: openMember, resolved: true });
                      closeScamModal();
                    }
                  }}
                  style={ui.closeButton}
                >
                  ×
                </button>
              </div>

              <div style={ui.comicFrame}>
                {burst && (
                  <div key={burst.key} style={ui.burstOverlay}>
                    {burst.kind === "objection" ? (
                      <div style={ui.burstObjectionWrap}>
                        <div style={{ ...ui.burstBox, ...ui.burstObjection, animation: `burstPop ${burst.duration}ms ease forwards` }}>
                          <span>詐欺だ！</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          ...ui.burstBox,
                          ...(burst.kind === "correct" ? ui.burstCorrect : burst.kind === "wrong" ? ui.burstWrong : ui.burstFail),
                          animation: `burstPop ${burst.duration}ms ease forwards`,
                        }}
                      >
                        {burst.kind === "wrong" && <span style={ui.burstIcon}>✕</span>}
                        <span>{burst.kind === "correct" ? "カギ発見！" : burst.kind === "wrong" ? "miss..." : "失敗…"}</span>
                      </div>
                    )}
                  </div>
                )}
                <div style={ui.chatArena}>
                  <div style={ui.chatBgPattern} />

                  <div style={ui.chatScroll} className="chat-scroll-area" ref={chatScrollRef}>
                    {openScam.turns.slice(0, revealedCount).map((turn, idx) => {
                      const isFamily = turn.speaker === "family";
                      const found = openScam.found.includes(idx);
                      const locked = found || openScam.outcome === "fail";
                      if (isFamily) {
                        const isThought = turn.t.startsWith("（") && turn.t.endsWith("）");
                        return (
                          <SpeechBubble key={idx} side="right" avatarSrc={openMeta.img} avatarAlt={openMeta.name}>
                            <div style={{ ...ui.bubbleText, fontStyle: isThought ? "italic" : "normal", opacity: isThought ? 0.85 : 1 }}>{turn.t}</div>
                          </SpeechBubble>
                        );
                      }
                      return (
                        <SpeechBubble key={idx} side="left" avatarSrc={scammerImg} avatarAlt="詐欺師">
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "flex-start" }}>
                            {turn.chunks.map((chunk, ci) => {
                              const key = `${openMember}-${idx}-${chunk.t}`;
                              const isWrongFlash = wrongFlash === key;
                              const isFoundKw = found && chunk.kw;
                              return (
                                <button
                                  key={ci}
                                  onClick={() => tapChunk(openMember, idx, chunk)}
                                  disabled={locked}
                                  style={{
                                    ...ui.chunkButton,
                                    background: isFoundKw ? C.red : isWrongFlash ? "#ffd2ce" : ui.chunkButton.background,
                                    color: isFoundKw ? "#fff" : C.ink,
                                    border: isFoundKw ? `1.5px solid ${C.red}` : isWrongFlash ? "1.5px solid #ff8c86" : ui.chunkButton.border,
                                    transform: isWrongFlash ? "translateY(1px)" : "translateY(0)",
                                    cursor: locked ? "default" : "pointer",
                                    opacity: 1,
                                  }}
                                >
                                  {chunk.t}
                                </button>
                              );
                            })}
                          </div>
                        </SpeechBubble>
                      );
                    })}
                    {openScam.outcome === "success" && !openScam.newDexEntry && (
                      <SpeechBubble side="right" avatarSrc={openMeta.img} avatarAlt={openMeta.name}>
                        <div style={{ ...ui.bubbleText, fontWeight: 900, color: C.redDeep }}>詐欺だ！</div>
                      </SpeechBubble>
                    )}
                  </div>
                </div>
              </div>

              <div style={ui.actionArea}>
                <div style={ui.progressCard}>
                  <div style={ui.progressHead}>
                    <span style={ui.progressHeadLabel}>キーワード発見数</span>
                    <strong>{openScam.found.length} / 3</strong>
                  </div>
                  <div style={ui.evidenceRow}>
                    {[0, 1, 2].map((i) => {
                      const filled = openScam.found.length > i;
                      return (
                        <div
                          key={i}
                          style={{
                            ...ui.keySlot,
                            background: filled ? "linear-gradient(180deg,#fffdf7 0%,#fdf1d6 100%)" : "rgba(47,58,88,.9)",
                            border: filled ? "1.5px solid #e0a92f" : "1.5px solid transparent",
                            boxShadow: filled ? "0 0 12px 2px rgba(255,214,110,.55)" : "inset 0 -2px 0 rgba(0,0,0,.18)",
                            transform: filled ? "scale(1.06)" : "scale(1)",
                          }}
                        >
                          <img
                            src={keyIconImg}
                            alt={filled ? "見つけた鍵" : "未発見"}
                            style={{
                              width: 18,
                              height: 18,
                              imageRendering: "pixelated",
                              transform: "rotate(90deg)",
                              filter: filled ? "none" : "grayscale(1) brightness(1.3) opacity(.55)",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={ui.progressCard}>
                  <div style={ui.progressHead}>
                    <span style={ui.progressHeadLabel}>ライフ</span>
                    <strong>{DAMAGE_LIMIT - openScam.damage} / {DAMAGE_LIMIT}</strong>
                  </div>
                  <div style={ui.evidenceRow}>
                    {[0, 1, 2].map((i) => {
                      const lost = openScam.damage > (2 - i); // 右側から減っていく
                      return (
                        <div
                          key={i}
                          style={{
                            ...ui.keySlot,
                            background: !lost ? "linear-gradient(180deg,#fff6f0 0%,#ffe4d6 100%)" : "rgba(47,58,88,.9)",
                            border: !lost ? "1.5px solid #ff6e4f" : "1.5px solid transparent",
                            boxShadow: !lost ? "0 0 12px 2px rgba(255,110,79,.55)" : "inset 0 -2px 0 rgba(0,0,0,.18)",
                            transform: !lost ? "scale(1.06)" : "scale(1)",
                          }}
                        >
                          <img
                            src={lost ? heartEmptyImg : heartFullImg}
                            alt={lost ? "失った" : "残っている"}
                            style={{ width: 18, height: 18, imageRendering: "pixelated" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {openScam.outcome !== null && (
                <button
                  onClick={() => {
                    pushDL("next_button", { member: openMember, outcome: openScam.outcome, new_dex_entry: !!openScam.newDexEntry });
                    if (openScam.outcome === "success" && openScam.newDexEntry) {
                      setAutoDexFromDefeat(true);
                      setPendingCloseAfterDex(openMember);
                      setShowDex(true);
                    } else {
                      closeScamModal();
                    }
                  }}
                  style={{ ...ui.primaryButton, background: openScam.outcome === "success" ? "linear-gradient(180deg,#5fcf9a 0%,#2d7f59 100%)" : "linear-gradient(180deg,#78829e 0%,#5c6580 100%)" }}
                >
                  つぎへ
                </button>
              )}
            </div>
          </div>
        )}

        {status === "start" && (
          <Overlay>
            <div style={ui.startSubtitle}>特殊詐欺シミュレーションゲーム</div>
            <h2 style={ui.resultTitle}>サギのカギ</h2>

            <div style={ui.startCastRow}>
              <img src={papaImg} alt="男性" style={ui.startCastImg} />
              <img src={sonImg} alt="青年" style={ui.startCastImg} />
              <img src={grandmaImg} alt="女性" style={ui.startCastImg} />
              <img src={scammerImg} alt="犯人" style={ui.startCastImg} />
            </div>

            <div style={ui.startButtonStack}>
              <BigButton onClick={() => { pushDL("start_click"); setStatus("tips"); }}>スタート</BigButton>
              <button onClick={() => { pushDL("howto_toggle", { open: !showHowTo }); setShowHowTo((v) => !v); }} style={ui.secondaryButton}>
                {showHowTo ? "あそびかたを閉じる" : "あそびかた"}
              </button>
            </div>

            {showHowTo && (
              <>
                <p style={{ ...ui.resultLead, color: "#4a3f36" }}>
                  詐欺師が扉から出てきて、詐欺をしかけてくる。詐欺のキーワードを3つみつけて撃退し、二度と出てこれないよう扉にカギをかけよう。
                </p>
                <div style={ui.howtoIllustrationRow}>
                  <div style={ui.howtoIllustrationCol}>
                    <div style={{ position: "relative", width: 76, height: 76 }}>
                      <img src={doorOpenImg} alt="" style={{ width: 70, height: 70, imageRendering: "pixelated" }} />
                      <img src={scammerImg} alt="" style={{ ...ui.doorGhost, width: "56%" }} />
                      <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)" }}>
                        <AlertBadge size={26} urgent={false} />
                      </div>
                    </div>
                    <div style={ui.howtoCaption}>詐欺が発生</div>
                  </div>
                  <div style={ui.howtoIllustrationCol}>
                    <div style={{ width: 76, height: 76, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      {[0, 1, 2].map((i) => (
                        <img key={i} src={keyIconImg} alt="" style={{ width: 20, height: 20, imageRendering: "pixelated", transform: "rotate(90deg)" }} />
                      ))}
                    </div>
                    <div style={ui.howtoCaption}>キーワードを集めて…</div>
                  </div>
                  <div style={ui.howtoIllustrationCol}>
                    <div style={{ position: "relative", width: 76, height: 76 }}>
                      <img src={doorClosedImg} alt="" style={{ width: 70, height: 70, imageRendering: "pixelated" }} />
                      <img src={doorSealImg} alt="" style={ui.doorSeal} />
                    </div>
                    <div style={ui.howtoCaption}>撃退！</div>
                  </div>
                </div>
              </>
            )}
          </Overlay>
        )}

        {status === "tips" && (
          <Overlay>
            <Sparkles size={36} color={C.gold} />
            <h2 style={ui.resultTitle}>キーワードを探すコツ</h2>
            <p style={ui.resultLead}>詐欺師の言葉には、だいたいこの4つのどれかが混ざっています。</p>
            <div style={ui.tipsList}>
              {HOWTO_TIPS.map((tip) => (
                <div key={tip.label} style={ui.tipCard}>
                  <div style={ui.tipLabel}>{tip.label}</div>
                  <div style={ui.tipDesc}>{tip.desc}</div>
                  <div style={ui.tipExample}>{tip.example}</div>
                </div>
              ))}
            </div>
            <div style={ui.startButtonStack}>
              <BigButton onClick={startGame}>スタート</BigButton>
              <button onClick={() => { pushDL("tips_back"); setStatus("start"); }} style={ui.secondaryButton}>戻る</button>
            </div>
          </Overlay>
        )}

        {status === "win" && (
          <Overlay>
            <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto" }}>
              <img src={doorClosedImg} alt="" style={{ width: 76, height: 76, imageRendering: "pixelated" }} />
              <img src={doorSealImg} alt="" style={ui.doorSeal} />
            </div>
            <h2 style={ui.resultTitle}>CLEAR！</h2>
            <p style={ui.resultLead}>サギのカギをすべて集め、詐欺の扉を閉じることができました。</p>
            <div style={ui.startButtonStack}>
              <BigButton onClick={() => { pushDL("dex_open", { source: "win_screen" }); setShowDex(true); }}>サギのカギ辞典を見る</BigButton>
              <button onClick={restart} style={ui.secondaryButton}>もう一度遊ぶ</button>
            </div>
          </Overlay>
        )}

        {showDex && (
          <div style={ui.resultOverlay}>
            <div style={{ ...ui.resultCard, maxHeight: "82%", padding: 0, display: "flex", flexDirection: "column", position: "relative" }}>
              <button
                onClick={() => {
                  pushDL("dex_close", { collected: Object.keys(dex).length });
                  setShowDex(false);
                  setSeenDex((prev) => {
                    const next = { ...prev };
                    Object.keys(dex).forEach((id) => { next[id] = true; });
                    return next;
                  });
                  if (autoDexFromDefeat) {
                    setAutoDexFromDefeat(false);
                    closeScamModal(pendingCloseAfterDex);
                    setPendingCloseAfterDex(null);
                  }
                }}
                style={ui.dexCloseButton}
              >
                ×
              </button>

              <div style={{ padding: "26px 18px 0", flex: "0 0 auto" }}>
                <h2 style={{ ...ui.resultTitle, marginBottom: 0 }}>📖 サギのカギ辞典</h2>
                <p style={{ ...ui.resultLead, marginBottom: 14 }}>集めたサギのカギが、ここに記録されていきます。</p>
              </div>

              <div style={{ overflowY: "auto", padding: "0 18px 18px", flex: "1 1 auto", minHeight: 0 }}>
                <div style={ui.tipsList}>
                  {TEMPLATES.map((tpl) => {
                    const unlocked = dex[tpl.id];
                    const isFreshlyUnlocked = unlocked && !seenDex[tpl.id];
                    if (!unlocked) {
                      return (
                        <div key={tpl.id} style={{ ...ui.tipCard, opacity: 0.55, display: "flex", alignItems: "center", gap: 10 }}>
                          <img src={keyIconImg} alt="未獲得" style={{ width: 22, height: 22, imageRendering: "pixelated", transform: "rotate(90deg)", filter: "grayscale(1) brightness(1.3) opacity(.7)", flexShrink: 0 }} />
                          <div style={ui.tipDesc}>まだ獲得していません。詐欺師を撃退すると記録されます</div>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={tpl.id}
                        style={{
                          ...ui.tipCard,
                          ...(isFreshlyUnlocked ? { animation: "dexReveal 1s ease-out", border: `1.5px solid ${C.gold}` } : {}),
                        }}
                      >
                        {isFreshlyUnlocked && <div style={ui.dexNewTag}>NEW</div>}
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={ui.tipLabel}>{tpl.label}</div>
                          <img src={keyIconImg} alt="獲得済み" style={{ width: 16, height: 16, imageRendering: "pixelated", transform: "rotate(90deg)" }} />
                        </div>
                        <div style={ui.tipDesc}>{tpl.trait}</div>
                        <div style={ui.tipExample}>怪しい一言：{getKeywords(tpl).join(" / ")}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Zen+Maru+Gothic:wght@400;700;900&display=swap');
        * { box-sizing: border-box; }
        button { font: inherit; }
        .chat-scroll-area { scrollbar-width: none; -ms-overflow-style: none; }
        .chat-scroll-area::-webkit-scrollbar { display: none; width: 0; height: 0; }
        @keyframes ghostFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-4px); }
        }
        @keyframes idleFloat {
          from { transform: translate(-50%, 0px); }
          to { transform: translate(-50%, -6px); }
        }
        @keyframes badgeBounce {
          from { transform: translateY(0px) scale(1); }
          to { transform: translateY(-5px) scale(1.05); }
        }
        @keyframes pulseGlow {
          from { transform: translateY(0px) scale(1); box-shadow: 0 0 0 0 rgba(255,88,79,.25); }
          to { transform: translateY(-2px) scale(1.08); box-shadow: 0 0 0 10px rgba(255,88,79,0); }
        }
        @keyframes panelRise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scan {
          from { background-position: 0 0; }
          to { background-position: 0 26px; }
        }
        @keyframes burstPop {
          0% { opacity: 0; transform: scale(0.4) translateY(0); }
          15% { opacity: 1; transform: scale(1.15) translateY(0); }
          30% { opacity: 1; transform: scale(1) translateY(0); }
          75% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.96) translateY(-14px); }
        }
        @keyframes dexReveal {
          0% { opacity: 0; transform: translateY(14px) scale(0.9); box-shadow: 0 0 0 0 rgba(255,204,107,0); }
          40% { opacity: 1; transform: translateY(-3px) scale(1.03); box-shadow: 0 0 24px 4px rgba(255,204,107,.55); }
          100% { opacity: 1; transform: translateY(0) scale(1); box-shadow: 0 0 0 0 rgba(255,204,107,0); }
        }
        @keyframes dexTagPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes floatUpFade {
          0% { opacity: 0; transform: translateY(4px); }
          20% { opacity: 1; transform: translateY(0); }
          70% { opacity: 1; transform: translateY(-10px); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes assetPulseFlash {
          0%, 100% { color: #fff4d6; }
          20%, 55% { color: #ff6b5e; }
        }
      `}</style>
    </div>
  );
}

function HudPill({ icon, label, value, tone = "blue", pulse = false }) {
  const tones = {
    blue: { bg: "linear-gradient(180deg,#223961 0%,#162746 100%)", border: "#7fd6ff44", text: "#eaf9ff" },
    gold: { bg: "linear-gradient(180deg,#5b4217 0%,#3a2a12 100%)", border: "#ffcc6b66", text: "#fff4d6" },
  };
  const t = tones[tone];
  return (
    <div style={{ ...ui.hudPill, background: t.bg, borderColor: pulse ? "#ff6b5e" : t.border, color: t.text }}>
      <div style={ui.hudIcon}>{icon}</div>
      <div>
        <div style={ui.hudLabel}>{label}</div>
        <div style={{ ...ui.hudValue, animation: pulse ? "assetPulseFlash 1.4s ease" : "none" }}>{value}</div>
      </div>
    </div>
  );
}

function AlertBadge({ size = 26, urgent = false, text = "!" }) {
  return (
    <div
      style={{
        ...ui.alertBadge,
        width: size,
        height: size,
        fontSize: Math.max(12, size * 0.5),
        animation: urgent ? "pulseGlow .55s infinite alternate" : "badgeBounce .6s infinite alternate",
      }}
    >
      {text}
    </div>
  );
}

function ChatAvatar({ src, alt }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={ui.chatAvatar}>
        <img src={src} alt={alt} style={ui.chatAvatarImg} />
      </div>
      <div style={ui.chatAvatarLabel}>{alt}</div>
    </div>
  );
}

function SpeechBubble({ side, children, muted, avatarSrc, avatarAlt }) {
  const isRight = side === "right";
  const bg = muted ? "#e2e4ea" : isRight ? C.bubbleRight : C.bubbleLeft;
  return (
    <div style={{ ...ui.bubbleRow, flexDirection: isRight ? "row-reverse" : "row" }}>
      {avatarSrc && <ChatAvatar src={avatarSrc} alt={avatarAlt} />}
      <div style={{ ...ui.bubbleWrap, alignSelf: isRight ? "flex-end" : "flex-start" }}>
        <div style={{ ...ui.bubble, background: bg, borderTopRightRadius: isRight ? 8 : 22, borderTopLeftRadius: isRight ? 22 : 8 }}>
          {children}
        </div>
        <div style={{ ...ui.bubbleTail, [isRight ? "right" : "left"]: 18, background: bg }} />
      </div>
    </div>
  );
}

function Overlay({ children }) {
  return (
    <div style={ui.resultOverlay}>
      <div style={ui.resultCard}>{children}</div>
    </div>
  );
}

function BigButton({ children, onClick }) {
  return (
    <button onClick={onClick} style={ui.bigButton}>
      {children}
    </button>
  );
}

function ResultMini({ label, value, tone }) {
  const palette = {
    safe: { bg: "#e8fff4", fg: C.safeDeep, border: "#8de0b4" },
    danger: { bg: "#fff0ef", fg: C.redDeep, border: "#ffc1bd" },
    gold: { bg: "#fff6df", fg: C.goldDeep, border: "#ffd982" },
  }[tone];
  return (
    <div style={{ ...ui.resultMini, background: palette.bg, borderColor: palette.border, color: palette.fg }}>
      <div style={ui.resultMiniLabel}>{label}</div>
      <div style={ui.resultMiniValue}>{value}</div>
    </div>
  );
}

const ui = {
  burstOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  burstBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 28px",
    borderRadius: 18,
    fontWeight: 900,
    letterSpacing: ".04em",
    color: "#fff",
    textShadow: "0 2px 6px rgba(0,0,0,.35)",
    boxShadow: "0 14px 30px rgba(0,0,0,.35)",
    whiteSpace: "nowrap",
  },
  burstIcon: {
    fontSize: 26,
    lineHeight: 1,
  },
  burstCorrect: {
    background: "linear-gradient(180deg,#5fcf9a 0%,#2d7f59 100%)",
    fontSize: 22,
  },
  burstWrong: {
    background: "linear-gradient(180deg,#ff7a68 0%,#b92128 100%)",
    fontSize: 22,
  },
  burstFail: {
    background: "linear-gradient(180deg,#4a4550 0%,#221f26 100%)",
    fontSize: 26,
  },
  burstObjectionWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    transform: "rotate(-20deg)",
  },
  burstObjection: {
    background: "linear-gradient(180deg,#ff584f 0%,#b92128 100%)",
    fontSize: 46,
    padding: "20px 10px",
    width: "92%",
    justifyContent: "center",
    whiteSpace: "nowrap",
  },
  app: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1d2d50 0%, #11192d 40%, #090e18 100%)",
    display: "flex",
    justifyContent: "center",
    padding: 16,
    fontFamily: '"Zen Maru Gothic", system-ui, sans-serif',
    color: "#fff",
  },
  shell: {
    width: "100%",
    maxWidth: 430,
    position: "relative",
    borderRadius: 28,
    overflow: "hidden",
    background: "linear-gradient(180deg,#17243d 0%,#0f1729 100%)",
    border: "1px solid rgba(255,255,255,.08)",
    boxShadow: "0 28px 90px rgba(0,0,0,.42)",
  },
  chromeGlow: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle at top right, rgba(127,214,255,.18), transparent 28%), radial-gradient(circle at top left, rgba(255,204,107,.12), transparent 26%)",
    pointerEvents: "none",
  },
  header: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 16px 10px",
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: "grid",
    placeItems: "center",
    fontFamily: '"Press Start 2P", monospace',
    fontSize: 10,
    background: "linear-gradient(180deg,#ffcc6b 0%,#ff8e46 100%)",
    color: "#40230d",
    boxShadow: "inset 0 -4px 0 rgba(0,0,0,.18)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 900,
    letterSpacing: ".02em",
    color: "#fffaf0",
  },
  headerSub: {
    marginTop: 2,
    fontSize: 11,
    color: "#b8c7e8",
  },
  headerIcons: {
    width: 34,
    height: 34,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,.06)",
    color: "#ffde8b",
  },
  dexButton: {
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 12,
    padding: "8px 12px",
    background: "rgba(255,255,255,.06)",
    color: "#ffde8b",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  collectedKeysRowOuter: {
    display: "flex",
    alignItems: "stretch",
    gap: 8,
    margin: "0 16px 14px",
  },
  collectedKeysButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,.14)",
    background: "linear-gradient(180deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.03) 100%)",
  },
  collectedKeysLabel: {
    fontSize: 12,
    fontWeight: 800,
    color: "#ffde8b",
  },
  collectedKeysRow: {
    display: "flex",
    gap: 6,
  },
  hudRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    padding: "0 16px 14px",
    position: "relative",
    zIndex: 1,
  },
  hudPill: {
    borderRadius: 18,
    padding: "10px 12px",
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)",
  },
  hudIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,.08)",
    flexShrink: 0,
  },
  hudLabel: {
    fontSize: 10,
    letterSpacing: ".08em",
    opacity: .8,
  },
  hudValue: {
    fontWeight: 900,
    fontSize: 14,
    marginTop: 2,
  },
  assetDrainFloat: {
    position: "absolute",
    top: -6,
    right: 8,
    color: "#ff6b5e",
    fontWeight: 900,
    fontSize: 13,
    textShadow: "0 2px 4px rgba(0,0,0,.4)",
    animation: "floatUpFade 1.5s ease forwards",
    pointerEvents: "none",
  },
  stageWrap: {
    padding: "0 12px",
  },
  sceneTopBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 6px 8px",
  },
  sceneLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,.06)",
    color: "#dce9ff",
    fontSize: 11,
    fontWeight: 700,
  },
  sceneTiny: {
    fontSize: 11,
    color: "#90a7d1",
  },
  roomBackdrop: {
    position: "relative",
    height: 382,
    borderRadius: 24,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,.1)",
    background: "#213453",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,.04), inset 0 -40px 80px rgba(0,0,0,.28)",
  },
  roomImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    imageRendering: "pixelated",
  },
  roomShade: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(7,14,24,.14) 0%, rgba(7,14,24,.04) 35%, rgba(0,0,0,.28) 100%)",
  },
  roomLightA: {
    position: "absolute",
    width: 180,
    height: 180,
    right: -20,
    top: -10,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,224,162,.24) 0%, transparent 70%)",
  },
  roomLightB: {
    position: "absolute",
    width: 160,
    height: 160,
    left: -10,
    top: 20,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(127,214,255,.18) 0%, transparent 70%)",
  },
  doorImg: {
    width: 108,
    height: 54,
    display: "block",
    imageRendering: "pixelated",
    filter: "drop-shadow(0 10px 14px rgba(0,0,0,.4))",
  },
  doorGhost: {
    position: "absolute",
    left: "50%",
    bottom: "-10%",
    width: "60%",
    transform: "translateX(-50%)",
    imageRendering: "pixelated",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,.5))",
    pointerEvents: "none",
  },
  doorSeal: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "78%",
    transform: "translate(-50%, -50%)",
    imageRendering: "pixelated",
    filter: "drop-shadow(0 4px 6px rgba(0,0,0,.45))",
    pointerEvents: "none",
  },
  howtoIllustrationRow: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    margin: "8px 0 16px",
  },
  howtoIllustrationCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  howtoCaption: {
    fontSize: 11,
    fontWeight: 700,
    color: C.inkSoft,
    textAlign: "center",
  },
  memberSpot: {
    position: "absolute",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "idleFloat 1.8s ease-in-out infinite alternate",
  },
  memberButton: {
    position: "relative",
    width: 88,
    height: 88,
    borderRadius: 24,
    border: "3px solid",
    background: "linear-gradient(180deg,rgba(255,255,255,.2) 0%,rgba(255,255,255,.05) 100%)",
    overflow: "hidden",
    display: "grid",
    placeItems: "center",
    transition: "transform .18s ease, box-shadow .2s ease, border-color .2s ease",
    backdropFilter: "blur(2px)",
  },
  memberAura: {
    position: "absolute",
    inset: -14,
  },
  memberAvatar: {
    width: 74,
    height: 74,
    objectFit: "contain",
    imageRendering: "pixelated",
    position: "relative",
    zIndex: 1,
  },
  memberNamePlate: {
    marginTop: 8,
    padding: "7px 10px 8px",
    borderRadius: 16,
    background: "rgba(10,14,22,.78)",
    border: "1px solid rgba(255,255,255,.08)",
    textAlign: "center",
    minWidth: 92,
  },
  memberName: {
    fontWeight: 900,
    fontSize: 13,
    color: "#fff6df",
  },
  memberSub: {
    marginTop: 2,
    fontSize: 10,
    color: "#a7b8db",
  },
  bottomTip: {
    margin: "12px 16px 8px",
    padding: "11px 14px",
    borderRadius: 16,
    background: "rgba(255,255,255,.05)",
    color: "#d7e2fb",
    fontSize: 12.5,
    lineHeight: 1.7,
    border: "1px solid rgba(255,255,255,.06)",
  },
  templateStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    padding: "0 16px 16px",
  },
  templateChip: {
    background: "linear-gradient(180deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.04) 100%)",
    border: "1px solid rgba(255,255,255,.06)",
    borderRadius: 16,
    padding: "10px 8px",
    textAlign: "center",
  },
  templateChipName: {
    fontSize: 11,
    fontWeight: 900,
    color: "#fff3da",
    lineHeight: 1.4,
    minHeight: 32,
  },
  templateChipMoney: {
    marginTop: 4,
    fontSize: 10,
    color: "#f8b886",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(5,8,15,.76)",
    backdropFilter: "blur(7px)",
    display: "flex",
    alignItems: "flex-end",
    zIndex: 30,
  },
  dialogShell: {
    width: "100%",
    background: "linear-gradient(180deg,#18243b 0%,#0f1728 100%)",
    borderRadius: "28px 28px 0 0",
    padding: 16,
    maxHeight: "97%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid rgba(255,255,255,.08)",
    animation: "panelRise .22s ease-out",
  },
  dialogHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 14,
    flexShrink: 0,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 900,
    color: "#fff5df",
    lineHeight: 1.3,
  },
  dialogSub: {
    marginTop: 4,
    fontSize: 12,
    color: "#b3c3e3",
  },
  closeButton: {
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.04)",
    color: "#d6e0f8",
    borderRadius: 12,
    width: 38,
    height: 38,
    display: "grid",
    placeItems: "center",
    fontSize: 18,
    lineHeight: 1,
    padding: 0,
  },
  dexCloseButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2,
    border: "none",
    background: "rgba(44,31,29,.08)",
    color: C.ink,
    borderRadius: "50%",
    width: 32,
    height: 32,
    display: "grid",
    placeItems: "center",
    fontSize: 17,
    lineHeight: 1,
    padding: 0,
    cursor: "pointer",
  },
  comicFrame: {
    position: "relative",
    borderRadius: 24,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,.08)",
    background: "linear-gradient(180deg,#f8f6f0 0%, #efe5d7 100%)",
    boxShadow: "inset 0 -8px 24px rgba(0,0,0,.06)",
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    minHeight: 0,
  },
  comicHeroArea: {
    position: "relative",
    minHeight: 130,
    flexShrink: 0,
    padding: "14px 18px 10px",
    background: "radial-gradient(circle at center, #ffffff 0%, #edf4ff 45%, #d7e7ff 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  comicHeroDanger: {
    position: "absolute",
    top: 12,
    left: 12,
    padding: "7px 10px",
    borderRadius: 999,
    background: "linear-gradient(180deg,#ff6f63 0%,#ff584f 100%)",
    color: "white",
    fontWeight: 900,
    fontSize: 11,
    letterSpacing: ".08em",
    boxShadow: "0 8px 18px rgba(255,88,79,.28)",
  },
  heroMember: {
    width: 120,
    height: 120,
    objectFit: "contain",
    imageRendering: "pixelated",
    filter: "drop-shadow(0 8px 10px rgba(0,0,0,.18))",
  },
  heroCaption: {
    marginTop: -4,
    padding: "7px 12px",
    borderRadius: 999,
    background: "rgba(18,37,64,.9)",
    color: "#fff7e3",
    fontSize: 12,
    fontWeight: 700,
  },
  chatArena: {
    position: "relative",
    flex: "1 1 auto",
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    padding: "18px 16px 18px",
    background: "linear-gradient(180deg,#f5f3ef 0%,#ece8e3 100%)",
    overflow: "hidden",
  },
  chatBgPattern: {
    position: "absolute",
    inset: 0,
    background: "repeating-linear-gradient(180deg, rgba(0,0,0,.02) 0px, rgba(0,0,0,.02) 2px, transparent 2px, transparent 24px)",
    animation: "scan 1.8s linear infinite",
    opacity: .5,
  },
  chatScroll: {
    position: "relative",
    zIndex: 2,
    flex: "1 1 auto",
    minHeight: 90,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  bubbleRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 6,
    maxWidth: "100%",
  },
  chatAvatar: {
    width: 32,
    height: 32,
    flexShrink: 0,
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
    background: "#fff",
    border: "2px solid rgba(255,255,255,.9)",
    boxShadow: "0 3px 8px rgba(0,0,0,.22)",
  },
  chatAvatarLabel: {
    fontSize: 9,
    fontWeight: 800,
    color: "#2a2420",
    textShadow: "none",
    whiteSpace: "nowrap",
  },
  chatAvatarImg: {
    position: "absolute",
    width: "118%",
    height: "118%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    imageRendering: "pixelated",
  },
  bubbleWrap: {
    position: "relative",
    maxWidth: "calc(100% - 38px)",
    minWidth: 0,
  },
  bubble: {
    position: "relative",
    padding: "12px 14px",
    borderRadius: 22,
    color: C.ink,
    boxShadow: "0 10px 20px rgba(0,0,0,.08)",
    border: "2px solid rgba(42,32,32,.12)",
  },
  bubbleTail: {
    position: "absolute",
    bottom: -6,
    width: 14,
    height: 14,
    transform: "rotate(45deg)",
    borderBottom: "2px solid rgba(42,32,32,.12)",
    borderRight: "2px solid rgba(42,32,32,.12)",
  },
  bubbleText: {
    fontSize: 14.5,
    fontWeight: 700,
    color: C.ink,
  },
  chunkButton: {
    display: "inline-block",
    border: "1.5px solid #d5b987",
    background: "#fbf6ec",
    padding: "7px 11px",
    borderRadius: 12,
    color: C.ink,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(42,32,32,.08)",
    transition: "transform .12s ease, background .15s ease, border-color .15s ease",
  },
  actionArea: {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    alignItems: "stretch",
    flexShrink: 0,
  },
  progressCard: {
    borderRadius: 18,
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
    padding: 12,
  },
  progressHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff5e0",
    fontSize: 12.5,
    fontWeight: 800,
  },
  progressHeadLabel: {
    fontSize: 11,
  },
  evidenceRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    marginTop: 10,
  },
  evidenceDot: {
    height: 16,
    borderRadius: 999,
    boxShadow: "inset 0 -2px 0 rgba(0,0,0,.18)",
    transition: "background .2s ease",
  },
  keySlot: {
    height: 32,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background .25s ease, box-shadow .25s ease, transform .25s ease",
  },
  sideInfoCard: {
    borderRadius: 18,
    padding: 12,
    background: "linear-gradient(180deg,#2a3552 0%,#1a243b 100%)",
    border: "1px solid rgba(255,255,255,.08)",
    color: "#fff7e5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  sideInfoLabel: {
    fontSize: 11,
    opacity: .8,
  },
  sideInfoValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: 900,
    lineHeight: 1.2,
  },
  sideInfoMini: {
    marginTop: 4,
    fontSize: 11.5,
    color: "#ffcc6b",
    fontWeight: 700,
  },
  countdownBar: {
    marginTop: 12,
    borderRadius: 16,
    padding: "11px 14px",
    background: "linear-gradient(180deg,#45212a 0%,#2f151a 100%)",
    border: "1px solid #ff8c86",
    color: "#ffe3e1",
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    fontSize: 12,
    lineHeight: 1.5,
    flexShrink: 0,
  },
  primaryButton: {
    width: "100%",
    marginTop: 12,
    border: "none",
    color: "white",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: ".02em",
    padding: "16px 18px",
    borderRadius: 18,
    flexShrink: 0,
  },
  alertBadge: {
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: "linear-gradient(180deg,#ff7d6d 0%,#ff584f 100%)",
    color: "#fff",
    fontWeight: 900,
    border: "3px solid #fff8ef",
    boxShadow: "0 10px 18px rgba(255,88,79,.35)",
    marginBottom: 8,
  },
  resultOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(6,8,14,.76)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    zIndex: 40,
  },
  resultCard: {
    width: "100%",
    background: "linear-gradient(180deg,#fff8ef 0%,#f4e8d4 100%)",
    borderRadius: 24,
    padding: "26px 18px 18px",
    textAlign: "center",
    color: C.ink,
    boxShadow: "0 24px 50px rgba(0,0,0,.25)",
  },
  resultTitle: {
    margin: "10px 0 4px",
    fontSize: 24,
    fontWeight: 900,
    color: C.ink,
  },
  startSubtitle: {
    fontSize: 11.5,
    fontWeight: 800,
    color: C.inkSoft,
    letterSpacing: ".02em",
  },
  resultLead: {
    margin: "0 auto 14px",
    maxWidth: 290,
    color: C.inkSoft,
    fontSize: 13,
    lineHeight: 1.7,
  },
  resultStatGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    marginBottom: 12,
  },
  resultMini: {
    borderRadius: 16,
    border: "1px solid",
    padding: "10px 8px",
  },
  resultMiniLabel: {
    fontSize: 10.5,
    fontWeight: 700,
  },
  resultMiniValue: {
    marginTop: 6,
    fontWeight: 900,
    fontSize: 15,
    lineHeight: 1.25,
  },
  resultLogBox: {
    textAlign: "left",
    background: "#ffffff",
    borderRadius: 18,
    padding: 12,
    minHeight: 72,
    fontSize: 13,
    color: C.ink,
    marginBottom: 12,
  },
  resultEmpty: {
    color: C.inkSoft,
  },
  resultRow: {
    padding: "3px 0",
  },
  resultFoot: {
    marginBottom: 14,
    color: C.inkSoft,
    fontWeight: 700,
  },
  bigButton: {
    width: "100%",
    border: "none",
    borderRadius: 18,
    padding: "15px 16px",
    fontWeight: 900,
    fontSize: 15,
    color: "#fff",
    background: "linear-gradient(180deg,#ff7a68 0%,#ff584f 100%)",
    boxShadow: "0 12px 20px rgba(255,88,79,.28)",
    cursor: "pointer",
  },
  tipsList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    margin: "6px 0 18px",
  },
  tipCard: {
    position: "relative",
    textAlign: "left",
    borderRadius: 14,
    padding: "10px 12px",
    background: "rgba(42,32,32,.05)",
    border: "1px solid rgba(42,32,32,.1)",
  },
  dexNewTag: {
    position: "absolute",
    top: -8,
    right: -6,
    background: C.gold,
    color: "#3a2a10",
    fontSize: 10,
    fontWeight: 900,
    padding: "2px 8px",
    borderRadius: 999,
    boxShadow: "0 3px 8px rgba(0,0,0,.25)",
    animation: "dexTagPulse 1.2s ease-in-out infinite",
  },
  tipLabel: {
    fontWeight: 900,
    fontSize: 13.5,
    color: C.red,
    marginBottom: 2,
  },
  tipDesc: {
    fontSize: 12,
    color: C.ink,
    lineHeight: 1.5,
  },
  tipExample: {
    fontSize: 11.5,
    color: C.inkSoft,
    marginTop: 3,
  },
  startCastRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 10,
    margin: "10px 0 18px",
  },
  startCastImg: {
    width: 60,
    height: 60,
    objectFit: "contain",
    imageRendering: "pixelated",
    filter: "drop-shadow(0 6px 8px rgba(0,0,0,.2))",
  },
  startButtonStack: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  secondaryButton: {
    width: "100%",
    border: "1px solid rgba(42,32,32,.18)",
    borderRadius: 18,
    padding: "13px 16px",
    fontWeight: 800,
    fontSize: 14,
    color: C.ink,
    background: "rgba(42,32,32,.05)",
    cursor: "pointer",
  },
};
