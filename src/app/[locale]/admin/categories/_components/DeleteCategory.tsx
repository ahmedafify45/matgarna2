"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Languages } from "@/constants/enums";
import { useParams } from "next/navigation";
import { deleteCategory } from "../_actions/category";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";
import { Translations } from "@/types/translations";

type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

function DeleteCategory({
  id,
  translations,
}: {
  id: string;
  translations: Translations;
}) {
  const [state, setState] = useState<StateType>({
    isLoading: false,
    message: "",
    status: null,
  });

  const [open, setOpen] = useState(false);
  const { locale } = useParams();

  const handleDelete = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const res = await deleteCategory(id);

      setState((prev) => ({
        ...prev,
        message: res.message,
        status: res.status,
      }));

      if (res.status === 200) {
        toast.success(res.message);
        setOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(translations.admin.categories.errors.deleteFailed);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle
            className={
              locale === Languages.ARABIC ? "!text-right" : "!text-left"
            }
          >
            {translations.admin.categories.confirmDelete}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-10 gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={state.isLoading}
          >
            {translations.cancel}
          </Button>
          <Button
            variant="destructive"
            disabled={state.isLoading}
            onClick={handleDelete}
          >
            {state.isLoading ? <Loader /> : translations.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCategory;
