# Solana Wallet Adapter dApp

A premium Web3 dApp built with React, TypeScript, and Solana wallet adapter. Features a multi-page architecture with stunning dark-themed UI, interactive animations, and real-time blockchain data.

![Web3 Dark Theme](https://img.shields.io/badge/Theme-Web3%20Dark-0a0a0a?style=for-the-badge&logo=solana&logoColor=00ffa3)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Bun](https://img.shields.io/badge/Bun-1.3-000000?style=for-the-badge&logo=bun)

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph Client["🖥️ Client Layer"]
        Browser["Browser"]
        subgraph ReactApp["⚛️ React Application"]
            Router["React Router"]
            Pages["Pages (/portfolio, /send, /sign)"]
            Components["Shared Components"]
            Hooks["Custom Hooks"]
        end
    end

    subgraph WalletLayer["🔐 Wallet Layer"]
        WalletAdapter["@solana/wallet-adapter"]
        WalletModal["Wallet Selection Modal"]
        Connection["Connection Provider"]
    end

    subgraph Blockchain["⛓️ Blockchain Layer"]
        SolanaRPC["Helius RPC Endpoint"]
        SolanaNet["Solana Mainnet"]
    end

    subgraph DataLayer["📊 Data Layer"]
        FreeImages["Free Image APIs"]
        Unsplash["Unsplash"]
        Pexels["Pexels"]
    end

    Browser --> ReactApp
    Router --> Pages
    Pages --> Components
    Components --> WalletAdapter
    WalletAdapter --> WalletModal
    WalletAdapter --> Connection
    Connection --> SolanaRPC
    SolanaRPC --> SolanaNet
    Components --> FreeImages
    FreeImages --> Unsplash
    FreeImages --> Pexels
```

---

## 📁 Component Architecture

```mermaid
flowchart TB
    subgraph AppEntry["🚀 Application Entry"]
        App["App.tsx"]
        Frontend["frontend.tsx"]
    end

    subgraph LayoutLayer["📐 Layout Layer"]
        Layout["Layout.tsx"]
        Background["Background.tsx"]
        Nav["Navigation"]
        WalletBtn["WalletButton"]
    end

    subgraph PagesLayer["📄 Page Layer"]
        Portfolio["Portfolio.tsx"]
        Send["Send.tsx"]
        Sign["Sign.tsx"]
    end

    subgraph UIShared["🎨 UI Components"]
        Button["Button.tsx"]
        Card["Card.tsx"]
        Input["Input.tsx"]
        Skeleton["Skeleton.tsx"]
    end

    subgraph LibLayer["📚 Utilities"]
        Utils["utils.ts"]
        UnsplashLib["unsplash.ts"]
    end

    Frontend --> App
    App --> Layout
    Layout --> Background
    Layout --> Nav
    Layout --> WalletBtn
    Layout --> PagesLayer
    
    Portfolio --> UIShared
    Send --> UIShared
    Sign --> UIShared
    
    Background --> UnsplashLib
    PagesLayer --> Utils
```

---

## 🔄 Data Flow Architecture

```mermaid
sequenceDiagram
    actor User
    participant UI as "UI Components"
    participant WA as "Wallet Adapter"
    participant RPC as "Helius RPC"
    participant Solana as "Solana Network"

    User->>UI: Connect Wallet
    UI->>WA: Request Connection
    WA->>User: Show Wallet Modal
    User->>WA: Select Wallet
    WA->>RPC: Authenticate
    RPC->>Solana: Verify
    Solana-->>RPC: Confirm
    RPC-->>WA: Connected
    WA-->>UI: PublicKey Available
    UI-->>User: Show Portfolio

    User->>UI: View Balance
    UI->>RPC: getBalance()
    RPC->>Solana: Query Account
    Solana-->>RPC: Lamports
    RPC-->>UI: SOL Balance
    UI-->>User: Display Balance

    User->>UI: Send SOL
    UI->>WA: Sign Transaction
    WA->>User: Approve
    WA->>RPC: Send Transaction
    RPC->>Solana: Process
    Solana-->>RPC: Confirmation
    RPC-->>UI: Success
    UI-->>User: Transaction Complete
```

---

## 🎭 Background Animation System

```mermaid
flowchart LR
    subgraph BackgroundSystem["🌌 Background System"]
        direction TB
        
        Layer1["1. Base Layer<br/>Deep Charcoal #0a0a0a"]
        Layer2["2. Gradient Orbs<br/>Animated Mesh Gradients"]
        Layer3["3. Image Slideshow<br/>Crossfade Every 8s"]
        Layer4["4. Noise Texture<br/>Animated Grain"]
        Layer5["5. Particle System<br/>50 Interactive Particles"]
        Layer6["6. Grid Overlay<br/>Subtle CSS Grid"]
        Layer7["7. Vignette<br/>Dark Edge Fade"]
    end

    Layer1 --> Layer2
    Layer2 --> Layer3
    Layer3 --> Layer4
    Layer4 --> Layer5
    Layer5 --> Layer6
    Layer6 --> Layer7
```

---

## 🧩 Component Details

### Layout System
| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `Layout.tsx` | App shell structure | Persistent nav, wallet button, background |
| `Background.tsx` | Animated background | 10 free images, particles, gradients |
| Navigation | Route links | Active state animation, hover glow |
| WalletButton | Connect/disconnect | shadcn/ui styling, adapter integration |

### Page Components
| Page | Functionality | Interactive Elements |
|------|---------------|---------------------|
| `Portfolio.tsx` | Dashboard view | Price chart, transaction history, live indicator |
| `Send.tsx` | Transfer SOL | Form validation, amount input, recipient field |
| `Sign.tsx` | Message signing | Textarea input, signature display |

### UI Components (shadcn/ui based)
```mermaid
graph LR
    subgraph UIVariants
        Button["Button Variants"]
        Primary["Primary"]
        Secondary["Secondary"]
        Ghost["Ghost"]
        Glow["Glow ✨"]
    end
    
    Button --> Primary
    Button --> Secondary
    Button --> Ghost
    Button --> Glow
    
    style Glow fill:#00ffa3,stroke:#fff,stroke-width:2px,color:#000
```

---

## 🎨 Visual Design System

```mermaid
flowchart TB
    subgraph DesignSystem["🎨 Design Tokens"]
        Colors["Color Palette"]
        Typography["Typography"]
        Spacing["Spacing Scale"]
        Effects["Effects"]
    end

    Colors --> Primary["Primary: #00ffa3<br/>Emerald Green"]
    Colors --> Secondary["Secondary: #a78bfa<br/>Violet"]
    Colors --> Background["Background: #0a0a0a<br/>Deep Charcoal"]
    Colors --> Surface["Surface: rgba(15,15,15,0.6)<br/>Glassmorphism"]
    
    Typography --> Font["Font: Inter<br/>Weights: 400,500,600,700"]
    
    Spacing --> Scale["4px base unit<br/>xs:4, sm:8, md:16, lg:24, xl:32"]
    
    Effects --> Glow["Box-shadow Glow<br/>0 0 40px rgba(16,185,129,0.1)"]
    Effects --> Blur["Backdrop Blur<br/>blur(12px)"]
    Effects --> Gradient["Gradient Border<br/>Animated rotation"]
```

---

## ⚡ State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Disconnected: App Load
    Disconnected --> Connecting: Click Connect
    Connecting --> Connected: Wallet Selected
    Connecting --> Disconnected: Cancel
    Connected --> Disconnected: Disconnect
    
    Connected --> Fetching: Load Data
    Fetching --> Loaded: Data Received
    Fetching --> Error: Request Failed
    Loaded --> Fetching: Refresh
    
    state Connected {
        [*] --> PortfolioView
        PortfolioView --> SendView: Navigate /send
        PortfolioView --> SignView: Navigate /sign
        SendView --> PortfolioView: Navigate /portfolio
        SignView --> PortfolioView: Navigate /portfolio
    }
```

---

## 🖼️ Image Architecture

```mermaid
flowchart LR
    subgraph Sources["Free Image Sources"]
        U["Unsplash<br/>7 curated images"]
        P["Pexels<br/>3 curated images"]
    end

    subgraph Categories["Image Categories"]
        Abstract["Abstract Fluid"]
        Geometric["Geometric Dark"]
        Cyber["Cyber Grid"]
        Space["Deep Space"]
    end

    subgraph Display["Display Pipeline"]
        Preload["Preload All"]
        Slideshow["8s Crossfade"]
        Filter["Grayscale +<br/>Contrast +<br/>Brightness"]
        Opacity["15% Opacity"]
    end

    U --> Categories
    P --> Categories
    Categories --> Preload
    Preload --> Slideshow
    Slideshow --> Filter
    Filter --> Opacity
```

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Runtime** | Bun 1.3 | Fast JS runtime, bundler, dev server |
| **Framework** | React 18 | UI library with hooks |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility classes |
| **UI** | shadcn/ui | Component primitives |
| **Animation** | Framer Motion | Page transitions, micro-interactions |
| **Blockchain** | @solana/web3.js | Solana interactions |
| **Wallet** | @solana/wallet-adapter | Wallet connection |
| **Icons** | Lucide React | Icon library |

---

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build ./src/index.html --outdir=dist --target=browser
```

### Environment Variables (Optional)
```bash
# For enhanced Unsplash features (not required - free images work without key)
BUN_PUBLIC_UNSPLASH_ACCESS_KEY=your_key_here
```

---

## 📱 Features

- ✅ Multi-page SPA with React Router
- ✅ 10 free background images (Unsplash + Pexels)
- ✅ Interactive particle system (50 particles, mouse-reactive)
- ✅ Animated mesh gradient orbs
- ✅ Live balance updates (30s refresh)
- ✅ Price chart visualization
- ✅ Transaction history mock
- ✅ Glassmorphism UI cards
- ✅ Gradient border animations
- ✅ Full wallet adapter integration
- ✅ TypeScript throughout

---

## 🔒 Security

- No private keys stored
- Wallet adapter handles all signing
- RPC calls via Helius (mainnet)
- No API keys required for images (free tier)

---

Built with ⚡ by the Web3 community
