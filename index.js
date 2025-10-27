const quiz = [
  // --- General Terms ---
  {
    q: "What is a macromolecule?",
    choices: [
      "A small molecule used for energy",
      "A large molecule made of smaller repeating units",
      "A molecule made only of lipids",
      "A molecule that cannot be broken down"
    ],
    answer: 1
  },
  {
    q: "What is a monomer?",
    choices: [
      "A small building block that forms polymers",
      "A long chain of macromolecules",
      "A type of carbohydrate",
      "An enzyme that speeds up reactions"
    ],
    answer: 0
  },
  {
    q: "What is this?",
    choices: ["DNA", "RNA", "Protein", "Lipid"],
    answer: 1,
    image: "/img/rna.png" // change path if needed
  },
  {
    q: "What is a polymer?",
    choices: [
      "A molecule that stores genetic information",
      "A large molecule made of many monomers bonded together",
      "A lipid that makes up membranes",
      "A type of simple sugar"
    ],
    answer: 1
  },

  // --- Carbohydrates ---
  {
    q: "What is ATP’s main function in the cell?",
    choices: [
      "Stores genetic information",
      "Provides immediate energy for cellular work",
      "Builds cell membranes",
      "Acts as a structural polysaccharide"
    ],
    answer: 1
  },
  {
    q: "What is a polysaccharide?",
    choices: [
      "A polymer made of many sugar units",
      "A single sugar molecule",
      "A lipid used for insulation",
      "A molecule that stores DNA"
    ],
    answer: 0
  },
  {
    q: "Which of the following is a monosaccharide?",
    choices: ["Glucose", "Starch", "Cellulose", "Glycogen"],
    answer: 0
  },

  // --- Proteins ---
  {
    q: "What is the monomer (building block) of proteins?",
    choices: ["Amino acids", "Fatty acids", "Nucleotides", "Monosaccharides"],
    answer: 0
  },
  {
    q: "What type of bond links amino acids together in a protein?",
    choices: ["Hydrogen bond", "Peptide bond", "Ionic bond", "Glycosidic bond"],
    answer: 1
  },
  {
    q: "What does the R group of an amino acid determine?",
    choices: [
      "The amino acid’s shape and chemical properties",
      "The number of peptide bonds",
      "The type of carbohydrate formed",
      "The DNA sequence it codes for"
    ],
    answer: 0
  },

  // --- Lipids ---
  {
    q: "Which type of fatty acid has double bonds and is usually liquid at room temperature?",
    choices: ["Saturated", "Unsaturated", "Hydrogenated", "Trans fat"],
    answer: 1
  },
  {
    q: "Which type of fatty acid has no double bonds and is usually solid at room temperature?",
    choices: ["Saturated", "Unsaturated", "Glycerol", "Essential"],
    answer: 0
  },
  {
    q: "What are the building blocks of most lipids?",
    choices: [
      "Glycerol and fatty acids",
      "Amino acids and nucleotides",
      "Monosaccharides and ATP",
      "Phosphates and nitrogen bases"
    ],
    answer: 0
  },

  // --- Nucleic Acids ---
  {
    q: "What are the monomers of nucleic acids?",
    choices: ["Nucleotides", "Amino acids", "Fatty acids", "Monosaccharides"],
    answer: 0
  },
  {
    q: "What molecule contains the instructions for making proteins?",
    choices: ["DNA", "RNA", "ATP", "Phospholipids"],
    answer: 0
  },
  {
    q: "What is the function of RNA?",
    choices: [
      "To carry genetic instructions from DNA to ribosomes",
      "To store genetic information permanently",
      "To catalyze condensation reactions",
      "To form the cell wall"
    ],
    answer: 0,
    image: "img/rna.png"
  },
  {
    q: "What is the backbone of a DNA strand made of?",
    choices: [
      "Sugar and phosphate groups",
      "Amino acids and R groups",
      "Lipids and proteins",
      "Nitrogenous bases only"
    ],
    answer: 0
  },
  {
    q: "Which of the following are nitrogenous bases found in nucleic acids?",
    choices: [
      "Adenine, thymine, cytosine, guanine, and uracil",
      "Ribose, glucose, fructose, and sucrose",
      "Lysine, valine, and serine",
      "Saturated and unsaturated"
    ],
    answer: 0
  },

  // --- Mono vs Di vs Poly & Reactions ---
  {
    q: "A condensation (dehydration synthesis) reaction does what?",
    choices: [
      "Breaks polymers into monomers by adding water",
      "Builds polymers by removing water",
      "Releases energy from ATP",
      "Hydrolyzes lipids into fatty acids"
    ],
    answer: 1
  },
  {
    q: "The opposite of a condensation reaction is called a:",
    choices: [
      "Hydrolysis reaction",
      "Endergonic reaction",
      "Oxidation reaction",
      "Photosynthesis reaction"
    ],
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
