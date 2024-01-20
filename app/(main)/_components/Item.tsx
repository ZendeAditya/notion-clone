"use client";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import React from "react";

type Props = {};

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExapand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}
const Item = ({
  label,
  onClick,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExapand,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <div
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-gray-500/10 flex font-medium",
        active && "bg-gray-400/5 text-black"
      )}
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
    >
      {!!id && (
        <div
          className="rounded-sm h-full hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
          role="button"
          onClick={() => {}}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-gray-400" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 h-[18px] mr-2 text-black">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-black" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">ctrl</span>K
        </kbd>
      )}
    </div>
  );
};

export default Item;
