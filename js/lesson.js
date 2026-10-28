import {
  addEightBit,
  binaryToDenary,
  binaryToHex,
  checkDigitHolds,
  checksum,
  colourCount,
  denaryToBinary,
  denaryToHex,
  fromBits,
  fromTwosComplement,
  gateOutput,
  hexToBinary,
  hexToDenary,
  imageFileBits,
  logicalShift,
  makeCheckDigit,
  parityBit,
  parityHolds,
  rleDecode,
  rleEncode,
  runQuery,
  soundFileBits,
  STUDENTS,
  toTwosComplement,
  truthTable,
} from "./tools.js";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function renderTopic(topic) {
  const main = document.querySelector("#main");
  const nav = document.querySelector(".nav");
  if (!main) return;
  main.replaceChildren();
  const links = [{ href: "#overview", label: "Overview" }];
  if (topic.map?.length) links.push({ href: "#syllabus", label: "Syllabus" });
  topic.sections.forEach((section) => links.push({ href: `#${section.id}`, label: section.nav || section.title }));
  if (topic.lab) links.push({ href: "#lab", label: "Try it" });
  if (topic.sort) links.push({ href: "#sort", label: "Sort" });
  if (topic.order) links.push({ href: "#order", label: "Order" });
  if (topic.mcqs?.length) links.push({ href: "#practice", label: "Practice" });
  if (topic.checks?.length) links.push({ href: "#review", label: "Review" });
  links.forEach((link) => {
    const anchor = el("a", "", link.label);
    anchor.href = link.href;
    nav?.append(anchor);
  });

  main.append(hero(topic));
  if (topic.map?.length) main.append(syllabusMap(topic));
  topic.sections.forEach((section) => main.append(teach(section)));
  if (topic.lab) main.append(labSection(topic.lab));
  if (topic.sort) main.append(sortSection(topic.sort));
  if (topic.order) main.append(orderSection(topic.order));
  if (topic.mcqs?.length) main.append(practice(topic));
  if (topic.checks?.length) main.append(review(topic));
  watchNav();
}

function hero(topic) {
  const section = el("section", "hero");
  section.id = "overview";
  const wrap = el("div", "wrap");
  wrap.append(el("p", "kicker", `Cambridge IGCSE Computer Science 0478 · ${topic.paper}`));
  wrap.append(el("h1", "", topic.title));
  wrap.append(el("p", "lede", topic.lede));
  const actions = el("div", "actions");
  const start = el("a", "btn", "Start the lesson");
  start.href = topic.map?.[0]?.[0] || `#${topic.sections[0].id}`;
  actions.append(start);
  if (topic.mcqs?.length) {
    const practiceLink = el("a", "btn ghost", "Jump to practice");
    practiceLink.href = "#practice";
    actions.append(practiceLink);
  }
  wrap.append(actions);
  const chips = el("ul", "chips");
  chips.append(chip(topic.id));
  chips.append(chip(topic.chapter));
  wrap.append(chips);
  section.append(wrap);
  return section;
}

function chip(text) {
  const item = el("li", "chip", text);
  return item;
}

function syllabusMap(topic) {
  const section = el("section", "block");
  section.id = "syllabus";
  const wrap = el("div", "wrap");
  const head = el("div", "section-head");
  head.append(el("p", "kicker", "Syllabus map"));
  head.append(el("h2", "", topic.mapTitle || "Both columns of this topic"));
  head.append(el("p", "lede", topic.mapLede || "Each card is one thing you should be able to do. Open it for the teaching, then for the notes that sit beside that statement in the syllabus."));
  wrap.append(head);
  const grid = el("div", topic.map.length > 4 ? "grid-3" : "grid-2");
  topic.map.forEach(([href, code, title, text]) => {
    const cardLink = el("a", "map-card");
    cardLink.href = href;
    cardLink.append(el("span", "", code));
    cardLink.append(el("h3", "", title));
    cardLink.append(el("p", "", text));
    grid.append(cardLink);
  });
  wrap.append(grid);
  section.append(wrap);
  return section;
}

function teach(section) {
  const block = el("section", "block");
  block.id = section.id;
  const wrap = el("div", "wrap");
  const head = el("div", "section-head");
  head.append(el("p", "kicker", section.kicker || ""));
  head.append(el("h2", "", section.title));
  if (section.lede) head.append(el("p", "lede", section.lede));
  wrap.append(head);
  (section.prose || []).forEach((paragraph) => wrap.append(el("p", "teaching", paragraph)));
  if (section.structure) wrap.append(renderStructure(section.structure));
  if (section.pair) wrap.append(pair(section.pair));
  if (section.columns?.length) {
    const grid = el("div", section.columns.length > 2 ? "grid-3" : "grid-2");
    section.columns.forEach((column) => grid.append(card(column)));
    wrap.append(grid);
  }
  if (section.table) wrap.append(dataTable(section.table));
  if (section.walk) wrap.append(walkthrough(section.walk));
  if (section.tabs) wrap.append(tabSet(section.tabs));
  if (section.links?.length) wrap.append(simLinks(section.links, section.linksLede));
  if (section.exam) wrap.append(callout("Exam watch", section.exam, "exam"));
  if (section.note) wrap.append(callout("Remember", section.note, "note"));
  block.append(wrap);
  return block;
}

function pair(spec) {
  const grid = el("div", "grid-2");
  grid.append(pointCard("You should be able to", spec.able));
  grid.append(pointCard("Notes and guidance", spec.notes));
  return grid;
}

function pointCard(title, points) {
  const article = el("article", "card");
  article.append(el("h3", "", title));
  const list = el("ul");
  (points || []).forEach((point) => list.append(el("li", "", point)));
  article.append(list);
  return article;
}

function walkthrough(walk) {
  const box = el("div", "worked");
  box.append(el("h3", "", walk.title));
  if (walk.lede) box.append(el("p", "", walk.lede));
  const list = el("ol", "steps");
  (walk.steps || []).forEach((step) => {
    const item = el("li");
    if (typeof step === "string") item.textContent = step;
    else {
      item.append(el("strong", "", step.label));
      item.append(document.createTextNode(` ${step.text}`));
    }
    list.append(item);
  });
  box.append(list);
  if (walk.result) box.append(el("p", "define", walk.result));
  return box;
}

function dataTable(spec) {
  const box = el("div", "worked");
  if (spec.title) box.append(el("h3", "", spec.title));
  if (spec.lede) box.append(el("p", "", spec.lede));
  const table = el("table", "sheet");
  const head = el("tr");
  spec.head.forEach((cell) => head.append(el("th", "", cell)));
  table.append(head);
  spec.rows.forEach((row) => {
    const line = el("tr");
    row.forEach((cell) => line.append(el("td", "", String(cell))));
    table.append(line);
  });
  box.append(table);
  if (spec.note) box.append(el("p", "define", spec.note));
  return box;
}

function tabSet(spec) {
  const box = el("div", "tabset");
  if (spec.lede) box.append(el("p", "", spec.lede));
  const bar = el("div", "tabbar");
  bar.setAttribute("role", "tablist");
  const panels = el("div", "tabpanels");
  spec.items.forEach((item, index) => {
    const button = el("button", index === 0 ? "tab is-active" : "tab", item.label);
    button.type = "button";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", index === 0 ? "true" : "false");
    const panelId = `${spec.id || "tab"}-${index}`;
    button.setAttribute("aria-controls", panelId);
    const panel = el("div", index === 0 ? "tabpanel" : "tabpanel is-hidden");
    panel.id = panelId;
    panel.setAttribute("role", "tabpanel");
    if (item.note) panel.append(el("p", "define", item.note));
    if (item.code) panel.append(pseudocodeBlock(item.code));
    const charts = item.charts || [];
    const host = charts.length > 1 ? el("div", "grid-2") : panel;
    charts.forEach((chart) => {
      const column = el("div", "chart-card");
      if (chart.title) column.append(el("h3", "", chart.title));
      column.append(renderChart(chart));
      host.append(column);
    });
    if (host !== panel) panel.append(host);
    button.addEventListener("click", () => {
      [...bar.querySelectorAll("button")].forEach((other) => {
        other.classList.remove("is-active");
        other.setAttribute("aria-selected", "false");
      });
      [...panels.children].forEach((other) => other.classList.add("is-hidden"));
      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");
      panel.classList.remove("is-hidden");
    });
    bar.append(button);
    panels.append(panel);
  });
  box.append(bar, panels);
  return box;
}

const PSEUDO_KEYWORDS = new Set([
  "AND", "ARRAY", "CALL", "CASE", "CLOSEFILE", "CONSTANT", "DECLARE", "DO", "ELSE",
  "ENDCASE", "ENDFUNCTION", "ENDIF", "ENDPROCEDURE", "ENDWHILE", "FOR", "FUNCTION",
  "IF", "INPUT", "NEXT", "NOT", "OF", "OPENFILE", "OR", "OTHERWISE", "OUTPUT",
  "PROCEDURE", "READ", "READFILE", "REPEAT", "RETURN", "RETURNS", "STEP", "THEN",
  "TO", "UNTIL", "WHILE", "WRITE", "WRITEFILE",
]);
const PSEUDO_TYPES = new Set(["BOOLEAN", "CHAR", "INTEGER", "REAL", "STRING"]);
const PSEUDO_ROUTINES = new Set(["DIV", "LCASE", "LENGTH", "MOD", "RANDOM", "ROUND", "SUBSTRING", "UCASE"]);
const PSEUDO_LITERALS = new Set(["FALSE", "TRUE"]);

function pseudocodeBlock(source) {
  const pre = el("pre", "pseudo");
  const text = source.replace(/^\n/, "").replace(/\s+$/, "");
  let plain = "";
  const flush = () => {
    if (!plain) return;
    pre.append(document.createTextNode(plain));
    plain = "";
  };
  const push = (className, value) => {
    if (!value) return;
    if (!className) {
      plain += value;
      return;
    }
    flush();
    pre.append(el("span", className, value));
  };
  let index = 0;
  while (index < text.length) {
    if (text.startsWith("//", index)) {
      const lineEnd = text.indexOf("\n", index);
      const stop = lineEnd === -1 ? text.length : lineEnd;
      push("tok-comment", text.slice(index, stop));
      index = stop;
      continue;
    }
    const mark = text[index];
    if (mark === "\"" || mark === "'") {
      let end = index + 1;
      while (end < text.length && text[end] !== mark && text[end] !== "\n") end += 1;
      if (end < text.length && text[end] === mark) end += 1;
      push("tok-string", text.slice(index, end));
      index = end;
      continue;
    }
    if (mark === "←") {
      push("tok-key", mark);
      index += 1;
      continue;
    }
    if (/[0-9]/.test(mark)) {
      let end = index + 1;
      while (end < text.length && /[0-9.]/.test(text[end])) end += 1;
      push("tok-number", text.slice(index, end));
      index = end;
      continue;
    }
    if (/[A-Za-z]/.test(mark)) {
      let end = index + 1;
      while (end < text.length && /[A-Za-z]/.test(text[end])) end += 1;
      const word = text.slice(index, end);
      let className = "";
      if (word === word.toUpperCase()) {
        if (PSEUDO_KEYWORDS.has(word)) className = "tok-key";
        else if (PSEUDO_TYPES.has(word)) className = "tok-type";
        else if (PSEUDO_ROUTINES.has(word)) className = "tok-fn";
        else if (PSEUDO_LITERALS.has(word)) className = "tok-key";
      }
      push(className, word);
      index = end;
      continue;
    }
    plain += mark;
    index += 1;
  }
  flush();
  return pre;
}

function renderChart(chart) {
  if (chart.layout === "decision") return drawDecision(chart);
  if (chart.layout === "loop") return drawLoop(chart);
  const box = el("div", "chart");
  (chart.steps || []).forEach((step, index) => {
    if (index > 0 && step.shape !== "branch") box.append(flowArrow());
    box.append(drawStep(step));
  });
  return box;
}

const SVG_NS = "http://www.w3.org/2000/svg";

function svgEl(tag, attrs = {}, text) {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
  if (text != null) node.textContent = text;
  return node;
}

function flowSvg(markerId, width, height, label) {
  const svg = svgEl("svg", {
    class: "flow-svg",
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": label,
  });
  const marker = svgEl("marker", {
    id: markerId,
    viewBox: "0 0 8 8",
    markerWidth: "8",
    markerHeight: "8",
    refX: "7",
    refY: "4",
    orient: "auto",
  });
  marker.append(svgEl("path", { class: "flow-head", d: "M0,0 L8,4 L0,8 Z" }));
  const defs = svgEl("defs");
  defs.append(marker);
  svg.append(defs);
  svg.marker = `url(#${markerId})`;
  return svg;
}

function flowLine(points, marker) {
  return svgEl("polyline", {
    class: "flow-line",
    points: points.map(([x, y]) => `${x},${y}`).join(" "),
    ...(marker ? { "marker-end": marker } : {}),
  });
}

function flowText(x, y, text, className) {
  return svgEl("text", {
    class: className || "flow-symbol",
    x,
    y,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
  }, text);
}

function flowTerminator(x, y, w, h, text) {
  const group = svgEl("g");
  group.append(svgEl("rect", { class: "flow-term", x, y, width: w, height: h, rx: h / 2 }));
  group.append(flowText(x + w / 2, y + h / 2, text));
  return group;
}

function flowProcess(x, y, w, h, text) {
  const group = svgEl("g");
  group.append(svgEl("rect", { class: "flow-process", x, y, width: w, height: h, rx: 4 }));
  group.append(flowText(x + w / 2, y + h / 2, text));
  return group;
}

function flowIo(cx, top, halfW, h, skew, text) {
  const bottom = top + h;
  const group = svgEl("g");
  group.append(svgEl("polygon", {
    class: "flow-io",
    points: `${cx - halfW + skew},${top} ${cx + halfW + skew},${top} ${cx + halfW - skew},${bottom} ${cx - halfW - skew},${bottom}`,
  }));
  group.append(flowText(cx, top + h / 2, text));
  return group;
}

function flowDiamond(cx, cy, hw, hh, text) {
  const group = svgEl("g");
  group.append(svgEl("polygon", {
    class: "flow-decision",
    points: `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`,
  }));
  group.append(flowText(cx, cy, text));
  return group;
}

function flowTag(x, y, text, anchor, className) {
  return svgEl("text", {
    class: className || "flow-tag",
    x,
    y,
    "text-anchor": anchor || "middle",
    "dominant-baseline": "middle",
  }, text);
}

function drawDecision(chart) {
  const svg = flowSvg(
    "flow-head-decision",
    760,
    510,
    `Decision flowchart. Start, ${chart.input}, then ${chart.question}. Yes: ${chart.yes}. No: ${chart.no}. Both paths meet at Stop.`,
  );
  svg.append(flowTerminator(300, 16, 160, 42, "Start"));
  svg.append(flowLine([[380, 58], [380, 84]], svg.marker));
  svg.append(flowIo(380, 84, 92, 48, 14, chart.input));
  svg.append(flowLine([[380, 132], [380, 156]], svg.marker));
  svg.append(flowDiamond(380, 236, 128, 80, chart.question));
  svg.append(flowLine([[252, 236], [150, 236], [150, 346]], svg.marker));
  svg.append(flowTag(196, 220, "Yes"));
  svg.append(flowLine([[508, 236], [610, 236], [610, 346]], svg.marker));
  svg.append(flowTag(564, 220, "No"));
  svg.append(flowIo(150, 346, 86, 48, 12, chart.yes));
  svg.append(flowIo(610, 346, 86, 48, 12, chart.no));
  svg.append(flowLine([[150, 394], [150, 432], [610, 432]]));
  svg.append(flowLine([[610, 394], [610, 432]]));
  svg.append(flowLine([[380, 432], [380, 452]], svg.marker));
  svg.append(flowTerminator(300, 452, 160, 42, "Stop"));
  return svg;
}

function drawLoop(chart) {
  const [output, update] = chart.body;
  const svg = flowSvg(
    "flow-head-loop",
    760,
    560,
    `Loop flowchart. ${chart.setup}. While ${chart.question}: ${output}, then ${update}, and the flow line returns to the decision. Otherwise Stop.`,
  );
  const x = 250;
  svg.append(flowTerminator(x - 80, 16, 160, 42, "Start"));
  svg.append(flowLine([[x, 58], [x, 78]], svg.marker));
  svg.append(flowProcess(x - 110, 78, 220, 46, chart.setup));
  svg.append(flowLine([[x, 124], [x, 176]], svg.marker));
  svg.append(flowDiamond(x, 250, 118, 74, chart.question));
  svg.append(flowLine([[368, 250], [468, 250]], svg.marker));
  svg.append(flowTag(418, 232, "No"));
  svg.append(flowTerminator(468, 228, 148, 44, "Stop"));
  svg.append(flowTag(x + 14, 344, "Yes", "start"));
  svg.append(flowLine([[x, 324], [x, 362]], svg.marker));
  svg.append(flowIo(x, 362, 96, 48, 14, output));
  svg.append(flowLine([[x, 410], [x, 430]], svg.marker));
  svg.append(flowProcess(x - 132, 430, 264, 46, update));
  svg.append(flowLine([[x, 476], [x, 528], [44, 528], [44, 150], [x, 150]], svg.marker));
  svg.append(flowTag(58, 508, "back to the decision", "start", "flow-back"));
  return svg;
}

function renderStructure(spec) {
  const box = el("div", "worked");
  if (spec.title) box.append(el("h3", "", spec.title));
  box.append(drawStructure(spec));
  if (spec.note) box.append(el("p", "define", spec.note));
  return box;
}

function structureLabel(text) {
  if (text.length <= 14) return [text];
  const space = text.lastIndexOf(" ", Math.ceil(text.length / 2) + 3);
  if (space < 4) return [text];
  return [text.slice(0, space), text.slice(space + 1)];
}

function structureBox(x, y, w, h, text, kind) {
  const group = svgEl("g");
  group.append(svgEl("rect", { class: kind, x, y, width: w, height: h, rx: 4 }));
  const lines = structureLabel(text);
  const middle = y + h / 2;
  if (lines.length === 1) {
    group.append(flowText(x + w / 2, middle, lines[0]));
    return group;
  }
  lines.forEach((line, index) => {
    const lineY = middle + (index - (lines.length - 1) / 2) * 18;
    group.append(flowText(x + w / 2, lineY, line));
  });
  return group;
}

function drawStructure(spec) {
  const boxH = 46;
  const tallH = 62;
  const leafW = 156;
  const childW = 168;
  const childGap = 16;
  const groupGap = 24;
  const pad = 16;
  const groups = spec.children.map((child) => {
    const kids = child.children || [];
    const width = kids.length ? kids.length * childW + (kids.length - 1) * childGap : leafW;
    return { text: child.text, kids, width };
  });
  const total = groups.reduce((sum, group) => sum + group.width, 0) + groupGap * (groups.length - 1);
  const deep = groups.some((group) => group.kids.length);
  const width = total + pad * 2;
  const height = deep ? 292 : 150;
  const svg = svgEl("svg", {
    class: "flow-svg struct-svg",
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": spec.label,
  });
  let cursor = pad;
  const level = groups.map((group) => {
    const placed = { ...group, center: cursor + group.width / 2 };
    cursor += group.width + groupGap;
    return placed;
  });
  const rootW = 188;
  const rootX = pad + total / 2 - rootW / 2;
  const rootY = 8;
  svg.append(structureBox(rootX, rootY, rootW, boxH, spec.root, "struct-root"));
  const busY = rootY + boxH + 26;
  const rowY = busY + 16;
  svg.append(flowLine([[pad + total / 2, rootY + boxH], [pad + total / 2, busY]]));
  svg.append(flowLine([[level[0].center, busY], [level[level.length - 1].center, busY]]));
  level.forEach((group) => {
    svg.append(flowLine([[group.center, busY], [group.center, rowY]]));
    svg.append(structureBox(group.center - leafW / 2, rowY, leafW, boxH, group.text, "struct-part"));
    if (!group.kids.length) return;
    const parentBottom = rowY + boxH;
    const bus2 = parentBottom + 26;
    const childY = bus2 + 16;
    const span = group.kids.length * childW + (group.kids.length - 1) * childGap;
    const centers = group.kids.map((kid, index) => group.center - span / 2 + childW / 2 + index * (childW + childGap));
    svg.append(flowLine([[group.center, parentBottom], [group.center, bus2]]));
    if (centers.length > 1) svg.append(flowLine([[centers[0], bus2], [centers[centers.length - 1], bus2]]));
    group.kids.forEach((kid, index) => {
      const lines = structureLabel(kid);
      const h = lines.length > 1 ? tallH : boxH;
      svg.append(flowLine([[centers[index], bus2], [centers[index], childY]]));
      svg.append(structureBox(centers[index] - childW / 2, childY, childW, h, kid, "struct-part"));
    });
  });
  return svg;
}

function simLinks(links, lede) {
  const box = el("div", "sim-grid");
  if (lede) box.append(el("p", "teaching", lede));
  const grid = el("div", links.length > 2 ? "grid-3" : "grid-2");
  links.forEach((link) => {
    const anchor = el("a", "map-card");
    anchor.href = link.href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.setAttribute("href", link.href);
    anchor.append(el("span", "", "CompSimu"));
    anchor.append(el("h3", "", link.title));
    if (link.text) anchor.append(el("p", "", link.text));
    grid.append(anchor);
  });
  box.append(grid);
  return box;
}

function drawStep(step) {
  if (step.shape === "branch") {
    const row = el("div", "flow-split");
    [["yes", "Yes"], ["no", "No"]].forEach(([side, label]) => {
      const column = el("div", "flow-col");
      column.append(el("p", "flow-label", label));
      (step[side] || []).forEach((child, index) => {
        if (index > 0 && child.shape !== "back") column.append(flowArrow());
        column.append(drawStep(child));
      });
      row.append(column);
    });
    return row;
  }
  if (step.shape === "back") return el("p", "flow-back", step.text);
  const node = el("div", step.shape === "decision" ? "diamond" : `shape ${step.shape}`);
  node.append(el("span", step.shape === "io" ? "unskew" : "", step.text));
  return node;
}

function flowArrow() {
  return el("div", "flow-arrow");
}

function card(column) {
  const article = el("article", "card");
  article.append(el("h3", "", column.title));
  if (column.text) article.append(el("p", "", column.text));
  if (column.points?.length) {
    const list = el("ul");
    column.points.forEach((point) => list.append(el("li", "", point)));
    article.append(list);
  }
  return article;
}

function callout(label, text, kind) {
  const aside = el("aside", `callout ${kind}`);
  aside.append(el("strong", "", label));
  aside.append(el("p", "", text));
  return aside;
}

function labSection(name) {
  const block = el("section", "block");
  block.id = "lab";
  const wrap = el("div", "wrap");
  const head = el("div", "section-head");
  head.append(el("p", "kicker", "Try it"));
  head.append(el("h2", "", labTitle(name)));
  head.append(el("p", "lede", labLede(name)));
  wrap.append(head);
  const lab = el("div", "lab");
  mountLab(name, lab);
  wrap.append(lab);
  block.append(wrap);
  return block;
}

function labTitle(name) {
  return {
    numbers: "Convert, add, shift and use two’s complement",
    media: "Colour depth and file size",
    files: "Measure a file and try run-length encoding",
    checks: "Parity, checksum and a check digit",
    sql: "Query the Students table",
    gates: "Truth tables for the seven gates",
    array: "Read one cell of an array",
  }[name];
}

function labLede(name) {
  return {
    numbers: "Positive values only, except the two’s complement box. Binary answers for the register tasks are 8-bit.",
    media: "The number of colours is 2 to the power of the colour depth. File size uses 1024, not 1000.",
    files: "Image size uses the number of pixels and the colour depth. Sound size uses the sample rate, resolution and length. Run-length encoding is lossless.",
    checks: "Parity and checksum are checked after transmission. A check digit is checked when data is entered.",
    sql: "One table, four records. The primary key is StudentID. Keywords can be upper or lower case.",
    gates: "NOT has one input. Every other gate here has two. XOR is also called EOR.",
    array: "This array uses index 0 for the first cell. A question may instead start at 1. Read the question.",
  }[name];
}

function mountLab(name, lab) {
  const builders = { numbers: numbersLab, media: mediaLab, files: filesLab, checks: checksLab, sql: sqlLab, gates: gatesLab, array: arrayLab };
  builders[name]?.(lab);
}

function field(labelText, control) {
  const label = el("label", "field", labelText);
  label.append(control);
  return label;
}

function input(id, value, extra = {}) {
  const box = el("input");
  box.id = id;
  box.name = id;
  box.type = extra.type || "text";
  if (value != null) box.value = value;
  if (extra.maxLength) box.maxLength = extra.maxLength;
  if (extra.min != null) box.min = extra.min;
  if (extra.max != null) box.max = extra.max;
  return box;
}

function button(label, onClick, className = "btn small") {
  const node = el("button", className, label);
  node.type = "button";
  node.addEventListener("click", onClick);
  return node;
}

function show(node, text, ok = true) {
  node.className = ok ? "feedback good" : "feedback bad";
  node.textContent = text;
}

function run(status, action) {
  try {
    action();
  } catch (error) {
    show(status, error.message, false);
  }
}

function numbersLab(lab) {
  const status = el("p", "feedback", "");
  const denary = input("denary-value", "26", { maxLength: 5 });
  const binary = input("binary-value", "11010", { maxLength: 16 });
  const hex = input("hex-value", "1A", { maxLength: 4 });
  const left = input("add-left", "11111111", { maxLength: 8 });
  const right = input("add-right", "00000001", { maxLength: 8 });
  const shiftBits = input("shift-bits", "00001100", { maxLength: 8 });
  const shiftPlaces = input("shift-places", "1", { type: "number", min: "1", max: "8" });
  const shiftWay = el("select");
  shiftWay.id = "shift-way";
  shiftWay.name = "shift-way";
  ["left", "right"].forEach((way) => {
    const option = el("option", "", way);
    option.value = way;
    shiftWay.append(option);
  });
  shiftWay.value = "left";
  const signed = input("signed-value", "-5", { maxLength: 5 });
  const twosBits = input("twos-bits", "11111011", { maxLength: 8 });

  lab.append(field("Denary", denary));
  lab.append(button("To binary and hex", () => run(status, () => {
    const n = Number(denary.value);
    const bits = denaryToBinary(n);
    show(status, `${n} is binary ${typeof bits === "string" ? bits : bits.bits} and hex ${denaryToHex(n)}.`);
  })));
  lab.append(field("Binary", binary));
  lab.append(button("To denary and hex", () => run(status, () => {
    show(status, `${binary.value} is denary ${binaryToDenary(binary.value)} and hex ${binaryToHex(binary.value)}.`);
  })));
  lab.append(field("Hexadecimal", hex));
  lab.append(button("To denary and binary", () => run(status, () => {
    show(status, `${hex.value} is denary ${hexToDenary(hex.value)} and binary ${hexToBinary(hex.value)}.`);
  })));
  const row = el("div", "calc-grid");
  row.append(field("First 8-bit number", left));
  row.append(field("Second 8-bit number", right));
  lab.append(row);
  lab.append(button("Add the 8-bit numbers", () => run(status, () => {
    const result = addEightBit(left.value, right.value);
    show(status, result.overflow
      ? `The true sum is ${result.sum}, which is greater than 255. An 8-bit register stores ${result.stored}. That is overflow.`
      : `The sum fits in 8 bits: ${result.stored}, denary ${result.sum}.`, !result.overflow);
  })));
  lab.append(field("8-bit pattern to shift", shiftBits));
  lab.append(field("Places", shiftPlaces));
  lab.append(field("Direction", shiftWay));
  lab.append(button("Logical shift", () => run(status, () => {
    const result = logicalShift(shiftBits.value, shiftWay.value, shiftPlaces.value);
    show(status, `Result ${result.bits} (denary ${result.denary}). Bits lost: ${result.lost}. Zeros filled the other end. A left shift multiplies by 2 for each place, and a right shift divides by 2, until a significant bit is lost.`);
  })));
  lab.append(field("Denary from -128 to 127", signed));
  lab.append(button("To two’s complement", () => run(status, () => {
    show(status, `${signed.value} is stored as ${toTwosComplement(signed.value)}.`);
  })));
  lab.append(field("8-bit two’s complement", twosBits));
  lab.append(button("Read the signed value", () => run(status, () => {
    show(status, `${twosBits.value} represents ${fromTwosComplement(twosBits.value)}.`);
  })));
  lab.append(status);
}

function mediaLab(lab) {
  const status = el("p", "feedback", "");
  const depth = input("colour-depth", "4", { type: "number", min: "1", max: "24" });
  const width = input("image-width", "100", { type: "number", min: "1" });
  const height = input("image-height", "80", { type: "number", min: "1" });
  lab.append(field("Colour depth in bits", depth));
  lab.append(field("Width in pixels", width));
  lab.append(field("Height in pixels", height));
  lab.append(button("Calculate", () => run(status, () => {
    const colours = colourCount(depth.value);
    const bits = imageFileBits(width.value, height.value, depth.value);
    show(status, `${depth.value} bits can represent ${colours} colours. This image is ${bits} bits, which is ${fromBits(bits, "B")} bytes or ${trim(fromBits(bits, "KiB"))} KiB.`);
  })));
  lab.append(status);
}

function filesLab(lab) {
  const status = el("p", "feedback", "");
  const width = input("file-width", "200", { type: "number" });
  const height = input("file-height", "100", { type: "number" });
  const depth = input("file-depth", "16", { type: "number" });
  const rate = input("sample-rate", "44100", { type: "number" });
  const resolution = input("sample-resolution", "16", { type: "number" });
  const seconds = input("track-seconds", "30", { type: "number" });
  const channels = input("channels", "1", { type: "number", min: "1", max: "8" });
  const sample = input("rle-text", "AAAABBBCC", { maxLength: 80 });
  lab.append(el("h3", "", "Image"));
  const images = el("div", "calc-grid");
  images.append(field("Width", width), field("Height", height), field("Colour depth", depth));
  lab.append(images);
  lab.append(button("Image file size", () => run(status, () => {
    const bits = imageFileBits(width.value, height.value, depth.value);
    show(status, `${bits} bits = ${fromBits(bits, "B")} bytes = ${trim(fromBits(bits, "KiB"))} KiB. Divide by 1024 when the question asks for kibibytes.`);
  })));
  lab.append(el("h3", "", "Sound"));
  const sound = el("div", "calc-grid");
  sound.append(field("Sample rate", rate), field("Resolution in bits", resolution), field("Length in seconds", seconds), field("Channels, if the question gives them", channels));
  lab.append(sound);
  lab.append(button("Sound file size", () => run(status, () => {
    const bits = soundFileBits(rate.value, resolution.value, seconds.value, channels.value);
    show(status, `${bits} bits = ${trim(fromBits(bits, "KiB"))} KiB = ${trim(fromBits(bits, "MiB"))} MiB. Use one channel unless the question says otherwise.`);
  })));
  lab.append(el("h3", "", "Run-length encoding"));
  lab.append(field("Text", sample));
  lab.append(button("Encode and decode", () => run(status, () => {
    const runs = rleEncode(sample.value);
    const encoded = runs.map(([count, character]) => `${count}${character}`).join(" ");
    const back = rleDecode(runs);
    show(status, `Encoded: ${encoded}. Decoded: ${back}. The original is restored, so this compression is lossless.`);
  })));
  lab.append(status);
}

function checksLab(lab) {
  const status = el("p", "feedback", "");
  const data = input("parity-data", "1010001", { maxLength: 7 });
  const kind = el("select");
  kind.id = "parity-kind";
  kind.name = "parity-kind";
  ["even", "odd"].forEach((name) => {
    const option = el("option", "", name);
    option.value = name;
    kind.append(option);
  });
  kind.value = "even";
  const received = input("received-byte", "10100011", { maxLength: 8 });
  const sent = input("checksum-sent", "12, 7, 9", { maxLength: 40 });
  const given = input("checksum-given", "28", { maxLength: 8 });
  const entered = input("check-digits", "123456784", { maxLength: 16 });
  lab.append(field("7 data bits", data));
  lab.append(field("Parity", kind));
  lab.append(button("Add the parity bit", () => run(status, () => {
    const bit = parityBit(data.value, kind.value);
    const byte = `${data.value.replace(/\s/g, "")}${bit}`;
    show(status, `Parity bit ${bit}. Byte sent: ${byte}. ${kind.value} parity means the whole byte has an ${kind.value} number of 1s.`);
  })));
  lab.append(field("Received 8-bit byte", received));
  lab.append(button("Check the received byte", () => run(status, () => {
    const ok = parityHolds(received.value, kind.value);
    show(status, ok ? "The parity check passes. This does not prove the data is correct: two flipped bits can hide each other." : "The parity check fails. Ask for the data to be sent again.", ok);
  })));
  lab.append(field("Byte values that were sent", sent));
  lab.append(field("Checksum that was sent", given));
  lab.append(button("Check the checksum", () => run(status, () => {
    const values = sent.value.split(",").map((part) => Number(part.trim()));
    const total = checksum(values);
    const ok = total === Number(given.value);
    show(status, ok ? `The values add up to ${total}, which matches the checksum.` : `The values add up to ${total}, not ${given.value}. The data changed or the checksum is wrong.`, ok);
  })));
  lab.append(field("Number including its final check digit", entered));
  lab.append(button("Check the digit", () => run(status, () => {
    const ok = checkDigitHolds(entered.value);
    const body = String(entered.value).replace(/\s/g, "").slice(0, -1);
    show(status, ok
      ? `The digits add up to a multiple of 10, so this example check passes. A check digit for ${body} would be ${makeCheckDigit(body)}.`
      : `The check fails, so the number was probably typed incorrectly. A check digit is used on entry, for example on an ISBN or a bar code.`, ok);
  })));
  lab.append(status);
}

function sqlLab(lab) {
  const status = el("p", "feedback", "");
  const box = el("textarea");
  box.id = "sql-query";
  box.name = "sql-query";
  box.maxLength = 200;
  box.value = "SELECT Name, Mark FROM Students WHERE Mark >= 70 ORDER BY Mark DESCENDING";
  const table = el("div", "out");
  table.id = "sql-table";
  lab.append(el("p", "", "StudentID is unique, so it can be the primary key."));
  lab.append(renderRows(STUDENTS));
  lab.append(field("Query", box));
  const actions = el("div", "row-actions");
  [
    ["All rows", "SELECT * FROM Students"],
    ["Class 10A", "SELECT Name FROM Students WHERE Class = '10A'"],
    ["Marks of 70 or more", "SELECT Name, Mark FROM Students WHERE Mark >= 70 ORDER BY Mark DESCENDING"],
    ["Count class 10B", "SELECT COUNT(*) FROM Students WHERE Class = '10B'"],
    ["Sum of 10A marks", "SELECT SUM(Mark) FROM Students WHERE Class = '10A'"],
  ].forEach(([label, query]) => {
    actions.append(button(label, () => {
      box.value = query;
      execute();
    }, "btn small ghost"));
  });
  lab.append(actions);
  lab.append(button("Run query", execute));
  lab.append(status);
  lab.append(table);

  function execute() {
    run(status, () => {
      const rows = runQuery(box.value);
      table.replaceChildren(renderRows(rows));
      show(status, rows.length ? `${rows.length} row${rows.length === 1 ? "" : "s"}.` : "The query ran. No rows matched.");
    });
  }
}

function renderRows(rows) {
  const table = el("table", "sheet");
  if (!rows.length) {
    table.append(el("caption", "", "No rows"));
    return table;
  }
  const head = el("tr");
  Object.keys(rows[0]).forEach((key) => head.append(el("th", "", key)));
  table.append(head);
  rows.forEach((row) => {
    const line = el("tr");
    Object.keys(rows[0]).forEach((key) => line.append(el("td", "", String(row[key]))));
    table.append(line);
  });
  return table;
}

function gatesLab(lab) {
  const status = el("p", "feedback", "");
  const name = el("select");
  name.id = "gate-name";
  name.name = "gate-name";
  ["NOT", "AND", "OR", "NAND", "NOR", "XOR"].forEach((gate) => {
    const option = el("option", "", gate);
    option.value = gate;
    name.append(option);
  });
  name.value = "NOT";
  const a = input("gate-a", "1", { maxLength: 1 });
  const b = input("gate-b", "0", { maxLength: 1 });
  const table = el("div");
  lab.append(field("Gate", name));
  lab.append(field("Input A", a));
  lab.append(field("Input B, ignored for NOT", b));
  lab.append(button("Show the output and the truth table", () => run(status, () => {
    const gate = name.value;
    const out = gateOutput(gate, a.value, gate === "NOT" ? 0 : b.value);
    const rows = truthTable(gate);
    table.replaceChildren(renderRows(rows.map((row) => gate === "NOT"
      ? { A: row.a, Output: row.out }
      : { A: row.a, B: row.b, Output: row.out })));
    show(status, gate === "NOT" ? `NOT ${a.value} = ${out}.` : `${gate} ${a.value} ${b.value} = ${out}.`);
  })));
  lab.append(status);
  lab.append(table);
}

function arrayLab(lab) {
  const values = [4, 9, 1, 7, 3];
  const status = el("p", "feedback", "");
  const index = input("array-index", "0", { type: "number", min: "0", max: "4" });
  lab.append(el("p", "", `Array Scores = [${values.join(", ")}]`));
  lab.append(field("Index", index));
  lab.append(button("Read Scores[index]", () => run(status, () => {
    const i = Number(index.value);
    if (!Number.isInteger(i) || i < 0 || i > 4) throw new Error("Use an index from 0 to 4.");
    show(status, `Scores[${i}] is ${values[i]}.`);
  })));
  lab.append(button("Find the maximum", () => {
    let max = values[0];
    let at = 0;
    values.forEach((value, position) => {
      if (value > max) {
        max = value;
        at = position;
      }
    });
    show(status, `Start with ${values[0]}. Compare each item. The maximum is ${max} at index ${at}.`);
  }));
  lab.append(status);
}

function trim(value) {
  return Number(value.toFixed(4)).toString();
}

function sortSection(spec) {
  const block = el("section", "block");
  block.id = "sort";
  const wrap = el("div", "wrap");
  wrap.append(el("h2", "", spec.title));
  if (spec.lede) wrap.append(el("p", "lede", spec.lede));
  const lab = el("div", "lab");
  const status = el("p", "feedback", "");
  const answered = new Map();
  spec.cards.forEach((item) => {
    const card = el("article", "sort-card");
    card.append(el("p", "", item.text));
    const choices = el("div", "choices");
    spec.choices.forEach(([id, label]) => {
      const choice = button(label, () => {
        choices.querySelectorAll("button").forEach((other) => other.classList.remove("is-correct", "is-wrong"));
        const why = card.querySelector(".why");
        if (id === item.answer) {
          choice.classList.add("is-correct");
          why.textContent = item.why;
          why.className = "why feedback good";
          answered.set(card, true);
        } else {
          choice.classList.add("is-wrong");
          why.textContent = item.miss;
          why.className = "why feedback bad";
          answered.set(card, false);
        }
        const correct = [...answered.values()].filter(Boolean).length;
        const done = spec.cards.every((entry) => answered.get(cardFor(entry)));
        status.className = done ? "feedback good" : "feedback";
        status.textContent = done ? spec.done : `${correct} of ${spec.cards.length} placed.`;
      }, "choice");
      choices.append(choice);
    });
    card.append(choices);
    card.append(el("p", "why feedback", ""));
    card.dataset.text = item.text;
    lab.append(card);
  });
  function cardFor(entry) {
    return [...lab.querySelectorAll(".sort-card")].find((card) => card.dataset.text === entry.text);
  }
  lab.append(status);
  wrap.append(lab);
  block.append(wrap);
  return block;
}

function orderSection(spec) {
  const block = el("section", "block");
  block.id = "order";
  const wrap = el("div", "wrap");
  wrap.append(el("h2", "", spec.title));
  if (spec.lede) wrap.append(el("p", "lede", spec.lede));
  const lab = el("div", "lab");
  const chosen = el("div", "chosen");
  const pool = el("div", "pool");
  const status = el("p", "feedback", "");
  let picked = [];
  let deck = shuffle(spec.steps);
  function paint() {
    pool.replaceChildren();
    deck.filter((step) => !picked.includes(step)).forEach((step) => {
      pool.append(button(step, () => {
        picked.push(step);
        status.textContent = "";
        paint();
      }, "step-btn"));
    });
    chosen.replaceChildren();
    if (!picked.length) chosen.append(el("p", "empty", "Click the steps in order."));
    picked.forEach((step, index) => {
      chosen.append(button(`${index + 1}. ${step}`, () => {
        picked = picked.filter((item) => item !== step);
        paint();
      }, "step-btn"));
    });
  }
  lab.append(chosen, pool);
  const actions = el("div", "row-actions");
  actions.append(button("Check order", () => {
    if (picked.length !== spec.steps.length) {
      show(status, "Place every step first.", false);
      return;
    }
    const wrong = spec.steps.findIndex((step, index) => step !== picked[index]);
    if (wrong === -1) show(status, spec.done);
    else show(status, `Step ${wrong + 1} should be: ${spec.steps[wrong]}`, false);
  }));
  actions.append(button("Reset", () => {
    picked = [];
    deck = shuffle(spec.steps);
    status.textContent = "";
    paint();
  }, "btn small ghost"));
  lab.append(actions, status);
  wrap.append(lab);
  block.append(wrap);
  paint();
  return block;
}

function practice(topic) {
  const block = el("section", "block");
  block.id = "practice";
  const wrap = el("div", "wrap");
  const head = el("div", "section-head");
  head.append(el("p", "kicker", "Quick check"));
  head.append(el("h2", "", "Choose an answer"));
  head.append(el("p", "lede", "The explanation appears as soon as you choose. This is revision, not an official paper."));
  wrap.append(head);
  const score = el("strong", "", `0 / ${topic.mcqs.length}`);
  let correct = 0;
  topic.mcqs.forEach((item, index) => {
    const card = el("article", "q");
    card.append(el("h3", "", `${index + 1}. ${item.q}`));
    const options = el("div", "stack");
    item.options.forEach((option, optionIndex) => {
      options.append(button(option, () => {
        const right = optionIndex === item.answer;
        options.querySelectorAll("button").forEach((other) => { other.disabled = true; });
        options.children[optionIndex].classList.add(right ? "is-correct" : "is-wrong");
        if (!right) options.children[item.answer].classList.add("is-correct");
        else correct += 1;
        card.append(el("p", right ? "feedback good" : "feedback", item.why));
        score.textContent = `${correct} / ${topic.mcqs.length}`;
      }, "opt"));
    });
    card.append(options);
    wrap.append(card);
  });
  const board = el("div", "scoreboard");
  const cell = el("div");
  cell.append(el("span", "", "Score"), score);
  board.append(cell);
  wrap.append(board);
  block.append(wrap);
  return block;
}

function review(topic) {
  const block = el("section", "block");
  block.id = "review";
  const wrap = el("div", "wrap");
  wrap.append(el("p", "kicker", "Review"));
  wrap.append(el("h2", "", "Leave the topic able to say these"));
  const list = el("div", "check-list");
  const key = `igcse-${topic.id}-checklist`;
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(key) || "[]"); } catch { saved = []; }
  const known = new Set(saved);
  const boxes = [];
  topic.checks.forEach((text, index) => {
    const label = el("label");
    const box = el("input");
    box.type = "checkbox";
    box.id = `check-${topic.id}-${index}`;
    box.name = box.id;
    box.value = String(index);
    box.checked = known.has(String(index));
    label.append(box, document.createTextNode(` ${text}`));
    list.append(label);
    boxes.push(box);
  });
  const count = el("span", "chip", "");
  function paint() {
    const on = boxes.filter((box) => box.checked).map((box) => box.value);
    try { localStorage.setItem(key, JSON.stringify(on)); } catch { /* ignore blocked storage */ }
    count.textContent = `${on.length} / ${boxes.length}`;
  }
  boxes.forEach((box) => box.addEventListener("change", paint));
  const actions = el("div", "row-actions");
  actions.append(count);
  actions.append(button("Clear ticks", () => {
    boxes.forEach((box) => { box.checked = false; });
    paint();
  }, "btn small ghost"));
  wrap.append(list, actions);
  block.append(wrap);
  paint();
  return block;
}

function watchNav() {
  const links = [...document.querySelectorAll(".nav a")].filter((link) => link.getAttribute("href")?.startsWith("#"));
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if (!sections.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === id));
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });
  sections.forEach((section) => observer.observe(section));
}
