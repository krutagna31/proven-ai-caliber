"use client";

import { CustomController } from "@/components/custom-controller";
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
import { FormInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  userId: z.string().refine((val) => val.trim().length > 0, {
    message: "User Id is required",
  }),
  password: z.string().refine((val) => val.trim().length > 0, {
    message: "Password is required",
  }),
});

const formInputs: FormInput<keyof z.infer<typeof formSchema>>[] = [
  {
    id: "form-login-user-id",
    name: "userId",
    label: "User Id",
    type: "text",
    placeholder: "e.g. 1234",
    description: "This is your user id",
  },
  {
    id: "form-login-password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "",
    description: "This is your password",
  },
];

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = ({
    userId,
    password,
  }: z.infer<typeof formSchema>): void => {
    console.log(userId, password);
  };

  return (
    <SectionContainer>
      <ViewContainer className="w-[min(100vw,var(--container-lg))]">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Please enter user id and password, then select your module and
              client.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form
              id="form-login"
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
                {form.formState.isSubmitting ? "Logging in" : "Login"}
              </Button>
            </form>
            <p className="text-sm">
              <span>Don&apos; have an account? </span>
              <Link className="underline" href="/register">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </ViewContainer>
    </SectionContainer>
  );
}
