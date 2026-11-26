# Changelog

## [1.3.0] - 2026-11-26

### Adicionado
- Pré-renderização estática completa no build (`src/entry-server.tsx` + hidratação em `src/main.tsx`), injetando 100% do HTML semântico renderizado em `dist/index.html` e em `clickmax/jatoba-expedicoes-clickmax.html` (visível e editável nativamente no editor visual / clonador de URL do **Clickmax**, com fallback Vanilla JS, dados estruturados Schema.org `TravelAgency`, OpenGraph e botão flutuante de cotação rápida).
