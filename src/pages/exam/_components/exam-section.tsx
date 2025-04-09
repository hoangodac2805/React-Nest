import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import ExamQuestion from "./exam-question";
import { Button } from "@/components/ui/button";
import TextEditor from "@/components/text-editor";
import { v4 as uuidv4 } from "uuid";
import { Trash } from "lucide-react";
import { IQuestion } from "@/types/question.type";
import { ISectionType } from "@/types/section.type";
import { getChangeType } from "@/lib/utils";


export interface Props extends HTMLAttributes<HTMLDivElement>, ISectionType {
  onSectionChange?: (section: ISectionType) => void;
  onFileChange?: (file: ISectionType["file"]) => void;
  onDescriptionChange?: (desc: ISectionType["description"]) => void;
  onQuestionsChange?: (questions: ISectionType["questions"]) => void;
}

const createInitialQuestion = (): IQuestion => ({
  questionId: uuidv4(),
  text: "question1",
  changeType: "new",
  order:0,
  options: [
    { optionId: uuidv4(), isCorrect: true, text: "answer1", changeType: "new", },
    { optionId: uuidv4(), isCorrect: false, text: "answer2", changeType: "new", },
    { optionId: uuidv4(), isCorrect: false, text: "answer3", changeType: "new", },
    { optionId: uuidv4(), isCorrect: false, text: "answer4", changeType: "new", },
  ],
});

const ExamSection = ({
  onSectionChange,
  onDescriptionChange,
  onFileChange,
  onQuestionsChange,
  ...props
}: Props) => {
  const [description, setDescription] = useState(props.description);
  const [file, setFile] = useState();
  const [questions, setQuestions] = useState<IQuestion[]>(
    props.questions ? props.questions : []
  );

  const handleDeleteQuestion = (questionId: number | string) => {
    setQuestions(prev => prev.map(question => {
      if (question.questionId !== questionId) return question;
      return {
        ...question,
        changeType: "deleted"
      }
    }))
  };

  const handleCreateQuestion = () => {
    const newQuestions = [...questions, createInitialQuestion()];
    setQuestions(newQuestions);
  };

  const handleUpdateQuestion = (
    questionId: number | string,
    questionContent: IQuestion
  ) => {
    setQuestions(prev => prev.map(question => {
      if (question.questionId !== questionId) return question;
      return {
        ...questionContent
      }
    }))
  };

  const handleDescriptionChange = useCallback(() => {
    if (onDescriptionChange) {
      onDescriptionChange(description);
    }
  }, [onDescriptionChange, description]);

  const handleFileChange = useCallback(() => {
    if (onFileChange) {
      onFileChange(file);
    }
  }, [onFileChange, file]);

  const handleQuestionsChange = useCallback(() => {
    if (onQuestionsChange) {
      onQuestionsChange(questions);
    }
  }, [onQuestionsChange, questions]);

  const handleSectionChange = useCallback(() => {
    if (onSectionChange) {
      onSectionChange({
        sectionId: props.sectionId,
        description,
        file,
        order:props.order,
        questions,
        changeType: getChangeType(props.changeType)
      });
    }
  }, [onSectionChange, description, questions, file]);

  useEffect(() => {
    handleDescriptionChange();
  }, [description]);

  useEffect(() => {
    handleFileChange();
  }, [file]);

  useEffect(() => {
    handleQuestionsChange();
  }, [questions]);

  useEffect(() => {
    handleSectionChange();
  }, [description, questions, file]);

  return (
    <div className={props.className}>
      <TextEditor
        initialData={description}
        onValueChange={(value) => {
          setDescription(value);
        }}
      />
      <div className="mt-5 grid gap-5">
        {questions?.filter(question => question.changeType !== "deleted").map((question, idx) => {
          return (
            <div className="flex gap-x-4 items-start" key={question.questionId}>
              <div className="flex flex-col items-center">
                <p className="p-2 text-sm font-medium">{idx + 1}.</p>
                <Button
                  size={"icon"}
                  className="text-red-600"
                  variant={"ghost"}
                  onClick={() => {
                    handleDeleteQuestion(question.questionId);
                  }}
                >
                  <Trash />
                </Button>
              </div>
              <ExamQuestion
                className="flex-grow"
                onQuestionChange={(question) => {
                  handleUpdateQuestion(question.questionId, question);
                }}
                {...question}
              />
            </div>
          )
        })}
      </div>
      <Button
        variant={"outline"}
        className="mt-5 mx-auto block"
        onClick={handleCreateQuestion}
      >
        Create new question
      </Button>
    </div>
  );
};

export default ExamSection;
