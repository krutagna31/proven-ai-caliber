import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { FormInput } from "@/types";

interface FormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  input: FormInput<Path<T>>;
}

function CustomController<T extends FieldValues>({
  form,
  input,
}: FormInputProps<T>) {
  if (input.type === "file") {
    return (
      <Controller
        control={form.control}
        name={input.name}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={input.id}>{input.label}</FieldLabel>
            <Input
              id={input.id}
              name={field.name}
              type={input.type}
              aria-invalid={fieldState.invalid}
              accept={input.accept}
              onChange={(event) => field.onChange(event.target.files)}
              onBlur={field.onBlur}
              ref={field.ref}
            />
            <FieldDescription>{input.description}</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    );
  }

  if (input.type === "select") {
    return (
      <Controller
        name={input.name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={input.id}>{input.label}</FieldLabel>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id={input.id}
                aria-invalid={fieldState.invalid}
                className="w-full"
              >
                <SelectValue placeholder={input.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {input.options.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>{input.description}</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    );
  }

  return (
    <Controller
      name={input.name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={input.id}>{input.label}</FieldLabel>
          <Input
            {...field}
            id={input.id}
            type={input.type}
            aria-invalid={fieldState.invalid}
          />
          <FieldDescription>{input.description}</FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export { CustomController };
