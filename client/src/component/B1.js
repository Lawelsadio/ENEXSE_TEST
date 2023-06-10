import React, { useState } from "react";
import { Data } from "../Data.js";

function B1() {
  const data = Data;
  const niveau = ["un", "deux", "trois"];
  const [indexNiveau, setIndexNiveau] = useState(0);
  const [deasable, setDeasable] = useState(true);
  const [btnDiasabled, setBtnDiasabled] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentData, setCurrentData] = useState(data[0][niveau[indexNiveau]]);
  const dataLength = data[0][niveau[indexNiveau]].length;
  const curentDataoption = currentData[currentIndex].questions;
  const [userAnswer, setUserAnswer] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [globalAnswer, setGlobalAnswer] = useState([]);
  // myData permet de recuperer les donnees de ma question afficher
  const myData = curentDataoption.map((question, index) => {
    const options = question.options;
    const theQuestion = question.question;
    // option permet de faire le map des questions et returner les option
    const option = options.map((option, idx) => {
      const isSelected = selectedOptions.some((item) => item.answer === option);
      return (
        <div
          className={`hvr ${isSelected ? "option-selected" : ""}`}
          key={idx}
          onClick={() => handleOptionClick(theQuestion, option)}
        >
          <h2>{option}</h2>
        </div>
      );
    });

    return (
      <div className="wrapper2" key={index}>
        <div className="questions">
          <h3>{question.question}</h3>
        </div>
        <div className="options">{option}</div>
      </div>
    );
  });

  const handlePreviousClick = () => {
    if (currentIndex === data.length - 1) {
      return;
    }
    setCurrentIndex((prevState) => prevState - 1);
  };
  const handleNextClick = () => {
    setGlobalAnswer([...selectedOptions, ...globalAnswer]);
    setSelectedOptions([]);
    if (indexNiveau < niveau.length - 1) {
      if (currentIndex === dataLength - 1) {
        setIndexNiveau((prevState) => prevState + 1);
        setCurrentIndex(0);
        setCurrentData(data[0][niveau[indexNiveau + 1]]);
        return;
      }
      return setCurrentIndex((prevState) => prevState + 1);
    }
    if (indexNiveau === niveau.length - 1) {
      if (currentIndex !== dataLength - 1) {
        return setCurrentIndex((prevState) => prevState + 1);
      }
      return setDeasable(true);
    }
  };

  const textt = currentData[currentIndex].text && (
    <h3 className="question-text">{currentData[currentIndex].text}</h3>
  );

  console.log("userAnswer", userAnswer);
  console.log("selectedOptions", selectedOptions);
  console.log("selectedOptions", selectedOptions);
  console.log("globalAnswer", globalAnswer);

  const handleOptionClick = (question, answer) => {
    const answerIndex = selectedOptions.findIndex(
      (item) => item.answer === answer
    );
    if (answerIndex !== -1) {
      const newArray = selectedOptions.filter(
        (_, index) => index !== answerIndex
      );
      setSelectedOptions(newArray);
    } else {
      setSelectedOptions(
        selectedOptions.concat({ question: question, answer: answer })
      );
    }
    setBtnDiasabled(false);
  };

  return (
    <div className="main">
      <img
        className="question-img"
        src={currentData[currentIndex].image}
        alt="Alternate text"
      />
      {textt}
      {myData}
      <div style={{ margin: "5px" }}>
        <button
          type="button"
          className="btn-precedant"
          onClick={handlePreviousClick}
        >
          Precedant
        </button>
        <button
          type="button"
          className="btn-suivant"
          onClick={handleNextClick}
          disabled={selectedOptions.length === 0}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default B1;
