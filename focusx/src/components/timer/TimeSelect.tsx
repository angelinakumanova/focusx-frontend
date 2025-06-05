interface Props {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

const TimeSelect = ({ label, value, onChange, min, max }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);


    const currentMin = min ? min : 0;
    const currentMax = max ? max : 60;
    if (isNaN(val) || val < currentMin ) val = currentMin;
    if (val > currentMax) val = currentMax;

    onChange(val);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-sm text-gray-400 mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => handleChange(e)}
        className="bg-neutral-800 text-white rounded-lg px-4 py-2 focus:outline-none w-24 text-center"
      />
    </div>
  );
};



export default TimeSelect;
