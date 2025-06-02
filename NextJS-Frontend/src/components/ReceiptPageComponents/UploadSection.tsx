'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Camera, Loader2 } from 'lucide-react';
import { ReceiptType } from '@/app/api/fetchReceipts';
import { CATEGORIES, PAYMENT_METHODS } from '@/app/constant/receipts';

interface UploadSectionProps {
  receipts: ReceiptType[];
  setReceipts: React.Dispatch<React.SetStateAction<ReceiptType[]>>;
}

export function UploadSection({ receipts, setReceipts }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);

    const totalFiles = files.length;
    let processedFiles = 0;

    Array.from(files).forEach(() => {
      setTimeout(
        () => {
          processedFiles++;
          const progress = Math.round((processedFiles / totalFiles) * 100);
          setUploadProgress(progress);

          if (processedFiles === totalFiles) {
            const newReceipts: ReceiptType[] = Array.from(files).map((file, index) => ({
              id: Math.max(...receipts.map((r) => r.id)) + index + 1,
              merchant: `Receipt ${file.name.split('.')[0]}`,
              date: new Date().toISOString(),
              amount: Math.random() * 100 + 10,
              category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
              status: 'pending',
              paymentMethod: PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)],
              taxAmount: Math.random() * 10,
              confidence: Math.floor(Math.random() * 30) + 70,
            }));

            setReceipts((prev) => [...prev, ...newReceipts]);

            setTimeout(() => {
              setIsUploading(false);
              setUploadProgress(0);
            }, 500);
          }
        },
        1000 + Math.random() * 2000,
      );
    });
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-background to-muted/30">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Upload New Receipt</CardTitle>
            <CardDescription className="text-base">
              Drag and drop or click to upload receipt images for automatic processing
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="receipt" className="text-sm font-medium">
              Receipt Image
            </Label>
            <div
              className={`flex items-center justify-center w-full transition-all duration-200 ${
                dragActive ? 'border-primary bg-primary/5' : 'border-dashed border-muted-foreground/25'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <label
                htmlFor="receipt-upload"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover:border-primary/50"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-16 h-16 mb-4 relative">
                      <Loader2 className="w-16 h-16 animate-spin text-primary" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium">{uploadProgress}%</span>
                      </div>
                    </div>
                    <p className="mb-2 text-base font-semibold text-foreground">Processing your receipt...</p>
                    <Progress value={uploadProgress} className="w-48 h-2" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <p className="mb-2 text-base font-semibold text-foreground">Drop files here or click to upload</p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG, PDF up to 10MB • Automatic OCR processing
                    </p>
                  </div>
                )}
                <Input
                  id="receipt-upload"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleFileInputChange}
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 h-11 text-base font-medium" disabled={isUploading}>
              <Upload className="h-4 w-4 mr-2" />
              Upload and Process
            </Button>
            <Button variant="outline" className="h-11" disabled={isUploading}>
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}