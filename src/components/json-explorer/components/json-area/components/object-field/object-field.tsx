import { ReactElement } from 'react';
import ArrayField from '../array-field/array-field.tsx';
import { FieldProps } from '../types.ts';
import { JSONObject } from '../../../../types.ts';
import PrimitiveField from '../primitive-field/primitive-field.tsx';
import './object-field.css';
import { isJsonPrimitive } from '../../../../utils/is-json-primitive.ts';
import { isJsonArray } from '../../../../utils/is-json-array.ts';

export type Props = FieldProps<JSONObject>;

export default function ObjectField({
  fieldKey,
  fieldValue,
  jsonPath,
  onFieldKeyClick,
  showTrailingComma,
}: Props) {
  return (
    <div className="object-field">
      <div>
        {fieldKey && <span>{`${fieldKey}:`}&nbsp;</span>}
        {'{'}
      </div>
      {Object.entries(fieldValue).map(([key, value], index, array) => {
        const fieldJsonPath = `${jsonPath}.${key}`;
        const fieldShowTrailingComma = index < array.length - 1;

        let field: ReactElement;
        if (isJsonPrimitive(value)) {
          field = (
            <PrimitiveField
              fieldKey={key}
              fieldValue={value}
              jsonPath={fieldJsonPath}
              onFieldKeyClick={onFieldKeyClick}
              showTrailingComma={fieldShowTrailingComma}
            />
          );
        } else if (isJsonArray(value)) {
          field = (
            <ArrayField
              fieldKey={key}
              fieldValue={value}
              jsonPath={fieldJsonPath}
              onFieldKeyClick={onFieldKeyClick}
              showTrailingComma={fieldShowTrailingComma}
            />
          );
        } else {
          field = (
            <ObjectField
              fieldKey={key}
              fieldValue={value}
              jsonPath={fieldJsonPath}
              onFieldKeyClick={onFieldKeyClick}
              showTrailingComma={fieldShowTrailingComma}
            />
          );
        }

        return (
          <div className="field" key={key}>
            {field}
          </div>
        );
      })}
      <div>{`}${showTrailingComma ? ',' : ''}`}</div>
    </div>
  );
}
