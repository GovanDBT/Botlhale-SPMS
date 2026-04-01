/**
 * @file app/dashboard/components/LogoutAlertDialog.tsx
 * @description logout alert dialog
 */
import SignoutButton from "@/app/dashboard/components/SignoutButton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LogoutAlertDialog = ({ open, onOpenChange }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[19px] font-bold">
            You are About To <span className="text-red-500">Log Out.</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            You'll be signed out of your account.{" "}
            <span className="font-bold">Any unsaved changes will be lost.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <SignoutButton />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutAlertDialog;
