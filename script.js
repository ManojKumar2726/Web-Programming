document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     REGISTRATION FORM LOGIC
     ========================= */
  const regForm = document.querySelector("form");

  if (regForm && !document.getElementById("loginBtn")) {

      const inputs = regForm.querySelectorAll("input");

      const message = document.createElement("p");
      message.style.marginTop = "15px";
      message.style.fontWeight = "600";
      regForm.appendChild(message);

      regForm.addEventListener("submit", function (e) {
          e.preventDefault();

          const fullName = inputs[0].value.trim();
          const email = inputs[1].value.trim();
          const password = inputs[2].value;
          const confirmPassword = inputs[3].value;

          message.style.color = "red";
          message.textContent = "";

          if (fullName === "") {
              message.textContent = "Full name is required";
              return;
          }

          if (!validateEmail(email)) {
              message.textContent = "Enter a valid email address";
              return;
          }

          if (password.length < 6) {
              message.textContent = "Password must be at least 6 characters";
              return;
          }

          if (password !== confirmPassword) {
              message.textContent = "Passwords do not match";
              return;
          }

          message.style.color = "green";
          message.textContent = "Registration successful!";
          regForm.reset();
      });
  }

  /* =========================
     LOGIN LOGIC
     ========================= */
  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
      loginBtn.addEventListener("click", login);
  }
});

/* =========================
 LOGIN FUNCTION
 ========================= */
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (username === "admin" && password === "1234") {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "home.html";
  } else {
      error.textContent = "Invalid username or password";
  }
}

/* =========================
 LOGIN CHECK (PROTECTED PAGES)
 ========================= */
function checkLogin() {
  if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "login.html";
  }
}

/* =========================
 LOGOUT
 ========================= */
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

/* =========================
 EMAIL VALIDATION
 ========================= */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
