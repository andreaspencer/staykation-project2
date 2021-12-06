async function createPostHandler(event) {
    event.preventDefault();

    document.location.replace('/dashboard/create')
}

// const myClickFunction;

document.querySelector('#create-new-post').addEventListener('click', createPostHandler);
document.querySelector('#submit-post').addEventListener('click', myClickFunction);

function myClickFunction() {
    var textBox = document.getElementById('#text-box').value;
    document.getElementById('#output').innerHTML = textBox;
    console.log(textBox);
};

  