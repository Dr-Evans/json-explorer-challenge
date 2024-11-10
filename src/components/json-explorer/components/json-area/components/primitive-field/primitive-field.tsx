import { FieldProps } from '../types.ts';
import { JSONPrimitive } from '../../../../types.ts';
import './primitive-field.css';

export type Props = FieldProps<JSONPrimitive>;

export default function PrimitiveField({
  fieldKey,
  fieldValue,
  jsonPath,
  onFieldKeyClick,
  showTrailingComma,
}: Props) {
  const value =
    typeof fieldValue === 'string' ? `'${fieldValue}'` : String(fieldValue);

  return (
    <span>
      {fieldKey && (
        <span>
          <span
            className={'key'}
            onClick={() => onFieldKeyClick(fieldValue, jsonPath)}
          >
            {`${fieldKey}:`}
          </span>
          &nbsp;
        </span>
      )}
      <span>{value}</span>
      {showTrailingComma ? ',' : ''}
    </span>
  );
}
