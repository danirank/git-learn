const assert = require("node:assert/strict");
const { createTodo, toggleTodo, deleteTodo, parseTodos } = require("./script.js");

function run() {
  const todo = createTodo("  buy milk  ", "1");
  assert.equal(todo.id, "1");
  assert.equal(todo.text, "buy milk");
  assert.equal(todo.done, false);

  const todos = [
    { id: "1", text: "a", done: false },
    { id: "2", text: "b", done: false },
  ];

  const toggled = toggleTodo(todos, "2", true);
  assert.deepEqual(toggled, [
    { id: "1", text: "a", done: false },
    { id: "2", text: "b", done: true },
  ]);
  assert.equal(todos[1].done, false);

  const deleted = deleteTodo(toggled, "1");
  assert.deepEqual(deleted, [{ id: "2", text: "b", done: true }]);

  assert.deepEqual(parseTodos("{bad json}"), []);
  assert.deepEqual(parseTodos(null), []);

  console.log("All tests passed.");
}

run();
