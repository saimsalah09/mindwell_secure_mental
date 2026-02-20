// ==============================
// AUTH CHECK
// ==============================
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

// ==============================
// CONSTANTS
// ==============================
const API_URL = `${BASE_URL}/api/mood`;

const moodSlider = document.getElementById("moodSlider");
const moodValue = document.getElementById("moodValue");

// Emoji mapping
const emojis = ["😞", "😐", "😊", "😁", "😎"];

// ==============================
// SLIDER UI UPDATE (Emoji + Value)
// ==============================
moodSlider.addEventListener("input", () => {
  const val = Number(moodSlider.value);

  const emojiIndex = Math.min(
    emojis.length - 1,
    Math.floor(val / 2)
  );

  moodValue.innerHTML = `Mood: ${val} ${emojis[emojiIndex]}`;
});

// ==============================
// SAVE MOOD
// ==============================
function saveMood() {
  const mood = moodSlider.value;

  secureFetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify({ mood }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message || "Mood saved");
      loadMoods(); // 🔥 auto refresh graph
    })
    .catch(() => {
      alert("Failed to save mood");
    });
}

// ==============================
// LOAD MOODS & DRAW CHART
// ==============================
let moodChart;

function loadMoods() {
  secureFetch(API_URL, {
    headers: {
      "Authorization": "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data || !data.length) {
  console.log("No mood data found");
  return;
}
      const labels = data.map((d) =>
        new Date(d.date).toLocaleDateString()
      );

      const values = data.map((d) => d.mood);
      const avg = (
            values.reduce((a, b) => a + b, 0) / values.length
        ).toFixed(1);

        document.getElementById("weeklyAverage").innerText =
            "Average Mood: " + avg;

        const first = values[0];
        const last = values[values.length - 1];

        let trendText = "";

        if (last > first) {
            trendText = "📈 Your mood is improving. Keep going!";
        } else if (last < first) {
            trendText = "📉 Mood dropped this week. Take care.";
        } else {
            trendText = "🙂 Your mood is stable.";
        }

        document.getElementById("weeklyTrend").innerText = trendText;

      if (moodChart) {
        moodChart.destroy();
      }

      const ctx = document
        .getElementById("moodChart")
        .getContext("2d");

      moodChart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Mood Level",
              data: values,
              borderColor: "#38bdf8",
              backgroundColor: "rgba(56,189,248,0.2)",
              borderWidth: 3,
              pointRadius: 4,
              pointBackgroundColor: "#38bdf8",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              min: 1,
              max: 10,
              ticks: { stepSize: 1 },
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    })
    .catch(() => {
      console.error("Failed to load mood data");
    });
}

// ==============================
// NAVIGATION
// ==============================
function goJournal() {
  window.location.href = "journal.html";
}

// ===============================
// BREATHING EXERCISE LOGIC
// ===============================

function startBreathing() {
  const circle = document.getElementById("breathingCircle");
  const text = document.getElementById("breathingText");

  let cycle = 0;

  function breathe() {
    if (cycle >= 4) {
      text.innerText = "Done 🧘";
      circle.classList.remove("expand", "shrink");
      return;
    }

    // Inhale
    text.innerText = "Inhale...";
    circle.classList.add("expand");
    circle.classList.remove("shrink");

    setTimeout(() => {
      // Exhale
      text.innerText = "Exhale...";
      circle.classList.remove("expand");
      circle.classList.add("shrink");

      cycle++;
      setTimeout(breathe, 4000);
    }, 4000);
  }

  breathe();
}

// ==============================
// INIT
// ==============================
loadMoods();