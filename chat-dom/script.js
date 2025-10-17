import { getBotResponse } from './eliza.js';

const DEBUG = false;
const log = (msg) => { if (DEBUG) console.log(msg); };

function showResponse(response) {
  addToChatWindow(response, 'Bot');
}

function getResponse(message) {
  return getBotResponse(message);
}

function processMessage(message) {
  const response = getResponse(message);
  showResponse(response);
}


function addToChatWindow(message, speaker) {
  const chatWindow = document.getElementById('messages');
  if (!chatWindow) return;

const row = document.createElement('div');
  row.className = (speaker === 'User') ? 'user' : 'message-bot';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = message;

  row.appendChild(bubble);
  chatWindow.appendChild(row);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function send() {
  const inputEl =
    document.getElementById('chat-input') ||
    document.querySelector('input.user-input');
  if (!inputEl) return;

  const message = inputEl.value.trim();
  if (!message) return;

  inputEl.value = '';
  inputEl.focus();

   addToChatWindow(message, 'User');
  processMessage(message);
}

function init() {
  log('Initializing chat interface');
  const sendBtn = document.getElementById('send-button');
  if (sendBtn) {
    sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      send();
    });
  }
  const formEl = document.querySelector('form.input');
  if (formEl) {
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      send();
    });
  }
    const inputEl =
    document.getElementById('chat-input') ||
    document.querySelector('input.user-input');
  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    });
  }
}
window.addEventListener('DOMContentLoaded', init);
