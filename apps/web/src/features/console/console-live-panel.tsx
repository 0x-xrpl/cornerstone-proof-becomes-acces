"use client";

import { RouteHeader } from "@/components/route-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TemplateList } from "@/features/console/template-list";
import { useConsoleTemplates } from "@/features/console/use-console-templates";

export function ConsoleLivePanel() {
  const { templates, toggleTemplate, resetTemplates } = useConsoleTemplates();

  return (
    <div className="space-y-8">
      <RouteHeader
        eyebrow="Console"
        title="Template-based access activation"
        description="This console stays intentionally narrow. It lets an athlete, camp, or organizer enable the next access path without introducing a heavy admin backend."
      />

      <Card className="max-w-4xl text-sm leading-7 text-ink/72">
        The console is local-first in this MVP foundation. Template activation is
        stored in the browser so the product loop can demonstrate who gets to enable
        the next layer of access before a real service layer is added.
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={resetTemplates}>
            Reset to README defaults
          </Button>
        </div>
      </Card>

      <TemplateList templates={templates} onToggle={toggleTemplate} />
    </div>
  );
}
