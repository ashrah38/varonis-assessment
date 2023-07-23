import React from "react";

const Select = ({ options, selectedChoice, setSelectedChoice }) => {
  const handleDropdownChange = (event) => {
    setSelectedChoice(event.target.value); // Update the selected choice when the dropdown value changes
  };

  return (
    <div>
      <select value={selectedChoice} onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.name.toLowerCase()}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
