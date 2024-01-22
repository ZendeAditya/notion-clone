import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import Item from "./Item";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ItemIndicator } from "@radix-ui/react-dropdown-menu";
import { FileIcon, LucideIcon } from "lucide-react";

type Props = {};
interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}
const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExapnded] = useState<Record<string, boolean>>({});
  const onExapand = (documentId: string) => {
    setExapnded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        <>
          {level === 0 && (
            <>
              <Item.Skeleton level={level} />
              <Item.Skeleton level={level} />
            </>
          )}
        </>
      </>
    );
  }
  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-black ",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon as LucideIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExapand={() => onExapand(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
