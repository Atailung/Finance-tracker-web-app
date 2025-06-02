'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Receipt, CheckCircle, Clock, AlertCircle, Download, Edit } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ReceiptType } from '@/app/api/fetchReceipts';

interface ReceiptDetailProps {
  receipt: ReceiptType | null;
  onClose: () => void;
}

export function ReceiptDetailView({ receipt, onClose }: ReceiptDetailProps) {
  if (!receipt) return null;

  const statusClasses = {
    processed: 'bg-status-processed-light-bg text-status-processed-light-text border-status-processed-light-border dark:bg-status-processed-dark-bg dark:text-status-processed-dark-text',
    pending: 'bg-status-pending-light-bg text-status-pending-light-text border-status-pending-light-border dark:bg-status-pending-dark-bg dark:text-status-pending-dark-text',
    rejected: 'bg-status-rejected-light-bg text-status-rejected-light-text border-status-rejected-light-border dark:bg-status-rejected-dark-bg dark:text-status-rejected-dark-text',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Receipt className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{receipt.merchant}</h2>
            <p className="text-muted-foreground">{format(new Date(receipt.date), 'MMMM dd, yyyy')}</p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`${statusClasses[receipt.status]} text-xs font-medium px-3 py-1`}
        >
          {receipt.status === 'processed' ? (
            <>
              <CheckCircle className="h-3 w-3 mr-1" /> Processed
            </>
          ) : receipt.status === 'pending' ? (
            <>
              <Clock className="h-3 w-3 mr-1" /> Pending
            </>
          ) : (
            <>
              <AlertCircle className="h-3 w-3 mr-1" /> Rejected
            </>
          )}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Receipt Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-xl font-bold">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'NRP',
                    minimumFractionDigits: 2,
                  }).format(receipt.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tax</p>
                <p className="text-xl font-bold">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                  }).format(receipt.taxAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <Badge variant="outline" className="mt-1">
                  {receipt.category}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{receipt.paymentMethod}</p>
              </div>
            </div>

            {receipt.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="font-medium">{receipt.notes}</p>
              </div>
            )}

            {Array.isArray(receipt.tags) && receipt.tags.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {receipt.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Processing Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <p className="text-sm font-medium">{receipt.confidence}%</p>
              </div>
              <Progress
                value={receipt.confidence}
                className={cn(
                  'h-2',
                  receipt.confidence > 90 ? 'bg-emerald-500' : receipt.confidence > 70 ? 'bg-amber-500' : 'bg-red-500',
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Receipt ID</p>
                <p className="font-medium">#{receipt.id.toString().padStart(6, '0')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processed Date</p>
                <p className="font-medium">{format(new Date(), 'MMM dd, yyyy')}</p>
              </div>
            </div>

            {receipt.imageUrl ? (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Receipt Image</p>
                <div className="border rounded-md overflow-hidden">
                  <Image
                    src={receipt.imageUrl || '/placeholder.svg'}
                    alt={`Receipt from ${receipt.merchant}`}
                    className="w-full h-auto"
                    width={96}
                    height={64}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 border rounded-md bg-muted/20">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}