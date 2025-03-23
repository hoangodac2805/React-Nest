import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Gender, UserRole } from "@/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/features/users/userQuery";
import { Loader } from "lucide-react";
import { UserFindInputType } from "@/types";
import { Label } from "@/components/ui/label";
import useReadImage from "@/hooks/use-read-image";
import { DialogCropImage } from "@/components/image-crop-dialog";
import { toast } from "sonner";
const formSchema = z.object({
  userName: z
    .string()
    .min(1, "User name must be at least 1 characters.")
    .max(25, "User name must be at most 25 characters.")
    .optional(),
  role: z.nativeEnum(UserRole, { message: "Invalid role." }),
  isActive: z.boolean(),
  profile: z.object({
    firstName: z
      .string()
      .min(1, "First name must be at least 1 characters.")
      .max(25, "First name must be at most 25 characters.")
      .optional(),
    lastName: z
      .string()
      .min(1, "Last name must be at least 1 characters.")
      .max(25, "Last name must be at most 25 characters.")
      .optional(),
    gender: z.nativeEnum(Gender, { message: "Invalid" }).optional(),
  }),
});
interface Props extends React.ComponentProps<"form"> {
  userId: UserFindInputType;
}

function EditUserForm({ className, userId }: Props) {
  const [updateUser, result] = useUpdateUserMutation();
  const { image, readImage } = useReadImage();
  const [croppedImage, setCroppedImage] = useState<Blob>();
  const [imgEditable, setImgEditTable] = useState(false);

  const { data, isLoading, isError } = useGetUserQuery(userId, {
    skip: !userId,
  });

  const userData = useMemo(() => {
    return data;
  }, [isLoading, data, isError]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      role: UserRole.USER,
      isActive: true,
      profile: {
        firstName: "",
        lastName: "",
        gender: undefined,
      },
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    readImage(file);
    if (file) {
      setImgEditTable(true);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (userData) {
      const formData = new FormData();

      for (const [key, value] of Object.entries(values)) {
        if (key === "profile" && typeof value === "object") {
          for (const [profileKey, profileValue] of Object.entries(value)) {
            if (profileValue !== undefined) {
              formData.append(`profile.${profileKey}`, String(profileValue));
            }
          }
        } else if (typeof value === "boolean") {
          formData.append(key, value.toString());
        } else if (value !== undefined) {
          formData.append(key, String(value));
        }
      }
      console.log(formData.get("isActive"));
      if (croppedImage) {
        formData.append("avatar", croppedImage, "avatar.jpg");
      }

      let res = await updateUser({ id: userData.id, data: formData });
      if (!res.error) {
        toast.success("Cập nhật user thành công!");
      } else {
        console.log(res.error);
      }
    }
  };

  useEffect(() => {
    if (userData) {
      form.reset({
        userName: userData.userName,
        role: userData.role,
        isActive: userData.isActive,
        profile: {
          firstName: userData.profile.firstName,
          lastName: userData.profile.lastName,
          gender: userData.profile.gender,
        },
      });
    }
  }, [userData, form]);

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
            name="email"
            render={() => (
              <FormItem className="grid gap-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input defaultValue={userData?.email} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem key={field.value} className="grid gap-2">
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an Role to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(UserRole).map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile.firstName"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile.lastName"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile.gender"
            render={({ field }) => (
              <FormItem key={field.value} className="grid gap-2">
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an Gender to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Gender).map((gender) => (
                      <SelectItem
                        key={gender}
                        value={gender}
                        className="capitalize"
                      >
                        {gender.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <Label htmlFor="avatar" className="col-span-2">
              Avatar
            </Label>
            <div className="">
              <Input id="avatar" type="file" onChange={handleFileChange} />
              {image && (
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <Button
                    size={"sm"}
                    onClick={() => {
                      setImgEditTable(true);
                    }}
                  >
                    Edit Image
                  </Button>
                  <Button size={"sm"} variant={"secondary"}>
                    Clear
                  </Button>
                </div>
              )}
            </div>
            <div>
              {croppedImage && <img src={URL.createObjectURL(croppedImage)} />}
            </div>
          </div>

          <div className="col-span-2 grid  grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
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
      <DialogCropImage
        open={imgEditable}
        onOpenChange={() => {
          setImgEditTable(false);
        }}
        image={image ? image : undefined}
        onHandleImage={(image) => {
          setCroppedImage(image);
        }}
      />
    </>
  );
}

export default EditUserForm;
