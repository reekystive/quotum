<!-- markdownlint-disable MD036 -->

# Quotum

**A comprehensive platform for capturing, managing, and sharing text quotes from the web**

Quotum is a full-stack application that enables users to save meaningful text snippets from any webpage with precise location anchors, making it easy to revisit and share exactly what caught their attention.

## 🏗️ Architecture

This monorepo contains multiple interconnected applications:

### **🔌 Chrome Extension** (`apps/app-quotum-extension`)

A powerful browser extension that captures text quotes directly from any webpage with precise text fragment anchors.

### **🌐 Web Application** (`apps/app-quotum-web`)

A Next.js web platform for viewing, managing, and organizing saved quotes with a clean, responsive interface.

### **⚡ Backend Server** (`apps/app-quotum-server`)

A tRPC-based API server with database integration for quote management and user data.

### **📚 Component Library** (`apps/app-storybook`)

Storybook development environment for building and testing UI components.

## ✨ Key Features

### **Precise Text Capture**

- Browser extension captures exact text selections with location anchors
- Advanced text fragment technology for accurate source linking
- Works seamlessly across all HTTPS websites

### **Smart Quote Management**

- Automatic page title and URL capture
- Organized quote collections with search and filtering
- Cross-device synchronization through web platform

### **Developer-Friendly Architecture**

- Modern TypeScript/React stack with full type safety
- tRPC for end-to-end type-safe APIs
- Comprehensive testing with Vitest and Playwright
- Monorepo structure with pnpm workspaces

### **Flexible Deployment**

- Multiple environment support (production, development, local)
- Cloudflare Pages deployment for web app
- Chrome Web Store distribution for extension

## 🚀 Getting Started

### Prerequisites

- Node.js 22.15.0
- pnpm 10.12.4 (using Corepack)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd quotum

# Install dependencies
pnpm install

# Build all packages
pnpm run build:tsc:packages
```

### Development

```bash
# Start development servers
pnpm --filter app-quotum-web dev
pnpm --filter app-quotum-extension dev
pnpm --filter app-quotum-server dev
```

### Testing

```bash
# Run all tests
pnpm run test:packages

# Run linting
pnpm run lint:all
```

## 📦 Applications

### Chrome Extension

- **Location**: `apps/app-quotum-extension`
- **Purpose**: Browser extension for capturing quotes
- **Tech Stack**: React, TypeScript, Chrome Extension APIs
- **Key Features**: Context menus, text selection, secure storage

### Web Application

- **Location**: `apps/app-quotum-web`
- **Purpose**: Quote management and viewing platform
- **Tech Stack**: Next.js, React, Tailwind CSS, tRPC
- **Key Features**: Responsive design, quote collections, search

### Backend Server

- **Location**: `apps/app-quotum-server`
- **Purpose**: API and data management
- **Tech Stack**: tRPC, Drizzle ORM, TypeScript
- **Key Features**: Quote CRUD, user management, database schema

## 🛠️ Tech Stack

- **Frontend**: React 19, Next.js, TypeScript 5.8
- **Backend**: tRPC, Drizzle ORM
- **Styling**: Tailwind CSS 4.0
- **Build**: Vite 6, ESBuild
- **Testing**: Vitest, Playwright
- **Package Management**: pnpm with workspaces
- **Deployment**: Cloudflare Pages, Chrome Web Store

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`pnpm run lint:all && pnpm run test:packages`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

_Built with modern web technologies for the knowledge-sharing community_ 🎯
