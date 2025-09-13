async function loadLeaderboard() {
  const res = await fetch("http://localhost:5000/api/leaderboard");
  const users = await res.json();

  const list = document.getElementById("leaderboardList");
  list.innerHTML = "";

  users.forEach((u, i) => {
    const li = document.createElement("li");
    let medal = "";
    if (i === 0) medal = "🥇";
    else if (i === 1) medal = "🥈";
    else if (i === 2) medal = "🥉";

    li.className = "bg-gray-800 p-3 rounded-lg flex justify-between";
    li.innerHTML = `<span>${medal} ${u.name}</span> <span class="text-cyan-400">${u.quizScore + u.phishingScore} pts</span>`;
    list.appendChild(li);
  });
}

loadLeaderboard();
