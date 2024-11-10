import { JSONArray, JSONValue } from '../types.ts';

export function isJsonArray(value: JSONValue): value is JSONArray {
  return Array.isArray(value);
}
