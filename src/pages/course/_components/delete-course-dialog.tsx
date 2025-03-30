import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCourseMutation } from "@/features/courses/courseQuery";
import { CourseType } from "@/types/course.type";
import { Row } from "@tanstack/react-table";
import { Loader } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  row?: Row<CourseType>["original"];
}

const DeleteCourseDialog = (props: Props) => {
  const [deleteCourse, result] = useDeleteCourseMutation();
  const handleConfirm = async () => {
    const res = await deleteCourse(props.row?.id!);
    if (!res.error) {
      props.onOpenChange?.(false);
      toast.success("Xóa khóa học thành công.");
    }
  };
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Xóa khóa học {props.row?.nameVn}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ xóa khóa học {props.row?.nameVn} khỏi hệ thống.
            Bạn có muốn tiếp tục không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Quay lại</AlertDialogCancel>
          <Button disabled={result.isLoading} onClick={handleConfirm}>
            {result.isLoading ? (
              <Loader className="animate-spin" aria-hidden="true" />
            ) : (
              "Xóa"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCourseDialog;
