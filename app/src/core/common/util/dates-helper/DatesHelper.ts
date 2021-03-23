import {
  add,
  Duration,
  endOfDay,
  endOfHour,
  endOfMonth,
  startOfDay,
  startOfHour,
  startOfMonth,
  getDaysInMonth,
  getDate,
  getHours,
  isAfter,
  isBefore,
  getMonth,
  setHours,
  getYear,
  setDate,
} from 'date-fns';

export type TimeScale = 'days' | 'hours' | 'minutes';

export class DatesHelper {
  static addTime(amount: number, scale: keyof Duration, in_date: Date): Date {
    return add(in_date, { [scale]: amount });
  }

  static startOfDay(in_date?: Date): Date {
    const now = new Date();

    const startDate = startOfDay(in_date || now);

    return startDate;
  }

  static endOfDay(in_date?: Date): Date {
    const now = new Date();

    const endDate = endOfDay(in_date || now);

    return endDate;
  }

  static startOfMonth(in_date?: Date): Date {
    const now = new Date();

    const startDate = startOfMonth(in_date || now);

    return startDate;
  }

  static endOfMonth(in_date?: Date): Date {
    const now = new Date();

    const endDate = endOfMonth(in_date || now);

    return endDate;
  }

  static startOfHour(in_date?: Date): Date {
    const now = new Date();

    const startDate = startOfHour(in_date || now);

    return startDate;
  }

  static endOfHour(in_date?: Date): Date {
    const now = new Date();

    const endDate = endOfHour(in_date || now);

    return endDate;
  }

  static getDaysInMonth(in_date?: Date): number {
    const now = new Date();

    return getDaysInMonth(in_date || now);
  }

  static getDate(in_date?: Date): number {
    const now = new Date();

    return getDate(in_date || now);
  }

  static getHours = getHours;

  static isAfter(in_date?: Date | number, is_after_date?: Date): boolean {
    const now = new Date();

    return isAfter(in_date || now, is_after_date || now);
  }

  static isBefore = isBefore;

  static setDate = setDate;

  static setHours = setHours;

  static getMonth = getMonth;

  static getYear = getYear;
}
