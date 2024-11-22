type Props = {
  type: 'submit' | 'reset' | 'button';
  text: string;
  className?: string;
  onClick?: () => void;
};

export default function Button({ onClick, type, text, className }: Props) {
  return (
    <button
      type={`${type}`}
      onClick={onClick}
      className={`p-2 rounded-lg ${className}`}
    >
      {text}
    </button>
  );
}
