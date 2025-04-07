import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import ExamQuestion, { ExamQuestionType } from "./exam-question";
import { File } from "buffer";
import { Button } from "@/components/ui/button";
import TextEditor from "@/components/text-editor";
import { v4 as uuidv4 } from "uuid";
import { Trash } from "lucide-react";

export type ExamSectionType = {
  sectionId: string | number;
  description: string;
  file?: File;
  questions?: ExamQuestionType[];
};

export interface Props extends HTMLAttributes<HTMLDivElement>, ExamSectionType {
  onSectionChange?: (section: ExamSectionType) => void;
  onFileChange?: (file: ExamSectionType["file"]) => void;
  onDescriptionChange?: (desc: ExamSectionType["description"]) => void;
  onQuestionsChange?: (questions: ExamSectionType["questions"]) => void;
}

const createInitialQuestion = (): ExamQuestionType => ({
  questionId: uuidv4(),
  text: "question",
  options: [
    { isCorrect: true, text: "answer1" },
    { isCorrect: false, text: "answer2" },
    { isCorrect: false, text: "answer3" },
    { isCorrect: false, text: "answer4" },
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
  const [questions, setQuestions] = useState<ExamQuestionType[]>(
    props.questions ? props.questions : []
  );

  const handleDeleteQuestion = (questionId: number | string) => {
    const idx = questions.findIndex((item) => item.questionId === questionId);
    if (idx !== -1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(idx, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleCreateQuestion = () => {
    const newQuestions = [...questions, createInitialQuestion()];
    setQuestions(newQuestions);
  };

  const handleUpdateQuestion = (
    questionId: number | string,
    questionContent: ExamQuestionType
  ) => {
    const updatedQuestions = questions.map((_) =>
      _.questionId === questionId ? questionContent : _
    );
    setQuestions(updatedQuestions);
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
        questions,
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
        {questions?.map((question, idx) => (
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
        ))}
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
