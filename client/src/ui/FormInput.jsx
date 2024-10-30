import { useState } from "react";

function FormInput({
  label,
  id,
  type,
  placeholder,
  inputClass = null,
  register,
}) {
  const [hasValue, setHasValue] = useState(false);

  function changeHandler(e) {
    if (e.target.value) setHasValue(true);

    if (!e.target.value) setHasValue(false);
  }

  return (
    <div className="flex flex-row items-center justify-between gap-20">
      <label className="text-lg uppercase" htmlFor={id}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        step={type === "number" ? 0.01 : null}
        {...register.register(id, {
          ...register?.api,
          onChange: changeHandler,
        })}
        style={{
          borderColor: hasValue ? "#4ade80" : "#9ca3af",
        }}
        onScroll={(e) => e.preventDefault()}
        className={`${inputClass ? inputClass : `rounded border p-2 text-sm shadow-sm outline-none placeholder:text-xs placeholder:text-gray-300`} `}
        type={type}
        id={id}
      />
    </div>
  );
}

export default FormInput;
