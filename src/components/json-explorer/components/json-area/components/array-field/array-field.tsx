import { FieldProps } from '../types.ts';
import { JSONArray } from '../../../../types.ts';
import { ReactElement } from 'react';
import ObjectField from '../object-field/object-field.tsx';
import PrimitiveField from '../primitive-field/primitive-field.tsx';
import './array-field.css';
import { isJsonPrimitive } from '../../../../utils/is-json-primitive.ts';
import { isJsonArray } from '../../../../utils/is-json-array.ts';

export type Props = FieldProps<JSONArray>;

export default function ArrayField({
  fieldKey,
  fieldValue: fieldValues,
  jsonPath,
  onFieldKeyClick,
  showTrailingComma,
}: Props) {
  return (
    <div className="array-field">
      <div>
        {fieldKey && (
          <span>
            {fieldKey}
            {`:`}
            &nbsp;
          </span>
        )}
        {'['}
      </div>
      {fieldValues.map((value, index, array) => {
        const fieldJsonPath = `${jsonPath}[${index}]`;
        const fieldShowTrailingComma = index < array.length - 1;

        let element: ReactElement;
        if (isJsonPrimitive(value)) {
          element = (
            <PrimitiveField
              fieldValue={value}
              jsonPath={fieldJsonPath}
              onFieldKeyClick={onFieldKeyClick}
              showTrailingComma={fieldShowTrailingComma}
            />
          );
        } else if (isJsonArray(value)) {
          element = (
            <ArrayField
              fieldValue={value}
              jsonPath={fieldJsonPath}
              onFieldKeyClick={onFieldKeyClick}
              showTrailingComma={fieldShowTrailingComma}
            />
          );
        } else {
          element = (
            <ObjectField
              fieldValue={value}
              jsonPath={fieldJsonPath}
              onFieldKeyClick={onFieldKeyClick}
              showTrailingComma={fieldShowTrailingComma}
            />
          );
        }

        return (
          <div
            className="element"
            // For the first time in my career, setting the key with JSON.stringify is valid! :heh:
            // One could hash the stringified value for faster comparison #performance
            key={JSON.stringify(value)}
          >
            {element}
          </div>
        );
      })}
      <div>{`]${showTrailingComma ? ',' : ''}`}</div>
    </div>
  );
}
