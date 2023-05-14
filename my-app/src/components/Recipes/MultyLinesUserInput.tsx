import React, { useState, ChangeEvent } from 'react';


interface Props {
  unitTitle: string,
  textFields: Array<string>,
  setTextFields: (ingredient: Array<string>) => void;
}
const UnitsList: React.FC<Props> = ({unitTitle, textFields, setTextFields}) => {
  const [newUnit, setNewUnit] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewUnit(event.target.value);
  };

  const handleAddUnit = () => {
    if (newUnit.trim() !== '') {
      setTextFields([...textFields, newUnit]);
      setNewUnit('');
    }
  };

  return (
    <div>
      <h2>{unitTitle}</h2>
      <ul>
        {textFields.map((unit, index) => (
          <li key={index}>{unit}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newUnit}
          onChange={handleInputChange}
          placeholder="Enter unit"
        />
        <button onClick={handleAddUnit}>+</button>
      </div>
    </div>
  );
};

export default UnitsList;
