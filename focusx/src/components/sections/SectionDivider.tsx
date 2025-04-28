interface Props {
  id?: string;
}

const SectionDivider = ({ id }: Props) => {
  return (
    <div id={id}
      className="opacity-30 blur-3xl
    min-h-64 w-full bg-gradient-to-b
  from-zinc-900 via-gray-600 to-zinc-700"
    />
  );
};

export default SectionDivider;
