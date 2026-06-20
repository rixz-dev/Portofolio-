export function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function formatDateID(d: Date) {
  const days = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MEI",
    "JUN",
    "JUL",
    "AGU",
    "SEP",
    "OKT",
    "NOV",
    "DES",
  ];
  return `${days[d.getDay()]} ${pad2(d.getDate())}.${months[d.getMonth()]}.${d.getFullYear()}`;
}

export function formatTime(d: Date) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}
