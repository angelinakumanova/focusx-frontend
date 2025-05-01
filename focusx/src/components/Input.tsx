
interface Props {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  children?: React.ReactNode;
}

const Input = ({label, id, type, placeholder, children}: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <label htmlFor={id} className="md:w-1/4 font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="bg-neutral-700 border border-neutral-600 text-white p-2 rounded-lg w-full md:w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        placeholder={placeholder}
      />

      {children}
    </div>
  );
};

export default Input;
