"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Star, Loader2 } from "lucide-react";

import { useAccountForm } from "@/app/hooks/useAccountForm";
import { AccountTypeSelector } from "@/components/ui/accountUi/AccountTypeSelector";
import { ErrorMessage } from "@/components/ui/accountUi/ErrorMessage";
import { Button } from "@heroui/button";

const CreateAccountDialog: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    isSubmitting,
    onSubmit,
    open,
    setOpen,
  } = useAccountForm();

  const watchedType = watch("type");
  const watchedIsDefault = watch("isDefault");

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSubmitting) {
      setOpen(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 p-0">
        <DialogHeader className="text-center space-y-2 pb-6 pt-6">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-2">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-2xl text-center font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Create New Account
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 text-center">
            Set up a new account to manage your finances
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Account Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm  font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                Account Name
                <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Main Checking, Emergency Fund"
                {...register("name")}
                className={`input-base border border-lime-500 ${errors.name ? "input-error" : ""}`}
              />
              <ErrorMessage error={errors.name} />
            </div>

            {/* Account Type */}
            <AccountTypeSelector
              watchedType={watchedType}
              setValue={setValue}
              error={errors.type}
            />

            {/* Initial Balance */}
            <div className="space-y-2">
              <label
                htmlFor="balance"
                className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                Initial Balance
                <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("balance")}
                  className={`input-base border border-lime-500 pl-10 ${
                    errors.balance ? "input-error" : ""
                  }`}
                />
              </div>
              <ErrorMessage error={errors.balance} />
            </div>

            {/* Default Account Toggle */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="isDefault"
                        className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        Set as Default Account
                      </label>
                      {watchedIsDefault && (
                        <Star className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This account will be selected by default for transactions
                    </p>
                  </div>
                  <Switch
                    id="isDefault"
                    checked={watchedIsDefault}
                    onCheckedChange={(checked) =>
                      setValue("isDefault", checked)
                    }
                    className="data-[state=checked]:bg-emerald-500 data-[state != checked]:bg-gray-300 dark:data-[state != checked]:bg-gray-700 border border-gray-400 dark:border-gray-600"
                  />
                </div>
              </CardContent>
            </Card>

            <DialogFooter className="pt-6">
              <div className="flex gap-3 w-full">
                <DialogClose asChild>
                  <Button
                    variant="bordered"
                    type="button"
                    className="flex-1 h-12 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  color="primary"
                  className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 hover:from-emerald-700 hover:to-teal-700 dark:hover:from-emerald-800 dark:hover:to-teal-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountDialog;
