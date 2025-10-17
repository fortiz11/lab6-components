import { getBotResponse } from "../eliza.js";

class ChatInterface extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = ` <style>
:host {
  --panel: #ffffff;
  --bot: #e5e7eb;
  --user:  rgb(31, 146, 247);
  --text: black;
  --radius: 16px;
  font-family: system-ui, sans-serif, monospace;
  align-items: center;
}


.chat-interface {
  width: 500px;
  height: 600px;
  background: var(--panel);
  border-radius: var(--radius);
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  overflow: hidden;
  display: flex;                 
  flex-direction: column;        
}

.chat-header {
  background: var(--user);
  color: #fff;
  text-align: center;
  padding: 50px;
}
.chat-header h1 {
  margin: 0;                     
  font-size: 2rem;         
}
.sub-title { 
font-size: .9rem; 
opacity: .85; 
margin-top: 20px; 
}


.messages {
  flex: 1;                       
  overflow-y: auto;              
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
display:flex;
 align-items:flex-end; 
 width:100%;
  }
.message-bot { 
display:flex; 
justify-content:flex-start; width:100%; 
}

.user { 
display:flex; 
justify-content:flex-end; 
width:100%; 
}

.bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: var(--radius);
  line-height: 1.4;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  word-wrap: break-word;
  overflow-wrap: anywhere;
}
.message-bot .bubble { 
background-color: var(--bot); 
color: var(--text); 
border-bottom-left-radius: 4px; 
}
.user .bubble        
{ background: var(--user); 
 color: #fff; 
 border-bottom-right-radius: 4px;
  }

.input {
  display:flex;
  gap: 10px;
  padding: 12px 16px;
  background-color: #fff;
  border-top: 1px solid rgb(189, 186, 186);
  font-size: .95rem;
}
.input input {
  flex: 1;
  padding: 12px;
  border: 1px solid rgb(189, 186, 186);
  border-radius: 20px;
  font-size: .95rem;
}
.input button {
  background: rgb(189, 186, 186);      
  color: #fff;
  border-radius: 20px;
  border: none;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
}
  </style>
  <div class="chat-interface">
  <!-- Header -->
  <div class="chat-header">
    <h1>Chat Assistant</h1>
    <div class="sub-title">Approach 3: Web Component (Shadow DOM)</div>
  </div>

  <!-- Message area -->
  <section class="messages">
    <div class="message-bot">
      
    </div>
  </section>

  <!-- Input form -->
  <form class="input">
    <input
      class="user-input"
      type="text"
      placeholder="Type a message..."
      autocomplete="off"
    />
    <button id="send-button" type="submit">Send</button>
  </form>
</div>
    `;
  }

  connectedCallback() {
    this.$messages = this.shadowRoot.querySelector(".messages");
    this.$form = this.shadowRoot.querySelector("form.input");
    this.$input = this.shadowRoot.querySelector(".user-input");

    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.sendMessage();
    });

    this.$input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    this.addMessage("Chat ready — type something!", false);
  }

  addMessage(text, isUser = false) {
    const row = document.createElement("div");
    row.className = isUser ? "user" : "message-bot";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    row.appendChild(bubble);
    this.$messages.appendChild(row);
    this.$messages.scrollTop = this.$messages.scrollHeight;
  }

  sendMessage() {
    const text = this.$input.value.trim();
    if (!text) return;

    this.addMessage(text, true);
    this.$input.value = "";
    this.$input.focus();

    setTimeout(() => {
      const reply = getBotResponse(text);
      this.addMessage(reply, false);
    }, 250);
  }
}

customElements.define("chat-interface", ChatInterface);
