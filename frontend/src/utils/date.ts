export function dateToRelative(dateStr:string):string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 1000 * 60) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds}秒前`;
  }

  if (diff < 1000 * 60 * 60) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}分鐘前`;
  }
  if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}小時前`;
  }

  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" +
    (date.getDate() + 1)
  ).slice(-2)}`;
  //date.getDate() + 1
  //+字串0從後面取2，保持格式一致
}
