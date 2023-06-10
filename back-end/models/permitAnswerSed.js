const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permitB1Schema = new Schema({
  b1: [
    {
      id: Number,
      image: String,
      questions: [
        {
          qid: Number,
          question: String,
          options: [String],
          answer: String,
          badge: String,
        },
      ],
    },
  ],
  b2: [
    {
      id: Number,
      text: String,
      image: String,
      questions: [
        {
          qid: Number,
          question: String,
          options: [String],
          answer: String,
          badge: String,
        },
      ],
    },
  ],
  b3: [
    {
      id: Number,
      image: String,
      questions: [
        {
          qid: Number,
          question: String,
          options: [String],
          answer: String,
          badge: String,
        },
      ],
    },
  ],
});
const QuizSeries = mongoose.model("Answer", permitB1Schema);
module.exports = QuizSeries;

/*
const seriesSeed = [
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
              options: ["1939", "1941", "1945"],
              answer: "1939",
            },
            {
              qid: 2,
              question: "Who was the leader of Nazi Germany?",
              options: ["Adolf Hitler", "Joseph Stalin", "Winston Churchill"],
              answer: "Adolf Hitler",
            },
          ],
        },
        // ...
      ],
      // ...
    },
  },
];

Series.insertMany(seriesSeed, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Series collection seeded!");
  }
});
*/

/*
const seriesSeed = [
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
              options: ["1939", "1941", "1945"],
              answer: "1939",
            },
            {
              qid: 2,
              question: "Who was the leader of Nazi Germany?",
              options: ["Adolf Hitler", "Joseph Stalin", "Winston Churchill"],
              answer: "Adolf Hitler",
            },
          ],
        },
        // ...
      ],
      // ...
    },
  },
];

Series.insertMany(seriesSeed, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Series collection seeded!");
  }
});
*/
