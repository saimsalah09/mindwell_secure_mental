document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loader = document.getElementById("loginLoader");
    const btn = e.target.querySelector("button");

    loader.style.display = "block";
    btn.disabled = true;

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } catch (err) {
      alert(err.message);
    } finally {
      loader.style.display = "none";
      btn.disabled = false;
    }
  });