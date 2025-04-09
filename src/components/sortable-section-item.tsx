import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ISectionType } from '@/types/section.type';

type SortableSectionItemProps = {
  section: ISectionType;
  children: (dragHandleProps: any) => React.ReactNode;
};

const SortableSectionItem = ({ section, children }: SortableSectionItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.sectionId.toString() });

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

export default SortableSectionItem;
