export const rtlLangs = ['ar', 'he', 'fa', 'ur'];

export function isRtl(locale: string): boolean {
  const lang = locale.split('-')[0];
  return rtlLangs.includes(lang);
}
