const seedData = [
  /// demain je ferais le mixte de ce projet avec celui que j ai commancer pour avoir les fonctions
  // d'affichages et de clic qui recuperer les reponses.
  // le travail c est de faire en sorte que lonsque l'utilisateur clic sur suivant, ses reponses puissent etre verifier une par avant d'etre envoyer vers la BD, pour chaque reponse correcte on ajoute les badge true et false pour non correcte puis les enregistre dans la bd.
  {
    series: {
      b1: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1445456584178-3d53f3b18c57",
          questions: [
            {
              qid: 1,
              question: "When did World War 2 start?",
              options: [
                { A: "1939", badge: null },
                { B: "1941", badge: null },
              ],
              answer: "A",
            },
            {
              qid: 2,
              question: "Who was the leader of Nazi Germany?",
              options: [
                { A: "Adolf Hitler", badge: null },
                { B: "Joseph Stalin", badge: null },
              ],
              answer: "A",
            },
          ],
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1455175895301-71c9fca0d47e",
          questions: [
            {
              qid: 1,
              question:
                "What was the name of the famous ship that sunk in 1912?",
              options: [
                { A: "Titanic", badge: null },
                { B: "Lusitania", badge: null },
              ],
              answer: "A",
            },
            {
              qid: 2,
              question: "What was the cause of the American Civil War?",
              options: [
                { A: "Slavery", badge: null },
                { B: "Taxation", badge: null },
              ],
              answer: "A",
            },
          ],
        },
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1445456584178-3d53f3b18c57",
          questions: [
            {
              qid: 1,
              question: "When did World War 2 start?",
              options: [
                { A: "1939", badge: null },
                { B: "1941", badge: null },
              ],
              answer: "A",
            },
            {
              qid: 2,
              question: "Who was the leader of Nazi Germany?",
              options: [
                { A: "Adolf Hitler", badge: null },
                { B: "Joseph Stalin", badge: null },
              ],
              answer: "A",
            },
          ],
        },
      ],
      b2: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
          questions: [
            {
              qid: 1,
              question: "What is the capital of France?",
              options: [
                { A: "Paris", badge: null },
                { B: "London", badge: null },
              ],
              answer: "A",
            },
            {
              qid: 2,
              question: "What is the largest ocean in the world?",
              options: [
                { A: "Pacific Ocean", badge: null },
                { B: "Atlantic Ocean", badge: null },
              ],
              answer: "A",
            },
          ],
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
          questions: [
            {
              qid: 1,
              question: "What is the highest mountain in the world?",
              options: [
                { A: "Mount Everest", badge: null },
                { B: "K2", badge: null },
              ],
              answer: "A",
            },
            {
              qid: 2,
              question: "What is the longest river in the world?",
              options: [
                { A: "Nile River", badge: null },
                { B: "Amazon River", badge: null },
              ],
              answer: "A",
            },
          ],
        },
      ],
      b3: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
          questions: [
            {
              qid: 1,
              question: "What is the capital of France?",
              options: [
                { A: "Paris", badge: null },
                { B: "London", badge: null },
              ],
              answer: "A",
            },
            {
              qid: 2,
              question: "What is the largest ocean in the world?",
              options: [
                { A: "Pacific Ocean", badge: null },
                { B: "Atlantic Ocean", badge: null },
              ],
              answer: "A",
            },
          ],
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
          questions: [
            {
              qid: 1,
              question: "What is the highest mountain in the world?",
              options: [
                { A: "Mount Everest", badge: null },
                { B: "K2", badge: null },
              ],
              answer: "A",
            },
            {
              qid: 2,
              question: "What is the longest river in the world?",
              options: [
                { A: "Nile River", badge: null },
                { B: "Amazon River", badge: null },
              ],
              answer: "A",
            },
          ],
        },
      ],
    },
  },
];

module.exports = seedData;
