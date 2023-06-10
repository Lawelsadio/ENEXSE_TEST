import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AutoContext } from "./contexte.js";
import { useNavigate } from "react-router-dom";

function AutoReview() {
  const {
    currentSerieIndex,
    setCurrentSerieIndex,
    globalAnswer,
    setGlobalAnswer,
  } = useContext(AutoContext);
  const location = useLocation();
  const [responseSh, setResponseSh] = useState(false);
  const searchParams = new URLSearchParams(location.search);

  const level = searchParams.get("level");
  const { data, selectedOptions } = location.state;
  const trueAnswer = data[currentSerieIndex].answer;
  const navigate = useNavigate();

  const questions = data[currentSerieIndex].questions.map((question) => {
    // c est ici
    const correctOption =
      trueAnswer[
        data[currentSerieIndex].questions.findIndex(
          (q) => q.qid === question.qid
        )
      ];

    const option = question.options.map((option, idx) => {
      const isSelected =
        selectedOptions[
          data[currentSerieIndex].questions.findIndex(
            (q) => q.qid === question.qid
          )
        ] === option;

      if (option === correctOption) {
        return (
          <h1 key={idx} style={{ background: isSelected ? "blue" : "white" }}>
            {option}
          </h1>
        );
      } else if (isSelected) {
        return (
          <h1 style={{ background: "red" }} key={option}>
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
      <div key={question.qid}>
        <h1> {question.question}</h1>
        <div>{option}</div>
      </div>
    );
  });

  const answerText = data[currentSerieIndex].answerText;
  const texte = data[currentSerieIndex].answerText;
  const answer = data[currentSerieIndex].answer.toString();

  const display = !responseSh ? (
    <div>
      <h1>{answerText}</h1>
      <h2>{texte}</h2>
      <h2>
        Response :<b style={{ color: "red" }}>{answer}</b>
      </h2>
    </div>
  ) : (
    questions
  );
  const responseShow = () => {
    setResponseSh(!responseSh);
  };
  const handleNextClick = () => {
    setCurrentSerieIndex((prevIndex) => prevIndex + 1);
    const queryString = new URLSearchParams({ level }).toString();
    navigate(`/testCode?${queryString}`);
  };
  console.log("globalAnswer", globalAnswer);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        alignItems: "center",
        margin: "20px",
        justifyContent: "center",
      }}
    >
      {display}
      <div>
        <button onClick={handleNextClick}>Suivant</button>
        <button onClick={responseShow}>
          {responseSh ? "Response" : "Enoncé"}
        </button>
      </div>
    </div>
  );
}

export default AutoReview;
