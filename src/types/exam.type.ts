import { CreateSectionType, SectionType } from "./section.type";

export type ExamType = {
    id: number;
    title: string;
    isDraft: boolean;
    sections: SectionType[];
    tags?: any[];
    cates?: any[];
}

export type CreateExamType = Omit<ExamType, "id" | "sections"> & {
    sections: CreateSectionType[]
}

export type ExamFindInputType = ExamType["id"]