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

    let question = 0;  // current question number
    let correct = 0;   // correct answers
    let incorrect = 0; // incorrect answers

    const qText = document.getElementById("question-text");
    const btns = document.getElementById("buttons");
    const feedback = document.getElementById("feedback");
    const stats = document.getElementById("stats");

    function showQuestion() {
      feedback.textContent = "";
      stats.textContent = `Question ${question + 1} of ${quiz.length} | Correct: ${correct} | Incorrect: ${incorrect}`;
      const item = quiz[question];
      qText.textContent = item.q;
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
        setTimeout(showQuestion, 1000);
      } else {
        endQuiz();
      }
    }

    function endQuiz() {
      qText.textContent = "Quiz finished!";
      btns.innerHTML = "";
      stats.textContent = `Final Score → Correct: ${correct}, Incorrect: ${incorrect}`;
    }

    showQuestion();
