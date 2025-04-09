import { IOption, OptionType } from "./option.type";

export type QuestionType = {
    id: number;
    text: string;
    options: OptionType[];
    order:number
}

export interface IQuestion extends Omit<QuestionType, "id" | "options"> {
    questionId: number | string;
    options: IOption[];
    changeType? : "new" | "updated" | "deleted"

}