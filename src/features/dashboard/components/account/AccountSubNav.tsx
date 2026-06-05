'use client';

import { ACCOUNT_SUB_TABS, type AccountSubTab } from '@/features/dashboard/types';

interface AccountSubNavProps {
  activeSubTab: AccountSubTab;
  onSubTabChange: (tab: AccountSubTab) => void;
}

export const AccountSubNav = ({ activeSubTab, onSubTabChange }: AccountSubNavProps) => (
  <div className="flex space-x-admin-tab-gap border-b border-admin-border mb-10">
    {ACCOUNT_SUB_TABS.map((sub) => (
      <button
        key={sub.id}
        type="button"
        onClick={() => onSubTabChange(sub.id)}
        className={`text-dashboard-subnav pb-3 transition-all border-b-2 bg-transparent rounded-none px-0 cursor-pointer ${
          activeSubTab === sub.id
            ? 'border-brand-ink text-brand-ink font-bold'
            : 'border-transparent text-brand-muted hover:text-brand-ink'
        }`}
      >
        {sub.label}
      </button>
    ))}
  </div>
);
