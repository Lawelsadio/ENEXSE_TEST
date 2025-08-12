import React, { useState, useEffect, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AutoContext } from "./contexte.js";
import { QuestionMedia, QuestionBlock } from "./quiz-components";
import { COLORS, SPACING, RADIUS, COMMON_STYLES, LAYOUT } from "./quiz-styles";
import fallbackImg from "../images/voiture.png";

// Utilitaires (conservés pour compatibilité)
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
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(`../images/${imagePath}`);
  } catch (_) {
    return fallbackImg;
  }
}

function getAnswerLabel(correctToken, options, questionTexts, questionIndex, allQuestions) {
  const LETTERS = ["A","B","C","D","E","F","G","H","I","J","K"];
  const offset = allQuestions
    .slice(0, questionIndex)
    .reduce((acc, q) => acc + ensureArray(q.question).length, 0);
  
  const upperOptions = options.map((o) => String(o).toUpperCase().trim());
  const tokenUpper = String(correctToken || "").toUpperCase().trim();
  const hasYesNo = upperOptions.includes("OUI") || upperOptions.includes("NON");
  
  if (hasYesNo) {
    return tokenUpper;
  }
  
  const correctIdx = options.findIndex(opt => opt === correctToken);
  if (questionTexts.length === options.length && correctIdx >= 0) {
    return LETTERS[offset + correctIdx] || "";
  }
  
  return LETTERS[offset] || "";
}

// Composant pour le panneau de correction (énoncé)
function CorrectionPanel({ questions, correctAnswers, explanationText }) {
  const responseList = questions.map((question, idx) => {
    const options = ensureArray(question.options);
    const questionTexts = ensureArray(question.question);
    const correctToken = correctAnswers[idx];
    const correctIdx = options.findIndex(opt => opt === correctToken);
    const shownQuestionText =
      correctIdx >= 0 && correctIdx < questionTexts.length
        ? questionTexts[correctIdx]
        : questionTexts[0] || "";

    const label = getAnswerLabel(correctToken, options, questionTexts, idx, questions);

    return (
      <div
        key={question.qid}
        style={{
          display: "flex",
          gap: SPACING.md,
          width: "100%",
          backgroundColor: COLORS.secondary,
          marginBottom: SPACING.sm,
          padding: SPACING.md,
          borderRadius: RADIUS.sm,
          color: COLORS.black,
          alignItems: "center",
        }}
      >
        <div style={{ 
          width: "38%", 
          backgroundColor: COLORS.white, 
          ...COMMON_STYLES.flexCenter, 
          borderRadius: RADIUS.lg, 
          padding: SPACING.xl 
        }}>
          <h4 style={{ margin: 0, color: COLORS.black, fontWeight: 800 }}>
            {label}
          </h4>
        </div>
        <div style={{ 
          flexGrow: 1, 
          ...COMMON_STYLES.flexCenter 
        }}>
          <h4 style={{ margin: 0 }}>{shownQuestionText}</h4>
        </div>
      </div>
    );
  });

  return (
    <div style={{ 
      backgroundColor: COLORS.white, 
      display: "flex", 
      flexDirection: "column", 
      borderRadius: RADIUS.sm, 
      textAlign: "center", 
      alignItems: "center", 
      flexGrow: 1 
    }}>
      <div style={{ width: "100%" }}>
        <h3 style={{ margin: 0, marginBottom: SPACING.lg }}>
          <b>{explanationText}</b>
        </h3>
      </div>
      <div style={{ width: "100%" }}>
        {responseList}
      </div>
    </div>
  );
}

export default function TestcodeCorrigeeRefactored() {
  const { currentSerieIndex, setCurrentSerieIndex, setGlobalAnswer } = useContext(AutoContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const query = new URLSearchParams(location.search);
  const level = query.get("level");

  // États
  const [levelDoc, setLevelDoc] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answerSubmit, setAnswerSubmit] = useState(false);
  const [responseShow, setResponseShow] = useState(false);

  const levelData = useMemo(() => levelDoc?.items || [], [levelDoc]);
  const isOutOfRange = currentSerieIndex < 0 || currentSerieIndex >= levelData.length;
  
  const allQuestionsAnswered = useMemo(() => {
    if (isOutOfRange) return false;
    const numQuestions = levelData[currentSerieIndex].questions.length;
    return selectedOptions.length === numQuestions &&
           selectedOptions.every((opt) => opt !== undefined);
  }, [levelData, currentSerieIndex, selectedOptions, isOutOfRange]);

  // Fetch des données
  useEffect(() => {
    async function fetchLevel() {
      if (!level) return;
      try {
        const res = await fetch(`http://localhost:4000/api/v1/series/${level}`);
        const json = await res.json();
        setLevelDoc(json);
      } catch (e) {
        console.error("Erreur lors du chargement des données:", e);
      }
    }
    fetchLevel();
  }, [level]);

  if (!level || !levelDoc) {
    return (
      <div style={{ 
        padding: SPACING.xl, 
        ...COMMON_STYLES.flexCenter 
      }}>
        <h2>Chargement des données…</h2>
      </div>
    );
  }

  if (isOutOfRange) {
    return (
      <div style={{ 
        padding: SPACING.xl, 
        ...COMMON_STYLES.flexCenter 
      }}>
        <h2>Question introuvable</h2>
      </div>
    );
  }

  const currentItem = levelData[currentSerieIndex];
  const currentQuestions = currentItem.questions;
  const correctAnswers = ensureArray(currentItem.answers);
  const explanationText = currentItem.answerText;
  const isLast = currentSerieIndex === levelData.length - 1;

  // Handlers
  function handleOptionClick(questionId, option) {
    if (answerSubmit) return; // Désactive les clics après soumission
    
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
    if (!answerSubmit) {
      setAnswerSubmit(true);
      setResponseShow(false);
      return;
    }

    setGlobalAnswer((prev) => [...prev, selectedOptions]);

    if (isLast) {
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

  function toggleResponseView() {
    setResponseShow((prev) => !prev);
  }

  // Rendu des questions
  const questionsComponent = currentQuestions.map((question, qIdx) => {
    const selected = selectedOptions[qIdx];
    const correctOption = correctAnswers[qIdx];

    return (
      <QuestionBlock
        key={question.qid}
        question={question}
        questionIndex={qIdx}
        selectedOption={selected}
        correctAnswer={correctOption}
        isSubmitted={answerSubmit}
        onOptionClick={handleOptionClick}
      />
    );
  });

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      padding: SPACING.lg, 
      gap: LAYOUT.gap 
    }}>
      {/* Colonne gauche: image et titre */}
      <QuestionMedia
        level={level}
        currentIndex={currentSerieIndex}
        totalQuestions={levelData.length}
        item={currentItem}
        imageSource={getImageSource(currentItem.imageUrl)}
      />

      {/* Colonne droite: questions/réponses */}
      <div style={{ 
        ...COMMON_STYLES.card,
        width: LAYOUT.rightColumnWidth, 
        display: "flex", 
        flexDirection: "column" 
      }}>
        {/* En-tête */}
        {(!answerSubmit || responseShow) && (
          <div style={{ 
            backgroundColor: COLORS.secondary, 
            height: LAYOUT.headerHeight, 
            marginBottom: SPACING.md, 
            ...COMMON_STYLES.flexCenter,
            borderRadius: RADIUS.sm 
          }}>
            <h4 style={{ margin: 0 }}>
              <b>{answerSubmit ? "RÉPONSES" : "CHOISISSEZ VOS RÉPONSES"}</b>
            </h4>
          </div>
        )}

        {/* Corps principal */}
        <div style={{ flexGrow: 1 }}>
          {!answerSubmit && questionsComponent}
          {answerSubmit && !responseShow && (
            <CorrectionPanel
              questions={currentQuestions}
              correctAnswers={correctAnswers}
              explanationText={explanationText}
            />
          )}
          {answerSubmit && responseShow && questionsComponent}
        </div>

        {/* Boutons */}
        <div style={{ marginTop: SPACING.md }}>
          <button
            style={{
              ...COMMON_STYLES.button,
              backgroundColor: allQuestionsAnswered || answerSubmit ? COLORS.primary : COLORS.secondary,
              color: allQuestionsAnswered || answerSubmit ? COLORS.white : COLORS.black,
              width: "100%",
              opacity: (!answerSubmit && !allQuestionsAnswered) ? 0.6 : 1
            }}
            onClick={handleSubmitOrNext}
            disabled={!answerSubmit && !allQuestionsAnswered}
          >
            {isLast && answerSubmit ? "Terminé" : "Suivant"}
          </button>

          {answerSubmit && (
            <button
              style={{
                ...COMMON_STYLES.button,
                backgroundColor: COLORS.secondary,
                alignSelf: "flex-start",
                marginTop: SPACING.md,
                borderRadius: RADIUS.md
              }}
              onClick={toggleResponseView}
            >
              {responseShow ? "Énoncé" : "Réponses"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
