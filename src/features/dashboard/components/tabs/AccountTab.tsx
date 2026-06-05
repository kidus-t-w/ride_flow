'use client';

import { AccountSubNav } from '@/features/dashboard/components/account/AccountSubNav';
import { AddressPanel } from '@/features/dashboard/components/account/AddressPanel';
import { EmailPanel } from '@/features/dashboard/components/account/EmailPanel';
import { PersonalInfoPanel } from '@/features/dashboard/components/account/PersonalInfoPanel';
import type { AccountProfile, AccountSubTab } from '@/features/dashboard/types';

interface AccountTabProps {
  accountSubTab: AccountSubTab;
  onAccountSubTabChange: (tab: AccountSubTab) => void;
  profile: AccountProfile;
  onUpdateProfile: <K extends keyof AccountProfile>(
    key: K,
    value: AccountProfile[K]
  ) => void;
  onSavePersonal: () => void;
  onSaveAddress: () => void;
  onDeleteAccount: () => void;
}

export const AccountTab = ({
  accountSubTab,
  onAccountSubTabChange,
  profile,
  onUpdateProfile,
  onSavePersonal,
  onSaveAddress,
  onDeleteAccount,
}: AccountTabProps) => (
  <div className="animate-in fade-in duration-150">
    <h1 className="text-dashboard-hero text-brand-ink mb-2">ACCOUNT</h1>
    <p className="text-dashboard-subtitle text-brand-ink mb-12">
      One place to manage your account
    </p>

    <AccountSubNav activeSubTab={accountSubTab} onSubTabChange={onAccountSubTabChange} />

    {accountSubTab === 'personal' && (
      <PersonalInfoPanel
        profile={profile}
        onUpdate={onUpdateProfile}
        onSave={onSavePersonal}
        onDeleteAccount={onDeleteAccount}
      />
    )}

    {accountSubTab === 'email' && (
      <EmailPanel profile={profile} onUpdate={onUpdateProfile} />
    )}

    {accountSubTab === 'address' && (
      <AddressPanel
        profile={profile}
        onUpdate={onUpdateProfile}
        onSave={onSaveAddress}
      />
    )}
  </div>
);
