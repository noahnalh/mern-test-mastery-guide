# 🧩 UI Component Library (Vite + React + TypeScript + Tailwind CSS)

A modular, scalable UI component system built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Includes dozens of reusable components such as buttons, dialogs, toasts, drawers, charts, and more—ready to use across your apps.

---

## 🗂️ File Structure

```
.
├── public/                  # Static assets (favicon, placeholder, robots.txt)
│
├── src/
│   ├── components/
│   │   ├── ui/              # All reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── ...
│   │   ├── CodeExamples.tsx
│   │   ├── DebugToolkit.tsx
│   │   └── TestDashboard.tsx
│   │
│   ├── hooks/              # Custom hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   │
│   ├── pages/              # Route-based pages
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   │
│   ├── App.tsx             # Root app component
│   ├── main.tsx            # Entry point
│   ├── App.css
│   ├── index.css
│   └── vite-env.d.ts
│
├── tailwind.config.ts      # Tailwind configuration
├── vite.config.ts          # Vite configuration
├── tsconfig*.json          # TypeScript configs
├── package.json            # Project dependencies & scripts
├── postcss.config.js
├── eslint.config.js
├── .gitignore
├── bun.lockb               # Bun lockfile (if using Bun)
└── README.md
```

---

## ✨ Features

- 🧱 40+ reusable UI components (e.g., Modal, Toast, Drawer, Tabs, Tooltip)
- 💡 Built with **TypeScript** and **React**
- ⚡ Lightning-fast dev server with **Vite**
- 🎨 Styled using **Tailwind CSS**
- 📦 Easy to extend, tree-shakeable components
- 🧪 Includes utility/test pages: `TestDashboard`, `CodeExamples`, and `DebugToolkit`
- 🔁 Custom hooks (`use-mobile`, `use-toast`)
- 📁 Modular structure for pages, components, hooks, and libs

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/noahnalh/mern-test-mastery-guide.git
cd mern-test-mastery-guide
```

### 2. Install Dependencies

If you're using **Bun**:

```bash
bun install
```

Or if you're using **npm**:

```bash
npm install
```

### 3. Run the Dev Server

```bash
bun run dev
# or
npm run dev
```

Visit `http://localhost:5173` to view the app.

---

## 🧪 Development Notes

- All reusable components live in `src/components/ui/`
- Custom hooks go in `src/hooks/`
- Use `TestDashboard.tsx` to preview layouts/components
- Toasts are built using `use-toast.ts` and `sonner.tsx`
- Tailwind config is fully extendable via `tailwind.config.ts`

---

## 📦 Build for Production

```bash
bun run build
# or
npm run build
```

---

## 🔍 Linting & Formatting

```bash
bun run lint
# or
npm run lint
```

---

## 🧩 Component Highlight

Some of the components included:

- `Button`, `Switch`, `Checkbox`, `Select`, `Toast`
- `Drawer`, `Dialog`, `Tooltip`, `Accordion`, `Tabs`
- `Chart`, `Carousel`, `Calendar`, `Avatar`, `Card`
- `Sidebar`, `Sheet`, `HoverCard`, `Command`, `Progress`

---


## 👨‍💻 Author

[Noah] – contributions, suggestions, and issues welcome!

