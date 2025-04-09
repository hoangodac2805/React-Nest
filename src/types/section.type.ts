import { IQuestion, QuestionType } from "./question.type";

export type SectionType = {
    id: number;
    description: string;
    file?: File;
    questions: QuestionType[];
    order:number
};


export interface ISectionType extends Omit<SectionType, "id" | "questions"> {
    sectionId: string | number;
    questions?: IQuestion[];
    changeType? : "new" | "updated" | "deleted";
}