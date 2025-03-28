import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
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
import { useGetLessonsQuery } from "@/features/lessons/lessonQuery";
import { LessonType } from "@/types/lessons.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  nameVn: z.string().min(1, "Name VN must be as least 1 characters.").max(200, "Name VN must be as most 200 characters."),
  nameJp: z.string().min(1, "Name JP must be as least 1 characters.").max(200, "Name JP must be as most 200 characters.").optional(),
  nameEn: z.string().min(1, "Name EN must be as least 1 characters.").max(200, "Name EN must be as most 200 characters.").optional(),
  desciption: z.string().optional(),
  lessons: z.array(z.number()).optional(),
})


function CreateCouseForm({ className }: React.ComponentProps<"form">) {
  const [createCourse, result] = useCreateCourseMutation();
  const dispatch: AppDispatch = useDispatch();

  const { data, isLoading, isError } = useGetLessonsQuery({ take: 9999 })

  const lessonsData: LessonType[] = useMemo(() => {
    return data ? data.data : []
  }, [data])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lessons: []
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let res = await createCourse(values);
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
        <FormField
          control={form.control}
          name="lessons"
          render={() => (
            <Command className="">
              <FormItem　>
                <FormLabel>Lesson</FormLabel>
                <div className="border rounded-sm">
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="w-full h-40">
                        {lessonsData.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="lessons"
                            render={({ field }) => {
                              return (
                                <CommandItem key={item.nameVn} value={item.nameVn}>
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value ? field.value : []), item.id])
                                            : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.nameVn}
                                    </FormLabel>
                                  </FormItem>
                                </CommandItem>
                              )
                            }}
                          />
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </div>
              </FormItem>
            </Command>
          )}
        />
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
