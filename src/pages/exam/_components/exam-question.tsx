import { HTMLAttributes, useCallback, useEffect, useState } from "react";
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
import { IQuestion } from "@/types/question.type";
import { getChangeType } from "@/lib/utils";

export interface Props
  extends HTMLAttributes<HTMLDivElement>,
  IQuestion {
  onQuestionChange?: (question: IQuestion) => void;
}

const ExamQuestion = ({
  text,
  options,
  questionId,
  changeType,
  order,
  onQuestionChange,
  ...props
}: Props) => {

  const [question, setQuestion] = useState<IQuestion>({
    questionId: questionId,
    text: text,
    options: options,
    changeType: changeType,
    order:order
  });

  const [isEQT, setIsEQT] = useState(false);

  const handleQuestionChange = useCallback(() => {
    if (onQuestionChange) {
      onQuestionChange(question);
    }
  }, [onQuestionChange, question]);

  const handleOptionCheck = (optionId: number | string) => {
    setQuestion(prev => ({
      ...prev, changeType: getChangeType(prev.changeType), options: options.map((option) => {
        if (option.optionId !== optionId) return { ...option, isCorrect: false, changeType: getChangeType(option.changeType) };
        return {
          ...option,
          isCorrect: true,
          changeType: getChangeType(option.changeType)
        }
      })
    }))
  };

  const handleChangeOpionText = (value: string, optionId: number | string) => {
    setQuestion(prev => ({
      ...prev, changeType: getChangeType(prev.changeType), options: options.map((option) => {
        if (option.optionId !== optionId) return option;
        return {
          ...option,
          text: value,
          changeType: getChangeType(option.changeType)
        }
      })
    }))
  };

  const renderQuestionText = () => {
    if (isEQT) {
      return (
        <QuestionEditor
          initialData={question.text}
          onValueChange={(value) => {
            setQuestion({ ...question, text: value, changeType: getChangeType(question.changeType) });
          }}
          onClickOutside={() => {
            setIsEQT(false);
          }}
          className="mb-5"
        />
      );
    }

    return (
      <div className="flex items-start gap-2">
        <div
          dangerouslySetInnerHTML={{ __html: question.text || "" }}
          className="ck-content pt-1"
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
              {question.options.map((option) => (
                <div key={option.optionId} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.optionId.toString()}
                    checked={option.isCorrect}
                    onCheckedChange={() => {
                      handleOptionCheck(option.optionId);
                    }}
                  />
                  <ContentEditable
                    initialValue={option.text}
                    onChangeValue={(value) => {
                      handleChangeOpionText(value, option.optionId);
                    }}
                    placeholder="Type something..."
                    className="flex-grow outline-none break-all"
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
