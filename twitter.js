document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.getElementById('userSelect');
    const postsContainer = document.getElementById('postsContainer');
    const commentsContainer = document.getElementById('commentsContainer');
    const postImage = document.getElementById('postpic');
    const retweets = document.getElementById('retweets');
    const profileArea = document.getElementById('profilearea');

    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.username;
                userSelect.appendChild(option);
            });
            userSelect.value = '1'; 
            loadUserPosts(1);
        });

    
    userSelect.addEventListener('change', () => {
        const userId = userSelect.value;
        loadUserPosts(userId);
        
    });

    
    function loadUserPosts(userId) {
        postsContainer.innerHTML = '';
        commentsContainer.innerHTML = '';
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const postDiv = document.createElement('div');
                    const postImage = document.createElement('div');
                    const retweets = document.createElement('div');
                    retweets.className = "retweets";
                    retweets.innerHTML = `<p><ion-icon name="chatbubble-ellipses-outline"></ion-icon>200</p><br>
                    <p><ion-icon name="repeat-outline"></ion-icon>200</p>
                    <p><ion-icon name="heart" style="color:red"></ion-icon>200</p>
                    `
                    postImage.className = 'pic';
                    picture = `images/screenshot-2022-05-24-at-15-22-28.png`;
                    postImage.innerHTML = `<img src= "${picture}">`;
                    
                    postDiv.classList.add('post');
                    postDiv.textContent = post.title;
                    postDiv.addEventListener('click', () => loadPostComments(post.id));
                    postsContainer.appendChild(postImage);
                    
                    postsContainer.appendChild(postDiv);
                    postsContainer.appendChild(retweets);

                });
                if (posts.length > 0) {
                    loadPostComments(posts[0].id);
                }
            });
    }

   
    function loadPostComments(postId) {
        commentsContainer.innerHTML = '';
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(comments => {
                comments.forEach(comment => {
                    const postImage = document.createElement('div');
                    const retweets = document.createElement('div');
                    retweets.className = "retweets";
                    retweets.innerHTML = `<p><ion-icon name="chatbubble-ellipses-outline"></ion-icon>0</p><br>
                    <p><ion-icon name="repeat-outline"></ion-icon>0</p>
                    <p><ion-icon name="heart" style="color:red"></ion-icon>0</p>
                    `
                    postImage.className = 'pic';
                    picture = `images/screenshot-2022-05-24-at-15-22-28.png`;
                    postImage.innerHTML = `<img src= "${picture}">`;
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');
                    commentDiv.textContent = comment.body;
                    commentsContainer.appendChild(postImage);
                    
                    commentsContainer.appendChild(commentDiv);
                    commentsContainer.appendChild(retweets);
                });
            });
    }
    
    loadPostComments(1);
});

