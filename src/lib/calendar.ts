export async function getCalendar() {
  const now = new Date();
  const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const CALENDAR_ID =
    "c_4157985d2452dfd8a91b6a36bccab37deb9bffe9053a4b9bcc4e9fff9ef02924@group.calendar.google.com";
  const API_KEY = process.env.NEXT_PUBLIC_GCALENDAR_API_KEY || "";

  const params = new URLSearchParams({
    key: API_KEY,
    timeMin: now.toISOString(),
    timeMax: twoWeeksLater.toISOString(),
    // maxResults: '1000',
    singleEvents: "true",
    orderBy: "startTime",
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    CALENDAR_ID
  )}/events?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("+++ events ", data);

    const events = data.items.map((item: any) => ({
      id: item.id,
      updated: item.updated,
      summary: item.summary,
      creatorEmail: item.creator.email,
      htmlLink: item.htmlLink,
      start: item.start.dateTime,
      startTimezone: item.start.timeZone,
      end: item.end.dateTime,
      endTimezone: item.end.timeZone,
      hangoutLink: item.hangoutLink,
    }));

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

// const demo ={
//     "kind": "calendar#event",
//     "etag": "\"3443550935792000\"",
//     "id": "33i4hl6a0thaejl3rpu2bnd2dj_20240819T120000Z",
//     "status": "confirmed",
//     "htmlLink": "https://www.google.com/calendar/event?eid=MzNpNGhsNmEwdGhhZWpsM3JwdTJibmQyZGpfMjAyNDA4MTlUMTIwMDAwWiBjXzQxNTc5ODVkMjQ1MmRmZDhhOTFiNmEzNmJjY2FiMzdkZWI5YmZmZTkwNTNhNGI5YmNjNGU5ZmZmOWVmMDI5MjRAZw",
//     "created": "2024-05-03T16:31:58.000Z",
//     "updated": "2024-07-23T22:57:47.896Z",
//     "summary": "ARDC Weekly Sync",
//     "creator": {
//         "email": "anastassis.oikonomopoulos@l2beat.com"
//     },
//     "organizer": {
//         "email": "c_4157985d2452dfd8a91b6a36bccab37deb9bffe9053a4b9bcc4e9fff9ef02924@group.calendar.google.com",
//         "displayName": "ArbitrumDAO Governance Community Calendar",
//         "self": true
//     },
//     "start": {
//         "dateTime": "2024-08-19T12:00:00Z",
//         "timeZone": "Europe/Athens"
//     },
//     "end": {
//         "dateTime": "2024-08-19T13:00:00Z",
//         "timeZone": "Europe/Athens"
//     },
//     "recurringEventId": "33i4hl6a0thaejl3rpu2bnd2dj",
//     "originalStartTime": {
//         "dateTime": "2024-08-19T12:00:00Z",
//         "timeZone": "Europe/Athens"
//     },
//     "iCalUID": "33i4hl6a0thaejl3rpu2bnd2dj@google.com",
//     "sequence": 0,
//     "hangoutLink": "https://meet.google.com/dyi-ymiy-ugn",
//     "conferenceData": {
//         "entryPoints": [
//             {
//                 "entryPointType": "video",
//                 "uri": "https://meet.google.com/dyi-ymiy-ugn",
//                 "label": "meet.google.com/dyi-ymiy-ugn"
//             },
//             {
//                 "entryPointType": "more",
//                 "uri": "https://tel.meet/dyi-ymiy-ugn?pin=9066401397891",
//                 "pin": "9066401397891"
//             },
//             {
//                 "regionCode": "GR",
//                 "entryPointType": "phone",
//                 "uri": "tel:+30-21-1198-2137",
//                 "label": "+30 21 1198 2137",
//                 "pin": "493128210"
//             }
//         ],
//         "conferenceSolution": {
//             "key": {
//                 "type": "hangoutsMeet"
//             },
//             "name": "Google Meet",
//             "iconUri": "https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png"
//         },
//         "conferenceId": "dyi-ymiy-ugn"
//     },
//     "guestsCanSeeOtherGuests": false,
//     "eventType": "default"
// }
