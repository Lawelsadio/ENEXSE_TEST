import React, { useState, useEffect, useContext, useRef } from "react";
import AutoReview from "./AutoRevew.js";
import { useNavigate } from "react-router-dom";
import { AutoContext } from "./contexte.js";
import { useLocation } from "react-router-dom";
import image1 from "../images/B1_image1.png";

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
  const answerIndexed = useRef();

  const response = trueAnswerData.map((data, idx) => {
    const answerIndex1 = ["A", "B", "C", "D", "E"];
    const answerIndex2 = ["OUI", "NON"];
    answerIndexed.current = -1;
    const answerIndexes = [answerIndex1, answerIndex2]; // Tableaux d'index regroupés
    for (let i = 0; i < answerIndexes.length; i++) {
      const answerIndex = answerIndexes[i];
      if (answerIndex.includes(data.answer)) {
        data.answer === "NON"
          ? (answerIndexed.current = 0)
          : (answerIndexed.current = answerIndex.indexOf(data.answer));
        break;
      }
    }
    return (
      <div
        key={idx}
        style={{
          display: "flex",
          gap: "10px",
          width: "100%",
          backgroundColor: "#CCCCCC",
          marginBottom: "5px",
          padding: "10px",
          borderRadius: "10px",
          color: "black",
        }}
      >
        <div
          style={{
            width: "38%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            alignContent: "center",
            borderRadius: "50px",
            color: "red",
            padding: "20px",
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
          <h4>{data.question[answerIndexed.current]}</h4>
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
    if (answerSubmit && currentSerieIndex === levelData.length - 1) {
      setAnswerSubmit(false);
      setTrueAnswerData([]);
      setResponseShow(false);
      setGlobalAnswer((prevState) => [...prevState, selectedOptions]);
      setSelectedOptions([]);
      const queryString = new URLSearchParams({ level }).toString();
      navigate(`/recapitulatif?${queryString}`, {
        state: {
          data: levelData,
        },
      });
    } else if (answerSubmit) {
      setAnswerSubmit(false);
      setCurrentSerieIndex((prevIndex) => prevIndex + 1);
      setGlobalAnswer((prevState) => [...prevState, selectedOptions]);
      setTrueAnswerData(questionAnswerArrays);
      setResponseShow(true);
      setSelectedOptions([]);
    } else {
      setAnswerSubmit(true);
    }
  };
  console.log("globalAnswer", globalAnswer);

  const questions2 =
    answerSubmit &&
    responseShow &&
    levelData[currentSerieIndex].questions.map((question, idx) => {
      const correctOption =
        trueAnswer[
          levelData[currentSerieIndex].questions.findIndex(
            (q) => q.qid === question.qid
          )
        ];
      const questio = question.question.map((q, idx) => {
        return (
          <h4
            key={idx}
            style={{
              borderRadius: "10px",
              cursor: "default",
              padding: "15px",
              border: "solid transparent",
            }}
          >
            {q}
          </h4>
        );
      });
      const option = question.options.map((option, idx) => {
        const isSelected =
          selectedOptions[
            levelData[currentSerieIndex].questions.findIndex(
              (q) => q.qid === question.qid
            )
          ] === option;
        if (option === correctOption) {
          return (
            <div>
              {question.question.length === question.options.length ? (
                <div
                  key={idx}
                  style={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor: "white",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    paddingInlineEnd: "0px",
                  }}
                >
                  <div style={{ width: "65%" }}>
                    <h4>{question.question[idx]}</h4>
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
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          );
        } /// le else ici
        else if (isSelected) {
          return (
            <div key={idx}>
              {question.question.length === question.options.length ? (
                <div
                  style={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor: "white",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    paddingInlineEnd: "0px",
                  }}
                >
                  <div style={{ width: "65%" }}>
                    <h4>{question.question[idx]}</h4>
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
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          );
        } else {
          return (
            <div key={idx}>
              {question.question.length === question.options.length ? (
                <div
                  style={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor: "white",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    paddingInlineEnd: "0px",
                  }}
                >
                  <div style={{ width: "65%" }}>
                    <h4>{question.question[idx]}</h4>
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
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          );
        }
      });
      return (
        <div idx>
          {question.question.length === question.options.length ? (
            <div
              style={{
                width: "100%",
                backgroundColor: "#CCCCCC",
                padding: "10px",
                paddingBottom: "0px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "5px",
              }}
            >
              {option}
            </div>
          ) : (
            <div
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "5px",
                backgroundColor: "#CCCCCC",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
              key={question.qid}
            >
              <div
                style={{
                  width: "65%",
                  backgroundColor: "white",
                  padding: "10px",
                  paddingBottom: "0px",
                  borderRadius: "10px",
                }}
              >
                {questio}
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
          )}
        </div>
      );
    });

  const questions = levelData[currentSerieIndex].questions.map(
    (question, idx) => {
      const questio = question.question.map((q, idx) => {
        return (
          <h4
            key={idx}
            style={{
              borderRadius: "10px",
              cursor: "default",
              padding: "15px",
              border: "solid transparent",
            }}
          >
            {q}
          </h4>
        );
      });
      const option = question.options.map((option, idx) => {
        const isSelected =
          selectedOptions[
            levelData[currentSerieIndex].questions.findIndex(
              (q) => q.qid === question.qid
            )
          ] === option;

        return (
          <div key={idx}>
            {question.question.length === question.options.length ? (
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "5px",
                  backgroundColor: "white",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  paddingInlineEnd: "0px",
                }}
              >
                <div style={{ width: "65%" }}>
                  <h4>{question.question[idx]}</h4>
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
                </div>
              </div>
            ) : (
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
            )}
          </div>
        );
      });
      return (
        <div key={idx}>
          {question.question.length === question.options.length ? (
            <div
              style={{
                width: "100%",
                backgroundColor: "#CCCCCC",
                padding: "10px",
                paddingBottom: "0px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "5px",
              }}
            >
              {option}
            </div>
          ) : (
            <div
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "5px",
                backgroundColor: "#CCCCCC",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
              key={question.qid}
            >
              <div
                style={{
                  width: "65%",
                  backgroundColor: "white",
                  padding: "10px",
                  paddingBottom: "0px",
                  borderRadius: "10px",
                }}
              >
                {questio}
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
          )}
        </div>
      );
    }
  );

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
            src={require(`../images/${levelData[currentSerieIndex].image}`)}
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
            <div>
              <h3
                style={{
                  padding: "20px",
                }}
              >
                <b> REPONSES</b>
              </h3>
              <div>{response}</div>
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
          {currentSerieIndex < levelData.length - 1 ? (
            <b>Suivant</b>
          ) : (
            <b>Terminé</b>
          )}
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
