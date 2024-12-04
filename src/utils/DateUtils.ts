const timeZones: string[] = [
  "America/Anchorage",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Moscow",
  "Africa/Cairo",
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland"
];

export const getUTCOffset = (timeZone: string): number => {
  const now = new Date();
  const tzString = now.toLocaleString('en-US', { timeZone });
  const localString = now.toLocaleString('en-US');
  const diff = (new Date(tzString).getTime() - new Date(localString).getTime()) / 3600000;
  return diff;
};

export const findEquivalentTimeZone = (timeZone: string): string => {
  const targetOffset = getUTCOffset(timeZone);

  for (const tz of timeZones) {
    if (getUTCOffset(tz) === targetOffset) {
      return tz;
    }
  }

  return 'GMT';
};

export function getUserTimeZone(): string {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timeZones.includes(userTimeZone)) {
    return userTimeZone;
  }

  return findEquivalentTimeZone(userTimeZone);
}
