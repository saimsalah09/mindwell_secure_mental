// =======================================
// AUTH CHECK (GLOBAL)
// =======================================

(function () {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Session expired. Please login again.");
    window.location.replace("login.html");
  }
})();

// =======================================
// LOGOUT (GLOBAL FUNCTION)
// =======================================

window.logout = function () {
  localStorage.removeItem("token");
  window.location.replace("login.html");
};