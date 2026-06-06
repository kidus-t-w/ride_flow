'use client';

interface CheckoutHeaderProps {
  totalMainStr: string;
  onBack: () => void;
}

export const CheckoutHeader = ({ totalMainStr, onBack }: CheckoutHeaderProps) => (
  <div className="border-b border-admin-border pb-5 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <button
      type="button"
      onClick={onBack}
      className="flex items-center gap-2 text-[20px] font-bold uppercase tracking-tight text-brand-ink bg-transparent border-none cursor-pointer hover:text-brand-primary transition-colors"
    >
      <span className="text-[24px] font-light leading-none">‹</span> REVIEW YOUR BOOKING
    </button>

    <div className="text-right flex items-baseline gap-1 self-end sm:self-auto">
      <span className="text-admin-body font-bold mr-1">Total:</span>
      <span className="text-dashboard-field font-bold align-top">$</span>
      <span className="text-[32px] font-bold leading-none">{totalMainStr}</span>
      <span className="text-admin-body font-bold align-top">.00</span>
    </div>
  </div>
);
