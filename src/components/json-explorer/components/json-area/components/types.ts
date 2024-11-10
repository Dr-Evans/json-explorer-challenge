import { JSONPrimitive, JSONValue } from '../../../types.ts';

export interface FieldProps<T extends JSONValue> {
  // The key of the field
  fieldKey?: string;
  // The value of the field
  fieldValue: T;
  // The JSON path of the field
  jsonPath: string;
  // Called when key is clicked
  onFieldKeyClick: (fieldValue: JSONPrimitive, jsonPath: string) => void;
  // Whether to show a trailing command when rendering the field
  showTrailingComma?: boolean;
}
