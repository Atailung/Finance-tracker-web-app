import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/lib/schema";
import toast from "react-hot-toast";

type AccountFormData = {
  name: string;
  type: "CURRENT" | "SAVINGS";
  balance: string;
  isDefault?: boolean;
};

export const useAccountForm = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
    mode: "onChange",
  });

  const { register, handleSubmit, formState, setValue, watch, reset } = form;

  const onSubmit = async (data: AccountFormData) => {
    setIsSubmitting(true);
    console.log("Form Data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Account created successfully:", data);
    toast.success("Account created successfully!", {
      style: {
        background: "#10b981", // emerald-500
        color: "#fff",
        border: "1px solid #059669", // emerald-600
      },
      duration: 3000,
    });

    reset();
    setOpen(false);
    setIsSubmitting(false);
  };

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    reset,
    isSubmitting,
    onSubmit,
    open,
    setOpen,
  };
};