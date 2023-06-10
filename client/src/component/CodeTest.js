import React, { useState, useEffect, useContext } from "react";
import AutoReview from "./AutoRevew.js";
import { useNavigate } from "react-router-dom";
import { AutoContext } from "./contexte.js";

export default function CodeTest({ data }) {
  const { currentSerieIndex, setCurrentSerieIndex } = useContext(AutoContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timerId, setTimerId] = useState(null);

  const trueAnswer = data[currentSerieIndex].answer;
  console.log("trueAnswer", trueAnswer);
  console.log("currentSerieIndex", currentSerieIndex);

  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState([]);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // Nouvelle variable d'état
  useEffect(() => {
    const answered =
      selectedOptions.length === data[currentSerieIndex].questions.length &&
      selectedOptions.every((option) => option !== undefined); // Vérifie si toutes les questions ont une option sélectionnée
    setAllQuestionsAnswered(answered);
  }, [selectedOptions, data, currentSerieIndex]);
  useEffect(() => {
    setAllQuestionsAnswered(false); // réinitialise le drapeau des questions répondues
    setSelectedOptions([]); // réinitialise les options sélectionnées
    setUserAnswer([]); // réinitialise la réponse utilisateur

    // démarre le minuteur de 5 secondes
    //const id = setTimeout(() => {
    //  setCurrentSerieIndex(currentSerieIndex + 1);
    //}, 5000);

    // stocke l'ID du minuteur
    // setTimerId(id);

    // nettoie le minuteur précédent lorsqu'un nouveau est démarré
    // return () => clearTimeout(timerId);
  }, [currentSerieIndex]);

  const handleOptionClick = (questionId, option) => {
    const questionIndex = data[currentSerieIndex].questions.findIndex(
      (q) => q.qid === questionId
    );
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleClick = () => {
    setCurrentSerieIndex((prevIndex) => prevIndex + 1);
  };

  const questions = data[currentSerieIndex].questions.map((question) => {
    const option = question.options.map((option) => {
      const isSelected =
        selectedOptions[
          data[currentSerieIndex].questions.findIndex(
            (q) => q.qid === question.qid
          )
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
  const isLastQuestion = currentSerieIndex === data.length - 1;

  const buttonText = isLastQuestion ? "Terminer" : "Suivant";
  return (
    <div>
      <h1> {data[currentSerieIndex].text}</h1>
      {questions}
      <button onClick={handleClick} disabled={!allQuestionsAnswered}>
        {currentSerieIndex === data.length - 1 ? "Terminer" : "Suivant"}
      </button>
    </div>
  );
}
