# Todo App

A modern todo application built with React, TypeScript, and Vite.

---

## Prerequisites

- Node.js: `v22.13.0` (Specified in .nvmrc)
- pnpm (recommended package manager)

If you're using nvm, run:

```bash
nvm use
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/rmidhunk/todo-app.git
cd todo-app
cp .env.example .env
```

2. Install dependencies:

```bash
pnpm install
```

## Available Scripts

### Development Server

Start the development server:

```bash
pnpm dev
```

### JSON Server

Start the mock api server:

```bash
pnpx json-server api.json
```

### Testing

Run unit tests:

```bash
pnpm test
```

### Build

Create a production build:

```bash
pnpm build
```
