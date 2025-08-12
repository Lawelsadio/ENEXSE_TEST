import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

// Composant pour l'affichage de l'image et du titre de la question
export function QuestionMedia({ level, currentIndex, totalQuestions, item, imageSource }) {
  return (
    <Card className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
      {/* En-tête avec niveau et numéro de question */}
      <CardHeader className="p-0">
        <div className="flex bg-gray-300 rounded-t-lg overflow-hidden">
          <div className="bg-gray-600 text-white px-4 py-3 min-w-fit">
            <h4 className="font-bold text-sm m-0">{level}</h4>
          </div>
          <div className="flex-1 px-4 py-3 bg-gray-300">
            <h4 className="font-bold text-sm m-0">
              QUESTION {currentIndex + 1}/{totalQuestions}
            </h4>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Titre de la question */}
        <div className="bg-gray-300 px-6 py-4 text-center">
          <h1 className="text-lg md:text-xl font-semibold m-0">{item.text}</h1>
        </div>

        {/* Image */}
        <div className="bg-gray-300 rounded-b-lg overflow-hidden">
          <img
            className="w-full h-48 md:h-64 lg:h-80 object-cover"
            src={imageSource}
            alt="Question illustration"
          />
        </div>
      </CardContent>
    </Card>
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
  const getVariant = () => {
    if (isSubmitted) {
      if (isCorrect) return "default";
      if (isSelected && !isCorrect) return "destructive";
      return "outline";
    }
    return isSelected ? "default" : "outline";
  };

  const getClassName = () => {
    if (isSubmitted) {
      if (isCorrect) return "bg-green-500 hover:bg-green-600 text-white";
      if (isSelected && !isCorrect) return "bg-red-500 hover:bg-red-600 text-white";
    }
    return isSelected ? "bg-blue-500 hover:bg-blue-600 text-white uppercase" : "";
  };

  return (
    <Button
      variant={getVariant()}
      size="default"
      className={cn("w-full text-center", getClassName())}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isSelected}
    >
      {option}
    </Button>
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
    // Affichage par paires Question[i] ↔ Option[i]
    return (
      <Card className="mb-4 bg-gray-200">
        <CardContent className="p-4">
          <div className="space-y-3">
            {options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === correctAnswer;
              
              return (
                <div key={idx} className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <Card className="flex-1 sm:w-2/3">
                    <CardContent className="p-4">
                      <h4 className="text-sm md:text-base font-medium m-0">
                        {questionTexts[idx]}
                      </h4>
                    </CardContent>
                  </Card>
                  <div className="sm:w-1/3 flex items-center">
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
        </CardContent>
      </Card>
    );
  }

  // Affichage classique: bloc question puis bloc options
  return (
    <Card className="mb-4 bg-gray-200">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <Card className="flex-1 lg:w-2/3">
            <CardContent className="p-4">
              <div className="space-y-4">
                {questionTexts.map((qt, i) => (
                  <h4 key={i} className="text-sm md:text-base font-medium m-0">
                    {qt}
                  </h4>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:w-1/3">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === correctAnswer;
                    
                    return (
                      <AnswerOption
                        key={idx}
                        option={opt}
                        isSelected={isSelected}
                        isCorrect={isCorrect}
                        isSubmitted={isSubmitted}
                        onClick={() => onOptionClick(question.qid, opt)}
                        disabled={isSubmitted}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
