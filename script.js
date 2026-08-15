document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     MENU MOBILE TOGGLE
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Fecha menu mobile ao clicar em um link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  /* ==========================================================================
     ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL)
     ========================================================================== */
  const reveals = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger inicial

  /* ==========================================================================
     ACORDEÃO (EMPATIA NA ESCOLA)
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isActive = accordionItem.classList.contains('active');

      // Fecha todos os itens
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      // Abre apenas o clicado se não estava ativo
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     QUIZ INTERATIVO ("VOCÊ AGIRIA COM EMPATIA?")
     ========================================================================== */
  const quizData = [
    {
      question: "Um novo aluno entrou na sua turma e está isolado no intervalo. Como você reage?",
      options: [
        { text: "Espera que ele venha falar com você quando quiser.", correct: false },
        { text: "Vai até ele, se apresenta e o convida para se juntar ao seu grupo.", correct: true },
        { text: "Continua com seus amigos, pois ele deve preferir ficar sozinho.", correct: false }
      ],
      explanation: "Aproximar-se e fazer o convite demonstra acolhimento e que você se importa com os sentimentos de inclusão do colega!"
    },
    {
      question: "Um colega errou a resposta durante a aula e alguns alunos riram. O que você faz?",
      options: [
        { text: "Rri junto para não se sentir excluído do grupo.", correct: false },
        { text: "Fica em silêncio e ignora o que aconteceu.", correct: false },
        { text: "Não ri e apoia o colega, lembrando que todos erram e estão aprendendo.", correct: true }
      ],
      explanation: "Não apoiar a zombaria e encorajar quem errou demonstra grande respeito e solidariedade."
    },
    {
      question: "Seu amigo está muito irritado e fala de forma um pouco ríspida com você. Como agir com empatia?",
      options: [
        { text: "Respira fundo, não devolve a agressividade e pergunta se algo ruim aconteceu.", correct: true },
        { text: "Grita de volta imediatamente para defender sua postura.", correct: false },
        { text: "Para de falar com ele para sempre sem procurar entender.", correct: false }
      ],
      explanation: "Reconhecer que o mau humor do outro pode ser fruto de uma dor ou problema pessoal evita brigas desnecessárias."
    }
  ];

  let currentQuestionIndex = 0;

  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const feedbackTextEl = document.getElementById('feedback-text');
  const nextBtn = document.getElementById('next-btn');

  function loadQuestion() {
    feedbackEl.classList.add('hidden');
    optionsEl.innerHTML = '';

    const currentQuiz = quizData[currentQuestionIndex];
    questionEl.textContent = `${currentQuestionIndex + 1}. ${currentQuiz.question}`;

    currentQuiz.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option.text;
      button.classList.add('option-btn');
      button.addEventListener('click', () => selectOption(option, currentQuiz.explanation));
      optionsEl.appendChild(button);
    });
  }

  function selectOption(selectedOption, explanation) {
    // Desabilita todos os botões após a escolha
    const buttons = optionsEl.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    feedbackEl.classList.remove('hidden');

    if (selectedOption.correct) {
      feedbackTextEl.innerHTML = `<strong>🌟 Excelente atitude empática!</strong><br>${explanation}`;
      feedbackEl.style.backgroundColor = 'var(--verde-agua)';
    } else {
      feedbackTextEl.innerHTML = `<strong>💡 Reflita um pouco mais...</strong><br>${explanation}`;
      feedbackEl.style.backgroundColor = 'var(--lilas-suave)';
    }
  }

  nextBtn.addEventListener('click', () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % quizData.length;
    loadQuestion();
  });

  // Inicializa o Quiz
  loadQuestion();
});
