// ==============================
// NAVIGATION
// ==============================
function goJournal() {
  window.location.href = "journal.html";
}

function goMood() {
  window.location.href = "mood.html";
}

function goBreathing() {
  window.location.href = "breathing.html";
}

// ==============================
// LOGOUT
// ==============================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// ==============================
// EXPORT DATA
// ==============================
function exportData() {
  secureFetch(`${BASE_URL}/api/export`)
    .then(res => res.json())
    .then(data => {
      const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "mindwell_data.json";
      a.click();

      URL.revokeObjectURL(url);
    })
    .catch(() => {
      alert("Export failed");
    });
}

// ==============================
// WEEKLY MOOD SUMMARY
// ==============================
function loadDashboardSummary() {
  secureFetch(`${BASE_URL}/api/mood`)
    .then(res => res.json())
    .then(data => {

      if (!data.length) {
        document.getElementById("dashboardAverage").innerText =
          "No mood data yet.";
        return;
      }

      const values = data.map(d => d.mood);

      const avg = (
        values.reduce((a, b) => a + b, 0) /
        values.length
      ).toFixed(1);

      document.getElementById("dashboardAverage").innerText =
        "Average Mood: " + avg;
    })
    .catch(() => {
      document.getElementById("dashboardAverage").innerText =
        "Failed to load summary.";
    });
}

// ==============================
// INIT
// ==============================
loadDashboardSummary();