"use client";

import { ViewContainer } from "@/components/layouts";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SidebarTrigger,
} from "@/components/ui";
import { ModeToggle } from "@/components/mode-toggle";
import { clients, modules } from "@/content";
import { SelectInput, Workspace } from "@/types";

const selectInputs: SelectInput<keyof Workspace>[] = [
  {
    id: "module",
    name: "module",
    label: "Module",
    type: "select",
    description: "This is your module",
    placeholder: "Select Module",
    options: modules,
  },
  {
    id: "client",
    name: "client",
    label: "Client",
    type: "select",
    description: "This is your client",
    placeholder: "Select Client",
    options: clients,
  },
];

function AppHeader() {
  const { workspace, setWorkspace } = useWorkspace();

  return (
    <header className="sticky top-0 border-b bg-inherit py-2 z-10">
      <ViewContainer className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          {selectInputs.map(
            ({ id, name, label, description, placeholder, options }) => (
              <div key={name}>
                <Label htmlFor={id} className="sr-only">
                  {label}
                </Label>
                <Select
                  name={name}
                  value={workspace[name]}
                  onValueChange={(val) =>
                    setWorkspace({ ...workspace, [name]: val })
                  }
                >
                  <SelectTrigger id={id} size="sm">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="sr-only">{description}</p>
              </div>
            ),
          )}
        </div>
        <ModeToggle />
      </ViewContainer>
    </header>
  );
}

export { AppHeader };