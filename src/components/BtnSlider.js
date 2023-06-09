import React from "react";
import "../styles/style.scss";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
        {direction === "next" ? <NavigateNextIcon sx={{color: '#F5FBFE'}}/> : <NavigateBeforeIcon sx={{color: '#F5FBFE'}}/>}
    </button>
  );
}