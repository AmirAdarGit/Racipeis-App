import React from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export const RecipePage: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location;


  const handleClick = () => {
    navigate('/')
  };

  console.log(state)
  return (
    <div>
      <h1>Recipe Details</h1>
      {/* Other recipe details */}
      <button onClick={handleClick}>Go Back</button>
    </div>
  )
}


export default RecipePage;
