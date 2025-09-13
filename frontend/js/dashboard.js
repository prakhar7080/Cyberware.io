const user = JSON.parse(localStorage.getItem("user"));
document.getElementById("username").textContent = user.name;

async function loadDashboard() {
  const res = await fetch(`http://localhost:5000/api/auth/user/${user.id}`);
  const data = await res.json();

  // Scores
  document.getElementById("quizScore").textContent = data.quizScore;
  document.getElementById("phishingScore").textContent = data.phishingScore;

  document.getElementById("quizBar").style.width = `${data.quizScore}%`;
  document.getElementById("phishingBar").style.width = `${data.phishingScore}%`;

  // Badges
  const container = document.getElementById("badgesContainer");
  container.innerHTML = "";
  if (data.badges.length === 0) {
    container.innerHTML = "<p class='text-gray-400'>No badges yet</p>";
  } else {
    data.badges.forEach(b => {
      const badge = document.createElement("span");
      badge.className = "px-3 py-1 bg-cyan-500 text-white rounded-full text-sm";
      badge.textContent = b;
      container.appendChild(badge);
    });
  }
}

loadDashboard();
