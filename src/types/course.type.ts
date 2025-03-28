import { LessonType } from "./lessons.type"


export type CourseType = {
    id: number,
    nameVn: string,
    nameJp?: string,
    nameEn?: string,
    description?: string,
    lessons?: LessonType[]
}

export type CourseCreateInputType = {
    nameVn: string,
    nameJp?: string,
    nameEn?: string,
    description?: string,
    lessons?: number[]
}