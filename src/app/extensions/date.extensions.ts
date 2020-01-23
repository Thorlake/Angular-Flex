interface Date {
  withoutTime(): Date;

  addSeconds(seconds: number): Date;
  addMinutes(minutes: number): Date;
  addHours(hours: number): Date;
  addDays(days: number): Date;

  isToday(): boolean;
  isSameYear(date: Date): boolean;
  isSameMonth(date: Date): boolean;
  isSameDate(date: Date): boolean;
}

Date.prototype.withoutTime = function (): Date {
  const date: Date = this;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

Date.prototype.addSeconds = function (seconds: number): Date {
  if (!seconds) {
    return this;
  }

  const date: Date = this;
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};

Date.prototype.addMinutes = function (minutes: number): Date {
  if (!minutes) {
    return this;
  }

  const date: Date = this;
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};

Date.prototype.addHours = function (hours: number): Date {
  if (!hours) {
    return this;
  }

  const date: Date = this;
  date.setHours(date.getHours() + hours);
  return date;
};

Date.prototype.addDays = function (days: number): Date {
  if (!days) {
    return this;
  }

  const date: Date = this;
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.isToday = function (): boolean {
  const today = new Date();
  return this.isSameDate(today);
};

Date.prototype.isSameYear = function (date: Date): boolean {
  return date && this.getFullYear() === date.getFullYear();
};

Date.prototype.isSameMonth = function (date: Date): boolean {
  return date && this.getFullYear() === date.getFullYear() && this.getMonth() === date.getMonth();
};

Date.prototype.isSameDate = function (date: Date): boolean {
  return date && this.getFullYear() === date.getFullYear() && this.getMonth() === date.getMonth() && this.getDate() === date.getDate();
};
