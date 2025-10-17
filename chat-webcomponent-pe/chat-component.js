import { getBotResponse } from "../eliza.js";

class SimpleChat extends HTMLElement {
  connectedCallback() {
    this.messages = this.querySelector(".messages");
    this.input = this.querySelector(".user-input");
    this.button = this.querySelector("#send-button");
    this.form = this.querySelector("form.input");

    if (!this.messages) this.messages = document.createElement("div");
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.sendMessage();
    });

    if (this.button) {
      this.button.addEventListener("click", (e) => {
        e.preventDefault();
        this.sendMessage();
      });
    }

    if (this.input) {
      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    
  }

  addMessage(text, isUser = false) {
    const row = document.createElement("div");
    
    row.className = isUser ? "message user" : "message message-bot";
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    row.appendChild(bubble);
    this.messages.appendChild(row);

    this.messages.scrollTop = this.messages.scrollHeight;
  }

  sendMessage() {
    const text = this.input && this.input.value ? this.input.value.trim() : "";
    if (!text) return;

    this.addMessage(text, true);
    if (this.input) {
      this.input.value = "";
      this.input.focus();
    }

    setTimeout(() => {
      const reply = getBotResponse(text);
      this.addMessage(reply, false);
    }, 250);
  }
}

customElements.define("simple-chat", SimpleChat);
