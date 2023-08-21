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
        <div class="card card-body mb-3">
          <div class="row">
            <div class="col-md-3">
              <img class="img-fluid mb-2" src="${user.avatar_url}" alt="avatar">
              <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
            </div>
          </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div class="repos"></div>`;

        this.fetchAndShowRepos(user.login);
    }

    async fetchAndShowRepos(userName) {
        const repos = await github.getRepos(userName);
        
        this.repos.innerHTML = '';
        repos.forEach(repo => {
            this.repos.innerHTML += `
            <div class="card card-body mb-2">
              <div class="row">
                <div class="col-md-6">
                  <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </div>
                <div class="col-md-6">
                  <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                  <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                </div>
              </div>
            </div>`;
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