/* =====================================================
   script.js
   Week 3 - JavaScript: Making Websites Interactive
   Author: Arathi Shekhar Munavalli
===================================================== */

console.log("script.js loaded successfully");

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     1. DARK MODE TOGGLE
     - classList.toggle() switches 'dark-mode' on <body>
     - localStorage saves preference across page reloads
  ===================================================== */
  const modeToggle = document.getElementById("modeToggle");
  const body = document.body;

  function applyStoredTheme() {
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
      body.classList.add("dark-mode");
      if (modeToggle) modeToggle.textContent = "☀️";
    }
  }

  function toggleDarkMode() {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    modeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark);
  }

  if (modeToggle) {
    modeToggle.addEventListener("click", toggleDarkMode);
  }
  applyStoredTheme();


  /* =====================================================
     2. TO-DO LIST
     - createElement() + appendChild() build each <li>
     - Event delegation handles clicks on all items
  ===================================================== */
  const todoInput  = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoList   = document.getElementById("todoList");

  function addTodo() {
    const text = todoInput.value.trim();
    if (text === "") {
      todoInput.style.borderColor = "#d64545";
      return;
    }
    todoInput.style.borderColor = "#ccc";

    const li        = document.createElement("li");
    const span      = document.createElement("span");
    const removeBtn = document.createElement("button");

    span.textContent      = text;
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    li.appendChild(span);
    li.appendChild(removeBtn);
    todoList.appendChild(li);

    todoInput.value = "";
    todoInput.focus();
  }

  if (addTodoBtn) {
    addTodoBtn.addEventListener("click", addTodo);
  }

  if (todoInput) {
    todoInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") addTodo();
    });
  }

  if (todoList) {
    todoList.addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-btn")) {
        event.target.parentElement.remove();
      } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.classList.toggle("done");
      }
    });
  }


  /* =====================================================
     3. CONTACT FORM VALIDATION
     - Real-time feedback on "input" event
     - Final check again on "submit"
     - markField() is a shared helper for all 3 fields
  ===================================================== */
  const form          = document.getElementById("contactForm");
  const nameField     = document.getElementById("name");
  const emailField    = document.getElementById("email");
  const messageField  = document.getElementById("message");
  const nameError     = document.getElementById("nameError");
  const emailError    = document.getElementById("emailError");
  const messageError  = document.getElementById("messageError");
  const formSuccess   = document.getElementById("formSuccess");

  function markField(field, errorEl, isValid, message) {
    if (isValid) {
      field.classList.remove("invalid");
      field.classList.add("valid");
      errorEl.textContent = "";
    } else {
      field.classList.remove("valid");
      field.classList.add("invalid");
      errorEl.textContent = message;
    }
    return isValid;
  }

  function validateName() {
    const value = nameField.value.trim();
    return markField(nameField, nameError,
      value.length >= 2,
      "Name must be at least 2 characters");
  }

  function validateEmail() {
    const value = emailField.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return markField(emailField, emailError,
      pattern.test(value),
      "Please enter a valid email address");
  }

  function validateMessage() {
    const value = messageField.value.trim();
    return markField(messageField, messageError,
      value.length >= 10,
      "Message must be at least 10 characters");
  }

  if (nameField)    nameField.addEventListener("input", validateName);
  if (emailField)   emailField.addEventListener("input", validateEmail);
  if (messageField) messageField.addEventListener("input", validateMessage);

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const isNameValid    = validateName();
      const isEmailValid   = validateEmail();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isMessageValid) {
        formSuccess.textContent = "✅ Message sent successfully! (Demo only — not actually emailed.)";
        form.reset();
        [nameField, emailField, messageField].forEach(function (f) {
          f.classList.remove("valid");
        });
      } else {
        formSuccess.textContent = "";
      }
    });
  }

}); // end DOMContentLoaded