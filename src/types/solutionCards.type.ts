import type { Language } from "./language.type";

/** A string that must be provided in every supported language. */
export type Bilingual = Record<Language, string>;

export type WidgetType =
  | "donut"
  | "gauge"
  | "barList"
  | "badgeProgress"
  | "checklist"
  | "lineChart";

/* ---------- donut ---------- */
export interface DonutSegment {
  label: Bilingual;
  /** 0–100, used to size the arc */
  percent: number;
  /** Text shown in the legend. Defaults to `${percent}%` if omitted. */
  displayValue?: string;
  /** Any valid CSS color (hex, rgb, tailwind-resolved hex, etc). */
  color: string;
}

export interface DonutData {
  /** "side": ring left, legend right. "stacked": ring on top, legend below. */
  layout: "side" | "stacked";
  centerValue: string;
  centerSubLabel?: Bilingual;
  segments: DonutSegment[];
}

/* ---------- gauge ---------- */
export interface GaugeData {
  value: number;
  /** Omit both to hide the min/max row (e.g. a plain 0–100% gauge). */
  min?: number;
  max?: number;
  valueSuffix?: string;
  statusLabel: Bilingual;
  callout?: {
    text: Bilingual;
  };
}

/* ---------- bar list ---------- */
export interface BarListRow {
  label: Bilingual;
  statusText: Bilingual;
  percent: number;
  color: string;
}

export interface BarListData {
  rows: BarListRow[];
}

/* ---------- badge + progress ---------- */
export interface BadgeProgressData {
  bigValue: string;
  progressPercent: number;
  statusText: Bilingual;
}

/* ---------- checklist ---------- */
export interface ChecklistItem {
  label: Bilingual;
  description?: Bilingual;
}

export interface ChecklistData {
  items: ChecklistItem[];
}

/* ---------- line chart ---------- */
export interface LineChartData {
  /** Small caption above the big number, e.g. "Net Cash Flow". */
  valueLabel?: Bilingual;
  bigValue: string;
  badgeText?: string;
  /** One array per line. Values normalized 0–100 (0 = bottom, 100 = top). */
  series: number[][];
  colors?: string[];
}

export type SolutionCardData =
  | DonutData
  | GaugeData
  | BarListData
  | BadgeProgressData
  | ChecklistData
  | LineChartData;

export interface SolutionCard {
  widget: WidgetType;
  title: Bilingual;
  data: SolutionCardData;
}

/** Every hero has exactly two cards: a larger primary and a compact secondary. */
export interface SolutionHeroCards {
  primary: SolutionCard;
  secondary: SolutionCard;
}
