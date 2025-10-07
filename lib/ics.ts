export type CalendarEvent = {
  start: Date;
  end?: Date;
  summary: string;
  location?: string;
  description?: string;
};

export function parseICS(text: string): CalendarEvent[] {
  const lines = text.split(/\r?\n/);
  const events: CalendarEvent[] = [];
  let cur: any = null;

  const decode = (v: string) => v.replace(/\\n/g, '\n');

  for (const raw of lines) {
    const line = raw.trim();
    if (line === 'BEGIN:VEVENT') cur = {};
    else if (line === 'END:VEVENT') {
      if (cur.DTSTART && cur.SUMMARY) {
        events.push({
          start: parseICSTime(cur.DTSTART),
          end: cur.DTEND ? parseICSTime(cur.DTEND) : undefined,
          summary: decode(cur.SUMMARY || ''),
          location: decode(cur.LOCATION || ''),
          description: decode(cur.DESCRIPTION || ''),
        });
      }
      cur = null;
    } else if (cur) {
      const idx = line.indexOf(':');
      if (idx > -1) {
        const key = line.slice(0, idx).split(';')[0];
        const val = line.slice(idx + 1);
        cur[key] = (cur[key] ? cur[key] + ' ' : '') + val;
      }
    }
  }
  return events.sort((a, b) => a.start.getTime() - b.start.getTime());
}

function parseICSTime(s: string): Date {
  if (/^\d{8}T\d{6}Z$/.test(s)) {
    const y = +s.slice(0, 4), m = +s.slice(4, 6) - 1, d = +s.slice(6, 8);
    const hh = +s.slice(9, 11), mm = +s.slice(11, 13), ss = +s.slice(13, 15);
    return new Date(Date.UTC(y, m, d, hh, mm, ss));
  }
  if (/^\d{8}$/.test(s)) {
    const y = +s.slice(0, 4), m = +s.slice(4, 6) - 1, d = +s.slice(6, 8);
    return new Date(y, m, d);
  }
  return new Date(s);
}
