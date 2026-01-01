"use client";

import {
  InputDocuments,
  Tests,
  Worksheets,
} from "@/app/(app)/(master-data)/create/_steps";
import { ViewContainer } from "@/components/layouts";
import { PageIntro } from "@/components/page-intro";
import { Button, defineStepper } from "@/components/ui";
import React from "react";

const { Stepper } = defineStepper(
  {
    id: "input-documents",
    title: "Input Documents",
    Component: InputDocuments,
  },
  {
    id: "tests",
    title: "Tests",
    Component: Tests,
  },
  {
    id: "worksheets",
    title: "Worksheets",
    Component: Worksheets,
  },
);

export default function CreatePage() {
  return (
    <>
      <PageIntro
        title="Create a new entry"
        description="Follow the steps below to input your documents, define the product, analyze data, and export the final results."
      />
      <ViewContainer>
        <Stepper.Provider className="space-y-4" variant="horizontal">
          {({ methods }) => (
            <React.Fragment>
              <Stepper.Navigation>
                {methods.all.map((step) => (
                  <Stepper.Step
                    key={step.id}
                    of={step.id}
                    onClick={() => methods.goTo(step.id)}
                  >
                    <Stepper.Title>{step.title}</Stepper.Title>
                  </Stepper.Step>
                ))}
              </Stepper.Navigation>
              {methods.switch({
                "input-documents": ({ Component }) => <Component />,
                tests: ({ Component }) => <Component />,
                worksheets: ({ Component }) => <Component />,
              })}
              <Stepper.Controls>
                {!methods.isLast && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={methods.prev}
                    disabled={methods.isFirst}
                  >
                    Previous
                  </Button>
                )}
                <Button onClick={methods.isLast ? methods.reset : methods.next}>
                  {methods.isLast ? "Reset" : "Next"}
                </Button>
              </Stepper.Controls>
            </React.Fragment>
          )}
        </Stepper.Provider>
      </ViewContainer>
    </>
  );
}
