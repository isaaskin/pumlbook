<div align="center">

# 📘 PumlBook

**A premium, open-source PlantUML editor**

Write, preview, and save UML diagrams — all in the browser.

[![MIT License](https://img.shields.io/badge/License-MIT-00f2ff.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)
[![Version](https://img.shields.io/badge/version-1.0.0-00f2ff.svg?style=flat-square)](#)
[![Deploy](https://img.shields.io/github/actions/workflow/status/isaaskin/pumlbook/main.yml?style=flat-square&label=deploy&color=00f2ff)](https://github.com/isaaskin/pumlbook/actions)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| ⚡ **Auto-Render** | Diagrams update automatically as you type |
| 🎨 **Syntax Highlighting** | Full PlantUML language support with Dracula-inspired colors |
| 📂 **Project Management** | Save, load, rename, and delete projects — stored in localStorage |
| 🧩 **Snippet Templates** | 9 built-in templates: Sequence, Class, Activity, ER, Gantt, Mind Map, and more |
| 🎭 **Theme Switcher** | 8 PlantUML themes: Cerulean, Mars, Hacker, Blueprint, Sketchy, Materia, Superhero |
| 📥 **Multi-Format Export** | Download as `.puml`, `.svg`, or `.png` |
| ⌨️ **Keyboard Shortcuts** | Quick Save, Run, Save As — all from the keyboard |
| 💥 **Power Mode** | Particle explosions on every keystroke |
| 🎹 **ASMR Typing** | Satisfying synth sounds while you type |
| 👾 **Matrix Rain** | Because why not |
| 📱 **Responsive** | Fully responsive with a mobile hamburger menu |
| 🔒 **Privacy-First** | All data stays in your browser. No accounts. No tracking. |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/isaaskin/pumlbook.git
cd pumlbook

# Install dependencies
npm install

# Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to start diagramming.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+S` / `⌘S` | Quick Save |
| `Ctrl+Enter` / `⌘Enter` | Run Diagram |
| `Ctrl+Shift+S` / `⌘⇧S` | Save As... |
| `?` | Show shortcuts help |

## 🛠 Tech Stack

- **React 18** — UI framework
- **Redux Toolkit** — State management
- **CodeMirror 6** — Code editor with custom PlantUML language mode
- **PlantUML Server** — Remote rendering via `plantuml.com/plantuml`

## 📦 Building for Production

```bash
npm run build
```

The output is in the `build/` directory, ready to be deployed to any static hosting.

## 🌐 Deployment

This project auto-deploys to **GitHub Pages** on every push to `main` via GitHub Actions.

To deploy your own fork:
1. Go to **Settings → Pages** in your GitHub repo
2. Set **Source** to "GitHub Actions"
3. Push to `main` — the workflow handles the rest

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/cool-thing`)
3. Commit your changes (`git commit -m 'Add cool thing'`)
4. Push to the branch (`git push origin feature/cool-thing`)
5. Open a Pull Request

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/) © isaaskin
