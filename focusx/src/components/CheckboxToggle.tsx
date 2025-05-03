import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";

interface Props {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const CheckboxToggle = ({
  label,
  checked,
  onChange,
  className,
}: Props) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <span className="text-white">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only peer"
        />
        <IconCheck className="absolute z-50 text-white text-sm font-bold opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
        <div className="w-5 h-5 border-2 border-neutral-600 rounded-md flex items-center justify-center peer-checked:bg-green-500 peer-checked:border-green-500 transition"></div>
      </label>
    </div>
  );
};
