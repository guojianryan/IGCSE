import { partA } from "./content/part-a.js";
import { partB } from "./content/part-b.js";
import { partC } from "./content/part-c.js";

export const topics = { ...partA, ...partB, ...partC };

export const catalogue = [
  ["1.1", "Number systems", "1-1-number-systems.html"],
  ["1.2", "Text, sound and images", "1-2-text-sound-images.html"],
  ["1.3", "Data storage and compression", "1-3-data-storage-compression.html"],
  ["2.1", "Types and methods of data transmission", "2-1-data-transmission.html"],
  ["2.2", "Methods of error detection", "2-2-error-detection.html"],
  ["2.3", "Encryption", "2-3-encryption.html"],
  ["3.1", "Computer architecture", "3-1-computer-architecture.html"],
  ["3.2", "Input and output devices", "3-2-input-output.html"],
  ["3.3", "Data storage", "3-3-data-storage.html"],
  ["3.4", "Network hardware", "3-4-network-hardware.html"],
  ["4.1", "Types of software and interrupts", "4-1-software-interrupts.html"],
  ["4.2", "Programming languages, translators and IDEs", "4-2-languages-translators.html"],
  ["5.1", "The internet and the world wide web", "5-1-internet-and-web.html"],
  ["5.2", "Digital currency", "5-2-digital-currency.html"],
  ["5.3", "Cyber security", "5-3-cyber-security.html"],
  ["6.1", "Automated systems", "6-1-automated-systems.html"],
  ["6.2", "Robotics", "6-2-robotics.html"],
  ["6.3", "Artificial intelligence", "6-3-artificial-intelligence.html"],
  ["7", "Life cycle, decomposition, algorithms, validation and testing", "7-algorithms.html"],
  ["8.1", "Programming concepts", "8-1-programming-concepts.html"],
  ["8.2", "Arrays", "8-2-arrays.html"],
  ["8.3", "File handling", "8-3-file-handling.html"],
  ["9", "Single-table databases and SQL", "9-databases.html"],
  ["10", "Logic gates, circuits and truth tables", "10-boolean-logic.html"],
];
