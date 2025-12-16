# Playlist App – AQA Test Assignment

## Prerequisites:
- Node.js 18+ (recommended: latest LTS)
- npm

## Install
```bash
npm ci
```

## Install Playwright browsers (first run only):
```bash
npx playwright install
```

## Environment variables
Create local `.env` (it is ignored by git):
```bash
cp .env.example .env
```

## Set app base URL in `.env`:
```bash
BASE_URL=https://vite-react-alpha-lemon.vercel.app
```

## Run tests
Headless:
```bash
npm run test:headless
```

## Headed (visible browser):
```bash
npm run test:headed
```

## Playwright UI mode:
```bash
npm run test:ui
```

## Show HTML report:
```bash
npm run report
```

## Code quality
Lint:
```bash
npm run lint
```

## Format:
```bash
npm run format
```

## Check formatting:
```bash
npm run format:check
```
