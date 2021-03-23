import { MoreThanOrEqual, Between, LessThanOrEqual } from 'typeorm';

export class BetweenDatesHelper {
  static between<WhereType>(
    key: string,
    whereObject: WhereType,
    from?: Date,
    to?: Date,
  ): void {
    if (from && !to) {
      Object.assign(whereObject, {
        [key]: MoreThanOrEqual(from),
      });
    } else if (from && to) {
      Object.assign(whereObject, {
        [key]: Between(from, to),
      });
    } else if (!from && to) {
      Object.assign(whereObject, {
        [key]: LessThanOrEqual(to),
      });
    }
  }
}
