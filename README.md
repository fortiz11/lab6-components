# 💬 Lab 6 – Component-Based Chat Interface

## 📘 Course Info
**COMP 305 — Fall 2025**  
**Instructor:** Prof. Powell  
**Student:** Francis Ortiz 

---

## 🎯 Learning Objectives
- Understand **component-based thinking** and modern web architecture patterns.  
- Mock up an interface using **pure HTML + CSS** before adding interactivity.  
- Rebuild the same chat feature using multiple approaches:
  1. DOM Manipulation  
  2. Progressive Enhancement  
  3. Shadow DOM Web Component  
- Compare trade-offs between complexity, reusability, and accessibility.  

---

## 🧩 Project Overview
This lab explores four ways to build the same **chat component** while emphasizing different front-end development principles.

| Folder | Approach | Description |
|:-------|:----------|:------------|
| `chat-prototype-html-css/` | **Static HTML & CSS** | Visual mock-up with no JS logic. |
| `chat-dom/` | **DOM Manipulation** | Interactive version using vanilla JS. |
| `chat-webcomponent-pe/` | **Progressive Enhancement Component** | Enhances base HTML without Shadow DOM. |
| `chat-webcomponent-gd/` | **Shadow DOM Component** | Fully encapsulated and reusable custom element. |

---

## 💻 Setup & Navigation
1. Clone or download this repository.  
2. Open the root `index.html` file in your browser.  
3. Use the main page navigation to view each version.

If hosted on **GitHub Pages**, visit:  
👉 [https://fortiz11.github.io/lab6-components/](https://fortiz11.github.io/lab6-components/)

---

## 🗂️ Main Index Page
The landing page (`index.html` + `main.css`) displays four responsive cards—each linking to one chat implementation.  
Every card includes:
- Approach summary  
- Key takeaways  
- **“View Demo →”** button linking to the folder’s `index.html`.

---

## 🤖 Chatbot Behavior
All functional versions import `eliza.js`, which generates responses based on simple keyword matching.

| Keyword | Response |
|:---------|:----------|
| `hello`, `hi` | Greeting |
| `help` | Helpful response |
| `who`, `what`, `where`, `when`, `why`, `how` | Question-style response |
| `bye`, `goodbye` | Farewell |
| *(default)* | Reflection (“Tell me more about that”) |

---

## 🧱 Approach Details

### 1️⃣ Pure HTML & CSS
- Static layout only (no JS).  
- Focus on semantic HTML and responsive CSS.  
- Used to design and test layout before adding logic.  

### 2️⃣ DOM Manipulation
- Adds interactivity via JavaScript.  
- Uses `querySelector`, `createElement`, `appendChild`.  
- Handles input, message sending, and bot replies.  
- Demonstrates direct DOM control but no encapsulation.  

### 3️⃣ Progressive Enhancement Component
- Custom element `<simple-chat>`.  
- JS enhances existing HTML structure only if available.  
- No Shadow DOM — styles remain global.  
- Graceful degradation: base markup still visible without JS.  

### 4️⃣ Shadow DOM Component
- Custom element `<chat-interface>`.  
- Uses `this.attachShadow({ mode: 'open' })` for full encapsulation.  
- Encapsulates markup, styles, and logic.  
- Most modular and reusable approach.  

---

## ⚖️ Comparative Reflection
| Criteria | DOM Manipulation | Progressive Enhancement | Shadow DOM |
|:----------|:----------------|:------------------------|:-----------|
| **Complexity** | Medium | Medium | High |
| **Encapsulation** | None | Partial | Full |
| **Reusability** | Low | Medium | High |
| **Accessibility** | JS required | Works without JS | JS required |
| **Maintainability** | Basic | Organized | Excellent |

---

## 💬 Personal Reflection
This lab clearly demonstrated how different architectural choices affect scalability and usability.  
Building the same chat UI four times highlighted that:
- **DOM Manipulation** is fast but can get messy in large projects.  
- **Progressive Enhancement** balances modern interactivity with accessibility.  
- **Shadow DOM Components** offer clean encapsulation and reusability—ideal for production apps.  

Understanding these trade-offs makes it easier to choose the right approach for different project scopes.

---

## 🧾 Credits
- **Chat logic:** `eliza.js` module provided by Prof. Powell.  
- **Implementation & styling:** Francis Ortiz  
- **Course:** COMP 305 — University of San Diego, Fall 2025.  

---

## 🪶 License
MIT License please see `LICENSE.md` for more details. 