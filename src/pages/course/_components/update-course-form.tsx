import React, { useCallback, useEffect, useMemo, useState } from "react";
import { cn, debounce } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import {
  CourseFindInputType,
  CourseUpdateInputType,
} from "@/types/course.type";
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
} from "@/features/courses/courseQuery";
import { useGetInfiniteLessonsInfiniteQuery } from "@/features/lessons/lessonQuery";
import TransferListApi, {
  TransferListDataType,
} from "@/components/ui/transfer-list-api";

const formSchema = z.object({
  nameVn: z
    .string()
    .trim()
    .min(1, "Name VN must be at least 1 characters.")
    .max(25, "Name VN must be at most 200 characters.")
    .optional(),
  nameEn: z
    .string()
    .trim()
    .max(25, "Name EN must be at most 200 characters.")
    .optional(),
  nameJp: z
    .string()
    .trim()
    .max(25, "Name JP must be at most 200 characters.")
    .optional(),
  description: z.string().trim().optional(),
});
interface Props extends React.ComponentProps<"form"> {
  courseId: CourseFindInputType;
}

function EditCourseForm({ className, courseId }: Props) {
  const [updateCourse, result] = useUpdateCourseMutation();
  const [lessons, setLessons] = useState<{
    addLessons: TransferListDataType[];
    removeLessons: TransferListDataType[];
  }>({
    addLessons: [],
    removeLessons: [],
  });
  const [sourceLessonSearch, setSourceLessonSearch] = useState<string>("");
  const [targetLessonSearch, setTargetLessonSearch] = useState<string>("");
  const { data, isLoading, isError } = useGetCourseQuery(courseId, {
    skip: !courseId,
  });

  const courseData = useMemo(() => {
    return data;
  }, [isLoading, data, isError]);
  const {
    data: rawLessonData,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteLessonsInfiniteQuery({ keyword: sourceLessonSearch });

  const sourceLessonData = useMemo(() => {
    if (!rawLessonData) return [];
    return rawLessonData.pages.flatMap((page) =>
      page.data
        .filter(
          (_) =>
            (!lessons.addLessons.find((l) => l.id === _.id) &&
              !courseData?.lessons?.find((l) => l.id === _.id)) ||
            lessons.removeLessons.find((l) => l.id === _.id)
        )
        .map((lesson) => ({
          id: lesson.id,
          label: lesson.nameVn,
        }))
    );
  }, [rawLessonData, lessons]);

  const targetLessonData = useMemo(() => {
    if (!courseData?.lessons) return [];
    let originalData = courseData.lessons
      .filter(
        (_) =>
          !lessons.removeLessons.find((l) => l.id === _.id) &&
          !lessons.addLessons.find((l) => l.id === _.id)
      )
      .map((item) => ({
        id: item.id,
        label: item.nameVn,
      }));
    let combinedData = [...originalData, ...lessons.addLessons];

    if (targetLessonSearch.trim() !== "") {
      combinedData = combinedData.filter((item) =>
        item.label
          .toLowerCase()
          .includes(targetLessonSearch.trim().toLowerCase())
      );
    }
    return combinedData;
  }, [courseData, lessons, targetLessonSearch]);

  const handleSourceLessonSearch = (value: string) =>
    setSourceLessonSearch(value);
  const handleTargetLessonSearch = (value: string) =>
    setTargetLessonSearch(value);

  const debouncedOnSourceLessonSearch = useMemo(
    () => debounce(handleSourceLessonSearch, 300),
    [handleSourceLessonSearch]
  );

  const debouncedOnTargetLessonSearch = useMemo(
    () => debounce(handleTargetLessonSearch, 300),
    [handleTargetLessonSearch]
  );

  const handleTransferToTarget = (
    items: TransferListDataType[],
    clearChecked: () => void
  ) => {
    let updateAddLesson = [...lessons.addLessons];
    let updateRemoveLesson = [...lessons.removeLessons];
    for (let item of items) {
      let isInRemoveIds = updateRemoveLesson.findIndex((_) => _.id == item.id);
      if (isInRemoveIds !== -1) {
        updateRemoveLesson.splice(isInRemoveIds, 1);
      } else {
        updateAddLesson.push(item);
      }
    }
    setLessons({
      addLessons: updateAddLesson,
      removeLessons: updateRemoveLesson,
    });

    clearChecked();
  };

  const handleTransferToSouce = (
    items: TransferListDataType[],
    clearChecked: () => void
  ) => {
    let updateAddLesson = [...lessons.addLessons];
    let updateRemoveLesson = [...lessons.removeLessons];
    for (let item of items) {
      let isInAddIds = updateAddLesson.findIndex((_) => _.id == item.id);
      if (isInAddIds !== -1) {
        updateAddLesson.splice(isInAddIds, 1);
      } else {
        updateRemoveLesson.push(item);
      }
    }
    setLessons({
      addLessons: updateAddLesson,
      removeLessons: updateRemoveLesson,
    });
    clearChecked();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameVn: "",
      nameJp: "",
      nameEn: "",
      description: "",
    },
  });

  const resetForm = useCallback(() => {
    if (courseData) {
      form.reset({
        nameVn: courseData?.nameVn,
        nameJp: courseData?.nameJp || undefined,
        nameEn: courseData?.nameEn || undefined,
        description: courseData?.description || undefined,
      });
    }
    setLessons({
      addLessons: [],
      removeLessons: [],
    });
  }, [courseData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (courseData) {
      const updateValues: CourseUpdateInputType["data"] = {
        lessons: {
          removeIds: [],
          addIds: [],
        },
      };
      const changedFields = form.formState.dirtyFields;

      for (const [key, value] of Object.entries(values)) {
        if (changedFields[key as keyof typeof changedFields]) {
          updateValues[key as keyof typeof updateValues] = value;
        }
      }

      lessons.addLessons.forEach((item) => {
        updateValues.lessons?.addIds?.push(item.id as number);
      });

      lessons.removeLessons.forEach((item) => {
        updateValues.lessons?.removeIds?.push(item.id as number);
      });

      let res = await updateCourse({ id: courseData.id, data: updateValues });

      if (!res.error) {
        toast.success("Cập nhật khóa học thành công!");
      } else {
        console.log(res.error);
      }
    }
  };

  useEffect(() => {
    resetForm();
  }, [courseData, form]);

  if (isLoading) return <Loader className="animate-spin" aria-hidden="true" />;
  if (isError) return <div>Error</div>;
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("grid grid-cols-2 items-start gap-4", className)}
        >
          <FormField
            control={form.control}
            name="nameVn"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Name VN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nameJp"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Name JP</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nameEn"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Name EN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TransferListApi
            className="col-span-2"
            sourceData={sourceLessonData}
            targetData={targetLessonData}
            onSourceSearch={(value) => {
              debouncedOnSourceLessonSearch(value);
            }}
            onTargetSearch={(value) => {
              debouncedOnTargetLessonSearch(value);
            }}
            onLoadMoreSource={() => {
              if (hasNextPage) fetchNextPage();
            }}
            onTransferToTarget={handleTransferToTarget}
            onTransferToSource={handleTransferToSouce}
          />
          <div className="col-span-2 grid  grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
              }}
              className=""
            >
              Reset to Default
            </Button>
            <Button type="submit" className="" disabled={result.isLoading}>
              {result.isLoading ? (
                <Loader className="animate-spin" aria-hidden="true" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default EditCourseForm;
