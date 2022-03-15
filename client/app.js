const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
const socket = io();

let userName = []

socket.on('message', ({author, content}) => addMessage(author, content))

/* 1 form */

loginForm.addEventListener('submit', function login(event) {
    event.preventDefault()
    if(!userNameInput.value) {
        alert('wpisz nazwę uytkownika')
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show')
        messagesSection.classList.add('show')
    }
})

/* 2 form */

addMessageForm.addEventListener('submit', function sendMessage(event) {
    event.preventDefault()
    let messageContent = messageContentInput.value
    if(!messageContentInput.value) {
        alert('pole tekstowe jest puste')
    } else {
        addMessage(userName, messageContent);
        socket.emit('message', ({author: userName, content: messageContent}))
        messageContentInput.value = ''
    }
})

function addMessage(author, content) {
    let message = document.createElement('li')
    message.classList.add('message')
    message.classList.add('message--received')
    if( author == userName) {
        message.classList.add('message--self')
    }
    message.innerHTML = `
    <h3 class="message__author">${userName == author?userName:author}</h3>
    <div class="message__content">
    ${content}
    </div>
    `
    messagesList.appendChild(message)
}