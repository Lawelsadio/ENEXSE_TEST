const seedData = [
  /// demain je ferais le mixte de ce projet avec celui que j ai commancer pour avoir les fonctions
  // d'affichages et de clic qui recuperer les reponses.
  // le travail c est de faire en sorte que lonsque l'utilisateur clic sur suivant, ses reponses puissent etre verifier une par avant d'etre envoyer vers la BD, pour chaque reponse correcte on ajoute les badge true et false pour non correcte puis les enregistre
  {
    series: {
      b1: [
        {
          id: 1,
          text: "lorem ipsum",
          image: "https://images.unsplash.com/photo-1445456584178-3d53f3b18c57",
          questions: [
            {
              qid: 1,
              question: "When did World War 2 start?",
              options: ["1939", "1941"],
              answer: "1939",
              badge: "x",
            },
            {
              qid: 2,
              question: "Who was the leader of Nazi Germany?",
              options: ["Adolf Hitler", "Joseph Stalin"],
              answer: "Adolf Hitler",
              badge: "x",
            },
          ],
        },
        {
          id: 2,
          text: "lorem ipsum",
          image: "https://images.unsplash.com/photo-1455175895301-71c9fca0d47e",
          questions: [
            {
              qid: 1,
              question:
                "What was the name of the famous ship that sunk in 1912?",
              options: ["Titanic", "Lusitania"],
              answer: "Titanic",
              badge: "x",
            },
            {
              qid: 2,
              question: "What was the cause of the American Civil War?",
              options: ["Slavery", "Taxation"],
              answer: "Slavery",
              badge: "x",
            },
          ],
        },
        {
          id: 3,
          text: "lorem ipsum",
          image: "https://images.unsplash.com/photo-1445456584178-3d53f3b18c57",
          questions: [
            {
              qid: 1,
              question: "When did World War 2 start?",
              options: ["1939", "1941"],
              answer: "1939",
              badge: "x",
            },
            {
              qid: 2,
              question: "Who was the leader of Nazi Germany?",
              options: ["Adolf Hitler", "Joseph Stalin"],
              answer: "Adolf Hitler",
              badge: "x",
            },
          ],
        },
      ],
      b2: [
        {
          id: 1,
          text: "lorem ipsum",
          image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
          questions: [
            {
              qid: 1,
              question: "What is the capital of France?",
              options: ["Paris", "London"],
              answer: "Paris",
              badge: "x",
            },
            {
              qid: 2,
              question: "What is the largest ocean in the world?",
              options: ["Pacific Ocean", "Atlantic Ocean"],
              answer: "Pacific Ocean",
              badge: "x",
            },
          ],
        },
        {
          id: 2,
          text: "lorem ipsum",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
          questions: [
            {
              qid: 1,
              question: "What is the highest mountain in the world?",
              options: ["Mount Everest", "K2"],
              answer: "Mount Everest",
              badge: "x",
            },
            {
              qid: 3,
              question: "What is the longest river in the world?",
              options: ["Nile River", "Amazon River"],
              answer: "Nile River",
              badge: "x",
            },
          ],
        },
      ],
      b3: [
        {
          id: 1,
          text: "lorem ipsum",
          image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
          questions: [
            {
              qid: 1,
              question: "What is the capital of France?",
              options: ["Paris", "London"],
              answer: "Paris",
              badge: "x",
            },
            {
              qid: 2,
              question: "What is the largest ocean in the world?",
              options: ["Pacific Ocean", "Atlantic Ocean"],
              answer: "Pacific Ocean",
              badge: "x",
            },
          ],
        },
        {
          id: 2,
          text: "lorem ipsum",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
          questions: [
            {
              qid: 1,
              question: "What is the highest mountain in the world?",
              options: ["Mount Everest", "K2"],
              answer: "Mount Everest",
              badge: "x",
            },
            {
              qid: 2,
              question: "What is the longest river in the world?",
              options: ["Nile River", "Amazon River"],
              answer: "Nile River",
              badge: "x",
            },
          ],
        },
      ],
    },
  },
];

module.exports = seedData;
