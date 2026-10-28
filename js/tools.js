export function denaryToBinary(value, width) {
  const n = mustInteger(value, 0, 65535);
  const raw = n.toString(2);
  if (!width) return raw;
  if (n >= 2 ** width) {
    return { bits: raw.slice(-width).padStart(width, "0"), overflow: true, raw };
  }
  return { bits: raw.padStart(width, "0"), overflow: false, raw };
}

export function binaryToDenary(bits) {
  const clean = cleanBinary(bits, 16);
  return parseInt(clean, 2);
}

export function denaryToHex(value) {
  return mustInteger(value, 0, 65535).toString(16).toUpperCase();
}

export function hexToDenary(hex) {
  const clean = cleanHex(hex);
  return parseInt(clean, 16);
}

export function hexToBinary(hex) {
  return [...cleanHex(hex)].map((digit) => parseInt(digit, 16).toString(2).padStart(4, "0")).join("");
}

export function binaryToHex(bits) {
  const clean = cleanBinary(bits, 16);
  const padded = clean.padStart(Math.ceil(clean.length / 4) * 4, "0");
  let hex = "";
  for (let i = 0; i < padded.length; i += 4) hex += parseInt(padded.slice(i, i + 4), 2).toString(16).toUpperCase();
  return hex;
}

export function addEightBit(left, right) {
  const a = parseInt(cleanBinary(left, 8, true), 2);
  const b = parseInt(cleanBinary(right, 8, true), 2);
  const sum = a + b;
  return {
    sum,
    stored: (sum & 255).toString(2).padStart(8, "0"),
    overflow: sum > 255,
  };
}

export function logicalShift(bits, direction, places) {
  let value = cleanBinary(bits, 8, true);
  const steps = mustInteger(places, 1, 8);
  let lost = "";
  for (let i = 0; i < steps; i += 1) {
    if (direction === "left") {
      lost += value[0];
      value = `${value.slice(1)}0`;
    } else if (direction === "right") {
      lost = value[7] + lost;
      value = `0${value.slice(0, 7)}`;
    } else {
      throw new Error("Choose a left or a right shift.");
    }
  }
  return { bits: value, lost, denary: parseInt(value, 2) };
}

export function toTwosComplement(value) {
  const n = mustInteger(value, -128, 127);
  return ((n + 256) % 256).toString(2).padStart(8, "0");
}

export function fromTwosComplement(bits) {
  const clean = cleanBinary(bits, 8, true);
  const magnitude = parseInt(clean, 2);
  return clean[0] === "1" ? magnitude - 256 : magnitude;
}

export function colourCount(depth) {
  const bits = mustInteger(depth, 1, 24);
  return 2 ** bits;
}

export function imageFileBits(width, height, depth) {
  const pixels = mustInteger(width, 1, 100000) * mustInteger(height, 1, 100000);
  return pixels * mustInteger(depth, 1, 32);
}

export function soundFileBits(sampleRate, resolution, seconds, channels = 1) {
  return mustInteger(sampleRate, 1, 200000)
    * mustInteger(resolution, 1, 32)
    * mustNumber(seconds, 0.01, 100000)
    * mustInteger(channels, 1, 8);
}

export function fromBits(bits, unit) {
  const bytes = bits / 8;
  const scale = { B: 1, KiB: 1024, MiB: 1024 ** 2, GiB: 1024 ** 3 };
  if (!Object.prototype.hasOwnProperty.call(scale, unit)) throw new Error("Choose B, KiB, MiB or GiB.");
  return bytes / scale[unit];
}

export function rleEncode(text) {
  const source = String(text ?? "");
  if (!source) throw new Error("Type a short string to compress.");
  const runs = [];
  let current = source[0];
  let count = 1;
  for (let i = 1; i < source.length; i += 1) {
    if (source[i] === current) count += 1;
    else {
      runs.push([count, current]);
      current = source[i];
      count = 1;
    }
  }
  runs.push([count, current]);
  return runs;
}

export function rleDecode(runs) {
  return runs.map(([count, character]) => character.repeat(count)).join("");
}

export function parityBit(data, kind) {
  const clean = cleanBinary(data, 7, true);
  const ones = [...clean].filter((bit) => bit === "1").length;
  if (kind === "even") return ones % 2 === 0 ? "0" : "1";
  if (kind === "odd") return ones % 2 === 0 ? "1" : "0";
  throw new Error("Choose even or odd parity.");
}

export function parityHolds(byte, kind) {
  const clean = cleanBinary(byte, 8, true);
  const ones = [...clean].filter((bit) => bit === "1").length;
  if (kind === "even") return ones % 2 === 0;
  if (kind === "odd") return ones % 2 === 1;
  throw new Error("Choose even or odd parity.");
}

export function checksum(values) {
  return values.reduce((sum, value) => sum + mustInteger(value, 0, 255), 0);
}

export function makeCheckDigit(digits) {
  const clean = cleanDigits(digits);
  const sum = [...clean].reduce((total, digit) => total + Number(digit), 0);
  return String((10 - (sum % 10)) % 10);
}

export function checkDigitHolds(digits) {
  const clean = cleanDigits(digits);
  const sum = [...clean].reduce((total, digit) => total + Number(digit), 0);
  return sum % 10 === 0;
}

export function gateOutput(name, a, b = 0) {
  const left = bit(a);
  const right = bit(b);
  switch (String(name).toUpperCase()) {
    case "NOT": return left ? 0 : 1;
    case "AND": return left && right ? 1 : 0;
    case "OR": return left || right ? 1 : 0;
    case "NAND": return left && right ? 0 : 1;
    case "NOR": return left || right ? 0 : 1;
    case "XOR": return left === right ? 0 : 1;
    default: throw new Error("Unknown gate.");
  }
}

export function truthTable(name) {
  const gate = String(name).toUpperCase();
  if (gate === "NOT") return [0, 1].map((a) => ({ a, out: gateOutput(gate, a) }));
  const rows = [];
  for (const a of [0, 1]) {
    for (const b of [0, 1]) rows.push({ a, b, out: gateOutput(gate, a, b) });
  }
  return rows;
}

export const STUDENTS = [
  { StudentID: 1, Name: "Amina", Initial: "A", Class: "10A", Mark: 78, Height: 1.6, FeePaid: true, DateJoined: "2024-09-03" },
  { StudentID: 2, Name: "Ben", Initial: "B", Class: "10B", Mark: 64, Height: 1.8, FeePaid: false, DateJoined: "2025-01-12" },
  { StudentID: 3, Name: "Chen", Initial: "C", Class: "10A", Mark: 91, Height: 1.5, FeePaid: true, DateJoined: "2024-09-03" },
  { StudentID: 4, Name: "Dia", Initial: "D", Class: "10B", Mark: 55, Height: 1.7, FeePaid: false, DateJoined: "2023-09-01" },
];

export function runQuery(sql, rows = STUDENTS) {
  const text = String(sql ?? "").trim().replace(/;$/, "");
  const match = text.match(/^select\s+(.+?)\s+from\s+students(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+([a-z]+)(?:\s+(asc|desc|ascending|descending))?)?$/i);
  if (!match) throw new Error("Use SELECT ... FROM Students, with an optional WHERE and ORDER BY.");
  const selected = match[1].trim();
  const where = match[2]?.trim();
  const orderField = match[3];
  const orderWord = (match[4] || "ASC").toUpperCase();
  let result = rows.filter((row) => !where || matchesWhere(row, where));
  const aggregate = selected.match(/^(sum|count)\s*\(\s*(\*|[a-z]+)\s*\)$/i);
  if (aggregate) {
    const fn = aggregate[1].toUpperCase();
    const column = aggregate[2];
    if (fn === "COUNT") return [{ Result: result.length }];
    const values = result.map((row) => readField(row, column));
    if (values.some((value) => typeof value !== "number" || !Number.isFinite(value))) throw new Error("SUM needs a numeric field.");
    const total = values.reduce((sum, value) => sum + value, 0);
    return [{ Result: Math.round((total + Number.EPSILON) * 1000) / 1000 }];
  }
  if (orderField) {
    const direction = orderWord.startsWith("DESC") ? -1 : 1;
    result = [...result].sort((left, right) => compare(readField(left, orderField), readField(right, orderField)) * direction);
  }
  if (selected === "*") return result.map((row) => ({ ...row }));
  const columns = selected.split(",").map((column) => column.trim()).filter(Boolean);
  if (!columns.length) throw new Error("Name at least one field.");
  return result.map((row) => {
    const next = {};
    columns.forEach((column) => {
      const { key, value } = readFieldEntry(row, column);
      next[key] = value;
    });
    return next;
  });
}

function matchesWhere(row, where) {
  const parts = where.split(/\s+(and|or)\s+/i);
  if (parts.length === 1) return compareClause(row, parts[0]);
  if (parts.length !== 3) throw new Error("Use one condition, or two conditions joined by AND or OR.");
  const left = compareClause(row, parts[0]);
  const right = compareClause(row, parts[2]);
  return parts[1].toLowerCase() === "and" ? left && right : left || right;
}

function compareClause(row, clause) {
  const match = clause.trim().match(/^([a-z]+)\s*(<>|<=|>=|=|<|>)\s*(?:'([^']*)'|(true|false)|(\d+(?:\.\d+)?))$/i);
  if (!match) throw new Error("A condition looks like Mark > 70, Height > 1.6, FeePaid = FALSE or DateJoined >= '2024-09-01'.");
  const actual = readField(row, match[1]);
  const op = match[2];
  const expected = match[3] !== undefined ? match[3] : match[4] !== undefined ? match[4].toUpperCase() === "TRUE" : Number(match[5]);
  if (typeof actual === "boolean" || typeof expected === "boolean") {
    if (typeof actual !== "boolean" || typeof expected !== "boolean") throw new Error("Compare a Boolean field with TRUE or FALSE.");
    if (op !== "=" && op !== "<>") throw new Error("Boolean fields can be compared with = or <>.");
    return op === "=" ? actual === expected : actual !== expected;
  }
  if (typeof actual === "number" || typeof expected === "number") {
    const left = Number(actual);
    const right = Number(expected);
    if (!Number.isFinite(left) || !Number.isFinite(right)) throw new Error("That comparison needs two numbers.");
    if (op === "=") return left === right;
    if (op === "<>") return left !== right;
    if (op === "<") return left < right;
    if (op === ">") return left > right;
    if (op === "<=") return left <= right;
    return left >= right;
  }
  const left = String(actual);
  const right = String(expected);
  if (op === "=") return left === right;
  if (op === "<>") return left !== right;
  if (op === "<") return left < right;
  if (op === ">") return left > right;
  if (op === "<=") return left <= right;
  return left >= right;
}

function readField(row, name) {
  return readFieldEntry(row, name).value;
}

function readFieldEntry(row, name) {
  const key = Object.keys(row).find((field) => field.toLowerCase() === String(name).toLowerCase());
  if (!key) throw new Error(`There is no field called ${name}.`);
  return { key, value: row[key] };
}

function compare(left, right) {
  if (typeof left === "boolean" && typeof right === "boolean") return Number(left) - Number(right);
  if (typeof left === "number" && typeof right === "number") return left - right;
  return String(left).localeCompare(String(right));
}

function mustInteger(value, min, max) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) throw new Error(`Enter a whole number from ${min} to ${max}.`);
  return n;
}

function mustNumber(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < min || n > max) throw new Error(`Enter a number from ${min} to ${max}.`);
  return n;
}

function cleanBinary(bits, maxLength, exact = false) {
  const clean = String(bits ?? "").replace(/\s/g, "");
  if (!/^[01]+$/.test(clean)) throw new Error("Binary uses only 0 and 1.");
  if (exact && clean.length !== maxLength) throw new Error(`Enter exactly ${maxLength} bits.`);
  if (clean.length > maxLength) throw new Error(`Use at most ${maxLength} bits.`);
  return clean;
}

function cleanHex(hex) {
  const clean = String(hex ?? "").replace(/\s/g, "");
  if (!/^[0-9A-Fa-f]+$/.test(clean) || clean.length > 4) throw new Error("Hexadecimal uses 0–9 and A–F, up to four digits.");
  return clean.toUpperCase();
}

function cleanDigits(digits) {
  const clean = String(digits ?? "").replace(/\s/g, "");
  if (!/^\d+$/.test(clean)) throw new Error("Use digits only.");
  return clean;
}

function bit(value) {
  const n = Number(value);
  if (n !== 0 && n !== 1) throw new Error("A gate input is 0 or 1.");
  return n;
}
