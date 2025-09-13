const API_URL = "http://localhost:5000/api/phishing";
const user = JSON.parse(localStorage.getItem("user"));

const fakeEmails = [
  {
    from: "support@bank-secure.com",
    subject: "Urgent: Verify Your Account",
    body: "Click the link below to verify your account or it will be suspended.",
    phishing: true
  },
  {
    from: "newsletter@cyberaware.io",
    subject: "Welcome to CyberAware",
    body: "Thank you for joining our cyber security awareness platform!",
    phishing: false
  }
];

let current = 0;
const container = document.getElementById("emailContainer");

function loadEmail() {
  if (current >= fakeEmails.length) {
    container.innerHTML = `<h3 class="text-xl font-bold">Lab Completed ✅</h3><p>Good job, you reviewed all emails!</p>`;
    return;
  }

  const mail = fakeEmails[current];
  container.innerHTML = `
    <p><strong>From:</strong> ${mail.from}</p>
    <p><strong>Subject:</strong> ${mail.subject}</p>
    <p class="mt-4">${mail.body}</p>
    <div class="mt-6 flex gap-4">
      <button onclick="submitAnswer(true)" class="bg-red-500 text-white px-4 py-2 rounded">🚩 Report as Phishing</button>
      <button onclick="submitAnswer(false)" class="bg-green-500 text-white px-4 py-2 rounded">✅ Mark as Safe</button>
    </div>
  `;
}

async function submitAnswer(choice) {
  const mail = fakeEmails[current];
  const correct = (choice === mail.phishing);

  // Save attempt in DB
  await fetch(`${API_URL}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id, correct })
  });

  alert(correct ? "✅ Correct! Good catch." : "❌ Incorrect. Be careful!");
  current++;
  loadEmail();
}

loadEmail();
