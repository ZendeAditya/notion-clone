"use client";
import ConfirmModal from "@/components/modals/confirmModal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "sonner";

type Props = {};

const TrashBox = (props: Props) => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter((document) => {
    return document.title
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });
  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });
    if (params.documentId === documentId) {
      router.push("documents");
    }
    if (documents === undefined) {
      return (
        <div className="h-full flex items-center justify-center p-4">
          <Spinner size={"lg"} />
        </div>
      );
    }
  };
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center pb-2">
          No Document Found
        </p>
        {filteredDocuments?.map((documents) => (
          <div
            key={documents._id}
            role="button"
            onClick={() => onClick(documents._id)}
            className="text-sm rounded-sm w-full flex items-center justify-between"
          >
            <span className="truncate pl-3">{documents.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, documents._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200"
              >
                <Undo className="h-4 w-4" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(documents._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
