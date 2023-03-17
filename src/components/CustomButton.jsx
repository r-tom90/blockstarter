import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      /*   TODO: 
        - Hover: Color change
        - Active click color change
        */
      className={`min-h-[52px] rounded-[10px] px-4 font-epilogue text-[16px] font-semibold leading-[26px] text-white ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
