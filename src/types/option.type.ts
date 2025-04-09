export type OptionType = {
    id: number;
    text: string;
    isCorrect: boolean;
}

export interface IOption extends Omit<OptionType, "id"> {
    optionId: number | string;
    changeType? : "new" | "updated" | "deleted"
}