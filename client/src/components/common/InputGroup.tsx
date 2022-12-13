import * as React from 'react';
import cls from 'classnames';

interface InputGroupProps {
  placeholder?: string;
  value: string;
  error: string | undefined;
  type: string;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  placeholder = '',
  error,
  value,
  setValue,
  type,
}) => {
  return (
    <div className="mb-2">
      <input
        type={type}
        style={{ minWidth: 300 }}
        className={cls(
          `w-full p-3 transition duration-200 border border-gray-400 rounded bg-gray-50 focus:bg-white hover:bg-white`,
          { 'border-red-500': error }
        )}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <small className="font-medium text-red-500">{error}</small>
    </div>
  );
};

export default InputGroup;
