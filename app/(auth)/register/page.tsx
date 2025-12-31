"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionContainer, ViewContainer } from "@/components/layouts";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FieldGroup,
} from "@/components/ui";
import { CustomController } from "@/components/custom-controller";
import { clients } from "@/content/shared";
import type { FormInput } from "@/types";

const formSchema = z.object({
  userId: z.string().refine((val) => val.trim().length > 0, {
    message: "User Id is required",
  }),
  email: z.email("Email is invalid"),
  password: z.string().refine((val) => val.trim().length > 0, {
    message: "Password is required",
  }),
  client: z
    .array(z.enum(clients.map((client) => client.value)))
    .min(1, { message: "Client is required" }),
});

const formInputs: FormInput<keyof z.infer<typeof formSchema>>[] = [
  {
    id: "form-register-user-id",
    name: "userId",
    label: "User Id",
    type: "text",
    placeholder: "e.g. 1234",
    description: "This is your user id",
  },
  {
    id: "form-register-email",
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "e.g. a@email.com",
    description: "This is your email",
  },
  {
    id: "form-register-password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "",
    description: "This is your password",
  },
  {
    id: "form-register-client",
    name: "client",
    label: "Client",
    type: "multi-select",
    placeholder: "Select client",
    description: "This is your client",
    options: clients,
  },
];

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      email: "",
      password: "",
      client: [],
    },
  });

  const onSubmit = ({
    userId,
    email,
    password,
    client,
  }: z.infer<typeof formSchema>): void => {
    console.log(userId, email, password, client);
  };

  return (
    <SectionContainer>
      <ViewContainer className="w-[min(100vw,var(--container-lg))]">
        <Card>
          <CardHeader>
            <CardTitle>Register to your account</CardTitle>
            <CardDescription>
              Enter your details below to register your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form
              id="form-register"
              className="space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                {formInputs.map((formInput) => (
                  <CustomController
                    key={formInput.name}
                    form={form}
                    formInput={formInput}
                  />
                ))}
              </FieldGroup>
              <Button
                className="w-full"
                size="lg"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Registering" : "Register"}
              </Button>
            </form>
            <p className="text-sm">
              <span>Already have an account? </span>
              <Link className="underline" href="/login">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </ViewContainer>
    </SectionContainer>
  );
}
