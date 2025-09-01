export interface EventLinkOptions {
  link?: string | null;
  isPast?: boolean;
  pastEventLinkBehavior?: 'keep' | 'change' | 'remove';
  pastEventLink?: string | null;
}

export function formatEventDate(
  startDate: string,
  endDate?: string | null,
  timeDescription?: string | null
): { dateDisplay: string; timeDisplay: string } {
  const start = new Date(startDate);
  const startFormatted = start
    .toLocaleDateString('en-AU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase();

  let dateDisplay = startFormatted;

  if (endDate) {
    const end = new Date(endDate);
    const endFormatted = end
      .toLocaleDateString('en-AU', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      .toUpperCase();

    if (startFormatted !== endFormatted) {
      dateDisplay = `${startFormatted} - ${endFormatted}`;
    }
  }

  const timeDisplay = timeDescription || '';

  return { dateDisplay, timeDisplay };
}

export function getEventLink({
  link,
  isPast,
  pastEventLinkBehavior,
  pastEventLink,
}: EventLinkOptions): string | null {
  if (isPast) {
    switch (pastEventLinkBehavior) {
      case 'remove':
        return null;
      case 'change':
        return pastEventLink || null;
      case 'keep':
      default:
        return link || null;
    }
  }
  return link || null;
}

export function isEventPast(startDate: string, endDate?: string | null): boolean {
  const now = new Date();
  const eventEndDate = endDate ? new Date(endDate) : new Date(startDate);

  // Add one day to the end date to check if it's past midnight the day after
  const dayAfterEvent = new Date(eventEndDate);
  dayAfterEvent.setDate(dayAfterEvent.getDate() + 1);
  dayAfterEvent.setHours(0, 0, 0, 0);

  return now >= dayAfterEvent;
}