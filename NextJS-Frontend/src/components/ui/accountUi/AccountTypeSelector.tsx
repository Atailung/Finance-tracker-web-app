import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FieldError } from "react-hook-form";
import { Info } from "lucide-react";
import { accountTypes } from "@/app/constant/accountTypes";

interface AccountTypeSelectorProps {
  watchedType: string;
  setValue: (field: "type", value: "CURRENT" | "SAVINGS") => void;
  error?: FieldError;
  className?: string; // Allow custom classes for flexibility
}

export const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
  watchedType,
  setValue,
  error,
  className = "",
}) => {
  const containerClasses = `space-y-3 ${className}`;
  const labelClasses = "text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300";
  const cardClasses = (isSelected: boolean) =>
    `cursor-pointer transition-all duration-200 hover:shadow-md ${
      isSelected
        ? "border-emerald-500 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950 shadow-sm"
        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
    }`;
  const iconWrapperClasses = (isSelected: boolean) =>
    `p-2 rounded-lg ${
      isSelected ? "bg-emerald-100 dark:bg-emerald-900" : "bg-gray-100 dark:bg-gray-800"
    }`;
  const iconClasses = (isSelected: boolean) =>
    `w-5 h-5 ${
      isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-gray-600 dark:text-gray-400"
    }`;

  return (
    <div className={containerClasses}>
      <label className={labelClasses}>
        Account Type
        <span className="text-red-500 dark:text-red-400">*</span>
      </label>
      <div className="grid grid-cols-1 gap-3">
        {accountTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = watchedType === type.value;
          return (
            <Card
              key={type.value}
              className={cardClasses(isSelected)}
              onClick={() => setValue("type", type.value)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={iconWrapperClasses(isSelected)}>
                    <Icon className={iconClasses(isSelected)} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {type.label}
                      </h4>
                      {isSelected && (
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                        >
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {type.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm flex items-center gap-1">
          <Info className="w-4 h-4 text-red-500 dark:text-red-400" />
          {error.message}
        </p>
      )}
    </div>
  );
};