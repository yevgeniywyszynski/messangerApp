const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = []

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