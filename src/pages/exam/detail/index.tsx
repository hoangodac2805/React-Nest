import { useState } from "react";
import ExamSection from "../_components/exam-section";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Hand, SquareMenu } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { CreateSectionType, ISectionType } from "@/types/section.type";
import ContentEditable from "@/components/editable-div";
import { cn, getChangeType } from "@/lib/utils";

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableSectionItem from "@/components/sortable-section-item";
import DeleteSectionDialog from "../_components/delete-section-dialog";
import { CreateExamType } from "@/types/exam.type";
import { useCreateExamMutation, useGetExamQuery } from "@/features/exam/examQuery";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const createInitialSection = (): ISectionType => ({
  sectionId: uuidv4(),
  description: "Mô tả ",
  order: 0,
  changeType: "new",
  questions: [
    {
      questionId: uuidv4(),
      text: "Câu hỏi 1",
      changeType: "new",
      order: 0,
      options: [
        { optionId: uuidv4(), isCorrect: true, text: "Đáp án a", changeType: "new" },
        { optionId: uuidv4(), isCorrect: false, text: "Đáp án b", changeType: "new" },
        { optionId: uuidv4(), isCorrect: false, text: "Đáp án c", changeType: "new" },
        { optionId: uuidv4(), isCorrect: false, text: "Đáp án d", changeType: "new" },
      ],
    },
  ],
});

const ExamDetailPage = () => {

  const { examId } = useParams();
  const { data, isLoading } = useGetExamQuery(Number(examId), {
    skip: !examId
  })
  console.log(data)

  const [sections, setSections] = useState<ISectionType[]>([]);
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [examTitle, setExamTitle] = useState<string>("Phần thi " + uuidv4());
  const [isTitleError, setIsTitleError] = useState(false);
  const [diaglogAction, setDialogAction] = useState<{ type: "delete", sectionId: string | number } | null>(null);
  const [createExam, result] = useCreateExamMutation();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleChangeTitle = (value: string) => {
    setExamTitle(value);
    if (value.trim() !== "") {
      if (isTitleError) {
        setIsTitleError(false);
      }
    } else {
      if (!isTitleError) {
        setIsTitleError(true);
      }
    }
  };

  const handleCreateSection = () => {
    const newOrder = sections.filter(_ => _.changeType !== "deleted").length;
    const newSection = createInitialSection();
    newSection.order = newOrder;
    setSections([...sections, newSection]);
  };

  const handleUpdateSection = (sectionId: string | number, sectionContent: ISectionType) => {
    const updatedSections = sections.map((sec) =>
      sec.sectionId === sectionId ? sectionContent : sec
    );
    setSections(updatedSections);
  };

  const handleDuplicateSection = (sectionId: string | number) => {
    const idx = sections.findIndex((section) => section.sectionId === sectionId);
    if (idx === -1) return;

    const cloned = structuredClone(sections[idx]);
    cloned.sectionId = uuidv4();
    cloned.changeType = "new";
    cloned.questions = cloned.questions?.filter(_ => _.changeType !== "deleted").map((q) => ({
      ...q,
      questionId: uuidv4(),
      changeType: "new",
      options: q.options.map((o) => ({
        ...o,
        optionId: uuidv4(),
        changeType: "new",
      })),
    }));

    const updated = [...sections];
    updated.splice(idx + 1, 0, cloned);
    const orderedSections = updated.map((sec, idx) => ({
      ...sec,
      order: idx,
      changeType: sec.order !== idx ? getChangeType(sec.changeType) : sec.changeType,
    }));
    setSections(orderedSections);
  };

  const handleDeleteSection = (sectionId: string | number) => {
    const updated: ISectionType[] = sections.map((section) =>
      section.sectionId === sectionId ? { ...section, changeType: "deleted" } : section
    );

    const filtered = updated.filter((sec) => sec.changeType !== "deleted");

    const orderedSections = filtered.map((sec, idx) => ({
      ...sec,
      order: idx,
      changeType: sec.order !== idx ? getChangeType(sec.changeType) : sec.changeType,
    }));

    setSections([...orderedSections, ...updated.filter((sec) => sec.changeType === "deleted")]);
  };

  const handleSaveExam = async () => {

    const newSections: CreateSectionType[] = sections.map(section => {
      let { questions, description, order, file } = section;
      return {
        description, order, file, questions: questions.map((question) => {
          let { options, order, text } = question;
          return {
            order, text, options: options.map((option) => {
              let { isCorrect, text } = option;
              return { isCorrect, text }
            })
          }
        })
      }
    })


    const newExam: CreateExamType = {
      isDraft: isDraft,
      title: examTitle,
      sections: newSections
    }
    console.log(newExam);
    let res = await createExam(newExam);
    console.log(res)
    if (!res.error) {

      toast.success("Successfully")
    } else {
      toast.error("Failed!")
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const nonDeletedSections = sections.filter(sec => sec.changeType !== "deleted");

    const sourceIndex = sections.findIndex(sec => sec.sectionId.toString() === active.id);
    const destinationIndex = sections.findIndex(sec => sec.sectionId.toString() === over.id);
    if (sourceIndex === -1 || destinationIndex === -1 || sourceIndex === destinationIndex) return;

    const newOrder = arrayMove(nonDeletedSections, sourceIndex, destinationIndex);

    const orderedSections = newOrder.map((sec, index) => ({
      ...sec,
      order: index,
      changeType: sec.order !== index ? getChangeType(sec.changeType) : sec.changeType,
    }));

    const deletedSections = sections.filter(s => s.changeType === "deleted");

    setSections([...orderedSections, ...deletedSections]);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-3 items-start my-10">
        <div className="col-span-10 grid gap-10 ">
          <div>
            <ContentEditable
              initialValue={examTitle}
              onChangeValue={handleChangeTitle}
              placeholder="Type something..."
              className="flex-grow outline-none break-all font-black text-lg text-center p-4 border border-black dark:border-white"
            />
            {<p className="text-center text-sm text-red-500">{isTitleError && "Tiêu đề không được bỏ trống"}</p>}
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections.filter(sec => sec.changeType !== "deleted").map(sec => sec.sectionId.toString())} strategy={verticalListSortingStrategy}>
              {sections.filter(sec => sec.changeType !== "deleted").map((section, idx) => (
                <SortableSectionItem key={section.sectionId} section={section}>
                  {({ dragHandleProps }) => (
                    <div className={cn("p-3", "border border-black dark:border-white")}>
                      <p className="text-center text-lg mb-5 font-bold">Phần {idx + 1}</p>
                      <div className="relative">
                        <ExamSection
                          className="p-5 border rounded-md mb-10"
                          onSectionChange={(sectionContent) => handleUpdateSection(section.sectionId, sectionContent)}
                          sectionId={section.sectionId}
                          description={section.description}
                          questions={section.questions}
                          changeType={section.changeType}
                          order={section.order}
                        />
                        <div className="absolute right-3 top-[-3rem] flex items-center gap-2">

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                              >
                                <SquareMenu className="ml-auto size-4" />
                              </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                              align="end"
                              sideOffset={4}
                            >
                              <DropdownMenuGroup>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => handleDuplicateSection(section.sectionId)}>
                                  Nhân đôi
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => setDialogAction({ type: "delete", sectionId: section.sectionId })}>
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button size={"icon"} variant={"ghost"} className="cursor-grab"  {...dragHandleProps}>
                            <Hand />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </SortableSectionItem>
              ))}
            </SortableContext>
          </DndContext>
          <Button onClick={handleCreateSection} className="w-full">
            Thêm phần thi mới
          </Button>
        </div>
        <div className="col-span-2 border min-h-14 sticky top-0 left-0 pt-5 pb-3 px-3 grid gap-8 rounded-md">
          <div>
            <Label>Categories :</Label>
          </div>
          <div>
            <Label>Tags :</Label>
          </div>
          <div>
            <Label>Chuyển thành nháp :</Label>
            <div className="flex items-center space-x-2 mt-3">
              <Switch id="airplane-mode" checked={isDraft} onCheckedChange={(value) => setIsDraft(value)} />
              <Label htmlFor="airplane-mode">Draft mode</Label>
            </div>
          </div>
          <Button className="w-full" onClick={handleSaveExam}>Save</Button>
        </div>
      </div>
      <DeleteSectionDialog
        open={diaglogAction?.type == "delete"}
        confirmAction={() => {
          if (diaglogAction?.sectionId) {
            handleDeleteSection(diaglogAction.sectionId)
          }
        }}
        onOpenChange={() => {
          setDialogAction(null)
        }}
      />
    </>
  );
};

export default ExamDetailPage;
