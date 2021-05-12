import {
  DEFAULT_LANGUAGE,
  Language,
  languages,
} from '@src/data/localization-data';
import { Elements, RichTextBlock } from 'prismic-reactjs';

/* -------------------------------------------------------------------------- */
function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* -------------------------------------------------------------------------- */

export function isValidLocale(locale: any): locale is Language {
  return languages.includes(locale);
}

/* -------------------------------------------------------------------------- */

export function isNullOrUndefined(obj: any): obj is null | undefined {
  return obj === null || obj === undefined;
}

/* -------------------------------------------------------------------------- */

export function tryParseLocale(locale: any): Language {
  return isValidLocale(locale) ? locale : DEFAULT_LANGUAGE;
}

/* -------------------------------------------------------------------------- */
export function isString(str: unknown): str is string {
  return typeof str === 'string' && str.length > 0;
}

/* -------------------------------------------------------------------------- */

export function isRichTextBlock(obj: unknown): obj is RichTextBlock {
  if (typeof obj !== 'object') return false;
  if (obj === null) return false;
  if (!hasOwnProperty(obj, 'type')) return false;
  if (typeof obj.type !== 'string') return false;

  return Object.values(Elements)
    .map((val) => val.toString().toLowerCase())
    .includes(obj.type.toLowerCase());
}

/* -------------------------------------------------------------------------- */
export function isEmail(text: string): boolean {
  const rfc5322 =
    /^[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  return rfc5322.test(text);
}
