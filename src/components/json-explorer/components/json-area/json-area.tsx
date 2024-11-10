import './json-area.css';
import ObjectField from './components/object-field/object-field.tsx';
import { JSONObject } from '../../types.ts';

export interface Props {
  json: JSONObject;
  // This is the name for the root token
  // In the standard JsonPath spec, this is '$'
  rootElement: string;
  onFieldKeyClick: (
    fieldValue: string | number | boolean | null,
    jsonPath: string
  ) => void;
}

export default function JsonArea({
  json,
  rootElement,
  onFieldKeyClick,
}: Props) {
  return (
    <div className="json-area">
      <ObjectField
        fieldValue={json}
        jsonPath={rootElement}
        onFieldKeyClick={onFieldKeyClick}
      />
    </div>
  );
}
