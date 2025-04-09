import { useState } from "react";
import ExamSection from "../_components/exam-section";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SquareMenu } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { ISectionType } from "@/types/section.type";
import ContentEditable from "@/components/editable-div";
import { getChangeType } from "@/lib/utils";

const createInitialSection = (): ISectionType => ({
  sectionId: uuidv4(),
  description: "Section description",
  order: 0,
  changeType: "new",
  questions: [
    {
      questionId: uuidv4(),
      text: "question1",
      changeType: "new",
      order: 0,
      options: [
        { optionId: uuidv4(), isCorrect: true, text: "answer1", changeType: "new", },
        { optionId: uuidv4(), isCorrect: false, text: "answer2", changeType: "new", },
        { optionId: uuidv4(), isCorrect: false, text: "answer3", changeType: "new", },
        { optionId: uuidv4(), isCorrect: false, text: "answer4", changeType: "new", },
      ],
    },
  ],
});

const ExamCreatePage = () => {
  const [sections, setSections] = useState<ISectionType[]>([]);
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [examTitle, setExamTitle] = useState<string>("Exam title " + uuidv4())
  const [isTitleError, setIsTitleError] = useState(false);

  const handleChangeTitle = (value: string) => {
    setExamTitle(value);
    if (value.trim() !== "") {
      if (isTitleError) {
        setIsTitleError(false)
      }
    } else {
      if (!isTitleError) {
        setIsTitleError(true)
      }
    }
  }

  const handleCreateSection = () => {
    const newOrder = sections.length;
    const newSection = createInitialSection();
    newSection.order = newOrder;
    const newSections = [...sections, newSection];
    setSections(newSections);
  };

  const handleUpdateSection = (
    sectionId: number | string,
    sectionContent: ISectionType
  ) => {
    const updatedSections = sections.map((_) =>
      _.sectionId === sectionId ? sectionContent : _
    );
    setSections(updatedSections);
  };

  const handleDuplicateSection = (sectionId: string | number) => {
    const idx = sections.findIndex(section => section.sectionId === sectionId);
    if (idx === -1) return;

    const cloned = structuredClone(sections[idx]);
    cloned.sectionId = uuidv4();
    cloned.changeType = "new";
    cloned.questions = cloned.questions?.map(q => ({
      ...q,
      questionId: uuidv4(),
      changeType: "new",
      options: q.options.map(o => ({
        ...o,
        optionId: uuidv4(),
        changeType: "new",
      })),
    }));

    const updated = [...sections];
    updated.splice(idx + 1, 0, cloned);

    updated.forEach((sec, idx) => {
      if(sec.order !== idx ) {
        sec.changeType = getChangeType(sec.changeType);
        sec.order = idx;
      }
    });

    setSections(updated);
  };

  const handleDeleteSection = (sectionId: string | number) => {
    const updated: ISectionType[] = sections
      .map(section =>
        section.sectionId === sectionId
          ? { ...section, changeType: "deleted" }
          : section
      );

    const filtered = updated.filter(sec => sec.changeType !== "deleted");

    filtered.forEach((sec, idx) => {
      if(sec.order !== idx ) {
        sec.changeType = getChangeType(sec.changeType);
        sec.order = idx;
      }
    });

    setSections([...filtered, ...updated.filter(sec => sec.changeType === "deleted")]);
  };

  const handleSaveExam = () => {
    console.log(isDraft)
    console.log(sections)
  }

  // useEffect(() => {
  //   console.log(sections);
  // }, [sections]);



  return (
    <div className="grid grid-cols-12 gap-3 items-start my-10">
      <div className="col-span-10 grid gap-10 ">
        <div>
          <ContentEditable
            initialValue={examTitle}
            onChangeValue={handleChangeTitle}
            placeholder="Type something..."
            className="flex-grow outline-none break-all font-black text-lg text-center p-4 border"
          />
          {<p className="text-center text-sm text-red-500">{isTitleError && "Tiêu đề không được bỏ trống"}</p>}
        </div>
        {sections.filter(section => section.changeType !== "deleted").map((section, idx) => {
          return (
            <div key={section.sectionId}>
              <p className="text-center text-lg mb-5 font-bold">
                Section + {idx + 1}
              </p>
              <div className="relative">
                <ExamSection
                  className="p-5 border rounded-md mb-10"
                  onSectionChange={(sectionContent) => {
                    handleUpdateSection(section.sectionId, sectionContent);
                  }}
                  sectionId={section.sectionId}
                  description={section.description}
                  questions={section.questions}
                  changeType={section.changeType}
                  order={section.order}
                />
                <div className="absolute right-0 top-[-3rem]">
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
                        <DropdownMenuItem
                          onClick={() => {
                            handleDuplicateSection(section.sectionId);
                          }}
                        >
                          Nhân đôi section
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => {
                            handleDeleteSection(section.sectionId);
                          }}
                        >
                          Xóa section
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <Separator />
            </div>
          )
        })}
        <Button
          onClick={() => {
            handleCreateSection();
          }}
          className="w-full"
          variant={"outline"}
        >
          New Section
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
            <Switch id="airplane-mode" checked={isDraft} onCheckedChange={(value) => { setIsDraft(value) }} />
            <Label htmlFor="airplane-mode">Draft mode</Label>
          </div>
        </div>
        <Button className="w-full" onClick={() => {
          handleSaveExam()
        }}>Save</Button>
      </div>
    </div>
  );
};

export default ExamCreatePage;
