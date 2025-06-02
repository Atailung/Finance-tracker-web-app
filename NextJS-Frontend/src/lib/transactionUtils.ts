import { format } from "date-fns";

export const downloadAsJson = (data: any, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

type Transaction = {
  id: string | number;
  date: string;
  description: string;
  merchant?: string;
  category: string;
  amount: number;
  account: string;
  status: string;
  paymentMethod?: string;
  notes?: string;
};

export const downloadAsCsv = (data: Transaction[], filename: string) => {
  const headers = [
    "ID",
    "Date",
    "Description",
    "Merchant",
    "Category",
    "Amount",
    "Account",
    "Status",
    "Payment Method",
    "Notes",
  ];
  const csvRows = [
    headers.join(","),
    ...data.map((transaction) =>
      [
        transaction.id,
        format(new Date(transaction.date), "yyyy-MM-dd"),
        `"${transaction.description}"`,
        `"${transaction.merchant || ""}"`,
        `"${transaction.category}"`,
        transaction.amount,
        `"${transaction.account}"`,
        transaction.status,
        `"${transaction.paymentMethod || ""}"`,
        `"${transaction.notes || ""}"`,
      ].join(",")
    ),
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
