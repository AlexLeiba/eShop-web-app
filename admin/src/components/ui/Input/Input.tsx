import './Input.scss';

type Props = {
  label: string;
  error: string;
  placeholder: string;
  value: string;
  onChange: (e: string) => void;
  type: 'text' | 'password' | 'email' | 'number' | 'textarea';
};
export function Input({
  label,
  error,
  placeholder,
  value,
  onChange,
  type = 'text',
}: Props) {
  return (
    <div className='input-container'>
      <h4>{label}</h4>
      {type !== 'textarea' ? (
        <input
          className='input'
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          className='input'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      {error && <p className='text-error'>{error}</p>}
    </div>
  );
}
