import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IQuestion } from "@/types/question.type";

interface SortableQuestionItemProps {
  question: IQuestion;
  children: (dragHandleProps: any) => React.ReactNode;
}

const SortableQuestionItem = ({ question, children }: SortableQuestionItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: question.questionId.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ dragHandleProps: { ...listeners, ...attributes } })}
    </div>
  );
};

export default SortableQuestionItem;
