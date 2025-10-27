const quiz = [
  // --- General Terms ---
  {
    q: "What's a macromolecule?",
    choices: [
      "It's mainly used for energy",
      "A big molecule made of small units",
      "A molecule made only of lipids",
      "A molecule that can't be broken down"
    ],
    answer: 1
  },
  {
    q: "What's a monomer?",
    choices: [
      "A small part that joins with others to make a more bigger molecule",
      "A big molecule made out of smaller ones",
      "A type of carbohydrate",
      "An enzyme that makes reactions faster"
    ],
    answer: 0
  },
  {
    q: "What is this?",
    choices: ["DNA", "RNA", "Protein", "Lipid"],
    answer: 1,
    image: "/img/f0238645-rna_molecules_web.png"
  },
  {
    q: "What's a polymer?",
    choices: [
      "A molecule that keeps genetic information",
      "A big molecule made out of many monomers bonded together",
      "A lipid that makes up membranes",
      "A type of sugar"
    ],
    answer: 1
  },

  // --- Carbohydrates ---
  {
    q: "What's ATP’s main function in the cell?",
    choices: [
      "Keeps genetic information",
      "Gives instant energy for cellular work",
      "Creates cell membranes",
      "Acts as a structural polysaccharide"
    ],
    answer: 1
  },
  {
    q: "What's a polysaccharide?",
    choices: [
      "A polymer made out of many sugar units",
      "A sugar molecule",
      "A lipid",
      "A molecule that keeps DNA"
    ],
    answer: 0
  },
  {
    q: "Which one is a monosaccharide?",
    choices: ["Glucose", "Starch", "Cellulose", "Glycogen"],
    answer: 0
  },

  // --- Proteins ---
  {
    q: "What's the monomer of proteins?",
    choices: ["Amino acids", "Fatty acids", "Nucleotides", "Monosaccharides"],
    answer: 0
  },
  {
    q: "What type of bond connects amino acids together in a protein?",
    choices: ["Hydrogen bond", "Peptide bond", "Ionic bond", "Glycosidic bond"],
    answer: 1
  },
  {
    q: "What does the R group of an amino acid do?",
    choices: [
      "The amino acid’s shape and chemical properties",
      "The number of peptide bonds",
      "The type of carbohydrate created",
      "The DNA sequence it codes for"
    ],
    answer: 0
  },

  // --- Lipids ---
  {
    q: "Which type of fatty acid has double bonds?",
    choices: ["Saturated", "Unsaturated", "Hydrogenated", "Trans fat"],
    answer: 1
  },
  {
    q: "Which type of fatty acid has no double bonds?",
    choices: ["Saturated", "Unsaturated", "Glycerol", "Essential"],
    answer: 0
  },
  {
    q: "What makes up most lipids?",
    choices: [
      "Glycerol and fatty acids",
      "Amino acids and nucleotides",
      "Monosaccharides and ATP",
      "Phosphates"
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
    q: "What kind of molecule has the instructions for creating proteins?",
    choices: ["DNA", "RNA", "ATP", "Phospholipids"],
    answer: 0
  },
  {
    q: "What is the main function of RNA?",
    choices: [
      "To carry genetic instructions from DNA to ribosomes",
      "To keep genetic information permanently",
      "To cause condensation reactions",
      "To form the cell wall"
    ],
    answer: 0
  },
  {
    q: "What is the DNA backbone made of?",
    choices: [
      "Sugar and phosphate groups",
      "Amino acids and R groups",
      "Lipids and proteins",
      "Nitrogenous bases"
    ],
    answer: 0
  },
  {
  q: "Which of these are the bases in DNA and RNA?",
  choices: [
    "Adenine, thymine, cytosine, guanine, and uracil",
    "Sugars like glucose and sucrose",
    "Amino acids like lysine and valine",
    "Types of fats"
  ],
  answer: 0
},

  // --- Mono vs Di vs Poly & Reactions ---
  {
    q: "A condensation reaction does what?",
    choices: [
      "Breaks polymers into monomers by adding water",
      "Builds polymers by removing water",
      "Releases energy from ATP",
      "Hydrolyzes lipids into fatty acids"
    ],
    answer: 1
  },
  {
    q: "The opposite of a condensation reaction is called a",
    choices: [
      "Hydrolysis reaction",
      "Endergonic reaction",
      "Oxidation reaction",
      "Photosynthesis reaction"
    ],
    answer: 0
  },
  {
    q: "Which macromolecule helps speed up chemical reactions in the body?",
    choices: ["Proteins", "Carbohydrates", "Lipids", "Nucleic acids"],
    answer: 0
  },
  {
    q: "What are the main elements in macromolecules?",
    choices: [
      "Carbon, hydrogen, oxygen, and sometimes nitrogen",
      "Helium",
      "Calcium",
      "Sodium"
    ],
    answer: 0
  },
  {
    q: "Which macromolecule is the main part of cell membranes?",
    choices: ["Lipids", "Proteins", "Carbohydrates", "Nucleic acids"],
    answer: 0
  },
  {
  q: "What are proteins made of?",
  choices: ["Amino acids", "Fatty acids", "Nucleotides", "Sugars"],
  answer: 0
},
  {
    q: "Which macromolecule includes both DNA and RNA?",
    choices: ["Nucleic acids", "Proteins", "Carbohydrates", "Lipids"],
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
