import { useForm } from "react-hook-form";
import FormInput from "./../../ui/FormInput";

function Form() {
  const { register, handleSubmit } = useForm();

  return (
    <form className="grid grid-cols-2 gap-6">
      <div className="markup col-span-1">
        <label className="markup text-lg uppercase drop-shadow-sm">
          Duração
        </label>
      </div>

      <div className="markup col-span-1 flex flex-row items-center justify-between">
        <div className="markup grid grid-cols-6 gap-4">
          <input
            type="number"
            className="col-span-2 rounded border border-gray-300 outline-none"
          />
          <span className="col-span-1 text-center text-sm">hrs.</span>
          <input
            type="number"
            className="col-span-2 rounded border border-gray-300 outline-none"
          />
          <span className="col-span-1 text-center text-sm">min.</span>
        </div>
      </div>
    </form>
  );
}

export default Form;
