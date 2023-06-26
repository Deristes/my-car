
export function toDecimals(number: number, decimals = 2):string {
  if (isNaN(number)) {
    return '-';
  }
  const intDigits = Math.trunc(number);
  const commaDigits =  Math.trunc((number - intDigits) * (10 ** decimals));
  return `${intDigits},${commaDigits}`;
}