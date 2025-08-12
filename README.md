TODO 开源

1. 删除环境变量，只保留 dev 和 prod, dev 和 prod 保持一致，敏感信息 VITE_GID 置空
2. 删除 package.json 中的命令，只保留 dev 和 prod 环境
3. 修改 dockerfile, 去除更换镜像源
4. 删除 index.html 中，网站站长配置信息，已添加注释

# iobscan-ibc-explorer

IBC Explorer Frontend

## Project Structure
```
├── Dockerfile
├── index.html
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
├── README.md
├── src
│   ├── api         // API requests
│   ├── assets      // Static assets
│   ├── components  // Shared components
│   ├── composables // Shared composables
│   ├── constants   // Constants
│   ├── directive   // Custom directives
│   ├── helper      // Helper functions
│   ├── layout      // Layout components
│   ├── router      // Vue router
│   ├── store       // Global state management
│   ├── theme       // Global CSS styles
│   ├── types       // TypeScript types
│   ├── utils       // Utility functions
│   ├── views       // Page components
│   └── main.ts     // Entry file
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

# Configure .env files and fill in environment variables

```
# Environment
MODE = ''

# Backend Service
VITE_BASE_GO_API = ''

# Logo icon
VITE_LOGO_ICON = ''

# Home url
VITE_HOME_URL = ''

# Title
VITE_TITLE = ''

# Favicon
VITE_FAVICON = '/favicon.ico'

# Google Analytics ID
VITE_GID = ''
```

## development

Step 1: Install dependencies

```
pnpm install
```

Step 2: Start development server, backend service URL can be modified in .env.development

```
pnpm dev
```

## production

Step 1: Install dependencies

```
pnpm install
```

Step 2: Build

```
pnpm build:prod
```

Step 3: Preview

```
pnpm preview
```

# Deploy

Build Docker Image

```
docker build . -t iobscan-web  --build-arg 'ENVIRONMENT=prod'
```
