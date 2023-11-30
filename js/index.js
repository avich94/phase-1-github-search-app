document.addEventListener('DOMContentLoaded', function() {
document.getElementById('github-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let searchInput = document.getElementById('search').value;
  
    fetch(`https://api.github.com/search/users?q=${searchInput}`)
      .then(response => response.json())
      .then(data => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
  
        data.items.forEach(user => {
          const listItem = document.createElement('li');
          const userName = document.createElement('p');
          const avatar = document.createElement('img');
          const profileLink = document.createElement('a');
  
          userName.textContent = user.login;
          avatar.src = user.avatar_url;
          avatar.alt = `${user.login}'s avatar`;
          profileLink.href = user.html_url;
          profileLink.textContent = 'View Profile';
  
          listItem.appendChild(avatar);
          listItem.appendChild(userName);
          listItem.appendChild(profileLink);
          userList.appendChild(listItem);
        });
  
        userList.addEventListener('click', function(event) {
          if (event.target.tagName === 'LI') {
            const username = event.target.querySelector('p').textContent;
            fetch(`https://api.github.com/users/${username}/repos`)
              .then(response => response.json())
              .then(data => {
                const reposList = document.getElementById('repos-list');
                reposList.innerHTML = '';
  
                data.forEach(repo => {
                  const listItem = document.createElement('li');
                  const repoName = document.createElement('p');
                  const repoLink = document.createElement('a');
  
                  repoName.textContent = repo.name;
                  repoLink.href = repo.html_url;
                  repoLink.textContent = 'View Repository';
  
                  listItem.appendChild(repoName);
                  listItem.appendChild(repoLink);
                  reposList.appendChild(listItem);
                });
              })
              .catch(error => console.log(error));
          }
        });
      })
      .catch(error => console.log(error));
  });
});
