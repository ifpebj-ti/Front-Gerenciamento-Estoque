/* eslint-disable */

const fs = require("fs");
const path = require("path");

// Caminho para o arquivo coverage-final.json
const coveragePath = path.resolve(__dirname, "./coverage/coverage-final.json");
const badgePath = path.resolve(__dirname, "./badges/coverage.svg");

if (!fs.existsSync(coveragePath)) {
  console.error("Erro: Arquivo coverage-final.json não encontrado.");
  process.exit(1);
}

// Lê e processa o coverage-final.json
const coverageData = JSON.parse(fs.readFileSync(coveragePath, "utf-8"));
let totalStatements = 0;
let coveredStatements = 0;

// Itera sobre os dados de cobertura
for (const file in coverageData) {
  const fileCoverage = coverageData[file];
  const statements = fileCoverage.s || {};

  totalStatements += Object.keys(statements).length;
  coveredStatements += Object.values(statements).filter((s) => s > 0).length;
}

// Calcula a porcentagem total de cobertura
const coveragePercentage = (coveredStatements / totalStatements) * 100;
const coverageText = `${coveragePercentage.toFixed(2)}%`;

// Gera o conteúdo do badge em SVG
const badgeSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20" role="img" aria-label="coverage: ${coverageText}">
  <linearGradient id="b" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="a">
    <rect width="120" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#a)">
    <rect width="70" height="20" fill="#555"/>
    <rect x="70" width="50" height="20" fill="${
      coveragePercentage >= 80
        ? "#4c1"
        : coveragePercentage >= 50
        ? "#dfb317"
        : "#e05d44"
    }"/>
    <rect width="120" height="20" fill="url(#b)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
    <text x="35" y="15" fill="#010101" fill-opacity=".3">coverage</text>
    <text x="35" y="14">coverage</text>
    <text x="95" y="15" fill="#010101" fill-opacity=".3">${coverageText}</text>
    <text x="95" y="14">${coverageText}</text>
  </g>
</svg>
`;

// Cria a pasta "badges" caso não exista
if (!fs.existsSync(path.dirname(badgePath))) {
  fs.mkdirSync(path.dirname(badgePath), { recursive: true });
}

// Salva o arquivo SVG
fs.writeFileSync(badgePath, badgeSVG);
console.log(`Badge gerado com sucesso em: ${badgePath}`);
