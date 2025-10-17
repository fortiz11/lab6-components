import { getBotResponse } from "../eliza.js";

/*Debug Flag */
const DEBUG = false;
const log = (msg) => {
  if (DEBUG) console.log(msg);
};

/* Displays a Eliza Response message in chat window. Called by
proccessMesssage() after bot's reply */
function showResponse(response) {
  addToChatWindow(response, "Bot");
}

/* Get a bot reply string using the imported Eliza logic */
function getResponse(message) {
  return getBotResponse(message);
}

/* Central logic that sends the user’s message through Eliza
   and displays the resulting bot response. */
function processMessage(message) {
  const response = getResponse(message);
  showResponse(response);
}

/* Creates and appends a chat bubble element
   to the chat window. Handles both user and bot messages. */
function addToChatWindow(message, speaker) {
  const chatWindow = document.getElementById("messages");
  if (!chatWindow) return;

  /* Create wrapper for message bubble */
  const row = document.createElement("div");
  row.className = speaker === "User" ? "user" : "message-bot";

  /* creates the bubble in the interface */
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = message;

  /* appends the bubble inside the wrapper */
  row.appendChild(bubble);
  chatWindow.appendChild(row);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/*Triggered when the user presses "Send" or hits Enter. */
function send() {
  const inputEl =
    document.getElementById("chat-input") ||
    document.querySelector("input.user-input");
  if (!inputEl) return;

  const message = inputEl.value.trim();
  if (!message) return;

  inputEl.value = "";

  /*For the next message*/
  inputEl.focus();

  addToChatWindow(message, "User");
  processMessage(message);
}

/* Attaches event listeners to send button and input field.*/
function init() {
  log("Initializing chat interface");

  /* Event Listener for submit button */
  const sendBtn = document.getElementById("send-button");
  if (sendBtn) {
    sendBtn.addEventListener("click", (e) => {
      e.preventDefault();
      send();
    });
  }

  /*Prevents browser default interference */
  const formEl = document.querySelector("form.input");
  if (formEl) {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      send();
    });
  }
  /* Attaches event listener to the enter/return key*/
  const inputEl =
    document.getElementById("chat-input") ||
    document.querySelector("input.user-input");
  if (inputEl) {
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    });
  }
}
window.addEventListener("DOMContentLoaded", init);
