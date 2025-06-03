"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  Edit,
  AlertCircle,
  Clock,
  CheckCircle,
  CreditCard,
  Tag,
} from "lucide-react";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/accountUtils";
import {
  statusColors,
  categoryIcons,
  accountIcons,
} from "@/components/common/CategoryIcons";
import { Button } from "@heroui/button";
interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  account: string;
  status: "completed" | "pending" | "failed";
  merchant?: string;
  notes?: string;
  tags?: string[];
  receiptId?: string;
  paymentMethod?: string;
}

interface TransactionDetailsProps {
  transaction: Transaction | null;
  onClose: () => void;
  onEdit: () => void;
}

export function TransactionDetails({
  transaction,
  onClose,
  onEdit,
}: TransactionDetailsProps) {
  if (!transaction) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            transaction.amount > 0
              ? "bg-emerald-100 dark:bg-emerald-900"
              : "bg-slate-100 dark:bg-slate-800"
          )}
        >
          {transaction.amount > 0 ? (
            <ArrowUpRight className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <ArrowDownRight className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          )}
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold">
          <span
            className={
              transaction.amount > 0
                ? "text-emerald-600 dark:text-emerald-400"
                : ""
            }
          >
            {transaction.amount > 0 ? "+" : ""}
            {formatCurrency(Math.abs(transaction.amount))}
          </span>
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          {transaction.description}
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Date</span>
          <span className="font-medium">
            {format(new Date(transaction.date), "MMMM dd, yyyy")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Category</span>
          <Badge
            variant="outline"
            className={cn(
              "flex items-center gap-1 py-1",
              transaction.amount > 0
                ? "text-emerald-700 border-emerald-200 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-400"
                : "text-slate-700 border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            )}
          >
            {categoryIcons[transaction.category] || <Tag className="h-4 w-4" />}
            {transaction.category}
          </Badge>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Account</span>
          <div className="flex items-center gap-1.5">
            {accountIcons[transaction.account] || (
              <CreditCard className="h-4 w-4" />
            )}
            <span>{transaction.account}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Status</span>
          <Badge
            variant="outline"
            className={`${statusColors[transaction.status]}`}
          >
            {transaction.status === "completed" ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </>
            ) : transaction.status === "pending" ? (
              <>
                <Clock className="h-3 w-3 mr-1" />
                Pending
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3 mr-1" />
                Failed
              </>
            )}
          </Badge>
        </div>

        {transaction.merchant && (
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Merchant</span>
            <span className="font-medium">{transaction.merchant}</span>
          </div>
        )}

        {transaction.paymentMethod && (
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Payment Method
            </span>
            <span className="font-medium">{transaction.paymentMethod}</span>
          </div>
        )}

        {transaction.notes && (
          <div>
            <span className="text-slate-500 dark:text-slate-400">Notes</span>
            <p className="font-medium mt-1">{transaction.notes}</p>
          </div>
        )}

        {transaction.tags && transaction.tags.length > 0 && (
          <div>
            <span className="text-slate-500 dark:text-slate-400">Tags</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {transaction.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="bordered" onClick={onClose}>
          Close
        </Button>
        <div className="flex gap-2">
          <Button variant="bordered">
            <Copy className="h-4 w-4 mr-2" />
            Copy ID
          </Button>
          <Button onClick={onEdit} color="primary" size="md">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
