import React, { useState, useEffect, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AutoContext } from "../../component/contexte.js";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card-simple";
import { Button } from "../ui/button-simple";
import fallbackImg from "../../images/voiture.png";

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
    return require(`../../images/${imagePath}`);
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

export default function TestcodeCorrigeeTailwind() {
  const { currentSerieIndex, setCurrentSerieIndex, setGlobalAnswer } = useContext(AutoContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const query = new URLSearchParams(location.search);
  const level = query.get("level");

  // États
  const [levelDoc, setLevelDoc] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answerSubmit, setAnswerSubmit] = useState(false);
  const [showStatement, setShowStatement] = useState(false);

  const levelData = useMemo(() => levelDoc?.items || [], [levelDoc]);
  const isOutOfRange = currentSerieIndex < 0 || currentSerieIndex >= levelData.length;
  
  const allQuestionsAnswered = useMemo(() => {
    if (isOutOfRange) return false;
    const numQuestions = levelData[currentSerieIndex]?.questions?.length || 0;
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
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-center">Chargement des données…</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isOutOfRange) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-center">Question introuvable</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentItem = levelData[currentSerieIndex];
  const currentQuestions = currentItem.questions || [];
  const correctAnswers = ensureArray(currentItem.answers);
  const explanationText = currentItem.answerText;
  const isLast = currentSerieIndex === levelData.length - 1;
  const progress = ((currentSerieIndex + 1) / levelData.length) * 100;

  // Handlers
  function handleOptionClick(questionId, option) {
    if (answerSubmit) return;
    
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
      setShowStatement(false);
      return;
    }

    setGlobalAnswer((prev) => [...prev, selectedOptions]);

    if (isLast) {
      setSelectedOptions([]);
      setAnswerSubmit(false);
      setShowStatement(false);
      goToRecap();
      return;
    }

    setCurrentSerieIndex((prev) => prev + 1);
    setSelectedOptions([]);
    setAnswerSubmit(false);
    setShowStatement(false);
  }

  function toggleStatement() {
    setShowStatement((prev) => !prev);
  }

  // Pour les questions OUI/NON simples, on adapte le rendu
  const isSimpleYesNo = currentQuestions.length === 1 && 
    currentQuestions[0]?.options?.length === 2 &&
    currentQuestions[0]?.options?.includes("OUI") &&
    currentQuestions[0]?.options?.includes("NON");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec progression */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex items-center justify-between gap-4 py-3 px-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {level}
            </div>
            <span className="text-sm text-gray-600">
              Question {currentSerieIndex + 1}/{levelData.length}
            </span>
          </div>
          <div className="w-32 sm:w-48">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
                aria-label="Progression de la série"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto grid min-h-[calc(100vh-56px)] grid-cols-1 gap-6 py-6 px-4 lg:grid-cols-2">
        {/* Section Image */}
        <section className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">
                {currentItem.text || "Question d'examen"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-md border bg-card">
                <img
                  src={getImageSource(currentItem.imageUrl)}
                  alt="Illustration question examen code de la route"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section Questions/Réponses */}
        <section className="space-y-4">
          {/* Questions */}
          <div className="space-y-4">
            {currentQuestions.map((question, qIdx) => {
              const questionTexts = ensureArray(question.question);
              const options = ensureArray(question.options);
              const selectedOption = selectedOptions[qIdx];
              const correctAnswer = correctAnswers[qIdx];
              
              // Vérifier si c'est un layout de paires (chaque question avec son option)
              const pairedLayout = questionTexts.length === options.length;
              // Inclure aussi les questions OUI/NON simples dans le layout par paires
              const isOuiNonSingle = questionTexts.length === 1 && options.length === 2 && 
                                   options.includes("OUI") && options.includes("NON");

              if (pairedLayout || isOuiNonSingle) {
                // Layout par paires : chaque question alignée avec son option
                return (
                  <div key={question.qid} className="space-y-3">
                    {isOuiNonSingle ? (
                      // Pour OUI/NON : afficher la question avec les deux boutons
                      <div className="flex gap-2 items-center bg-gray-200 rounded-lg p-3">
                        {/* Question à gauche */}
                        <div className="flex-[65%] bg-white rounded-lg p-3">
                          <p className="text-sm text-gray-900 sm:text-base m-0">
                            {questionTexts[0]}
                          </p>
                        </div>
                        {/* Options OUI/NON à droite */}
                        <div className="flex-[35%] bg-white rounded-lg p-3">
                          <div className="grid grid-cols-2 gap-2">
                            {options.map((option) => {
                              const isSelected = selectedOption === option;
                              const isCorrect = option === correctAnswer;
                              
                              let buttonClass = "h-12 text-base font-medium px-3";
                              
                              if (answerSubmit) {
                                if (isCorrect) {
                                  buttonClass += " bg-green-500 hover:bg-green-600 text-white";
                                } else if (isSelected && !isCorrect) {
                                  buttonClass += " bg-red-500 hover:bg-red-600 text-white";
                                } else {
                                  buttonClass += " bg-gray-200 hover:bg-gray-300 text-gray-800";
                                }
                              } else {
                                buttonClass += isSelected 
                                  ? " !bg-blue-600 hover:!bg-blue-700 !text-white font-bold" 
                                  : " !bg-gray-300 hover:!bg-gray-400 !text-black font-semibold";
                              }

                              return (
                                <Button
                                  key={option}
                                  className={buttonClass}
                                  onClick={() => handleOptionClick(question.qid, option)}
                                  disabled={answerSubmit}
                                  aria-pressed={isSelected}
                                >
                                  {option}
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Pour les autres paires : chaque question avec son option
                      questionTexts.map((questionText, idx) => {
                        const option = options[idx];
                        const isSelected = selectedOption === option;
                        const isCorrect = option === correctAnswer;
                        
                        let buttonClass = "h-12 text-base font-medium px-4";
                        
                        if (answerSubmit) {
                          if (isCorrect) {
                            buttonClass += " bg-green-500 hover:bg-green-600 text-white";
                          } else if (isSelected && !isCorrect) {
                            buttonClass += " bg-red-500 hover:bg-red-600 text-white";
                          } else {
                            buttonClass += " bg-gray-200 hover:bg-gray-300 text-gray-800";
                          }
                        } else {
                          buttonClass += isSelected 
                            ? " !bg-blue-600 hover:!bg-blue-700 !text-white font-bold" 
                            : " !bg-gray-300 hover:!bg-gray-400 !text-black font-semibold";
                        }

                        return (
                          <div key={idx} className="flex gap-2 items-center bg-gray-200 rounded-lg p-3">
                            {/* Question à gauche */}
                            <div className="flex-[65%] bg-white rounded-lg p-3">
                              <p className="text-sm text-gray-900 sm:text-base m-0">
                                {questionText}
                              </p>
                            </div>
                            {/* Option à droite */}
                            <div className="flex-[35%] bg-white rounded-lg p-3">
                              <Button
                                className={buttonClass + " w-full"}
                                onClick={() => handleOptionClick(question.qid, option)}
                                disabled={answerSubmit}
                                aria-pressed={isSelected}
                              >
                                {option}
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                );
              }

              // Layout classique pour questions simples
              return (
                <div key={question.qid} className="rounded-md border bg-white p-4">
                  <div className="space-y-4">
                    {/* Texte de la question */}
                    <div className="space-y-2">
                      {questionTexts.map((qt, i) => (
                        <p key={i} className="text-sm text-gray-900 sm:text-base">
                          {qt}
                        </p>
                      ))}
                    </div>

                    {/* Options de réponse */}
                    {isSimpleYesNo ? (
                      // Layout spécial pour OUI/NON
                      <div className="grid grid-cols-2 gap-3">
                        {options.map((option) => {
                          const isSelected = selectedOption === option;
                          const isCorrect = option === correctAnswer;
                          
                          let buttonClass = "h-14 text-lg font-medium";
                          
                          if (answerSubmit) {
                            if (isCorrect) {
                              buttonClass += " bg-green-500 hover:bg-green-600 text-white";
                            } else if (isSelected && !isCorrect) {
                              buttonClass += " bg-red-500 hover:bg-red-600 text-white";
                            } else {
                              buttonClass += " bg-gray-200 hover:bg-gray-300 text-gray-800";
                            }
                          } else {
                            buttonClass += isSelected 
                              ? " !bg-blue-600 hover:!bg-blue-700 !text-white font-bold" 
                              : " !bg-gray-300 hover:!bg-gray-400 !text-black font-semibold";
                          }

                          return (
                            <Button
                              key={option}
                              className={buttonClass}
                              onClick={() => handleOptionClick(question.qid, option)}
                              disabled={answerSubmit}
                              aria-pressed={isSelected}
                            >
                              {option}
                            </Button>
                          );
                        })}
                      </div>
                    ) : (
                      // Layout classique pour autres types de questions
                      <div className="space-y-2">
                        {options.map((option) => {
                          const isSelected = selectedOption === option;
                          const isCorrect = option === correctAnswer;
                          
                          let buttonClass = "w-full justify-start text-left p-4 h-auto";
                          
                          if (answerSubmit) {
                            if (isCorrect) {
                              buttonClass += " bg-green-500 hover:bg-green-600 text-white";
                            } else if (isSelected && !isCorrect) {
                              buttonClass += " bg-red-500 hover:bg-red-600 text-white";
                            } else {
                              buttonClass += " bg-gray-200 hover:bg-gray-300 text-gray-800";
                            }
                          } else {
                            buttonClass += isSelected 
                              ? " !bg-blue-600 hover:!bg-blue-700 !text-white font-bold" 
                              : " !bg-gray-300 hover:!bg-gray-400 !text-black font-semibold";
                          }

                          return (
                            <Button
                              key={option}
                              className={buttonClass}
                              onClick={() => handleOptionClick(question.qid, option)}
                              disabled={answerSubmit}
                              aria-pressed={isSelected}
                            >
                              {option}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Boutons de navigation */}
          <div className="flex items-center justify-between gap-3">
            <Button
              variant={showStatement ? "default" : "ghost"}
              onClick={toggleStatement}
              aria-expanded={showStatement}
              disabled={!answerSubmit}
            >
              Énoncé
            </Button>

            <div className="ml-auto flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={goToRecap}
              >
                Terminer
              </Button>
              <Button
                onClick={handleSubmitOrNext}
                disabled={!answerSubmit && !allQuestionsAnswered}
                className={(allQuestionsAnswered || answerSubmit) 
                  ? "bg-blue-500 hover:bg-blue-600 text-white" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}
              >
                {isLast && answerSubmit ? "Terminé" : answerSubmit ? "Suivant" : "Valider"}
              </Button>
            </div>
          </div>

          {/* Énoncé explicatif */}
          {showStatement && answerSubmit && (
            <div className="rounded-md border bg-gray-50 p-4 text-sm text-gray-600">
              <h3 className="font-semibold text-gray-900 mb-2">Explication :</h3>
              <p>{explanationText || "Pas d'explication disponible pour cette question."}</p>
              
              {/* Liste des bonnes réponses */}
              <div className="mt-3 space-y-1">
                <h4 className="font-medium text-gray-800">Réponses correctes :</h4>
                {currentQuestions.map((question, idx) => {
                  const correctToken = correctAnswers[idx];
                  const label = getAnswerLabel(
                    correctToken, 
                    ensureArray(question.options), 
                    ensureArray(question.question), 
                    idx, 
                    currentQuestions
                  );
                  
                  return (
                    <div key={question.qid} className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {label}
                      </div>
                      <span className="text-sm">{correctToken}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
