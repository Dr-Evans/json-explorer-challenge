import { useMemo, useState } from 'react';
import JsonArea from './components/json-area/json-area.tsx';
import { JSONObject, JSONPrimitive, JSONValue } from './types.ts';
import './json-explorer.css';
import { isJsonArray } from './utils/is-json-array.ts';
import { isJsonPrimitive } from './utils/is-json-primitive.ts';

export interface Props {
  json: JSONObject;
  rootElement: string;
}

/**
 * A component to select keys from a JSON object.
 * @param json
 * @param rootElement
 * @constructor
 */
export function JsonExplorer({ json, rootElement }: Props) {
  const [jsonPath, setJsonPath] = useState('');
  const [value, setValue] = useState<JSONPrimitive | undefined>();

  // Building this map would be very expensive if the json is complex
  // But this is a simple
  const jsonPathMap = useMemo(() => {
    return buildJsonPathMap(json, rootElement);
  }, [json, rootElement]);

  return (
    <div className="json-explorer">
      <input
        type="text"
        className={'json-path-input'}
        value={jsonPath}
        placeholder="Property"
        onChange={(e) => {
          const newJsonPath = e.target.value;
          setJsonPath(newJsonPath);

          const newValue = jsonPathMap.get(newJsonPath);
          setValue(newValue);
        }}
      />
      <div className={'json-path-value'}>{String(value)}</div>
      <JsonArea
        json={json}
        rootElement={rootElement}
        onFieldKeyClick={(newFieldValue, newJsonPath) => {
          setValue(newFieldValue);
          setJsonPath(newJsonPath);
        }}
      />
    </div>
  );
}

/**
 * Takes the JSONObject and recursively builds a map of all the object's field's jsonPaths to their corresponding values
 * @param obj - the JSONObject to build the map for
 * @param rootElement - The name of the root element, for example 'res'
 * @return jsonPathMap - A Map of all the object's field's JsonPaths to their corresponding value
 */
function buildJsonPathMap(
  obj: JSONObject,
  rootElement: string
): Map<string, JSONPrimitive> {
  const resultMap = new Map<string, JSONPrimitive>();

  function recurse(currentValue: JSONValue, currentJsonPath: string) {
    if (isJsonPrimitive(currentValue)) {
      // Base case: add the current path and value to the result map
      resultMap.set(currentJsonPath, currentValue);
    } else if (isJsonArray(currentValue)) {
      // Handle array by indexing each item
      currentValue.forEach((v, index) => {
        const elementJsonPath = `${currentJsonPath}[${index}]`;
        recurse(v, elementJsonPath);
      });
    } else {
      // Handle object by iterating over its keys
      Object.entries(currentValue).forEach(([key, value]) => {
        const fieldJsonPath = `${currentJsonPath}.${key}`;
        recurse(value, fieldJsonPath);
      });
    }
  }

  recurse(obj, rootElement);

  return resultMap;
}
