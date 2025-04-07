import { useEffect, useState } from "react";
import ExamSection, { ExamSectionType } from "../_components/exam-section";
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

type Props = {};
const createInitialSection = (): ExamSectionType => ({
  sectionId: uuidv4(),
  description: "Section description",
  questions: [
    {
      questionId:uuidv4(),
      text: "question1",
      options: [
        { isCorrect: true, text: "answer1" },
        { isCorrect: false, text: "answer2" },
        { isCorrect: false, text: "answer3" },
        { isCorrect: false, text: "answer4" },
      ],
    },
  ],
});
const ExamCreatePage = (props: Props) => {
  const [sections, setSections] = useState<ExamSectionType[]>([]);

  const handleCreateSection = () => {
    const newSections = [...sections, createInitialSection()];
    setSections(newSections);
  };

  const handleUpdateSection = (
    sectionId: number | string,
    sectionContent: ExamSectionType
  ) => {
    const updatedSections = sections.map((_) =>
      _.sectionId === sectionId ? sectionContent : _
    );
    setSections(updatedSections);
  };

  const handleDuplicateSection = (sectionId: string | number) => {
    const idx = sections.findIndex((item) => item.sectionId === sectionId);
    if (idx !== -1) {
      const clonedSection = structuredClone(sections[idx]);
      const updatedSections = [...sections];
      updatedSections.splice(idx + 1, 0, {
        ...clonedSection,
        sectionId: uuidv4(),
      });
      setSections(updatedSections);
    }
  };

  const handleDeleteSection = (sectionId: string | number) => {
    const idx = sections.findIndex((item) => item.sectionId === sectionId);
    if (idx !== -1) {
      const updatedSection = [...sections];
      updatedSection.splice(idx, 1);
      setSections(updatedSection);
    }
  };
  useEffect(() => {
    console.log(sections);
  }, [sections]);

  return (
    <div className="grid grid-cols-12 gap-3 items-start my-10">
      <div className="col-span-10 grid gap-10 ">
        {sections.map((section, idx) => (
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
        ))}
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
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Draft mode</Label>
          </div>
        </div>
        <Button className="w-full">Save</Button>
      </div>
    </div>
  );
};

export default ExamCreatePage;
