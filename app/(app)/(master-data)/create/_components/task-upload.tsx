import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useClient } from "@/context";
import { useTask } from "@/app/(app)/(master-data)/create/_context";
import { SectionContainer } from "@/components/layouts";
import { ErrorMessage } from "@/components/error-message";
import { Button, FieldGroup } from "@/components/ui";
import { CustomController } from "@/components/custom-controller";
import { SectionIntro } from "@/components/section-intro";
import { getDomain } from "@/lib/shared";
import { FormInput } from "@/types";

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const formSchema = z.object({
  spec: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, {
      message: "Spec file is required",
    })
    .refine((files) => files && allowedTypes.includes(files[0]?.type), {
      message: "Only PDF, DOC, DOCX files are allowed",
    }),
  stp: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, {
      message: "Stp file is required",
    })
    .refine((files) => files && allowedTypes.includes(files[0]?.type), {
      message: "Only PDF, DOC, DOCX files are allowed",
    }),
});

const formInputs: FormInput<keyof z.infer<typeof formSchema>>[] = [
  {
    id: "form-task-upload-spec",
    name: "spec",
    label: "Spec",
    type: "file",
    description: "Upload a spec file (PDF, DOC, DOCX)",
    accept: ".pdf,.doc,.docx",
  },
  {
    id: "form-task-upload-stp",
    name: "stp",
    label: "Stp",
    type: "file",
    description: "Upload a stp file (PDF, DOC, DOCX)",
    accept: ".pdf,.doc,.docx",
  },
];

type Response = {
  file1_path: string;
  file2_path: string;
  message: string;
  status: number;
};

function TaskUpload() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { client } = useClient();
  const { setTask } = useTask();

  const { mutate, status, error } = useMutation<
    Response,
    Error,
    { file1: File; file2: File }
  >({
    mutationFn: async ({ file1, file2 }) => {
      const url = new URL(`${getDomain(client)}/upload_files`);
      const body = new FormData();
      body.append("file1", file1);
      body.append("file2", file2);

      const response = await fetch(url, {
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new Error(
          `Upload Failed: ${response.status} ${response.statusText}`,
        );
      }
      return response.json();
    },
    onMutate: () => {
      toast.loading("Uploading files.", { id: "upload-files" });
    },
    onError: (error) => {
      toast.error(`Failed to upload failes: ${error.message}.`, {
        id: "upload-files",
      });
    },
    onSuccess: (data, vars) => {
      toast.success("Files uploaded successfully.", { id: "upload-files" });
      setTask({
        state: "uploaded",
        spec: {
          name: vars.file1.name,
          path: data.file1_path,
        },
        stp: {
          name: vars.file2.name,
          path: data.file2_path,
        },
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const file1 = values.spec[0];
    const file2 = values.stp[0];
    mutate({ file1, file2 });
  };

  return (
    <SectionContainer className="space-y-4">
      <SectionIntro
        title="Task Upload"
        description="Upload your spec and stp documents. Supported file types: DOC, DOCX."
      />
      <form
        id="form-task-upload"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            {formInputs.map((formInput) => (
              <CustomController
                key={formInput.name}
                form={form}
                formInput={formInput}
              />
            ))}
          </div>
        </FieldGroup>
        {error && <ErrorMessage error={error} />}
        <Button type="submit">
          {status === "pending" ? "Uploading" : "Upload"}
        </Button>
      </form>
    </SectionContainer>
  );
}

export { TaskUpload };
