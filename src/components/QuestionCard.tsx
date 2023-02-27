import React from "react";
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type QuestionCardProps = {
  questionNr: number;
  totalQusetions: number;
  question: string;
  answers: string[];
  userAnswer: AnswerObject | undefined;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNr,
  totalQusetions,
  question,
  answers,
  userAnswer,
  handleClick,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question:{questionNr}/{totalQusetions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={handleClick}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
