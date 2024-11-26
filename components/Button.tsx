type Props = {
  type: 'submit' | 'reset' | 'button';
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  onClick,
  type,
  text,
  className,
  disabled,
}: Props) {
  return (
    <button
      type={`${type}`}
      onClick={onClick}
      className={`p-2 rounded-lg ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
