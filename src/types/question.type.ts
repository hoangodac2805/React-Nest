import { CreateOptionType, IOption, OptionType } from "./option.type";

export type QuestionType = {
    id: number;
    text: string;
    options: OptionType[];
    order: number
}


export type CreateQuestionType = Omit<QuestionType, "id" | "options"> & {
    options: CreateOptionType[]
}

export interface IQuestion extends Omit<QuestionType, "id" | "options"> {
    questionId: number | string;
    options: IOption[];
    changeType?: "new" | "updated" | "deleted"
}