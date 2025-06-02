'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { fetchStats, Stat } from '@/app/api/fetchStats';

// Map icon strings to actual icon components
const iconMap: { [key: string]: React.ElementType } = {
  ArrowUpIcon,
  ArrowDownIcon,
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  change: number;
  icon: string;
}

function StatCard({ title, value, description, change, icon }: StatCardProps) {
  const isPositive = change > 0;
  const Icon = iconMap[icon] || ArrowUpIcon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2">
          <p className="text-xs text-muted-foreground">{description}</p>
          <div
            className={`flex items-center text-xs ${
              title === 'Expenses'
                ? isPositive
                  ? 'text-destructive'
                  : 'text-green-500'
                : isPositive
                ? 'text-green-500'
                : 'text-destructive'
            }`}
          >
            {title === 'Expenses' ? (
              isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )
            ) : isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    async function loadStats() {
      const data = await fetchStats();
      setStats(data);
    }
    loadStats();
  }, []);

  return (
    <>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          change={stat.change}
          icon={stat.icon}
        />
      ))}
    </>
  );
}