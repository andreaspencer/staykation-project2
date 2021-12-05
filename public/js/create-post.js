async function createPostHandler(event) {
    event.preventDefault();

    document.location.replace('/dashboard/create')
}

document.querySelector('#create-new-post').addEventListener('click', createPostHandler);


function myClickFunction() {
    var textBox = document.getElementById('#text-box').value;
    document.getElementById('#output').innerHTML = textBox;
    console.log(textBox);
}