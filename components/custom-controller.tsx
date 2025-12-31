import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  MultiSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { FormInput } from "@/types";

interface FormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  formInput: FormInput<Path<T>>;
}

function CustomController<T extends FieldValues>({
  form,
  formInput,
}: FormInputProps<T>) {
  if (formInput.type === "file") {
    return (
      <Controller
        control={form.control}
        name={formInput.name}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={formInput.id}>{formInput.label}</FieldLabel>
            <Input
              id={formInput.id}
              name={field.name}
              type={formInput.type}
              aria-invalid={fieldState.invalid}
              accept={formInput.accept}
              onChange={(event) => field.onChange(event.target.files)}
              onBlur={field.onBlur}
              ref={field.ref}
            />
            <FieldDescription>{formInput.description}</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    );
  }

  if (formInput.type === "select") {
    return (
      <Controller
        name={formInput.name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={formInput.id}>{formInput.label}</FieldLabel>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id={formInput.id}
                aria-invalid={fieldState.invalid}
                className="w-full"
              >
                <SelectValue placeholder={formInput.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {formInput.options.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>{formInput.description}</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    );
  }

  if (formInput.type === "multi-select") {
    return (
      <Controller
        name={formInput.name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={formInput.id}>{formInput.label}</FieldLabel>
            <MultiSelect
              id={formInput.id}
              name={formInput.name}
              aria-invalid={fieldState.invalid}
              options={formInput.options}
              onValueChange={field.onChange}
              defaultValue={field.value}
            />
            <FieldDescription>{formInput.description}</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    );
  }

  return (
    <Controller
      name={formInput.name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={formInput.id}>{formInput.label}</FieldLabel>
          <Input
            {...field}
            id={formInput.id}
            type={formInput.type}
            aria-invalid={fieldState.invalid}
          />
          <FieldDescription>{formInput.description}</FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export { CustomController };
