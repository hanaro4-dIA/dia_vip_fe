type Props = {
  type: 'submit' | 'reset' | 'button';
  text: string;
  bg: string;
};

export default function Button({ type, text, bg }: Props) {
  return (
    <button
      type={`${type}`}
      className={` ${bg} p-2 rounded-lg`}
    >
      {text}
    </button>
  );
}
