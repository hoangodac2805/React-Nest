import { HTMLAttributes, useCallback, useEffect, useId, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import QuestionEditor from "./question-editor";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ContentEditable from "@/components/editable-div";
interface Option {
  text: string;
  isCorrect: boolean;
}
export interface ExamQuestionType {
  questionId: number | string;
  text: string;
  options: Option[];
}

export interface Props
  extends HTMLAttributes<HTMLDivElement>,
    ExamQuestionType {
  onQuestionChange?: (question: ExamQuestionType) => void;
}

const ExamQuestion = ({
  text,
  options,
  questionId,
  onQuestionChange,
  ...props
}: Props) => {
  const [question, setQuestion] = useState<ExamQuestionType>({
    questionId: questionId,
    text: text,
    options: options,
  });

  const [isEQT, setIsEQT] = useState(false);

  const handleQuestionChange = useCallback(() => {
    if (onQuestionChange) {
      onQuestionChange(question);
    }
  }, [onQuestionChange, question]);
  const handleOptionCheck = (optionNumber: number) => {
    let values = [...options];
    for (let i = 0; i < values.length; i++) {
      if (i == optionNumber) {
        values[i].isCorrect = true;
      } else {
        values[i].isCorrect = false;
      }
    }
    setQuestion({ ...question, options: values });
  };
  const handleChangeOpionText = (value: string, optionNumber: number) => {
    const updateQuestion = { ...question };
    updateQuestion.options[optionNumber].text = value;
    setQuestion(updateQuestion);
  };
  const renderQuestionText = () => {
    if (isEQT) {
      return (
        <QuestionEditor
          initialData={question.text}
          onValueChange={(value) => {
            setQuestion({ ...question, text: value });
          }}
          onClickOutside={() => {
            setIsEQT(false);
          }}
          className="mb-5"
        />
      );
    }

    return (
      <div className="flex items-center gap-2">
        <div
          dangerouslySetInnerHTML={{ __html: question.text || "" }}
          className="ck-content"
        ></div>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            setIsEQT(true);
          }}
        >
          <SquarePen />
        </Button>
      </div>
    );
  };
  useEffect(() => {
    handleQuestionChange();
  }, [question]);
  return (
    <div className={props.className}>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={questionId.toString()}
      >
        <AccordionItem value={questionId.toString()} className="border p-3">
          <div className="flex gap-4">
            <div className="flex-grow">{renderQuestionText()}</div>
            <AccordionTrigger className="w-min"></AccordionTrigger>
          </div>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Checkbox
                    id={questionId + "-" + idx}
                    checked={option.isCorrect}
                    onCheckedChange={() => {
                      handleOptionCheck(idx);
                    }}
                  />
                  <ContentEditable
                    initialValue={option.text}
                    onChangeValue={(value) => {
                      handleChangeOpionText(value, idx);
                    }}
                    placeholder="Type something..."
                    className="flex-grow outline-none break-words"
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ExamQuestion;
