import dayjs from "dayjs";

export const formatNumber = (value: number, digits = 0): string => value.toFixed(digits);
export const formatPercent = (value: number, digits = 1): string => `${value.toFixed(digits)}%`;
export const formatDateTime = (value: number): string => dayjs(value).format("MM-DD HH:mm:ss");
export const formatDate = (value: number | string): string => dayjs(value).format("YYYY-MM-DD");

