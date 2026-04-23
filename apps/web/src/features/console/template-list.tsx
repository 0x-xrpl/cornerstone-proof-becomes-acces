 "use client";

import { CheckCircle2, ToggleLeft, ToggleRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ConsoleTemplate } from "@/types/domain";

export function TemplateList({
  templates,
  onToggle
}: {
  templates: ConsoleTemplate[];
  onToggle?: (templateId: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            {template.rewardType}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-ink">
            {template.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-ink/72">
            Requirements: {template.requirementTypes.join(", ")}
          </p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-sm text-ink/65">
              Status: {template.active ? "Active" : "Draft"}
            </p>
            {onToggle ? (
              <Button
                variant={template.active ? "secondary" : "accent"}
                onClick={() => onToggle(template.id)}
                className="px-3 py-1.5 text-xs"
              >
                {template.active ? (
                  <ToggleRight className="mr-1 size-4" />
                ) : (
                  <ToggleLeft className="mr-1 size-4" />
                )}
                {template.active ? "Disable" : "Enable"}
              </Button>
            ) : null}
          </div>
          {template.active ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-pine">
              <CheckCircle2 className="size-4" />
              Next access path is available for proof-to-key unlocking.
            </div>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
