"use client";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import { Loader2, Trash2 } from "lucide-react";
import { deleteImage } from "../../lib/actions/image.actions";

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" className="btn-danger h-[50px] w-full md:h-[54px]">
          <Trash2 className="size-5" /> Delete Image
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col gap-8 rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-16-regular">
            This will permanently delete this image
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="btn-secondary h-11 rounded-full px-6">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="btn-base h-11 rounded-full bg-rose-500 px-6 text-white hover:bg-rose-600"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId);
              })
            }
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Deleting…
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
