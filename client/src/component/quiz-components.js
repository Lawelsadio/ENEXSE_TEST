import React from "react";
import { COLORS, SPACING, RADIUS, COMMON_STYLES, LAYOUT } from "./quiz-styles";

// Composant pour l'affichage de l'image et du titre de la question
export function QuestionMedia({ level, currentIndex, totalQuestions, item, imageSource }) {
  return (
    <div style={{ 
      ...COMMON_STYLES.card, 
      width: LAYOUT.leftColumnWidth,
      display: "flex", 
      flexDirection: "column" 
    }}>
      {/* En-tête avec niveau et numéro de question */}
      <div style={{ 
        backgroundColor: COLORS.secondary, 
        height: LAYOUT.headerHeight, 
        marginBottom: SPACING.md, 
        display: "flex", 
        borderRadius: RADIUS.sm 
      }}>
        <div style={{ 
          width: "25%", 
          backgroundColor: COLORS.dark, 
          padding: SPACING.md, 
          borderTopLeftRadius: RADIUS.sm, 
          borderBottomLeftRadius: RADIUS.sm 
        }}>
          <h4 style={{ margin: 0 }}><b>{level}</b></h4>
        </div>
        <div style={{ flexGrow: 1, padding: SPACING.md }}>
          <h4 style={{ margin: 0 }}>
            <b>{`QUESTION ${currentIndex + 1}/${totalQuestions}`}</b>
          </h4>
        </div>
      </div>

      {/* Titre de la question */}
      <div style={{ 
        backgroundColor: COLORS.secondary, 
        width: "100%", 
        marginBottom: SPACING.xs, 
        borderTopRightRadius: RADIUS.sm, 
        borderTopLeftRadius: RADIUS.sm, 
        ...COMMON_STYLES.flexCenter 
      }}>
        <h1 style={{ margin: SPACING.md }}>{item.text}</h1>
      </div>

      {/* Image */}
      <div style={{ 
        backgroundColor: COLORS.secondary, 
        flexGrow: 1, 
        borderBottomRightRadius: RADIUS.sm, 
        borderBottomLeftRadius: RADIUS.sm 
      }}>
        <img
          style={{ 
            objectFit: "cover", 
            borderBottomRightRadius: RADIUS.sm, 
            borderBottomLeftRadius: RADIUS.sm 
          }}
          src={imageSource}
          alt="Question illustration"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}

// Composant pour une option de réponse
export function AnswerOption({ 
  option, 
  isSelected, 
  isCorrect, 
  isSubmitted, 
  onClick, 
  disabled = false 
}) {
  const getOptionStyle = () => {
    const baseStyle = {
      ...COMMON_STYLES.button,
      border: `1px solid ${COLORS.secondary}`,
      width: "100%",
      textAlign: "center",
      margin: 0
    };

    if (isSubmitted) {
      if (isCorrect) {
        return {
          ...baseStyle,
          backgroundColor: COLORS.success,
          color: COLORS.white
        };
      }
      if (isSelected && !isCorrect) {
        return {
          ...baseStyle,
          backgroundColor: COLORS.danger,
          color: COLORS.white
        };
      }
      return baseStyle;
    }

    // Mode sélection
    return {
      ...baseStyle,
      backgroundColor: isSelected ? COLORS.primary : COLORS.secondary,
      color: isSelected ? COLORS.white : COLORS.black,
      border: isSelected ? `1px solid ${COLORS.black}` : baseStyle.border,
      textTransform: isSelected ? "uppercase" : "none"
    };
  };

  return (
    <button
      style={getOptionStyle()}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isSelected}
    >
      {option}
    </button>
  );
}

// Composant pour afficher une question avec ses options
export function QuestionBlock({
  question,
  questionIndex,
  selectedOption,
  correctAnswer,
  isSubmitted,
  onOptionClick
}) {
  const questionTexts = Array.isArray(question.question) ? question.question : [question.question];
  const options = Array.isArray(question.options) ? question.options : [question.options];
  
  const pairedLayout = questionTexts.length === options.length;

  if (pairedLayout) {
    // Affichage par paires Question[i] ↔ Option[i] - chaque ligne une question avec sa réponse
    return (
      <div style={{ marginBottom: SPACING.md }}>
        {questionTexts.map((questionText, idx) => {
          const opt = options[idx];
          const isSelected = selectedOption === opt;
          const isCorrect = opt === correctAnswer;
          
          return (
            <div key={idx} style={{ 
              display: "flex", 
              gap: SPACING.sm, 
              justifyContent: "space-between", 
              alignItems: "center", 
              ...COMMON_STYLES.grayContainer,
              marginBottom: SPACING.md 
            }}>
              <div style={{ 
                width: LAYOUT.questionWidth, 
                backgroundColor: COLORS.white, 
                padding: SPACING.md, 
                borderRadius: RADIUS.sm 
              }}>
                <h4 style={{ margin: 0 }}>
                  {questionText}
                </h4>
              </div>
              <div style={{ 
                width: LAYOUT.optionWidth, 
                backgroundColor: COLORS.white, 
                padding: SPACING.md, 
                borderRadius: RADIUS.sm 
              }}>
                <AnswerOption
                  option={opt}
                  isSelected={isSelected}
                  isCorrect={isCorrect}
                  isSubmitted={isSubmitted}
                  onClick={() => onOptionClick(question.qid, opt)}
                  disabled={isSubmitted}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Affichage classique: bloc question puis bloc options
  return (
    <div style={{ 
      display: "flex", 
      gap: SPACING.sm, 
      justifyContent: "space-between", 
      alignItems: "center", 
      ...COMMON_STYLES.grayContainer, 
      marginBottom: SPACING.md 
    }}>
      <div style={{ 
        width: LAYOUT.questionWidth, 
        backgroundColor: COLORS.white, 
        padding: SPACING.md, 
        borderRadius: RADIUS.sm 
      }}>
        {questionTexts.map((qt, i) => (
          <h4 key={i} style={{ margin: 0, padding: SPACING.md }}>
            {qt}
          </h4>
        ))}
      </div>
      <div style={{ 
        width: LAYOUT.optionWidth, 
        backgroundColor: COLORS.white, 
        padding: SPACING.md, 
        borderRadius: RADIUS.sm 
      }}>
        {options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt === correctAnswer;
          
          return (
            <div key={idx} style={{ marginBottom: SPACING.sm }}>
              <AnswerOption
                option={opt}
                isSelected={isSelected}
                isCorrect={isCorrect}
                isSubmitted={isSubmitted}
                onClick={() => onOptionClick(question.qid, opt)}
                disabled={isSubmitted}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
