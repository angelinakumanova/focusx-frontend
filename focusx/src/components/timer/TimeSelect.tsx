
interface Props {
  label: string;
  value: number;
  onChange: (val: number) => void;
};

const TimeSelect = ({ label, value, onChange }: Props) => {
  return (
    <div className="flex flex-col items-center">
    <label className="text-sm text-gray-400 mb-1">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-neutral-800 text-white rounded-lg px-4 py-2 focus:outline-none w-24 text-center"
    />
  </div>
  )
}

export default TimeSelect
