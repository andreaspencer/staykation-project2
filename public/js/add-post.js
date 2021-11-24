async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('').value;
    const post_content = document.querySelector('').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('').addEventListener('submit', newPostHandler)