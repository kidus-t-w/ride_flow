'use client';

export interface Tab<T extends string> {
  id: T;
  label: string;
}

interface TabNavProps<T extends string> {
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
  tabClassName?: string;
}

export const TabNav = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className = 'mb-12',
  tabClassName = '',
}: TabNavProps<T>) => (
  <div className={`border-b border-admin-border overflow-x-auto scrollbar-none ${className}`}>
    <div className="flex space-x-admin-tab-gap min-w-max pb-0">
      {tabs.map((tab) => {
        const isTabActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`text-admin-tab py-3 uppercase transition-all border-b-2 bg-transparent rounded-none px-0 cursor-pointer ${tabClassName} ${
              isTabActive
                ? 'border-brand-ink text-brand-ink'
                : 'border-transparent text-brand-muted hover:text-brand-ink'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  </div>
);
