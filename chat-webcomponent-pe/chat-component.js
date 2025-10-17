import { getBotResponse } from "../eliza.js";

class SimpleChat extends HTMLElement {
  /* Called automatically when <simple-chat> is added to the DOM.
     This is where event listeners are attached and behavior is initialized.*/
  connectedCallback() {
    /* References to the children within simplechat tag */
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
  /*Creates and appends chat bubble to the message container*/
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
  /*Handles the user sending message and then getting a bot reply*/
  sendMessage() {
    const text = this.input && this.input.value ? this.input.value.trim() : "";
    if (!text) return;

    this.addMessage(text, true);
    if (this.input) {
      this.input.value = "";
      this.input.focus();
    }
    /*Slight delay in bot response*/
    setTimeout(() => {
      const reply = getBotResponse(text);
      this.addMessage(reply, false);
    }, 250);
  }
}

customElements.define("simple-chat", SimpleChat);
