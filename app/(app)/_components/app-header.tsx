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
import { clients } from "@/content";
import { Client, SelectInput } from "@/types";
import { useClient } from "@/context";

const selectInputs: SelectInput<"client">[] = [
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
  const { client, setClient } = useClient();

  return (
    <header className="sticky top-0 z-10 border-b bg-inherit py-2">
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
                  value={client}
                  onValueChange={(val: Client) => setClient(val)}
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
