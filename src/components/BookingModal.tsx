'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error';
  buttonText?: string;
  onButtonClick?: () => void;
}

export const BookingModal = ({
  isOpen,
  onClose,
  title,
  message,
  type,
  buttonText,
  onButtonClick,
}: BookingModalProps) => {
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

  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  const titleColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  const buttonBg = type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`w-full max-w-md mx-4 p-6 rounded-lg shadow-xl border ${bgColor} relative`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className={`text-xl font-bold mb-2 ${titleColor}`}>{title}</h3>
        <p className={`mb-6 ${textColor}`}>{message}</p>
        <button
          onClick={() => {
            onButtonClick?.();
            onClose();
          }}
          className={`w-full py-2 text-white font-bold uppercase tracking-wide rounded ${buttonBg} transition-colors`}
        >
          {buttonText || (type === 'success' ? 'View Bookings' : 'Go to Homepage')}
        </button>
      </div>
    </div>
  );
};