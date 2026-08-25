import type { Language } from "./language.type";

export type BilingualText = Record<Language, string>;

export interface StatisticsCardProps {
  lang: Language;
  solution?: string;
}

export interface SolutionStatisticsCardData {
  title?: BilingualText;
  subtitle?: BilingualText;
  days?: Array<{
    label: BilingualText;
  }>;
  badge?: BilingualText;
  metrics?: Array<{
    label: BilingualText;
    value: string;
    change?: string;
    color?: string;
  }>;
  customData?: Record<string, any>;
}

export type StatisticsCardsConfig = Record<string, SolutionStatisticsCardData>;
