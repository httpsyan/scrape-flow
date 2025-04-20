"use client";

import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import {
  CustomDialogHeader,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Layers2Icon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/src/domain";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Textarea,
} from "../ui";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createWorkflow } from "@/src/infrastructure";
export const CreateWorkflow = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      toast.success("Workflow criado com sucesso!", { id: "create-workflow" });
      setOpen(false);
    },
    onError(error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao criar workflow";
      toast.error(errorMessage, {
        id: "create-workflow",
        duration: 5000,
        description: "Por favor, verifique os dados e tente novamente",
      });
    },
  });

  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />

        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <FormLabel>Name</FormLabel>
                      <p className="text-xs text-primary">(required)</p>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Write a name for your workflow"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <FormLabel>Description</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </div>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Write a description for your workflow"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending && "Proceed"}
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
