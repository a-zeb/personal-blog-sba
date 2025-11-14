const formInp = document.getElementById("submitForm");
const titleInp = document.getElementById("title");
const contentInp = document.getElementById("content");
const submitButton = document.getElementById("submitButton");
const blogPosts = document.getElementById("blogPosts");
const errorMap = {
  title: document.getElementById("titleError"),
  content: document.getElementById("contentError"),
};
const STORAGE_KEY = "storedData";
let posts = loadStoredPosts();
let editingId = null;

renderPosts();

//event listeners
titleInp.addEventListener("change", () => validateField(titleInp));
titleInp.addEventListener("input", () => clearError(titleInp));
contentInp.addEventListener("change", () => validateField(contentInp));
contentInp.addEventListener("input", () => clearError(contentInp));
submitButton.addEventListener("click", () => {
  validateField(titleInp);
  validateField(contentInp);
});
formInp.addEventListener("submit", submit);
blogPosts.addEventListener("click", updatePost);

//methods
function submit(e) {
  e.preventDefault();
  if (!(validateField(titleInp) && validateField(contentInp))) return;

  if (editingId) {
    posts = posts.map((post) =>
      post.id === editingId
        ? {
            ...post,
            title: titleInp.value.trim(),
            content: contentInp.value.trim(),
            updatedAt: new Date().toISOString(),
          }
        : post
    );
  } else {
    const newPost = {
      id: generateId(),
      title: titleInp.value.trim(),
      content: contentInp.value.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    addPost(newPost);
  }

  persistPosts();
  renderPosts();
  resetFormState();
}

function addPost(post) {
  posts = [...posts, post];
}

function updatePost(e) {
  const target = e.target;
  if (target.matches(".delete-btn")) {
    const postId = target.closest("[data-id]")?.dataset.id;
    if (!postId) return;
    posts = posts.filter((post) => post.id !== postId);
    persistPosts();
    renderPosts();
    if (editingId === postId) resetFormState();
    return;
  }

  if (target.matches(".edit-btn")) {
    const postId = target.closest("[data-id]")?.dataset.id;
    const postToEdit = posts.find((post) => post.id === postId);
    if (!postToEdit) return;
    editingId = postToEdit.id;
    titleInp.value = postToEdit.title;
    contentInp.value = postToEdit.content;
    submitButton.textContent = "Save Changes";
    submitButton.classList.replace("btn-primary", "btn-success");
    titleInp.focus();
  }
}

function validateField(inputEl) {
  const value = inputEl.value.trim();
  let message = "";
  if (!value) {
    message =
      inputEl.id === "title"
        ? "Please enter a descriptive title for your post."
        : "Content cannot be empty. Share a few thoughts before submitting.";
  }
  if (message) {
    errorMap[inputEl.id].textContent = message;
    inputEl.classList.add("is-invalid");
    return false;
  }
  clearError(inputEl);
  return true;
}

function clearError(input) {
  input.classList.remove("is-invalid");
  if (errorMap[input.id]) {
    errorMap[input.id].textContent = "";
  }
}

function renderPosts() {
  if (!posts.length) {
    blogPosts.innerHTML =
      '<p class="text-muted mb-0">No posts yet. Start by adding your first entry above.</p>';
    return;
  }
  const postMarkup = posts
    .map(
      (post) => `
      <article class="mb-3 p-3 border rounded post-card" data-id="${post.id}">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h2 class="h4 mb-1">${escapeHtml(post.title)}</h2>
            <small class="text-muted">${formatTimestamps(post)}</small>
          </div>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary edit-btn">Edit</button>
            <button type="button" class="btn btn-outline-danger delete-btn">Delete</button>
          </div>
        </div>
        <p class="mt-2 mb-0">${escapeHtml(post.content)}</p>
      </article>`
    )
    .join("");
  blogPosts.innerHTML = postMarkup;
}

function persistPosts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Unable to store posts:", error);
  }
}

function loadStoredPosts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("unable to retrieve stored data:", error);
    return [];
  }
}

function resetFormState() {
  editingId = null;
  formInp.reset();
  submitButton.textContent = "Submit Post";
  submitButton.classList.remove("btn-success");
  submitButton.classList.add("btn-primary");
  clearError(titleInp);
  clearError(contentInp);
}

function formatTimestamps(post) {
  const created = new Date(post.createdAt);
  const updated = post.updatedAt ? new Date(post.updatedAt) : null;
  if (updated) {
    return `Updated ${updated.toLocaleString()}`;
  }
  return `Created ${created.toLocaleString()}`;
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
