import React, { useState, useEffect } from "react";
import AutoReview from "./AutoRevew.js";
import { useNavigate } from "react-router-dom";

export default function Auto({ data }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const trueAnswer = data[0].answer;
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState([]);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // Nouvelle variable d'état

  useEffect(() => {
    const answered =
      selectedOptions.length === data[0].questions.length &&
      selectedOptions.every((option) => option !== undefined); // Vérifie si toutes les questions ont une option sélectionnée
    setAllQuestionsAnswered(answered);
  }, [selectedOptions, data]);

  const handleOptionClick = (questionId, option) => {
    const questionIndex = data[0].questions.findIndex(
      (q) => q.qid === questionId
    );
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNextClick = () => {
    navigate("/autoreview", {
      state: { data: data, selectedOptions: selectedOptions },
    });
  };

  const questions = data[0].questions.map((question) => {
    const option = question.options.map((option) => {
      const isSelected =
        selectedOptions[
          data[0].questions.findIndex((q) => q.qid === question.qid)
        ] === option;
      return (
        <h1
          style={{ background: isSelected ? "red" : "white" }}
          onClick={() => handleOptionClick(question.qid, option)}
        >
          {option}
        </h1>
      );
    });
    return (
      <div>
        <h1> {question.question}</h1>
        <div>{option}</div>
      </div>
    );
  });

  return (
    <div>
      <h1> {data[0].text}</h1>
      {questions}
      <button onClick={handleNextClick} disabled={!allQuestionsAnswered}>
        Suivant
      </button>{" "}
      {/* Utilisation de la variable d'état pour désactiver le bouton */}
    </div>
  );
}
