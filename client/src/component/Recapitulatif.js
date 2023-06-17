import React, { useState, useContext, useEffect } from "react";
import { dataa } from "../Data.js";
import { useNavigate } from "react-router-dom";
import { AutoContext } from "./contexte.js";
import voiture from "../images/voiture.png";
import { useLocation } from "react-router-dom";

function Recapitulatif() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const seriLevel = searchParams.get("level");
  const { data: newData } = location.state;
  const dataWithI = newData.map((obj) => ({ ...obj, dataIndex: false }));
  const [data, setData] = useState(dataWithI);
  const navigate = useNavigate();
  const {
    currentSerieIndex,
    setCurrentSerieIndex,
    globalAnswer,
    setGlobalAnswer,
  } = useContext(AutoContext);
  const [activeIndex, setActiveIndex] = useState([]);

  useEffect(() => {
    setCurrentSerieIndex(0);
  }, []);

  const handleClick = (index) => {
    let objIndex = data.findIndex((obj) => obj.id === index);
    if (objIndex !== -1) {
      const updatedData = [...data]; // Crée une copie du tableau seriData
      // Met à jour la valeur de DataIndex pour l'objet correspondant
      const dataIndex = updatedData[objIndex].dataIndex;
      updatedData[objIndex] = {
        ...updatedData[objIndex],
        dataIndex: !dataIndex,
      };
      console.log("updatedData[objIndex]", updatedData[objIndex]);

      setData(updatedData);
    }
    setActiveIndex(index === activeIndex ? null : index);
  };
  const showLevels = data.map((level, idx) => {
    ////////////////////////////////
    let trueAnswer = level.answer;
    const selectedOptions = globalAnswer[level.id - 1];

    const recapitulatifQuestions = level.questions.map((question, idx) => {
      const correctOption =
        trueAnswer[level.questions.findIndex((q) => q.qid === question.qid)];
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
            level.questions.findIndex((q) => q.qid === question.qid)
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
        } else if (isSelected) {
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

    ///////////////////////////////////////////

    const isActive = level.dataIndex === true;
    const itemClassName = isActive ? "accordion-item " : "accordion-item  ";
    const titleClassName = isActive
      ? " accordion-title active accordion-title"
      : " accordion-title  ";

    return (
      <div
        className={itemClassName}
        key={level.id}
        style={{ marginBottom: "5px" }}
      >
        <div
          className={titleClassName}
          style={{ borderBottom: "0px " }}
          onClick={() => handleClick(level.id)}
        >
          <b>{`Serie ${seriLevel} question ${level.id}`}</b>
        </div>
        {isActive && (
          <div className="accordion-content">{recapitulatifQuestions}</div>
        )}
      </div>
    );
  });

  return (
    <div
      style={{
        backgroundColor: "#edeceb",
        backgroundImage: `url(${voiture})`,
        height: "700px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        width: "80%",
        alignContent: "center",
        flexGrow: 1,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          margin: "20px",
          marginBottom: "0px",
          marginTop: "0px",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div className="card" style={{ width: "50%", height: "122px" }}>
          Accroche
        </div>
        <div
          className="accordion"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        >
          {showLevels}
        </div>
      </div>
    </div>
  );
}

export default Recapitulatif;
