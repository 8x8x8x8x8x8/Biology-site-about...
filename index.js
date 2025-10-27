const quiz = [
  {
    q: "Which macromolecule stores genetic information?",
    choices: ["Carbohydrates", "Proteins", "Nucleic acids", "Lipids"],
    answer: 2
  },
  {
    q: "What is this?",
    choices: ["DNA", "RNA", "Protein", "Lipid"],
    answer: 1,
    image: "/img/rna.png"
  },
  {
    q: "What is the monomer of proteins?",
    choices: ["Amino acids", "Fatty acids", "Nucleotides", "Monosaccharides"],
    answer: 0
  }
];

let question = 0;   // current question index
let correct = 0;    // correct answers count
let incorrect = 0;  // incorrect answers count

const qText = document.getElementById("question-text");
const btns = document.getElementById("buttons");
const feedback = document.getElementById("feedback");
const stats = document.getElementById("stats");
const imgEl = document.getElementById("image");

function showQuestion() {
  feedback.textContent = "";
  stats.textContent = `Question ${question + 1} of ${quiz.length} | Correct: ${correct} | Incorrect: ${incorrect}`;
  const item = quiz[question];
  qText.textContent = item.q;

  if (imgEl) {
    if (item.image) {
      imgEl.src = item.image;
      imgEl.style.display = "block";
    } else {
      imgEl.style.display = "none";
      imgEl.removeAttribute("src");
    }
  }

  btns.innerHTML = "";
  item.choices.forEach((c, i) => {
    const b = document.createElement("button");
    b.textContent = c;
    b.onclick = () => checkAnswer(i);
    btns.appendChild(b);
  });
}

function checkAnswer(i) {
  const item = quiz[question];
  if (i === item.answer) {
    correct++;
    feedback.textContent = "✅ Correct!";
  } else {
    incorrect++;
    feedback.textContent = "❌ Incorrect.";
  }
  question++;
  if (question < quiz.length) {
    setTimeout(showQuestion, 800);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  qText.textContent = "Quiz finished!";
  btns.innerHTML = "";
  if (imgEl) imgEl.style.display = "none";
  stats.textContent = `Final Score → Correct: ${correct}, Incorrect: ${incorrect}`;
}

showQuestion();
