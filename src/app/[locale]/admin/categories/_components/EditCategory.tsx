"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Languages } from "@/constants/enums";
import { Translations } from "@/types/translations";
import { Category } from "@prisma/client";
import { EditIcon } from "lucide-react";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { updateCategory } from "../_actions/category";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

type InitialStateType = {
  message?: string;
  error?: ValidationError;
  status?: number | null;
};
const initialState: InitialStateType = {
  message: "",
  error: {},
  status: null,
};

function EditCategory({
  translations,
  category,
}: {
  translations: Translations;
  category: Category;
}) {
  const { locale } = useParams();
  const [state, action, pending] = useActionState(
    updateCategory.bind(null, category.id),
    initialState
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state.message) {
      toast(state.message, {
        duration: 3000,
        style: {
          color: state.status === 200 ? "#22c55e" : "#dc2626",
        },
      });
      if (state.status === 200) {
        setIsOpen(false);
      }
    }
  }, [state.message, state.status]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle
            className={
              locale === Languages.ARABIC ? "!text-right" : "!text-left"
            }
          >
            {translations.admin.categories.form.editName}
          </DialogTitle>
        </DialogHeader>
        <form action={action} className="pt-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="category-name">
              {translations.admin.categories.form.name.label}
            </Label>
            <div className="flex-1 relative">
              <Input
                type="text"
                id="categoryName"
                name="categoryName"
                defaultValue={category.name}
                placeholder={
                  translations.admin.categories.form.name.placeholder
                }
              />
              {state.error?.categoryName && (
                <p className="text-sm text-destructive absolute top-12">
                  {state.error?.categoryName}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-10">
            <Button type="submit" disabled={pending}>
              {pending ? <Loader /> : translations.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategory;
