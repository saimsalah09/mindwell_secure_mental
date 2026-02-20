const API_URL = `${BASE_URL}/api/journal`;
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

/* SAVE JOURNAL */
function saveJournal() {
  const text = document.getElementById("journalText").value;

  if (!text.trim()) {
    alert("Write something first");
    return;
  }

  secureFetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message || "Journal saved");
    loadJournals();
    document.getElementById("journalText").value = "";
  })
  .catch(err => {
    console.error(err);
    alert("Save journal failed");
  });
}

/* LOAD JOURNALS */
function loadJournals() {
  secureFetch(API_URL, {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("journalList");
    list.innerHTML = "";

    data.forEach((j) => {
  const div = document.createElement("div");
  div.className = "journal-item";

  div.innerHTML = `
    <p><strong>${new Date(j.date).toLocaleString()}</strong></p>
    <p>${j.text}</p>
    <button onclick="editJournal('${j._id}', \`${j.text}\`)">✏ Edit</button>
    <button onclick="deleteJournal('${j._id}')">🗑 Delete</button>
  `;

  journalList.appendChild(div);
});
  })
  .catch(err => console.error(err));
}

function deleteJournal(id) {
  if (!confirm("Are you sure you want to delete this journal?")) return;

  secureFetch(`${BASE_URL}/api/journal/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      alert("Journal deleted");
      loadJournals();
    })
    .catch(() => alert("Delete failed"));
}
function editJournal(id, oldText) {
  const newText = prompt("Edit your journal:", oldText);

  if (!newText) return;

  secureFetch(`${BASE_URL}/api/journal/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: newText }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Journal updated");
      loadJournals();
    })
    .catch(() => alert("Update failed"));
}

/* NAVIGATION */
function goMood() {
  window.location.href = "mood.html";
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadJournals();