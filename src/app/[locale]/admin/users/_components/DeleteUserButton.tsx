"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteUser } from "../_actions/user";
import { toast } from "sonner";

function DeleteUserButton({ userId }: { userId: string }) {
  const [state, setState] = useState<{
    pending: boolean;
    status: null | number;
    message: string;
  }>({
    pending: false,
    status: null,
    message: "",
  });
  const handleDelete = async (id: string) => {
    try {
      setState((prev) => {
        return { ...prev, pending: true };
      });
      const res = await deleteUser(id);
      setState((prev) => {
        return { ...prev, status: res.status, message: res.message };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => {
        return { ...prev, pending: false };
      });
    }
  };

  useEffect(() => {
    if (state.message && state.status && !state.pending) {
      toast(state.message, {
        duration: 3000,
        style: {
          color: state.status === 200 ? "#22c55e" : "#dc2626",
        },
      });
    }
  }, [state.pending, state.message, state.status]);
  return (
    <Button
      type="button"
      variant="outline"
      disabled={state.pending}
      onClick={() => handleDelete(userId)}
    >
      <Trash2 />
    </Button>
  );
}

export default DeleteUserButton;
