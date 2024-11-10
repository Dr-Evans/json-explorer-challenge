import { JSONPrimitive, JSONValue } from '../types.ts';

export function isJsonPrimitive(value: JSONValue): value is JSONPrimitive {
  return (
    value === null ||
    typeof value === 'number' ||
    typeof value === 'string' ||
    typeof value === 'boolean'
  );
}
