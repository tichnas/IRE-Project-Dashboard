export default function formatDate(date) {
  const { year, month, day } = date;
  return `${day}/${month}/${year}`;
}
