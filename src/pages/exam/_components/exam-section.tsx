import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import ExamQuestion from "./exam-question";
import { Button } from "@/components/ui/button";
import TextEditor from "@/components/text-editor";
import { v4 as uuidv4 } from "uuid";
import { Hand, Trash } from "lucide-react";
import { IQuestion } from "@/types/question.type";
import { ISectionType } from "@/types/section.type";
import { getChangeType } from "@/lib/utils";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableQuestionItem from "@/components/sortable-question-item";
import DeleteQuestionDialog from "./delete-question-dialog";

export interface Props extends HTMLAttributes<HTMLDivElement>, ISectionType {
  onSectionChange?: (section: ISectionType) => void;
  onFileChange?: (file: ISectionType["file"]) => void;
  onDescriptionChange?: (desc: ISectionType["description"]) => void;
  onQuestionsChange?: (questions: ISectionType["questions"]) => void;
}

const createInitialQuestion = (): IQuestion => ({
  questionId: uuidv4(),
  text: "Câu hỏi 1",
  changeType: "new",
  order: 0,
  options: [
    { optionId: uuidv4(), isCorrect: true, text: "Đáp án a", changeType: "new", },
    { optionId: uuidv4(), isCorrect: false, text: "Đáp án b", changeType: "new", },
    { optionId: uuidv4(), isCorrect: false, text: "Đáp án c", changeType: "new", },
    { optionId: uuidv4(), isCorrect: false, text: "Đáp án d", changeType: "new", },
  ],
});

const ExamSection = ({
  onSectionChange,
  onDescriptionChange,
  onFileChange,
  onQuestionsChange,
  ...props
}: Props) => {

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const [description, setDescription] = useState(props.description);
  const [file, setFile] = useState();
  const [diaglogAction, setDialogAction] = useState<{ type: "delete", questionId: string | number } | null>(null);

  const [questions, setQuestions] = useState<IQuestion[]>(
    props.questions ? props.questions : []
  );

  const handleDeleteQuestion = (questionId: number | string) => {
    const updated: IQuestion[] = questions.map((question) => question.questionId === questionId ? { ...question, changeType: "deleted" } : question);

    const filtered = updated.filter((ques) => ques.changeType !== "deleted");

    const orderedQuestions = filtered.map((ques, idx) => ({
      ...ques,
      order: idx,
      changeType: ques.order !== idx ? getChangeType(ques.changeType) : ques.changeType
    }))
    setQuestions([...orderedQuestions, ...updated.filter((ques) => ques.changeType === "deleted")])
  };

  const handleCreateQuestion = () => {
    const newOrder = questions.filter(_ => _.changeType !== "deleted").length;
    const newQuestion = createInitialQuestion();
    newQuestion.order = newOrder;
    setQuestions([...questions, newQuestion]);
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

  const handleSectionChange = useCallback(() => {
    if (onSectionChange) {
      onSectionChange({
        sectionId: props.sectionId,
        description,
        file,
        order: props.order,
        questions,
        changeType: getChangeType(props.changeType)
      });
    }
  }, [onSectionChange, description, questions, file]);


  useEffect(() => {
    handleSectionChange();
  }, [description, questions, file]);

  const handleDragQuestionEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const nonDeleted = questions.filter(q => q.changeType !== "deleted");

    const sourceIndex = nonDeleted.findIndex(
      (q) => q.questionId.toString() === active.id
    );
    const destinationIndex = nonDeleted.findIndex(
      (q) => q.questionId.toString() === over.id
    );
    if (
      sourceIndex === -1 ||
      destinationIndex === -1 ||
      sourceIndex === destinationIndex
    )
      return;

    const newOrder = arrayMove(nonDeleted, sourceIndex, destinationIndex);

    const ordered = newOrder.map((q, index) => ({
      ...q,
      order: index,
      changeType: q.order !== index ? getChangeType(q.changeType) : q.changeType,
    }));

    const deletedItems = questions.filter(q => q.changeType === "deleted");

    setQuestions([...ordered, ...deletedItems]);
  };
  return (
    <>
      <div className={props.className}>
        <TextEditor
          initialData={description}
          onValueChange={(value) => {
            setDescription(value);
          }}
        />
        <div className="mt-5 grid gap-5">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragQuestionEnd}>
            <SortableContext items={questions.filter(q => q.changeType !== "deleted").map(q => q.questionId.toString())} strategy={verticalListSortingStrategy}>
              {questions
                .filter((q) => q.changeType !== "deleted")
                .map((question, idx) => (
                  <SortableQuestionItem key={question.questionId} question={question}>
                    {({ dragHandleProps }) => (
                      <div className="">
                        <div className="flex justify-start items-center">
                          <p className="p-2 text-sm font-medium">Câu {idx + 1}.</p>

                          <Button
                            size={"icon"}
                            className="text-red-600"
                            variant={"ghost"}
                            onClick={() => setDialogAction({ type: "delete", questionId: question.questionId })}
                          >
                            <Trash />
                          </Button>
                          <Button variant={"ghost"} size={"icon"} {...dragHandleProps} className="cursor-grab ml-auto inline-block">
                            <Hand />
                          </Button>
                        </div>
                        <ExamQuestion
                          className="flex-grow"
                          onQuestionChange={(updatedQuestion) =>
                            handleUpdateQuestion(question.questionId, updatedQuestion)
                          }
                          {...question}
                        />
                      </div>
                    )}
                  </SortableQuestionItem>
                ))}
            </SortableContext>
          </DndContext>
        </div>
        <Button
          className="mt-5 mx-auto block"
          onClick={handleCreateQuestion}
        >
          Thêm câu hỏi
        </Button>
      </div>
      <DeleteQuestionDialog
        open={diaglogAction?.type == "delete"}
        confirmAction={() => {
          if (diaglogAction?.questionId) {
            handleDeleteQuestion(diaglogAction.questionId)
          }
        }}
        onOpenChange={()=>{setDialogAction(null)}}
      />
    </>
  );
};

export default ExamSection;
