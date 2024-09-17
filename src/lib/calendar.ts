export async function getCalendar(calendar_id: string) {
  const now = new Date();
  const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const API_KEY = process.env.GCALENDAR_API_KEY || '';

  const params = new URLSearchParams({
    key: API_KEY,
    timeMin: now.toISOString(),
    timeMax: twoWeeksLater.toISOString(),
    // maxResults: '1000',
    singleEvents: 'true',
    orderBy: 'startTime',
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendar_id,
  )}/events?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const events = data.items.map((item: any) => ({
      id: item.id,
      updated: item.updated,
      summary: item.summary,
      creatorEmail: item.creator.email,
      htmlLink: item.htmlLink,
      start: item.start.dateTime || item.start.date,
      startTimezone: item.start.timeZone || data.timeZone,
      end: item.end.dateTime || item.end.date,
      endTimezone: item.end.timeZone || data.timeZone,
      hangoutLink: item.hangoutLink,
    }));

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
