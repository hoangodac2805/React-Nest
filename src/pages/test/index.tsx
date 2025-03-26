import * as React from "react"
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"



import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"


interface ItemType {
    id: string,
    label: string
}

const items: ItemType[] = [
    {
        id: "recents",
        label: "Recents",
    },
    {
        id: "home",
        label: "Home",
    },
    {
        id: "applications",
        label: "Applications",
    },
    {
        id: "desktop",
        label: "Desktop",
    },
    {
        id: "downloads",
        label: "Downloads",
    },
    {
        id: "documents",
        label: "Documents",
    },
]

const items2: ItemType[] = [
    {
        id: "recents2",
        label: "Recents2",
    },
    {
        id: "home2",
        label: "Home2",
    },
    {
        id: "applications3",
        label: "Applications3",
    },
    {
        id: "desktop4",
        label: "Desktop4",
    },
    {
        id: "downloads5",
        label: "Downloads5",
    },
    {
        id: "documents6",
        label: "Documents6",
    },
]

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

function Test() {
    const sourceForm = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: []
        }
    })
    const targetForm = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: []
        }
    })
    function onSubmitSource() {
        sourceForm.reset()
    }

    function onSubmitTarget(data: z.infer<typeof FormSchema>) {

    }

    return (
        <div className="flex justify-between max-w-md gap-5">
            <Command className="border">
                <CommandInput placeholder="Search..." />
                <CommandList>
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-48 w-full">
                            <Form {...sourceForm}>
                                <form className="space-y-8">
                                    <FormItem className="space-y-1">
                                        {items.map((item) => (
                                            <CommandItem key={item.id} value={item.id} className="">
                                                <FormField
                                                    key={item.id}
                                                    control={sourceForm.control}
                                                    name="items"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={item.id}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(item.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, item.id])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== item.id
                                                                                    )
                                                                                )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {item.label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            </CommandItem>
                                        ))}
                                        <FormMessage />
                                    </FormItem>
                                </form>
                            </Form>
                        </ScrollArea>
                    </CommandGroup>
                </CommandList>
            </Command>
            <div className="flex flex-col self-center gap-2">
                <Button variant={"outline"} size={"icon"} onClick={onSubmitSource}>
                    <ChevronRight />
                </Button>
                <Button variant={"outline"} size={"icon"}>
                    <ChevronLeft />
                </Button>
            </div>
            <Command className="border">
                <CommandInput placeholder="Search..." />
                <CommandList>
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-48 w-full">
                            <Form {...targetForm}>
                                <form className="space-y-8">
                                    <FormItem className="space-y-1">
                                        {items2.map((item) => (
                                            <CommandItem key={item.id} value={item.id} className="">
                                                <FormField
                                                    key={item.id}
                                                    control={targetForm.control}
                                                    name="items"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={item.id}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(item.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, item.id])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== item.id
                                                                                    )
                                                                                )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {item.label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            </CommandItem>
                                        ))}
                                        <FormMessage />
                                    </FormItem>
                                </form>
                            </Form>
                        </ScrollArea>
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}

export default Test;