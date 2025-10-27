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
    image: "/img/f0238645-rna_molecules_web.png" // change path if needed
  },
  {
    q: "What is the monomer of proteins?",
    choices: ["Amino acids", "Fatty acids", "Nucleotides", "Monosaccharides"],
    answer: 0
  }
];

let question = 0;   // current question index
let correct  = 0;   // number correct
let incorrect = 0;  // number incorrect

const qText    = document.getElementById("question-text");
const btns     = document.getElementById("buttons");
const feedback = document.getElementById("feedback");
const stats    = document.getElementById("stats");
const imgEl    = document.getElementById("image");
const restart  = document.getElementById("restart");

function showQuestion() {
  const item = quiz[question];
  feedback.textContent = "";
  qText.textContent = item.q;
  stats.textContent = `Question ${question + 1} of ${quiz.length} | Correct: ${correct} | Incorrect: ${incorrect}`;

  // image (only if provided)
  if (item.image) {
    imgEl.src = item.image;
    imgEl.style.display = "block";
  } else {
    imgEl.style.display = "none";
    imgEl.removeAttribute("src");
  }

  // render choices
  btns.innerHTML = "";
  item.choices.forEach((c, i) => {
    const b = document.createElement("button");
    b.textContent = c;
    b.addEventListener("click", () => checkAnswer(i));
    btns.appendChild(b);
  });

  // hide restart while quiz is active
  restart.style.display = "none";
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

  // advance
  question++;
  if (question < quiz.length) {
    // brief pause so students can see feedback
    setTimeout(showQuestion, 700);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  const total = quiz.length;
  const percent = Math.round((correct / total) * 100);

  // clear UI & show summary
  btns.innerHTML = "";
  imgEl.style.display = "none";
  qText.textContent = "Quiz finished!";
  feedback.textContent = "";
  stats.textContent = `Final Score → Correct: ${correct}, Incorrect: ${incorrect} (${percent}%)`;

  // show restart
  restart.style.display = "inline-block";
}

function resetQuiz() {
  question = 0;
  correct = 0;
  incorrect = 0;
  showQuestion();
}

restart.addEventListener("click", resetQuiz);

// start
showQuestion();
