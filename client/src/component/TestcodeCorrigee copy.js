import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AutoContext } from "./contexte.js";
import fallbackImg from "../images/voiture.png";

function ensureArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.length > 0) return [value];
  return [];
}

function getImageSource(imagePath) {
  if (!imagePath) return fallbackImg;
  const lower = String(imagePath).toLowerCase();
  if (lower.startsWith("http://") || lower.startsWith("https://")) {
    return imagePath;
  }
  try {
    // Essaye de charger un asset local situé dans src/images
    // Note: ce require dynamique doit correspondre à un fichier existant
    // Sinon on retombe sur l'image de secours
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(`../images/${imagePath}`);
  } catch (_) {
    return fallbackImg;
  }
}

function findAnswerIndex(answerToken, options) {
  // Essaie d'interpréter les réponses de type "A/B/C/D/E" ou "OUI/NON"
  const letters = ["A", "B", "C", "D", "E"];
  const yn = ["OUI", "NON"];

  if (letters.includes(answerToken)) {
    return letters.indexOf(answerToken);
  }
  if (yn.includes(answerToken)) {
    return options.indexOf(answerToken);
  }
  // Sinon on tente une correspondance exacte dans options
  const idx = options.indexOf(answerToken);
  return idx >= 0 ? idx : -1;
}

export default function TestcodeCorrigee({ data }) {
  const {
    currentSerieIndex,
    setCurrentSerieIndex,
    globalAnswer,
    setGlobalAnswer,
  } = useContext(AutoContext);

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const level = query.get("level");

  const levelData = data?.[0]?.serie_b?.[level] || [];
  const isOutOfRange =
    currentSerieIndex < 0 || currentSerieIndex >= levelData.length;

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answerSubmit, setAnswerSubmit] = useState(false);
  const [responseShow, setResponseShow] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  useEffect(() => {
    if (isOutOfRange) return;
    const numQuestions = levelData[currentSerieIndex].questions.length;
    const answered =
      selectedOptions.length === numQuestions &&
      selectedOptions.every((opt) => opt !== undefined);
    setAllQuestionsAnswered(answered);
  }, [levelData, currentSerieIndex, selectedOptions, isOutOfRange]);

  if (!level || levelData.length === 0 || isOutOfRange) {
    return (
      <div style={{ padding: 20 }}>
        Données indisponibles pour ce niveau.
      </div>
    );
  }

  const currentItem = levelData[currentSerieIndex];
  const currentQuestions = currentItem.questions;
  const correctAnswers = ensureArray(currentItem.answer);
  const explanationText = currentItem.answerText;

  function handleOptionClick(questionId, option) {
    const questionIndex = currentQuestions.findIndex((q) => q.qid === questionId);
    const updated = [...selectedOptions];
    updated[questionIndex] = option;
    setSelectedOptions(updated);
  }

  function goToRecap() {
    const qs = new URLSearchParams({ level }).toString();
    navigate(`/recapitulatif?${qs}`, {
      state: { data: levelData },
    });
  }

  function handleSubmitOrNext() {
    // Première étape: afficher la correction si pas encore soumise
    if (!answerSubmit) {
      setAnswerSubmit(true);
      setResponseShow(false); // affiche d'abord l'énoncé avec explication
      return;
    }

    // Étape suivante: passer à la question suivante ou récapitulatif
    const isLast = currentSerieIndex === levelData.length - 1;
    setGlobalAnswer((prev) => [...prev, selectedOptions]);

    if (isLast) {
      // Reset pour le prochain passage éventuel
      setSelectedOptions([]);
      setAnswerSubmit(false);
      setResponseShow(false);
      goToRecap();
      return;
    }

    setCurrentSerieIndex((prev) => prev + 1);
    setSelectedOptions([]);
    setAnswerSubmit(false);
    setResponseShow(false);
  }

function renderChoice(option, isSelected, isCorrect, ownerQid, onSelect) {
    const baseStyle = {
      borderRadius: "10px",
      border: "solid #CCCCCC",
      padding: "10px",
    };

    if (answerSubmit) {
      if (isCorrect) {
        return (
          <h4 className="choix" style={{ ...baseStyle, background: "green", color: "white" }}>
            {option}
          </h4>
        );
      }
      if (isSelected && !isCorrect) {
        return (
          <h4 className="choix" style={{ ...baseStyle, background: "red", color: "white" }}>
            {option}
          </h4>
        );
      }
      return (
        <h4 className="choix" style={{ ...baseStyle }}>{option}</h4>
      );
    }

    // Mode sélection
    return (
      <h4
        className="choix"
        style={{
          ...baseStyle,
          background: isSelected ? "#3399FF" : "#CCCCCC",
          color: isSelected ? "white" : undefined,
          border: isSelected ? "solid black" : baseStyle.border,
          textTransform: isSelected ? "uppercase" : undefined,
          cursor: "pointer",
        }}
        onClick={() => onSelect(ownerQid, option)}
      >
        {option}
      </h4>
    );
  }

  // Rendu des questions en mode sélection ou correction colorée (questions2)
  const questionsColored = currentQuestions.map((question, qIdx) => {
    const questionTexts = ensureArray(question.question);
    const options = ensureArray(question.options);
    const selected = selectedOptions[qIdx];
    const correctOption = correctAnswers[qIdx];

    const optionBlocks = options.map((opt, idx) => {
      const isSelected = selected === opt;
      const isCorrect = opt === correctOption;
      return (
        <div key={idx}>
          {renderChoice(opt, isSelected, isCorrect, question.qid, handleOptionClick)}
        </div>
      );
    });

    const pairedLayout = questionTexts.length === options.length;

    if (pairedLayout) {
      // Affichage par paires Question[i] ↔ Option[i]
      return (
        <div key={question.qid} style={{ backgroundColor: "#CCCCCC", borderRadius: 10, padding: 10, marginBottom: 10 }}>
          {options.map((opt, idx) => {
            const isSelected = selected === opt;
            const isCorrect = opt === correctOption;
            return (
              <div key={idx} style={{ display: "flex", gap: 5, justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: "65%", backgroundColor: "white", padding: 10, borderRadius: 10 }}>
                  <h4 style={{ margin: 0 }}>{questionTexts[idx]}</h4>
                </div>
                <div style={{ width: "35%", backgroundColor: "white", padding: 10, borderRadius: 10 }}>
                  {renderChoice(opt, isSelected, isCorrect, question.qid, handleOptionClick)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Affichage classique: bloc question puis bloc options
    return (
      <div key={question.qid} style={{ display: "flex", gap: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: "#CCCCCC", borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ width: "65%", backgroundColor: "white", padding: 10, borderRadius: 10 }}>
          {questionTexts.map((qt, i) => (
            <h4 key={i} style={{ margin: 0, padding: 10 }}>{qt}</h4>
          ))}
        </div>
        <div style={{ width: "35%", backgroundColor: "white", padding: 10, borderRadius: 10 }}>
          {optionBlocks}
        </div>
      </div>
    );
  });

  // Liste des réponses avec correspondance question ↔ bonne réponse (vue "Enoncé")
  const responseList = currentQuestions.map((question, idx) => {
    const options = ensureArray(question.options);
    const questionTexts = ensureArray(question.question);
    const correctToken = correctAnswers[idx];
    const correctIdx = findAnswerIndex(correctToken, options);
    const shownQuestionText =
      correctIdx >= 0 && correctIdx < questionTexts.length
        ? questionTexts[correctIdx]
        : questionTexts[0] || "";

    return (
      <div
        key={question.qid}
        style={{
          display: "flex",
          gap: 10,
          width: "100%",
          backgroundColor: "#CCCCCC",
          marginBottom: 5,
          padding: 10,
          borderRadius: 10,
          color: "black",
          alignItems: "center",
        }}
      >
        <div style={{ width: "38%", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", borderRadius: 50, color: "red", padding: 20 }}>
          <h4 style={{ margin: 0 }}><b>{correctToken}</b></h4>
        </div>
        <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h4 style={{ margin: 0 }}>{shownQuestionText}</h4>
        </div>
      </div>
    );
  });

  const isLast = currentSerieIndex === levelData.length - 1;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 15, gap: "5%" }}>
      {/* Colonne gauche: image et titre */}
      <div style={{ backgroundColor: "white", width: "40%", display: "flex", flexDirection: "column", padding: 10, borderRadius: 10 }}>
        <div style={{ backgroundColor: "#CCCCCC", height: 45, marginBottom: 10, display: "flex", borderRadius: 10 }}>
          <div style={{ width: "25%", backgroundColor: "#999999", padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
            <h4 style={{ margin: 0 }}><b>{level}</b></h4>
          </div>
          <div style={{ flexGrow: 1, padding: 10 }}>
            <h4 style={{ margin: 0 }}><b>{`QUESTION ${currentSerieIndex + 1}/${levelData.length}`}</b></h4>
          </div>
        </div>
        <div style={{ backgroundColor: "#CCCCCC", width: "100%", marginBottom: 2, borderTopRightRadius: 10, borderTopLeftRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ margin: 10 }}>{currentItem.text}</h1>
        </div>
        <div style={{ backgroundColor: "#CCCCCC", flexGrow: 1, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
          <img
            style={{ objectFit: "cover", borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
            src={getImageSource(currentItem.image)}
            alt="Question illustration"
            height="100%"
            width="100%"
          />
        </div>
      </div>

      {/* Colonne droite: questions/réponses */}
      <div style={{ backgroundColor: "white", width: "40%", display: "flex", flexDirection: "column", borderRadius: 10, padding: 10 }}>
        {/* En-tête */}
        {answerSubmit && !responseShow ? null : (
          <div style={{ backgroundColor: "#CCCCCC", height: 45, marginBottom: 10, display: "flex", textAlign: "center", padding: 10, justifyContent: "center", borderRadius: 10 }}>
            <h4 style={{ margin: 0 }}><b>{answerSubmit ? "RÉPONSES" : "CHOISISSEZ VOS RÉPONSES"}</b></h4>
          </div>
        )}

        {/* Corps */}
        {!answerSubmit && questionsColored}
        {answerSubmit && !responseShow && (
          <div style={{ backgroundColor: "white", display: "flex", flexDirection: "column", borderRadius: 10, textAlign: "center", alignItems: "center", flexGrow: 1 }}>
            <div style={{ width: "100%" }}>
              <h3 style={{ margin: 0 }}><b>{explanationText}</b></h3>
            </div>
            <div style={{ width: "100%", marginTop: 10 }}>{responseList}</div>
          </div>
        )}
        {answerSubmit && responseShow && questionsColored}

        {/* Boutons */}
        <button
          className="submitBtb"
          style={{ borderRadius: 10, marginTop: 10 }}
          onClick={handleSubmitOrNext}
          disabled={!answerSubmit && !allQuestionsAnswered}
        >
          <b>{isLast && answerSubmit ? "Terminé" : "Suivant"}</b>
        </button>

        {answerSubmit && (
          <button
            className="choix"
            style={{ alignSelf: "flex-start", padding: 10, marginInlineEnd: -35, borderRadius: 20, marginTop: 10 }}
            onClick={() => setResponseShow((prev) => !prev)}
          >
            {responseShow ? "Énoncé" : "Réponses"}
          </button>
        )}
      </div>
    </div>
  );
}


