import React, { useState, useEffect, useContext, useRef } from "react";
import AutoReview from "./AutoRevew.js";
import { useNavigate } from "react-router-dom";
import { AutoContext } from "./contexte.js";

export default function Auto({ data }) {
  const {
    currentSerieIndex,
    setCurrentSerieIndex,
    globalAnswer,
    setGlobalAnswer,
  } = useContext(AutoContext);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const trueAnswer = data[currentSerieIndex].answer;

  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState([]);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // Nouvelle variable d'état
  const selectedOptionsRef = useRef();
  useEffect(() => {
    const answered =
      selectedOptions.length === data[currentSerieIndex].questions.length &&
      selectedOptions.every((option) => option !== undefined); // Vérifie si toutes les questions ont une option sélectionnée
  }, []);
  useEffect(() => {
    // Mettez à jour la référence à selectedOptions à chaque changement
    selectedOptionsRef.current = selectedOptions;
  }, [selectedOptions]);

  const handleOptionClick = (questionId, option) => {
    const questionIndex = data[currentSerieIndex].questions.findIndex(
      (q) => q.qid === questionId
    );
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleClick = () => {
    setGlobalAnswer([...globalAnswer, selectedOptionsRef.current]);

    console.log("test", [...globalAnswer, selectedOptionsRef.current]);
    console.log("selectedOptions selectedOptions", selectedOptionsRef.current);
    setCurrentSerieIndex(currentSerieIndex + 1);
    setSelectedOptions([]);
    navigate("/");
  };

  useEffect(() => {
    const interval = setInterval(handleClick, 10000); // 10 000 millisecondes = 10 secondes
    return () => clearInterval(interval);
  }, [currentSerieIndex]);

  console.log("globalAnswer", globalAnswer);
  const questions = data[currentSerieIndex].questions.map((question) => {
    const option = question.options.map((option, idx) => {
      const isSelected =
        selectedOptions[
          data[currentSerieIndex].questions.findIndex(
            (q) => q.qid === question.qid
          )
        ] === option;
      return (
        <h1
          key={idx}
          style={{ background: isSelected ? "red" : "white" }}
          onClick={() => handleOptionClick(question.qid, option)}
        >
          {option}
        </h1>
      );
    });
    return (
      <div key={question.qid}>
        <h1> {question.question}</h1>
        <div>{option}</div>
      </div>
    );
  });

  return (
    <div>
      <h1> {data[currentSerieIndex].text}</h1>
      {questions}
      <button onClick={handleClick}>Suivant</button>
    </div>
  );
}
