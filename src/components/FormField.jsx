import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex w-full flex-1 flex-col">
      {labelName && (
        <span className="mb-[10px] font-epilogue text-[14px] font-medium leading-[22px] text-[#808191]">
          {labelName}
        </span>
      )}
      {/* Check if textArea or input field */}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="placeholder:text=[#4b5264] rounded-[10px] border border-[#3a3a43] bg-transparent py-[15px] px-[15px] font-epilogue text-[14px] text-white outline-none sm:min-w-[300px] sm:px-[25px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          //   step counter button for incrementing and decrementing
          step="0.1"
          placeholder={placeholder}
          className="placeholder:text=[#4b5264] rounded-[10px] border border-[#3a3a43] bg-transparent py-[15px] px-[15px] font-epilogue text-[14px] text-white outline-none sm:min-w-[300px] sm:px-[25px]"
        />
      )}
    </label>
  );
};

export default FormField;
