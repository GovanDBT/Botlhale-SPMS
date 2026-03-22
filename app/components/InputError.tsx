/**
 * @file app/components/InputError.tsx
 * @description shows error message below input
 */
import { FieldError } from "react-hook-form";
import { CircleAlert } from "lucide-react";

interface Props {
  error?: FieldError;
}

const InputError = ({ error }: Props) => {
  if (!error) return null;

  return (
    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
      {" "}
      <CircleAlert size={14} /> {error.message}
    </p>
  );
};

export default InputError;
