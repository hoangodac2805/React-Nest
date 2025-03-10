import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
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
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCreateUserMutation } from "@/features/users/userQuery";
import { closeDrawer } from "@/features/drawer";
import { AppDispatch } from "@/app/store";
import { DRAWER_NAME } from "@/config/drawer-name";
import { useDispatch } from "react-redux";
const formSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  userName: z
    .string()
    .min(1, "User name must be at least 1 characters.")
    .max(25, "User name must be at most 25 characters."),
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

function CreateUserForm({ className }: React.ComponentProps<"form">) {
  const [createUser, result] = useCreateUserMutation();
  const dispatch: AppDispatch = useDispatch();
  // const { refetch } = useGetUsersQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
      role: UserRole.USER,
      isActive: true,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    try {
      await createUser(values);
      // refetch();
      dispatch(closeDrawer(DRAWER_NAME.CREATE_USER));
    } catch (error) {

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
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
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
                    <SelectItem key={role} value={role}>{role}</SelectItem>
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
                    <SelectItem key={gender} value={gender} className="capitalize">
                      {gender.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" className="col-span-2">
          Create
        </Button>
      </form>
    </Form>
  );
}

export default CreateUserForm;
