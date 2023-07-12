export function getCurrencyString(value, format = "en-US", currency = "USD") {
  const extra = { style: "currency", currency };
  return Intl.NumberFormat(format, extra).format(value);
}
