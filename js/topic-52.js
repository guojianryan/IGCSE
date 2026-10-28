export function blockHash(block) {
  const source = `${block.tx}|${block.time}|${block.prev}`;
  let x = 2166136261;
  for (const ch of source) {
    x ^= ch.codePointAt(0);
    x = Math.imul(x, 16777619);
  }
  return (x >>> 0).toString(16).padStart(8, "0").slice(0, 8);
}

const STEPS = [
  { id: "s1", phase: "The blockchain process", title: "Request", text: "A user starts a transaction from a digital wallet, for example sending currency to another person." },
  { id: "s2", phase: "The blockchain process", title: "Block setup", text: "The transaction is grouped with other pending transactions into one candidate block." },
  { id: "s3", phase: "The blockchain process", title: "Broadcast", text: "The candidate block is broadcast across a decentralised peer-to-peer network of nodes." },
  { id: "s4", phase: "The blockchain process", title: "Validation", text: "The nodes use cryptographic hashing to check that the transaction is legitimate." },
  { id: "s5", phase: "The blockchain process", title: "Chaining", text: "The valid block is time-stamped, hashed, and added to the existing chain." },
  { id: "s6", phase: "The blockchain process", title: "Completion", text: "The ledger updates across the network and the recipient receives the funds." },
];

const FLOW = ["wallet", "block", "network", "nodes", "chain", "recipient"];

const WRITTEN = {
  1: {
    max: 2,
    points: [
      { label: "it exists only in electronic form", test: /electron|only exists|purely/i },
      { label: "it has no physical notes or coins", test: /(no|not|without|never|lack|no such thing as).{0,40}(physical|paper|banknote|coin|tangible)/i },
    ],
  },
  2: {
    max: 3,
    points: [
      { label: "it is a digital ledger", test: /ledger/i },
      { label: "records are time-stamped or in chronological order", test: /time-?stamp|chronolog/i },
      { label: "records cannot be altered", test: /immutab|cannot be alter|can't be alter|cannot be chang|not be alter|unalter|tamper/i },
    ],
  },
  3: {
    max: 2,
    points: [
      { label: "timestamps fix the order of transactions", test: /chronolog|order|sequence/i },
      { label: "that prevents double-spending or shows when ownership transferred", test: /double|ownership|owner|transfer/i },
    ],
  },
};

const MCQS = [
  {
    q: "Which statement matches the syllabus definition of a digital currency?",
    options: [
      "Any cryptocurrency, and only a cryptocurrency such as Bitcoin",
      "Money that exists only in electronic form",
      "A paper note recorded in a bank's database",
      "The hash of the previous block",
    ],
    answer: 1,
    why: "Digital currency is the umbrella term. It is money that exists electronically, with no physical notes or coins. Bitcoin is one example, not the definition.",
  },
  {
    q: "Where is a digital currency kept?",
    options: [
      "In a digital wallet on a device or a secure server",
      "As metal coins in a branch",
      "Inside the DNS",
      "Only on a single government computer",
    ],
    answer: 0,
    why: "Ownership is stored electronically, in a wallet on a computer or phone, or on a secure cloud server.",
  },
  {
    q: "Which risk belongs to digital currency rather than to a dropped banknote?",
    options: [
      "Someone picks the note up off the floor",
      "The private key is lost, so the funds cannot be accessed",
      "The note tears",
      "The ink fades",
    ],
    answer: 1,
    why: "Physical cash can be stolen or lost. Digital currency can be hacked, cut off by a network failure, or locked forever if the private key is lost.",
  },
  {
    q: "What is a blockchain, in the form Cambridge expects?",
    options: [
      "A central bank's private spreadsheet",
      "A digital ledger: a time-stamped series of records that cannot be altered",
      "A type of web browser",
      "The physical coins of a digital currency",
    ],
    answer: 1,
    why: "A blockchain is a digital ledger. The records are time-stamped and, once agreed, cannot be altered.",
  },
  {
    q: "What does a block store so that it links to the block before it?",
    options: [
      "The previous block's hash",
      "The owner's paper receipt",
      "A copy of every website",
      "The central bank's password",
    ],
    answer: 0,
    why: "The previous hash ties this block to the one before it. Change an earlier block and the later links no longer match.",
  },
  {
    q: "Why does a digital currency need a shared ledger?",
    options: [
      "Digital files can be copied, so the same coin could be spent twice",
      "Paper notes are too heavy to post",
      "Browsers cannot render HTML",
      "Hashes make the price of the coin stable",
    ],
    answer: 0,
    why: "That is the double-spending problem. The ledger records that a coin has already been spent, so a second attempt is rejected.",
  },
  {
    q: "A node on the network crashes. What happens to a blockchain with no central authority?",
    options: [
      "The currency is deleted everywhere",
      "Other nodes still hold a synchronised copy of the ledger",
      "The ledger moves into one government server",
      "Every hash is reset to zero",
    ],
    answer: 1,
    why: "No single organisation runs the ledger. There is no single point of failure, because many nodes keep the same agreed copy.",
  },
  {
    q: "What is double-spending?",
    options: [
      "Paying a shop in both notes and coins",
      "Spending the same digital coin more than once",
      "Adding a timestamp to a block",
      "Converting denary to binary",
    ],
    answer: 1,
    why: "Double-spending is spending the same digital coin twice. The blockchain checks the ledger before it accepts a new transaction.",
  },
];

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function freshChain() {
  const first = { n: 1, tx: "Alice to Bob, 2.5 coins", time: "09:15:02", prev: "00000000" };
  first.hash = blockHash(first);
  const second = { n: 2, tx: "Bob to the shop, 1 coin", time: "09:16:40", prev: first.hash };
  second.hash = blockHash(second);
  const third = { n: 3, tx: "Shop to supplier, 1 coin", time: "09:18:11", prev: second.hash };
  third.hash = blockHash(third);
  return [first, second, third];
}

function chainReport(blocks) {
  let earlierBroken = false;
  return blocks.map((block, index) => {
    const live = blockHash(block);
    const expectedPrev = index === 0 ? "00000000" : blockHash(blocks[index - 1]);
    const selfOk = live === block.hash;
    const linkOk = block.prev === expectedPrev;
    const ok = selfOk && linkOk && !earlierBroken;
    if (!ok) earlierBroken = true;
    return { live, selfOk, linkOk, ok };
  });
}

function initNav() {
  const links = [...document.querySelectorAll(".nav a")].filter((link) => link.getAttribute("href").startsWith("#"));
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if (!sections.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 },
  );
  sections.forEach((section) => observer.observe(section));
}

function initChoices(rootId) {
  const root = document.querySelector(rootId);
  if (!root) return;
  const status = root.querySelector("[data-status]");
  const cards = [...root.querySelectorAll(".sort-card")];
  const answered = new Map();
  cards.forEach((card) => {
    card.querySelectorAll(".choice").forEach((button) => {
      button.addEventListener("click", () => {
        const want = card.dataset.answer;
        const got = button.dataset.choice;
        card.querySelectorAll(".choice").forEach((other) => other.classList.remove("is-correct", "is-wrong"));
        const feedback = card.querySelector(".why");
        if (got === want) {
          button.classList.add("is-correct");
          feedback.textContent = card.dataset.why;
          feedback.className = "why feedback good";
          answered.set(card, true);
        } else {
          button.classList.add("is-wrong");
          feedback.textContent = card.dataset.miss;
          feedback.className = "why feedback bad";
          answered.set(card, false);
        }
        const correct = [...answered.values()].filter(Boolean).length;
        const done = cards.every((item) => answered.get(item));
        status.className = done ? "feedback good" : "feedback";
        status.textContent = done
          ? root.dataset.done
          : `${correct} of ${cards.length} placed correctly.`;
      });
    });
  });
}

function initChain() {
  const view = document.querySelector("#chain-view");
  const status = document.querySelector("#chain-status");
  if (!view || !status) return;
  let blocks = freshChain();

  function paint(message) {
    const report = chainReport(blocks);
    view.replaceChildren();
    blocks.forEach((block, index) => {
      const card = el("article", report[index].ok ? "bcard ok" : "bcard bad");
      card.append(el("h4", "", `Block ${block.n}`));
      card.append(el("p", "", block.tx));
      card.append(el("p", "", `Timestamp ${block.time}`));
      const prev = el("p", "", "Previous hash ");
      prev.append(el("code", "", block.prev));
      card.append(prev);
      const agreed = el("p", "", "Agreed hash ");
      agreed.append(el("code", "", block.hash));
      card.append(agreed);
      if (!report[index].selfOk) {
        const live = el("p", "", "Hash of the data now ");
        live.append(el("code", "", report[index].live));
        card.append(live);
      }
      let note = "Link holds.";
      if (!report[index].selfOk) note = "The data changed, so this fingerprint no longer matches the agreed hash.";
      else if (!report[index].linkOk) note = "This block still stores the old fingerprint of the block before it.";
      else if (!report[index].ok) note = "This block still links to the one before it, but an earlier block is already broken.";
      card.append(el("p", report[index].ok ? "feedback good" : "feedback bad", note));
      view.append(card);
    });
    status.className = report.every((item) => item.ok) ? "feedback good" : "feedback bad";
    status.textContent = message;
  }

  document.querySelector("#tamper")?.addEventListener("click", () => {
    blocks[0].tx = "Alice to Bob, 9 coins";
    paint("Block 1 was altered after it had been agreed. Its fingerprint no longer matches, and every later block was pointing at the old fingerprint. The network can see the tamper.");
  });
  document.querySelector("#chain-reset")?.addEventListener("click", () => {
    blocks = freshChain();
    paint("The chain is intact. Each block stores the hash of the block before it.");
  });
  paint("The chain is intact. Each block stores the hash of the block before it.");
}

function initRetrieval() {
  const readout = document.querySelector("#step-readout");
  if (!readout) return;
  let index = 0;
  function paint() {
    const step = STEPS[index];
    document.querySelector("#step-phase").textContent = `${step.phase} · ${step.title}`;
    document.querySelector("#step-count").textContent = `${index + 1} / ${STEPS.length}`;
    readout.textContent = step.text;
    document.querySelectorAll(".flow li").forEach((node) => {
      node.classList.toggle("is-on", node.dataset.node === FLOW[index]);
    });
  }
  document.querySelector("#step-prev")?.addEventListener("click", () => {
    index = (index + STEPS.length - 1) % STEPS.length;
    paint();
  });
  document.querySelector("#step-next")?.addEventListener("click", () => {
    index = (index + 1) % STEPS.length;
    paint();
  });
  paint();
}

function initOrder() {
  const root = document.querySelector("#order-lab");
  if (!root) return;
  const pool = root.querySelector(".pool");
  const chosen = root.querySelector(".chosen");
  const status = root.querySelector(".feedback");
  let picked = [];
  let deck = shuffle(STEPS);

  function paint() {
    pool.replaceChildren();
    deck.filter((step) => !picked.includes(step.id)).forEach((step) => {
      const button = el("button", "step-btn", step.text);
      button.type = "button";
      button.addEventListener("click", () => {
        picked.push(step.id);
        status.className = "feedback";
        status.textContent = "";
        paint();
      });
      pool.append(button);
    });
    chosen.replaceChildren();
    if (!picked.length) chosen.append(el("p", "empty", "Click the steps in the order they happen."));
    picked.forEach((id, position) => {
      const step = STEPS.find((item) => item.id === id);
      const button = el("button", "step-btn", `${position + 1}. ${step.text}`);
      button.type = "button";
      button.addEventListener("click", () => {
        picked = picked.filter((item) => item !== id);
        status.className = "feedback";
        status.textContent = "";
        paint();
      });
      chosen.append(button);
    });
  }

  root.querySelector(".check").addEventListener("click", () => {
    if (picked.length !== STEPS.length) {
      status.className = "feedback bad";
      status.textContent = "Place all six steps first. Click a chosen step to remove it.";
      return;
    }
    const wrong = STEPS.findIndex((step, i) => step.id !== picked[i]);
    if (wrong === -1) {
      status.className = "feedback good";
      status.textContent = "That is the process: request, block, broadcast, validation, chaining, then the ledger updates.";
      return;
    }
    status.className = "feedback bad";
    status.textContent = `Step ${wrong + 1} is out of order. It should be: ${STEPS[wrong].text}`;
  });
  root.querySelector(".reset").addEventListener("click", () => {
    picked = [];
    deck = shuffle(STEPS);
    status.className = "feedback";
    status.textContent = "";
    paint();
  });
  paint();
}

function initSpend() {
  const list = document.querySelector("#ledger");
  const status = document.querySelector("#spend-status");
  if (!list || !status) return;
  const original = [{ coin: "C-19", text: "Alice sent coin C-19 to Bob." }];
  let rows = [...original];

  function paint() {
    list.replaceChildren();
    rows.forEach((row) => list.append(el("li", "", row.text)));
  }

  document.querySelector("#spend-again")?.addEventListener("click", () => {
    const spent = rows.some((row) => row.coin === "C-19");
    status.className = "feedback bad";
    status.textContent = spent
      ? "Rejected. Coin C-19 is already in the ledger as paid to Bob. Accepting it again would be double-spending."
      : "Coin C-19 has not been spent yet.";
  });
  document.querySelector("#spend-new")?.addEventListener("click", () => {
    if (rows.some((row) => row.coin === "C-22")) {
      status.className = "feedback bad";
      status.textContent = "Coin C-22 is already recorded. It cannot be spent a second time.";
      return;
    }
    rows.push({ coin: "C-22", text: "Alice sent coin C-22 to the shop." });
    status.className = "feedback good";
    status.textContent = "Accepted. The ledger had no earlier record of coin C-22, so this spend is written into the chain.";
    paint();
  });
  document.querySelector("#spend-reset")?.addEventListener("click", () => {
    rows = [...original];
    status.className = "feedback";
    status.textContent = "The ledger is back to the single agreed payment of coin C-19.";
    paint();
  });
  paint();
}

function pointHit(point, text) {
  return point.test.test(text);
}

function initWritten() {
  const total = document.querySelector("#written-score");
  document.querySelectorAll(".q[data-q]").forEach((card) => {
    const spec = WRITTEN[card.dataset.q];
    if (!spec) return;
    card.querySelector(".check-written").addEventListener("click", () => {
      const text = card.querySelector("textarea").value.trim();
      const scheme = card.querySelector(".scheme");
      const hits = card.querySelector(".hits");
      scheme.hidden = false;
      if (text.length < 8) {
        hits.className = "hits feedback bad";
        hits.textContent = "Write an attempt first, then compare it with the scheme. Keyword feedback appears once you have a short answer.";
        return;
      }
      const found = spec.points.filter((point) => pointHit(point, text));
      const missed = spec.points.filter((point) => !pointHit(point, text));
      hits.className = found.length === spec.points.length ? "hits feedback good" : "hits feedback";
      hits.textContent = missed.length
        ? `Your answer shows: ${found.map((point) => point.label).join("; ") || "none of the mark points yet"}. Still look for: ${missed.map((point) => point.label).join("; ")}.`
        : "Your answer touches every point in this classroom check. Compare the wording with the mark scheme before you award the marks.";
    });
    card.querySelector("input[type=number]")?.addEventListener("input", () => {
      let sum = 0;
      let max = 0;
      document.querySelectorAll(".q[data-q]").forEach((item) => {
        const itemSpec = WRITTEN[item.dataset.q];
        max += itemSpec.max;
        const value = Number(item.querySelector("input[type=number]").value);
        if (Number.isFinite(value)) sum += Math.min(itemSpec.max, Math.max(0, value));
      });
      if (total) total.textContent = `${sum} / ${max}`;
    });
  });
}

function initMcq() {
  const root = document.querySelector("#mcq-lab");
  const status = document.querySelector("#mcq-score");
  if (!root) return;
  let correctCount = 0;
  MCQS.forEach((item, index) => {
    const card = el("article", "q");
    card.append(el("h3", "", `${index + 1}. ${item.q}`));
    const options = el("div", "stack");
    item.options.forEach((option, optionIndex) => {
      const button = el("button", "opt", option);
      button.type = "button";
      button.addEventListener("click", () => {
        const right = optionIndex === item.answer;
        options.querySelectorAll("button").forEach((other) => {
          other.disabled = true;
        });
        button.classList.add(right ? "is-correct" : "is-wrong");
        if (!right) options.children[item.answer].classList.add("is-correct");
        else correctCount += 1;
        card.append(el("p", right ? "feedback good" : "feedback", item.why));
        const answered = [...root.querySelectorAll(".q")].filter((entry) => entry.querySelector("button:disabled")).length;
        if (status) status.textContent = `${correctCount} / ${MCQS.length}${answered === MCQS.length ? " · quick check complete" : ""}`;
      });
      options.append(button);
    });
    card.append(options);
    root.append(card);
  });
}

function initChecklist() {
  const list = document.querySelector("#checklist");
  if (!list) return;
  const key = "igcse52-checklist-v1";
  let savedValues = [];
  try {
    savedValues = JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    savedValues = [];
  }
  const saved = new Set(savedValues);
  const boxes = [...list.querySelectorAll("input[type=checkbox]")];
  const count = document.querySelector("#check-count");
  function paint() {
    const on = boxes.filter((box) => box.checked).map((box) => box.value);
    try {
      localStorage.setItem(key, JSON.stringify(on));
    } catch {
      /* Storage can be blocked. The ticks still work for this visit. */
    }
    if (count) count.textContent = `${on.length} / ${boxes.length}`;
  }
  boxes.forEach((box) => {
    box.checked = saved.has(box.value);
    box.addEventListener("change", paint);
  });
  document.querySelector("#check-reset")?.addEventListener("click", () => {
    boxes.forEach((box) => {
      box.checked = false;
    });
    paint();
  });
  paint();
}

function init() {
  initNav();
  initChoices("#sort-lab");
  initChoices("#risk-lab");
  initChain();
  initRetrieval();
  initOrder();
  initSpend();
  initWritten();
  initMcq();
  initChecklist();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}
