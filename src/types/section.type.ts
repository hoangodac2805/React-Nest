import { CreateQuestionType, IQuestion, QuestionType } from "./question.type";

export type SectionType = {
    id: number;
    description: string;
    file?: string;
    questions: QuestionType[];
    order: number
};


export type CreateSectionType = Omit<SectionType, "id" | "questions" | "file"> & {
    questions: CreateQuestionType[];
    file?: Blob | string;
}

export interface ISectionType extends Omit<SectionType, "id" | "questions" | "file"> {
    sectionId: string | number;
    questions: IQuestion[];
    changeType?: "new" | "updated" | "deleted";
    file?: Blob | string;
}