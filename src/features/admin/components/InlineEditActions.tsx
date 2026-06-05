'use client';

interface InlineEditActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export const InlineEditActions = ({ onSave, onCancel }: InlineEditActionsProps) => (
  <div className="flex space-x-3">
    <button
      type="button"
      onClick={onSave}
      className="text-admin-action text-brand-primary bg-transparent border-none p-0 cursor-pointer uppercase hover:underline"
    >
      Save
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="text-admin-action text-brand-muted bg-transparent border-none p-0 cursor-pointer uppercase hover:underline"
    >
      Cancel
    </button>
  </div>
);
