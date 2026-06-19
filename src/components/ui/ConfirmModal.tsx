'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isDestructive = true,
}: ConfirmModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md mx-4 bg-admin-surface border border-admin-border shadow-lg">
        <div className="flex justify-between items-center p-4 border-b border-admin-border">
          <h3 className="text-lg font-bold uppercase text-brand-ink">{title}</h3>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-ink">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-brand-ink">{message}</p>
        </div>
        <div className="flex justify-end gap-3 p-4 border-t border-admin-border">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-admin-border uppercase text-sm font-bold hover:bg-admin-surface-muted"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 uppercase text-sm font-bold text-white ${
              isDestructive ? 'bg-brand-danger hover:bg-red-700' : 'bg-brand-primary hover:bg-brand-primary-hover'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};