const API_URL = "http://localhost:5000/api/quiz";
const user = JSON.parse(localStorage.getItem("user"));

const quizData = [
  { q: "What is phishing?", options: ["A type of malware", "A scam email trick", "Antivirus software"], correct: 1 },
  { q: "Strong password should contain?", options: ["123456", "Upper, lower, numbers, symbols", "Only letters"], correct: 1 }
];

let current = 0, score = 0;
const container = document.getElementById("quizContainer");

function loadQuestion() {
  if (current >= quizData.length) {
    submitScore(score);
    container.innerHTML = `<h3 class="text-xl font-bold">Quiz Completed ✅</h3><p>Your Score: ${score}/${quizData.length}</p>`;
    return;
  }
  const q = quizData[current];
  container.innerHTML = `
    <h3 class="text-lg font-semibold mb-4">${q.q}</h3>
    ${q.options.map((opt,i)=>`<button onclick="checkAnswer(${i})" class="w-full mb-2 p-3 bg-gray-100 rounded hover:bg-indigo-100">${opt}</button>`).join("")}
  `;
}
function checkAnswer(i) {
  if (i === quizData[current].correct) score++;
  current++;
  loadQuestion();
}

async function submitScore(finalScore) {
  const res = await fetch(`${API_URL}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id, score: finalScore })
  });
  const data = await res.json();
  console.log("Score saved:", data);
}

loadQuestion();
