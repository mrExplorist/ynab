"use client";

import { CircleOff, Loader2, PlusSquare } from "lucide-react";
import { CreateCategorySchema, CreateCategorySchemaType } from "@/lib/validators/categories";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import React, { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { Input } from "@/components/ui/input";
import Picker from "@emoji-mart/react";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import data from "@emoji-mart/data";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";

;

interface Props {
    type: TransactionType;
    successCallback: (category: Category) => void;
    trigger?: ReactNode;
}

function CreateCategoryDialog({ type, successCallback, trigger }: Props) {
    const [open, setOpen] = useState(false);
    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            type,
        },
    });


    const theme = useTheme();




    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ? (
                    trigger
                ) : (
                    <Button
                        variant={"ghost"}
                        className="flex border-separate items-center justify-start roudned-none border-b px-3 py-3 text-muted-foreground"
                    >
                        <PlusSquare className="mr-2 h-4 w-4" />
                        Create new
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create
                        <span
                            className={cn(
                                "m-1",
                                type === "income" ? "text-emerald-500" : "text-red-500"
                            )}
                        >
                            {type}
                        </span>
                        category
                    </DialogTitle>
                    <DialogDescription>
                        Categories are used to group your transactions
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => { })} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your category will appear in the app
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className="h-[100px] w-full"
                                                >
                                                    {form.watch("icon") ? (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <span className="text-5xl" role="img">
                                                                {field.value}
                                                            </span>
                                                            <p className="text-xs text-muted-foreground">
                                                                Click to change
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <CircleOff className="h-[48px] w-[48px]" />
                                                            <p className="text-xs text-muted-foreground">
                                                                Click to select
                                                            </p>
                                                        </div>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>

                                        </Popover>
                                    </FormControl>
                                    <FormDescription>
                                        This is how your category will appear in the app
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant={"secondary"}
                            onClick={() => {
                                form.reset();
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={form.handleSubmit(() => { })} disabled={false}>
                        {!true && "Create"}
                        {true && <Loader2 className="animate-spin" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateCategoryDialog;
