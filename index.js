'use strict';

class Github {
    constructor() {
        this.clientId = '70dec6bf1e390c4c6d71';
        this.clientSecret = '70b0641481a0dd9b455ffe36f6b02571f6ade11f';
    }

    async getUser(userName) {
        const data = await fetch(`https://api.github.com/users/${userName}?client_id=${this.clientId}&client_secret=${this.clientSecret}`)
        return await data.json();
    }

    async getRepos(userName) {
        const data = await fetch(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:desc&client_id=${this.clientId}&client_secret=${this.clientSecret}`)
        return await data.json();
    }
}

class UI {
    constructor() {
        this.profile = document.querySelector('.profile');
        this.repos = document.querySelector('.repos');
        this.searchContainer = document.querySelector('.searchContainer');
        this.search = document.querySelector('.search');
        this.errorTimeout = null;
    }

    showProfile(user) {
        this.profile.innerHTML = `
        <!-- Profile details here -->
        `;

        this.fetchAndShowRepos(user.login);
    }

    async fetchAndShowRepos(userName) {
        const repos = await github.getRepos(userName);
        
        this.repos.innerHTML = '';
        repos.forEach(repo => {
            this.repos.innerHTML += `
            <!-- Display each repository -->
            `;
        });
    }

    showError(message) {
        clearTimeout(this.errorTimeout);

        const div = document.createElement('div');
        div.classList.add('alert', 'alert-danger');
        div.appendChild(document.createTextNode(message));

        this.searchContainer.insertBefore(div, this.search);

        this.errorTimeout = setTimeout(() => {
            div.remove();
        }, 500);
    }
}

const github = new Github();
const ui = new UI();

const searchUser = document.querySelector('.searchUser');

let typingTimeout = null;

searchUser.addEventListener('keyup', (event) => {
    clearTimeout(typingTimeout);

    const userText = event.target.value;
    if (userText.trim() !== '') {
        typingTimeout = setTimeout(() => {
            github.getUser(userText)
                .then((data) => {
                    if (data.message === 'Not Found') {
                        ui.showError('User not found');
                    } else {
                        ui.showProfile(data);
                    }
                });
        }, 300);
    }
});