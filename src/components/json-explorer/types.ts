export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export type JSONPrimitive = string | number | boolean | null;

export interface JSONObject {
  [key: string]: JSONValue;
}

export type JSONArray = JSONValue[];
