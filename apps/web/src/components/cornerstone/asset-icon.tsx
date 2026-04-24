import { cn } from "@/lib/utils/cn";

type SheetName = "keys" | "proof" | "access" | "proof-meta" | "squad";

const sheetPath: Record<SheetName, string> = {
  keys: "/assets/cornerstone/icons/icon-01.png",
  proof: "/assets/cornerstone/icons/icon-02.png",
  access: "/assets/cornerstone/icons/icon-03.png",
  "proof-meta": "/assets/cornerstone/icons/icon-04.png",
  squad: "/assets/cornerstone/icons/icon-05.png"
};

const sheetSize: Record<SheetName, string> = {
  keys: "300% 100%",
  proof: "300% 100%",
  access: "300% 100%",
  "proof-meta": "300% 100%",
  squad: "500% 200%"
};

const positions: Record<SheetName, string[]> = {
  keys: ["0% 50%", "50% 50%", "100% 50%"],
  proof: ["0% 50%", "50% 50%", "100% 50%"],
  access: ["0% 50%", "50% 50%", "100% 50%"],
  "proof-meta": ["0% 50%", "50% 50%", "100% 50%"],
  squad: ["0% 0%", "25% 0%", "50% 0%", "75% 0%", "100% 0%"]
};

export function AssetIcon({
  sheet,
  index,
  className,
  label
}: {
  sheet: SheetName;
  index: number;
  className?: string;
  label?: string;
}) {
  return (
    <span
      aria-label={label}
      role={label ? "img" : "presentation"}
      className={cn("asset-icon", className)}
      style={{
        backgroundImage: `url(${sheetPath[sheet]})`,
        backgroundSize: sheetSize[sheet],
        backgroundPosition: positions[sheet][index] ?? positions[sheet][0]
      }}
    />
  );
}
