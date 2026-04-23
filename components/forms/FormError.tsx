import { CSSProperties } from 'react';
import { FieldError } from 'react-hook-form';

type FormErrorProps = {
  error?: FieldError;
  id: string;
};

export const FormError = ({ error, id }: FormErrorProps) => {
  if (!error?.message) {
    return null;
  }

  return (
    <p
      id={id}
      role="alert"
      style={{
        marginTop: '0.25rem',
        color: '#b00020',
        fontSize: '0.875rem',
        fontWeight: 600,
      }}
    >
      {error.message}
    </p>
  );
};

type FieldStateProps = {
  hasError: boolean;
};

export const getFieldErrorStyle = ({ hasError }: FieldStateProps): CSSProperties => ({
  border: `1px solid ${hasError ? '#b00020' : '#d0d7de'}`,
  outline: hasError ? '2px solid rgba(176,0,32,0.25)' : 'none',
  borderRadius: '6px',
});
