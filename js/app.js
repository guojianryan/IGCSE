export function parseUrl(input) {
  const raw = String(input ?? "").trim();
  const result = {
    raw,
    protocol: "",
    domain: "",
    path: "",
    query: "",
    hash: "",
    warnings: [],
  };
  if (!raw) {
    result.warnings.push("Type a URL to pull it apart.");
    return result;
  }

  const protoMatch = raw.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:\/\/)([\s\S]*)$/);
  let rest = raw;
  if (protoMatch) {
    result.protocol = protoMatch[1];
    rest = protoMatch[2];
    const name = result.protocol.slice(0, -3).toLowerCase();
    if (name !== "http" && name !== "https") {
      result.warnings.push("Topic 5.1 focuses on HTTP and HTTPS. Other protocols can still appear in a URL.");
    }
  } else {
    result.warnings.push("A full URL needs a protocol, such as https://, before the domain name.");
  }

  const hashAt = rest.indexOf("#");
  if (hashAt >= 0) {
    result.hash = rest.slice(hashAt);
    rest = rest.slice(0, hashAt);
  }
  const queryAt = rest.indexOf("?");
  if (queryAt >= 0) {
    result.query = rest.slice(queryAt);
    rest = rest.slice(0, queryAt);
  }
  const slashAt = rest.indexOf("/");
  if (slashAt >= 0) {
    result.domain = rest.slice(0, slashAt);
    result.path = rest.slice(slashAt);
  } else {
    result.domain = rest;
  }
  if (!result.domain) result.warnings.push("The domain name is missing.");
  if (result.query || result.hash) {
    result.warnings.push("Query strings and fragments are not one of the three core URL parts in the exam.");
  }
  return result;
}

export function illustrateCipher(text) {
  const source = String(text ?? "");
  if (!source.trim()) return "";
  let x = 2166136261;
  for (const ch of source) {
    x ^= ch.codePointAt(0);
    x = Math.imul(x, 16777619);
  }
  x >>>= 0;
  const groups = Math.max(4, Math.ceil(source.length / 3));
  const parts = [];
  for (let i = 0; i < groups; i += 1) {
    x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
    parts.push(x.toString(16).padStart(8, "0"));
  }
  return parts.join(" ");
}

const STEPS = [
  { id: "s1", phase: "Phase 1 · Request and resolution", title: "User input", text: "The user enters a URL into the browser address bar." },
  { id: "s2", phase: "Phase 1 · Request and resolution", title: "DNS query", text: "The browser sends the domain name to a Domain Name Server (DNS)." },
  { id: "s3", phase: "Phase 1 · Request and resolution", title: "IP resolution", text: "The DNS finds the matching IP address and returns it to the browser." },
  { id: "s4", phase: "Phase 2 · Retrieval and rendering", title: "Server request", text: "The browser sends an HTTP or HTTPS request to the web server at that IP address." },
  { id: "s5", phase: "Phase 2 · Retrieval and rendering", title: "Data transmission", text: "The web server sends the page files (HTML, CSS and images) back to the browser." },
  { id: "s6", phase: "Phase 2 · Retrieval and rendering", title: "Rendering", text: "The browser renders the HTML and displays the finished page." },
];

const FLOW = [
  ["user", "browser"],
  ["browser", "dns"],
  ["dns", "browser"],
  ["browser", "server"],
  ["server", "browser"],
  ["browser", "user"],
];

const DNS_BOOK = {
  "www.cambridgeinternational.org": "198.51.100.42",
  "cambridgeinternational.org": "198.51.100.42",
  "example.com": "203.0.113.10",
  "www.example.com": "203.0.113.10",
  "shop.example.org": "192.0.2.24",
  "example.org": "192.0.2.24",
};

const WRITTEN = {
  1: {
    max: 2,
    points: [
      { label: "encryption of the payment data", test: /encrypt|ssl|tls|scrambl|cipher/i },
      { label: "stopping interception or theft", test: /intercept|theft|steal|eaves|unauthor|unauthorized|sniff|third part|hack|man-in-the-middle|mitm/i },
    ],
  },
  2: {
    max: 3,
    points: [
      { label: "the DNS is given the domain name", test: /domain/i },
      { label: "it looks up the matching IP address", test: /ip address|\bip\b|numeric|numerical/i },
      { label: "it returns that IP address to the browser", test: /return|sends? back|passes|gives|replies/i },
    ],
  },
  3: {
    max: 2,
    points: [
      { label: "RAM versus secondary storage", test: /ram/i, also: /hard|hdd|ssd|secondary|disk/i },
      { label: "deleted on close versus kept until expiry or manual deletion", test: /clos/i, also: /expir|manual|remain|persist/i },
    ],
  },
};

const MCQS = [
  {
    q: "Which statement describes the Internet?",
    options: [
      "A collection of web pages written in HTML",
      "A global network of interconnected networks and hardware",
      "A browser feature that stores bookmarks",
      "A protocol used only to style web pages",
    ],
    answer: 1,
    why: "The Internet is the infrastructure: networks, cables, routers, servers and the protocols that run on them, such as TCP/IP.",
  },
  {
    q: "Which statement describes the World Wide Web?",
    options: [
      "Fibre-optic cables laid between countries",
      "The collection of websites and web pages accessed over the Internet",
      "The set of routers that forward packets",
      "A permanent cookie stored on an SSD",
    ],
    answer: 1,
    why: "The Web is the content and service: HTML pages, sites and media. It is carried by the Internet.",
  },
  {
    q: "In https://www.example.org/news/story.html, which part is the domain name?",
    options: ["https://", "www.example.org", "/news/story.html", "story.html"],
    answer: 1,
    why: "https:// is the protocol. www.example.org is the domain name. /news/story.html is the file path.",
  },
  {
    q: "Why does a checkout page use HTTPS?",
    options: [
      "So the site can be opened without a browser",
      "So card details are encrypted while they travel to the server",
      "So the shopping cart is stored inside the DNS",
      "So the URL no longer needs a file path",
    ],
    answer: 1,
    why: "HTTPS uses SSL/TLS to encrypt the transfer. Someone who intercepts the packets cannot read the card number.",
  },
  {
    q: "What is the main purpose of a web browser?",
    options: [
      "To host the website for every visitor",
      "To translate every domain name into HTML",
      "To request pages from a server and render the HTML",
      "To replace cookies with IP addresses",
    ],
    answer: 2,
    why: "The browser is client software. It asks the server for the page and turns the HTML into a page the user can see and use.",
  },
  {
    q: "A student wants to reopen a page they visited yesterday. Which browser function helps?",
    options: ["History", "A session cookie in RAM", "The DNS", "The protocol"],
    answer: 0,
    why: "History keeps a chronological record of URLs. Bookmarks are for pages you choose to save.",
  },
  {
    q: "What does a DNS return when a browser asks it for a domain name?",
    options: [
      "The finished HTML file",
      "The images used on the page",
      "The matching IP address",
      "A persistent cookie",
    ],
    answer: 2,
    why: "DNS is a directory. It resolves a domain name to an IP address. It does not store the website.",
  },
  {
    q: "How is a session cookie different from a persistent cookie?",
    options: [
      "It is stored on secondary storage until a chosen date",
      "It is held in RAM and deleted when the browser closes",
      "It can be created only by HTTP, never by HTTPS",
      "It contains a copy of the web page",
    ],
    answer: 1,
    why: "Session cookies are temporary and live in RAM. Persistent cookies stay on secondary storage until they expire or the user deletes them.",
  },
];

const SCENARIOS = [
  { prompt: "You type www.example.org into the browser to open a revision site.", fn: "address", answer: "Address bar" },
  { prompt: "You go back to the page you were reading a moment ago.", fn: "nav", answer: "Navigation tools" },
  { prompt: "You save the syllabus page so you can open it quickly next lesson.", fn: "bookmarks", answer: "Bookmarks and favourites" },
  { prompt: "You look up a page you visited yesterday but did not save.", fn: "history", answer: "History" },
  { prompt: "You keep the notes page open while you also open a quiz in the same window.", fn: "tabs", answer: "Tabbed browsing" },
  { prompt: "The shop site still knows what is in your cart after you open a new page.", fn: "cookies", answer: "Cookie storage" },
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

function looksLikeRealCard(text) {
  const digits = String(text).replace(/\D/g, "");
  return digits.length >= 12;
}

function hostFrom(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const parsed = parseUrl(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
  return parsed.domain.replace(/:\d+$/, "").replace(/\.$/, "").toLowerCase();
}

function simulatedIp(host) {
  let h = 0;
  for (const ch of host) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
  return `198.51.100.${(h % 253) + 1}`;
}

function initNav() {
  const links = [...document.querySelectorAll(".nav a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
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

function initSorter() {
  const root = document.querySelector("#sort-lab");
  if (!root) return;
  const status = root.querySelector("#sort-status");
  const cards = [...root.querySelectorAll(".sort-card")];
  const answered = new Map();

  cards.forEach((card) => {
    card.querySelectorAll(".choice").forEach((button) => {
      button.addEventListener("click", () => {
        const want = card.dataset.answer;
        const got = button.dataset.choice;
        card.querySelectorAll(".choice").forEach((other) => {
          other.classList.remove("is-correct", "is-wrong");
        });
        const feedback = card.querySelector(".why");
        if (got === want) {
          button.classList.add("is-correct");
          feedback.textContent = card.dataset.why;
          feedback.className = "why feedback good";
          answered.set(card, true);
        } else {
          button.classList.add("is-wrong");
          feedback.textContent = "Not that one. Use infrastructure for the Internet, and content or service for the Web.";
          feedback.className = "why feedback bad";
          answered.set(card, false);
        }
        const correct = [...answered.values()].filter(Boolean).length;
        const done = cards.every((item) => answered.get(item));
        status.className = done ? "feedback good" : "feedback";
        status.textContent = done
          ? "All six match the specification distinction: infrastructure versus content."
          : `${correct} of ${cards.length} placed correctly.`;
      });
    });
  });
}

function examSentence(parts) {
  const protocol = parts.protocol ? parts.protocol.replace("://", "") : "missing";
  const domain = parts.domain || "missing";
  const path = parts.path || "not shown";
  return `The protocol is ${protocol}, the domain name is ${domain}, and the file path is ${path}.`;
}

function initUrl() {
  const input = document.querySelector("#url-input");
  const bar = document.querySelector("#url-bar");
  const define = document.querySelector("#url-define");
  const sentence = document.querySelector("#url-sentence");
  const status = document.querySelector("#url-status");
  if (!input || !bar || !define) return;

  let mode = "learn";
  let rounds = [];
  let round = 0;
  let score = 0;

  const meanings = (parts) => ({
    protocol: parts.protocol.toLowerCase().startsWith("https")
      ? "The protocol is the set of rules for the conversation between browser and server. https:// means HTTP Secure, so the transfer is encrypted with SSL/TLS."
      : parts.protocol.toLowerCase().startsWith("http")
        ? "The protocol is the set of rules for the conversation between browser and server. http:// sends data as plaintext."
        : "The protocol is the set of rules the browser and host server follow when they communicate.",
    domain: "The domain name is the human-readable name of the server that stores the site. Users remember this instead of a numerical IP address.",
    path: "The file path is the folder and file name of the page on that server. In an exam, call this the file path or web page name.",
    extra: "This extra is not one of the three parts you must name. A question mark starts a query. A hash jumps to a fragment on the page.",
  });

  function paint() {
    const parts = parseUrl(input.value);
    bar.replaceChildren();
    const chunks = [
      ["protocol", parts.protocol, "Protocol"],
      ["domain", parts.domain, "Domain name"],
      ["path", parts.path, "File path"],
    ];
    chunks.forEach(([key, value, label]) => {
      if (!value) {
        const empty = el("span", `part muted ${key}`, key === "path" ? "No file path shown" : `No ${label.toLowerCase()}`);
        bar.append(empty);
        return;
      }
      const button = el("button", `part ${key}`);
      button.type = "button";
      button.dataset.part = key;
      button.append(el("small", "", mode === "learn" ? label : "Click to answer"));
      button.append(document.createTextNode(value));
      button.addEventListener("click", () => onPart(key, parts));
      bar.append(button);
    });
    if (parts.query || parts.hash) {
      const extra = el("button", "part extra");
      extra.type = "button";
      extra.dataset.part = "extra";
      extra.append(el("small", "", "Extra"));
      extra.append(document.createTextNode(`${parts.query}${parts.hash}`));
      extra.addEventListener("click", () => onPart("extra", parts));
      bar.append(extra);
    }
    if (mode === "learn") {
      define.textContent = parts.warnings[0] || "Click a coloured part. The three exam labels are protocol, domain name and file path.";
      sentence.textContent = parts.domain ? examSentence(parts) : "";
    }
    return parts;
  }

  function onPart(key, parts) {
    if (mode === "learn") {
      define.textContent = meanings(parts)[key];
      bar.querySelectorAll(".part").forEach((node) => node.classList.toggle("is-picked", node.dataset.part === key));
      return;
    }
    const want = rounds[round];
    if (!want) return;
    if (key === want) {
      score += 1;
      status.className = "feedback good";
      status.textContent = `Correct. That is the ${labelFor(want)}.`;
      round += 1;
      if (round >= rounds.length) {
        mode = "learn";
        status.textContent = `Practice complete: ${score} of ${rounds.length}. The labels are back on the URL.`;
        paint();
        return;
      }
    } else {
      status.className = "feedback bad";
      status.textContent = `That is the ${labelFor(key)}. The question asked for the ${labelFor(want)}.`;
    }
    ask();
  }

  function labelFor(key) {
    return { protocol: "protocol", domain: "domain name", path: "file path", extra: "extra data" }[key] || key;
  }

  function ask() {
    const want = rounds[round];
    define.textContent = `Practice ${round + 1} of ${rounds.length}: click the ${labelFor(want)}.`;
    sentence.textContent = "";
  }

  input.addEventListener("input", () => {
    if (mode === "practice") return;
    paint();
  });

  document.querySelectorAll("[data-url]").forEach((button) => {
    button.addEventListener("click", () => {
      mode = "learn";
      input.value = button.dataset.url;
      status.textContent = "";
      paint();
    });
  });

  document.querySelector("#url-practice")?.addEventListener("click", () => {
    const parts = parseUrl(input.value);
    if (!parts.protocol || !parts.domain || !parts.path) {
      status.className = "feedback bad";
      status.textContent = "Use a full URL with a protocol, a domain name and a file path before you start the drill.";
      return;
    }
    mode = "practice";
    rounds = shuffle(["protocol", "domain", "path"]);
    round = 0;
    score = 0;
    paint();
    ask();
  });

  paint();
}

function initHttp() {
  const input = document.querySelector("#packet");
  const plain = document.querySelector("#plain");
  const cipher = document.querySelector("#cipher");
  if (!input || !plain || !cipher) return;
  const render = () => {
    const text = input.value;
    if (looksLikeRealCard(text)) {
      plain.textContent = "That looks like a real card number. Clear it and use a fake classroom example.";
      cipher.textContent = "Not shown.";
      return;
    }
    plain.textContent = text.trim() ? text : "Nothing typed yet. HTTP would send this text in the clear.";
    cipher.textContent = text.trim()
      ? illustrateCipher(text)
      : "Nothing to illustrate yet.";
  };
  input.addEventListener("input", render);
  render();
}

function initScenarios() {
  const root = document.querySelector("#scenario-lab");
  if (!root) return;
  const prompt = root.querySelector(".prompt");
  const options = root.querySelector(".options");
  const status = root.querySelector(".feedback");
  let index = 0;
  let score = 0;

  function show() {
    const item = SCENARIOS[index];
    prompt.textContent = item.prompt;
    options.replaceChildren();
    document.querySelectorAll(".fn").forEach((card) => card.classList.remove("is-lit"));
    shuffle(SCENARIOS.map((scenario) => scenario.answer)).forEach((label) => {
      const button = el("button", "opt", label);
      button.type = "button";
      button.addEventListener("click", () => choose(label, button));
      options.append(button);
    });
    status.className = "feedback";
    status.textContent = `Scenario ${index + 1} of ${SCENARIOS.length}.`;
  }

  function choose(label, button) {
    const item = SCENARIOS[index];
    options.querySelectorAll("button").forEach((other) => {
      other.disabled = true;
    });
    const card = document.querySelector(`.fn[data-fn="${item.fn}"]`);
    card?.classList.add("is-lit");
    if (label === item.answer) {
      score += 1;
      button.classList.add("is-correct");
      status.className = "feedback good";
      status.textContent = "That function matches. The card above is highlighted.";
    } else {
      button.classList.add("is-wrong");
      status.className = "feedback bad";
      status.textContent = `The matching function is ${item.answer}.`;
    }
    index += 1;
    if (index < SCENARIOS.length) {
      const next = el("button", "btn small", "Next scenario");
      next.type = "button";
      next.addEventListener("click", show);
      options.append(next);
    } else {
      status.className = "feedback good";
      status.textContent = `Browser functions: ${score} of ${SCENARIOS.length}.`;
    }
  }

  show();
}

function initRetrieval() {
  const readout = document.querySelector("#step-readout");
  const phase = document.querySelector("#step-phase");
  const count = document.querySelector("#step-count");
  if (!readout) return;
  let index = 0;

  function paint() {
    const step = STEPS[index];
    phase.textContent = step.phase;
    count.textContent = `${index + 1} / ${STEPS.length}`;
    readout.textContent = step.text;
    document.querySelectorAll(".flow li").forEach((node) => {
      node.classList.toggle("is-on", FLOW[index].includes(node.dataset.node));
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
    const remaining = deck.filter((step) => !picked.includes(step.id));
    pool.replaceChildren();
    remaining.forEach((step) => {
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
    if (!picked.length) chosen.append(el("p", "empty", "Click the steps below in the order they happen."));
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
      status.textContent = "Place all six steps first. Click a chosen step if you want to remove it.";
      return;
    }
    const wrong = STEPS.findIndex((step, i) => step.id !== picked[i]);
    if (wrong === -1) {
      status.className = "feedback good";
      status.textContent = "That is the retrieval sequence: URL, DNS, IP address, server request, files returned, then rendering.";
      return;
    }
    status.className = "feedback bad";
    status.textContent = `Step ${wrong + 1} is out of order. The step in that position should be: ${STEPS[wrong].text}`;
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

function initDns() {
  const input = document.querySelector("#dns-input");
  const out = document.querySelector("#dns-out");
  const button = document.querySelector("#dns-go");
  if (!input || !out || !button) return;

  function resolve() {
    const host = hostFrom(input.value);
    out.replaceChildren();
    if (!host || host.includes("/") || host.includes(" ")) {
      out.append(el("p", "feedback bad", "Type a domain name, such as www.cambridgeinternational.org."));
      return;
    }
    const known = Object.prototype.hasOwnProperty.call(DNS_BOOK, host);
    const ip = known ? DNS_BOOK[host] : simulatedIp(host);
    out.append(el("p", "", `1. The browser sent the domain name “${host}”.`));
    out.append(el("p", "", "2. The DNS searched its database."));
    out.append(el("p", "feedback good", `3. The DNS returned the IP address ${ip}.`));
    out.append(el("p", "", known
      ? "This address comes from the classroom directory on this page, using documentation ranges, not a live lookup."
      : "This domain is not in the classroom directory, so the page invented a TEST-NET address. A real DNS would answer from the global system."));
    out.append(el("p", "", "The DNS did not return HTML, CSS or images. Those files stay on the web server. The browser’s next step is an HTTP or HTTPS request to this IP address."));
  }

  button.addEventListener("click", resolve);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      resolve();
    }
  });
}

function initCookies() {
  const sessionList = document.querySelector("#session-jar");
  const persistList = document.querySelector("#persist-jar");
  const status = document.querySelector("#cookie-status");
  if (!sessionList || !persistList) return;
  const session = [];
  const persistent = [];
  let open = true;

  function add(list, name, value, note) {
    const existing = list.find((item) => item.name === name);
    if (existing) {
      existing.value = value;
      existing.note = note;
    } else {
      list.push({ name, value, note });
    }
  }

  function render() {
    fill(sessionList, session, open ? "RAM is empty. Nothing has been stored for this visit." : "The browser is closed. RAM has been cleared.");
    fill(persistList, persistent, "Secondary storage has no persistent cookies yet.");
  }

  function fill(listNode, items, emptyText) {
    listNode.replaceChildren();
    if (!items.length) {
      listNode.append(el("p", "empty", emptyText));
      return;
    }
    items.forEach((item) => {
      const row = el("div", "cookie");
      row.append(el("b", "", `${item.name} = ${item.value}`));
      row.append(el("div", "", item.note));
      listNode.append(row);
    });
  }

  function requireOpen() {
    if (open) return true;
    status.className = "feedback bad";
    status.textContent = "The browser is closed. Open it again before a site can set a session cookie.";
    return false;
  }

  document.querySelector("#add-cart")?.addEventListener("click", () => {
    if (!requireOpen()) return;
    add(session, "cart", "2 items", "Session cookie · held in RAM · shopping cart for this visit");
    status.className = "feedback";
    status.textContent = "The server asked the browser to store a session cookie. It lives in RAM only.";
    render();
  });
  document.querySelector("#add-auth")?.addEventListener("click", () => {
    if (!requireOpen()) return;
    add(session, "session-id", "visit-1842", "Session cookie · held in RAM · login for this visit only");
    status.className = "feedback";
    status.textContent = "The user stays logged in while this browser session continues. Closing the browser will drop it.";
    render();
  });
  document.querySelector("#add-lang")?.addEventListener("click", () => {
    if (!open) {
      status.className = "feedback bad";
      status.textContent = "Open the browser first. A site can set a persistent cookie only while the browser is running.";
      return;
    }
    add(persistent, "lang", "en", "Persistent cookie · stored on HDD/SSD · expires in 365 days");
    status.className = "feedback";
    status.textContent = "Language preference is written to secondary storage. It is still there after a restart, until it expires or is deleted.";
    render();
  });
  document.querySelector("#add-remember")?.addEventListener("click", () => {
    if (!open) {
      status.className = "feedback bad";
      status.textContent = "Open the browser first.";
      return;
    }
    add(persistent, "remember", "yes", "Persistent cookie · stored on HDD/SSD · expires in 30 days");
    status.className = "feedback";
    status.textContent = "“Remember my login” is a persistent cookie, not a session cookie.";
    render();
  });
  document.querySelector("#close-browser")?.addEventListener("click", () => {
    open = false;
    session.splice(0, session.length);
    status.className = "feedback good";
    status.textContent = persistent.length
      ? "Browser closed. Session cookies were erased from RAM. Persistent cookies are still on secondary storage."
      : "Browser closed. Session cookies were erased. There were no persistent cookies to keep.";
    render();
  });
  document.querySelector("#open-browser")?.addEventListener("click", () => {
    open = true;
    status.className = "feedback";
    status.textContent = persistent.length
      ? "Browser opened. RAM starts empty. The persistent cookies were read back from secondary storage."
      : "Browser opened. RAM starts empty, and there is nothing stored on disk yet.";
    render();
  });
  document.querySelector("#expire")?.addEventListener("click", () => {
    persistent.splice(0, persistent.length);
    status.className = "feedback";
    status.textContent = "The expiry dates arrived. The persistent cookies were removed. A user can also delete them manually before that.";
    render();
  });
  document.querySelector("#manual-delete")?.addEventListener("click", () => {
    persistent.splice(0, persistent.length);
    status.className = "feedback";
    status.textContent = "You deleted the persistent cookies manually. They do not have to wait for the expiry date.";
    render();
  });
  render();
}

function pointHit(point, text) {
  if (!point.test.test(text)) return false;
  if (point.also && !point.also.test(text)) return false;
  return true;
}

function initWritten() {
  const total = document.querySelector("#written-score");
  document.querySelectorAll(".q").forEach((card) => {
    const spec = WRITTEN[card.dataset.q];
    if (!spec) return;
    const button = card.querySelector(".check-written");
    const scheme = card.querySelector(".scheme");
    const hits = card.querySelector(".hits");
    const award = card.querySelector("input[type=number]");
    button.addEventListener("click", () => {
      const text = card.querySelector("textarea").value.trim();
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
    award?.addEventListener("input", () => {
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
  if (!root) return;
  const status = document.querySelector("#mcq-score");
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
        const answered = [...root.querySelectorAll(".q")].filter((entry) => entry.querySelector(".opt:disabled")).length;
        if (status) {
          status.textContent = `${correctCount} / ${MCQS.length}${answered === MCQS.length ? " · quick check complete" : ""}`;
        }
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
  const key = "igcse51-checklist-v1";
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
  initSorter();
  initUrl();
  initHttp();
  initScenarios();
  initRetrieval();
  initOrder();
  initDns();
  initCookies();
  initWritten();
  initMcq();
  initChecklist();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}
