const courses = [
  { title: "Phishing Awareness", desc: "Learn to identify phishing emails." },
  { title: "Password Security", desc: "Best practices for strong passwords." },
  { title: "Safe Browsing", desc: "Stay safe while surfing the internet." }
];

const container = document.getElementById("coursesContainer");
courses.forEach(c => {
  const div = document.createElement("div");
  div.className = "card bg-white p-6 rounded-xl shadow hover:scale-105 transition";
  div.innerHTML = `<h3 class="text-xl font-bold mb-2">${c.title}</h3><p>${c.desc}</p><button class="mt-3 bg-indigo-600 text-white px-4 py-2 rounded">Start</button>`;
  container.appendChild(div);
});
