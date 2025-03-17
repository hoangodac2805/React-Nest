import React, { useMemo } from "react";
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
  useCreateUserMutation,
  useGetUserQuery,
} from "@/features/users/userQuery";
import { closeDrawer } from "@/features/drawer";
import { AppDispatch } from "@/app/store";
import { DRAWER_NAME } from "@/config/drawer-name";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { UserFindInputType } from "@/types";
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
  const [createUser, result] = useCreateUserMutation();
  const { data, isLoading, isError } = useGetUserQuery(userId);
  const dispatch: AppDispatch = useDispatch();

  const userData = useMemo(() => {
    return data;
  }, [userId, isLoading]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: userData?.userName,
      role: userData?.role,
      isActive: userData?.isActive,
      profile: {
        firstName: userData?.profile.firstName,
        lastName: userData?.profile.lastName,
        gender: userData?.profile.gender,
      },
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // let res = await createUser(values);
    // if (!res.error) {
    //   toast.success("Thêm user thành công!");
    //   dispatch(closeDrawer(DRAWER_NAME.CREATE_USER));
    // } else {
    //   console.log(res.error);
    // }
  };

  if (isLoading) return <Loader className="animate-spin" aria-hidden="true" />;
  if (isError) return <div>Error</div>;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid grid-cols-2 items-start gap-4", className)}
      >
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled {...field} defaultValue={userData?.email} />
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
                <Input {...field} defaultValue={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            <FormItem className="grid gap-2">
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  );
}

export default EditUserForm;
