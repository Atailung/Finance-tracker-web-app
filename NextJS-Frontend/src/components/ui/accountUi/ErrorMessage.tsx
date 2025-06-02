import { Info } from "lucide-react";
import { FieldError } from "react-hook-form";

interface ErrorMessageProps {
  error?: FieldError;
  className?: string; // Allow custom styling
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className = "" }) => {
  if (!error) return null;

  const errorClasses = `text-red-500 dark:text-red-400 text-sm flex items-center gap-1 ${className}`;

  return (
    <p className={errorClasses}>
      <Info className="w-4 h-4 text-red-500 dark:text-red-400" />
      {error.message}
    </p>
  );
};