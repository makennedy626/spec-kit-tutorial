import { format, isAfter, isBefore, addDays, startOfDay } from 'date-fns';

export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy');
}

export function formatDateTime(date: Date): string {
  return format(date, 'MMM dd, yyyy HH:mm');
}

export function isDeadlineApproaching(deadline: Date, days: number = 3): boolean {
  const now = new Date();
  const warningDate = addDays(now, days);
  return isAfter(deadline, now) && isBefore(deadline, warningDate);
}

export function isDeadlinePassed(deadline: Date): boolean {
  return isBefore(deadline, startOfDay(new Date()));
}

export function getDaysUntilDeadline(deadline: Date): number {
  const now = startOfDay(new Date());
  const deadlineDay = startOfDay(deadline);
  const diffTime = deadlineDay.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}