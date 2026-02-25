const STORAGE_KEY = "todo-items-v1";

let todos = [];

function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item${todo.done ? " done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle-checkbox";
    checkbox.checked = todo.done;
    checkbox.dataset.id = todo.id;
    checkbox.setAttribute("aria-label", `Mark ${todo.text} as done`);

    const text = document.createElement("span");
    text.textContent = todo.text;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-btn";
    del.dataset.id = todo.id;
    del.textContent = "Delete";

    li.append(checkbox, text, del);
    list.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  return parseTodos(localStorage.getItem(STORAGE_KEY));
}

function parseTodos(raw) {
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function createTodo(text, id) {
  return {
    id,
    text: text.trim(),
    done: false,
  };
}

function toggleTodo(items, id, done) {
  return items.map((item) => (item.id === id ? { ...item, done } : item));
}

function deleteTodo(items, id) {
  return items.filter((item) => item.id !== id);
}

if (typeof document !== "undefined") {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  todos = loadTodos();
  renderTodos();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    todos.push(createTodo(text, crypto.randomUUID()));

    saveTodos();
    renderTodos();
    input.value = "";
    input.focus();
  });

  list.addEventListener("click", (event) => {
    const target = event.target;

    if (target.matches(".toggle-checkbox")) {
      todos = toggleTodo(todos, target.dataset.id, target.checked);
      saveTodos();
      renderTodos();
    }

    if (target.matches(".delete-btn")) {
      todos = deleteTodo(todos, target.dataset.id);
      saveTodos();
      renderTodos();
    }
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createTodo,
    toggleTodo,
    deleteTodo,
    parseTodos,
  };
}
