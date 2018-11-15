import { http } from "./http";
import { ui } from "./ui";

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

// Listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);

// Listen for edit state
document.querySelector("#posts").addEventListener("click", enableEdit);

// Get posts
function getPosts() {
    http.get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submit posts
function submitPost() {
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;

    const data = {
        title,
        body
    }

    // Create post
    http.post("http://localhost:3000/posts", data)
    .then(data => {
        ui.showAlert("Post added", "alert alert-success");
        ui.clearFields();
        getPosts();
    })
    .catch(err => console.log(err));
}

// Delete posts
function deletePost(e) {
    if(e.target.parentElement.classList.contains("delete")) {
        const id = e.target.parentElement.dataset.id;
        if(confirm("Are you sure?")) {
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert("Post Removed", "alert alert-success");
                getPosts();
            })
            .catch(err => console.log(err));

        }
    }
    e.preventDefault();
}

// Enable edit state
function enableEdit(e) {
    if(e.target.classList.contains("edit")) {
        const id = e.target.dataset.id;
        const title = e.target.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.previousElementSibling.textContent;
        const data = {
            id,
            title,
            body
        }
        // Fill the form with the current posts
        ui.fillForm(data);
    }
    e.preventDefault();
}

// const getData = async (url) => {
//   const response = await fetch(url);
//   const result = await response.json();
//   console.log(result);
// };
//
// getData('https://jsonplaceholder.typicode.com/posts');
