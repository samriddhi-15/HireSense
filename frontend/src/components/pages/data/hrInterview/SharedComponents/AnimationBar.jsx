import React, { useState, useEffect } from "react";
import "./SharedComponents.css";

const AnimationBar = ({ val, color, delay = 0 }) => {
  const [w, setW] = useState(0);
  
  useEffect(() => {
    const t = setTimeout(() => setW(val), 400 + delay);
    return () => clearTimeout(t);
  }, [val, delay]);

  return (
    <div className="abar-track">
      <div 
        className="abar-fill" 
        style={{ 
          width: `${w}%`, 
          background: `linear-gradient(90deg, ${color}, #4a9fd5)`, 
          transitionDelay: `${delay}ms` 
        }} 
      />
    </div>
  );
};

export default AnimationBar;