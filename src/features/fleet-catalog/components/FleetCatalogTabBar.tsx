'use client';

import { Sliders, Flame, Diamond } from 'lucide-react';

interface TabConfig {
  name: string;
  icon: React.ReactNode | null;
  triggerPanel?: boolean;
}

const FILTER_TABS: TabConfig[] = [
  { name: 'Recommended', icon: null },
  { name: 'Filters', icon: <Sliders className="w-4 h-4" strokeWidth={1.5} />, triggerPanel: true },
];

interface FleetCatalogTabBarProps {
  activeFilter: string;
  onTabClick: (tabName: string, triggerPanel?: boolean) => void;
}

export const FleetCatalogTabBar = ({
  activeFilter,
  onTabClick,
}: FleetCatalogTabBarProps) => (
  <div className="flex flex-wrap gap-x-6 border-b border-admin-border mb-10">
    {FILTER_TABS.map((tab) => {
      const isSelected = activeFilter === tab.name && !tab.triggerPanel;
      return (
        <button
          key={tab.name}
          type="button"
          onClick={() => onTabClick(tab.name, tab.triggerPanel)}
          className={`text-admin-tab py-3 uppercase transition-all duration-150 flex items-center gap-2 border-b-2 bg-transparent rounded-none ${
            isSelected
              ? 'border-brand-ink text-brand-ink'
              : 'border-transparent text-brand-muted hover:text-brand-ink'
          }`}
        >
          {tab.icon && <span className="text-current">{tab.icon}</span>}
          {tab.name}
        </button>
      );
    })}
  </div>
);