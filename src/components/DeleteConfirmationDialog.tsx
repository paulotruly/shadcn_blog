import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TrashIcon } from "lucide-react"

interface DeleteConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postTitle: string
  onConfirm: () => void
  isDeleting?: boolean
}

function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isDeleting = false,
}: DeleteConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm" className="bg-slate-500">
        
        <AlertDialogHeader className="sm:text-left">
          <div className="mx-auto mb-2 inline-flex size-10 items-center justify-center rounded-md bg-destructive/10">
            <TrashIcon className="size-6 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center">
            Delete post?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Are you sure you want to delete this post? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={(e) => {
              e.preventDefault()
              onConfirm()
            }}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>


      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfirmationDialog
