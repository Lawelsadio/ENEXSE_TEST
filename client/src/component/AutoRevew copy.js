import React from "react";
import { useLocation } from "react-router-dom";

function AutoReview() {
  const location = useLocation();
  const { data, selectedOptions } = location.state;
  const trueAnswer = data[0].answer;
  console.log("trueAnswer", trueAnswer);

  const questions = data[0].questions.map((question) => {
    const correctOption =
      trueAnswer[data[0].questions.findIndex((q) => q.qid === question.qid)];

    const option = question.options.map((option) => {
      const isSelected =
        selectedOptions[
          data[0].questions.findIndex((q) => q.qid === question.qid)
        ] === option;

      if (option === correctOption) {
        return (
          <h1 style={{ background: isSelected ? "blue" : "white" }}>
            {option}
          </h1>
        );
      } else if (isSelected) {
        return (
          <h1 style={{ background: "yellow" }} key={option}>
            {option}
          </h1>
        );
      } else {
        return (
          <h1 key={option} onClick={() => {}}>
            {option}
          </h1>
        );
      }
    });

    return (
      <div>
        <h1> {question.question}</h1>
        <div>{option}</div>
      </div>
    );
  });

  return <div>{questions}</div>;
}

export default AutoReview;
