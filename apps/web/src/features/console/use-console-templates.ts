"use client";

import { useEffect, useMemo, useState } from "react";

import { consoleTemplates as defaultTemplates } from "@/lib/mock/consoleTemplates";
import type { ConsoleTemplate, CornerKeyType } from "@/types/domain";

const storageKey = "cornerstone.console.templates.v1";

function readStoredTemplates() {
  if (typeof window === "undefined") return defaultTemplates;

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return defaultTemplates;

    const parsed = JSON.parse(raw) as ConsoleTemplate[];
    return parsed.length > 0 ? parsed : defaultTemplates;
  } catch {
    return defaultTemplates;
  }
}

export function useConsoleTemplates() {
  const [templates, setTemplates] = useState<ConsoleTemplate[]>(defaultTemplates);

  useEffect(() => {
    setTemplates(readStoredTemplates());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(templates));
  }, [templates]);

  const templatesByRewardType = useMemo(() => {
    return new Map<CornerKeyType, ConsoleTemplate>(
      templates.map((template) => [template.rewardType, template])
    );
  }, [templates]);

  function toggleTemplate(templateId: string) {
    setTemplates((current) =>
      current.map((template) =>
        template.id === templateId
          ? { ...template, active: !template.active }
          : template
      )
    );
  }

  function isRewardTypeActive(rewardType: CornerKeyType) {
    return templatesByRewardType.get(rewardType)?.active ?? false;
  }

  function resetTemplates() {
    setTemplates(defaultTemplates);
  }

  return {
    templates,
    templatesByRewardType,
    toggleTemplate,
    isRewardTypeActive,
    resetTemplates
  };
}
