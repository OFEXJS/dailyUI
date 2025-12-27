import type { InputProps } from 'antd';
import { Input } from 'antd';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

type RuleInputProps = {
  onCustomChange?: (value: string) => void;
} & InputProps;

const RuleInput: FC<RuleInputProps> = ({
  value: propValue,
  onCustomChange,
  ...rest
}) => {
  const [value, setValue] = useState('');
  const isComposingRef = useRef(false);
  const lastValidValueRef = useRef('');

  useEffect(() => {
    if (propValue !== undefined) {
      const v = String(propValue);
      setValue(v);
      lastValidValueRef.current = v;
    }
  }, [propValue]);

  const validate = (val: string) => {
    return [...val].every((char) => {
      if (['$', '"'].includes(char)) return false;
      if (/[\u4e00-\u9fa5]/.test(char)) return false;
      if (char === ' ') return true;
      return /^[0-9_]|[^\w\s]$/.test(char);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;

    if (isComposingRef.current) {
      setValue(nextValue);
      return;
    }

    if (validate(nextValue)) {
      setValue(nextValue);
      lastValidValueRef.current = nextValue;
      onCustomChange?.(nextValue);
    } else {
      setValue(lastValidValueRef.current);
    }
  };

  return (
    <Input
      {...rest}
      value={value}
      onChange={handleChange}
      onCompositionStart={() => {
        isComposingRef.current = true;
      }}
      onCompositionEnd={(e) => {
        isComposingRef.current = false;
        const finalValue = e.currentTarget.value;

        if (validate(finalValue)) {
          setValue(finalValue);
          lastValidValueRef.current = finalValue;
          onCustomChange?.(finalValue);
        } else {
          setValue(lastValidValueRef.current);
        }
      }}
    />
  );
};

export default RuleInput;
