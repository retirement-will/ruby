export function scoreCountry(country: any, prefs: any) {
  return (
    country.surfing * prefs.surfing +
    country.bjj * prefs.bjj +
    country.cost * prefs.cost +
    country.healthcare * prefs.healthcare +
    country.airports * prefs.airports
  );
}
