import React, { useState, useEffect, useContext } from "react";
import AutoReview from "./AutoRevew.js";
import { useNavigate } from "react-router-dom";
import { AutoContext } from "./contexte.js";
import { useLocation } from "react-router-dom";

export default function Auto({ data }) {
  const {
    currentSerieIndex,
    setCurrentSerieIndex,
    globalAnswer,
    setGlobalAnswer,
  } = useContext(AutoContext);
  /*
const handleClick = () => {
    setResponseShow(!responseShow);
    setAnswerSubmit(!answerSubmit);
    const queryString = new URLSearchParams({ level }).toString();
    navigate(`/autoreview?${queryString}`, {
      state: {
        data: levelData,
        selectedOptions: selectedOptions,
      },
    });
  };
*/
  const [selectedOptions, setSelectedOptions] = useState([]);
  const location = useLocation();
  const [responseShow, setResponseShow] = useState(true);
  const [answerSubmit, setAnswerSubmit] = useState(false);

  const searchParams = new URLSearchParams(location.search);

  const level = searchParams.get("level");
  const levelData = data[0].serie_b[level];
  const trueAnswer = levelData[currentSerieIndex].answer;
  const answerText = levelData[currentSerieIndex].answerText;
  const texte = levelData[currentSerieIndex].answerText;
  const answer = levelData[currentSerieIndex].answer.toString();
  const navigate = useNavigate();

  const [userAnswer, setUserAnswer] = useState([]);
  const [trueAnswerData, setTrueAnswerData] = useState([]);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // Nouvelle variable d'état

  const questionAnswerArrays = levelData[currentSerieIndex].questions.map(
    (question, index) => {
      return {
        question: question.question,
        answer: levelData[currentSerieIndex].answer[index],
      };
    }
  );

  const response = trueAnswerData.map((data, idx) => {
    return (
      <div
        style={{
          display: "flex",
          gap: "10px",
          width: "100%",
          backgroundColor: "#CCCCCC",
          marginBottom: "5px",
          padding: "20px",
          borderRadius: "10px",
          color: "black",
        }}
      >
        <div
          style={{
            width: "30%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: "20px",
            color: "red",
          }}
        >
          <h4>
            <b>{data.answer}</b>
          </h4>
        </div>
        <div
          style={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4>{data.question}</h4>
        </div>
      </div>
    );
  });
  useEffect(() => {
    const answered =
      selectedOptions.length ===
        levelData[currentSerieIndex].questions.length &&
      selectedOptions.every((option) => option !== undefined); // Vérifie si toutes les questions ont une option sélectionnée

    setAllQuestionsAnswered(answered);
  }, [levelData, currentSerieIndex]);
  console.log("globalAnswer", globalAnswer);
  const handleOptionClick = (questionId, option) => {
    const questionIndex = levelData[currentSerieIndex].questions.findIndex(
      (q) => q.qid === questionId
    );
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
  };
  const handleClick = () => {
    setResponseShow(!responseShow);
    setTrueAnswerData(questionAnswerArrays);
    console.log("answerSubmit", answerSubmit);

    if (answerSubmit) {
      setAnswerSubmit(false);
      setCurrentSerieIndex((prevIndex) => prevIndex + 1);
      setTrueAnswerData(questionAnswerArrays);
      setResponseShow(true);
    } else {
      setAnswerSubmit(true);
    }
  };

  const questions2 =
    answerSubmit &&
    responseShow &&
    levelData[currentSerieIndex].questions.map((question) => {
      const correctOption =
        trueAnswer[
          levelData[currentSerieIndex].questions.findIndex(
            (q) => q.qid === question.qid
          )
        ];

      const option = question.options.map((option, idx) => {
        const isSelected =
          selectedOptions[
            levelData[currentSerieIndex].questions.findIndex(
              (q) => q.qid === question.qid
            )
          ] === option;

        if (option === correctOption) {
          return (
            <h4
              className="choix"
              key={idx}
              style={{
                background: isSelected ? "green" : "orange",
                borderRadius: "10px",
                border: "solid #CCCCCC",
              }}
            >
              {option}
            </h4>
          );
        } else if (isSelected) {
          return (
            <h4
              className="choix"
              key={idx}
              style={{
                background: "red",
                borderRadius: "10px",
                border: "solid #CCCCCC",
              }}
            >
              {option}
            </h4>
          );
        } else {
          return (
            <h4
              className="choix"
              key={idx}
              style={{
                color: isSelected && "white",
                borderRadius: "10px",
                border: "solid #CCCCCC",
              }}
            >
              {option}
            </h4>
          );
        }
      });

      return (
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#CCCCCC",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
          key={question.qid}
        >
          <div style={{ width: "65%" }}>
            <h4>
              <b>{question.question}</b>
            </h4>
          </div>
          <div
            style={{
              width: "35%",
              backgroundColor: "white",
              padding: "10px",
              paddingBottom: "0px",
              borderRadius: "10px",
            }}
          >
            {option}
          </div>
        </div>
      );
    });

  const questions = levelData[currentSerieIndex].questions.map((question) => {
    const option = question.options.map((option, idx) => {
      const isSelected =
        selectedOptions[
          levelData[currentSerieIndex].questions.findIndex(
            (q) => q.qid === question.qid
          )
        ] === option;
      return (
        <h4
          className="choix"
          key={idx}
          style={{
            background: isSelected ? "#3399FF" : "#CCCCCC",
            textTransform: isSelected && "uppercase",
            color: isSelected && "white",
            borderRadius: "10px",
            border: isSelected && "solid black",
          }}
          onClick={() => handleOptionClick(question.qid, option)}
        >
          {option}
        </h4>
      );
    });
    return (
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#CCCCCC",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
        key={question.qid}
      >
        <div style={{ width: "65%" }}>
          <h4>
            <b>{question.question}</b>
          </h4>
        </div>
        <div
          style={{
            width: "35%",
            backgroundColor: "white",
            padding: "10px",
            paddingBottom: "0px",
            borderRadius: "10px",
          }}
        >
          {option}
        </div>
      </div>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "15px",
        gap: "5%",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "40%",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: "#CCCCCC",
            height: "45px",
            marginBottom: "10px",
            display: "flex",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: "25%",
              backgroundColor: "#999999",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          >
            <h4>
              <b>{level}</b>
            </h4>
          </div>
          <div style={{ flexGrow: 1, padding: "10px" }}>
            <h4>
              <b>{`QUESTION ${currentSerieIndex + 1}/${levelData.length}`}</b>
            </h4>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#CCCCCC",
            height: "23%",
            width: "100%",
            margin: "0px",
            marginBottom: "2px",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1> {levelData[currentSerieIndex].text}</h1>
        </div>
        <div
          style={{
            backgroundColor: "#CCCCCC",
            flexGrow: 1,
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
            src="https://media.istockphoto.com/id/1146517111/fr/photo/mausol%C3%A9e-du-taj-mahal-%C3%A0-agra.jpg?s=612x612&w=0&k=20&c=jfsf7jwrVlGMpFq8F7B45u4RBlzpHUQOubAO0jD4NVI="
            alt="Girl in a jacket"
            height="100%"
            width="100%"
            padding="0px"
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          width: "40%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        {answerSubmit && !responseShow ? (
          ""
        ) : (
          <div
            style={{
              backgroundColor: "#CCCCCC",
              height: "45px",
              marginBottom: "10px",
              display: "flex",
              textAlign: "center",
              padding: "10px",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            <h4>
              <b>CHOISISSEZ VOS REPONSES </b>
            </h4>
          </div>
        )}

        {!answerSubmit && responseShow ? (
          questions
        ) : answerSubmit && !responseShow ? (
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              height: "100%",
              flexDirection: "column",
              borderRadius: "10px",
              textAlign: "center",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <div style={{ width: "100%" }}>
              <h3>
                <b>{texte}</b>
              </h3>
            </div>
            <div
              style={{
                height: "100%",
              }}
            >
              <h3
                style={{
                  padding: "20px",
                }}
              >
                <b> REPONSES</b>
              </h3>
              {response}
            </div>
          </div>
        ) : (
          questions2
        )}
        <button
          className="submitBtb"
          style={{ borderRadius: "10px" }}
          onClick={handleClick}
        >
          <b>Suivant</b>
        </button>
      </div>
      {answerSubmit && (
        <button
          className="choix"
          style={{
            alignSelf: "flex-start",
            padding: "10px",
            marginInlineEnd: "-35px",
            borderRadius: "20px ",
          }}
          onClick={() => setResponseShow(!responseShow)}
        >
          {answerSubmit && !responseShow ? "Enoncé" : "Response"}
        </button>
      )}
    </div>
  );
}
