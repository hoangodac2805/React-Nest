import React, { useMemo } from "react";
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

import { closeDrawer } from "@/features/drawer";
import { AppDispatch } from "@/app/store";
import { DRAWER_NAME } from "@/config/drawer-name";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useCreateCourseMutation } from "@/features/courses/courseQuery";
import { useGetInfiniteLessonsInfiniteQuery } from "@/features/lessons/lessonQuery";
import CheckBoxList, {
  CheckBoxListDataType,
} from "@/components/ui/checkbox-list-api";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  nameVn: z
    .string()
    .min(1, "Name VN must be as least 1 characters.")
    .max(200, "Name VN must be as most 200 characters."),
  nameJp: z
    .string()
    .max(200, "Name JP must be as most 200 characters.")
    .optional(),
  nameEn: z
    .string()
    .max(200, "Name EN must be as most 200 characters.")
    .optional(),
  desciption: z.string().optional(),
});

function CreateCouseForm({ className }: React.ComponentProps<"form">) {
  const [createCourse, result] = useCreateCourseMutation();
  const dispatch: AppDispatch = useDispatch();
  const [lessonChecked, setLessonChecked] = React.useState<number[]>([]);
  const [lessonSearch, setLessonSearch] = React.useState<string>("");
  const { data, fetchNextPage, hasNextPage } =
    useGetInfiniteLessonsInfiniteQuery({ keyword: lessonSearch });

  const handleLessonSearch = (value: string) => setLessonSearch(value);
  const handleCheckedLesson = (checkedList: CheckBoxListDataType[]) => {
    const checkedIds: number[] = [];
    for (let item of checkedList) {
      checkedIds.push(item.id as number);
    }

    setLessonChecked(checkedIds);
  };

  const debouncedOnLessonSearch = useMemo(
    () => debounce(handleLessonSearch, 300),
    [handleLessonSearch]
  );

  const lessonsData = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page.data.map((lesson) => ({
          id: lesson.id,
          label: lesson.nameVn,
        }))
      ) || []
    );
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameVn: "",
      nameJp: "",
      nameEn: "",
      desciption: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let createCourseInput = { ...values, lessons: lessonChecked };
    console.log(createCourseInput);
    let res = await createCourse(createCourseInput);
    if (!res.error) {
      toast.success("Thêm course thành công!");
      dispatch(closeDrawer(DRAWER_NAME.CREATE_COURSE));
    } else {
      console.log(res.error);
    }
  };

  return (
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
          name="desciption"
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
        <div>
          <Label className="">Lessons</Label>
          <CheckBoxList
            className="mt-4"
            data={lessonsData}
            onChecked={(checkedList, clear) => {
              handleCheckedLesson(checkedList);
            }}
            onLoadMore={() => {
              if (hasNextPage) fetchNextPage();
            }}
            onSearch={(value) => {
              debouncedOnLessonSearch(value);
            }}
          />
        </div>
        <Button
          type="submit"
          className="col-span-2"
          disabled={result.isLoading}
        >
          {result.isLoading ? (
            <Loader className="animate-spin" aria-hidden="true" />
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default CreateCouseForm;
