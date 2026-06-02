import React, { useState, useEffect } from "react";

const AnimatedBar = ({ val, color, delay = 0 }) => {
  const [w, setW] = useState(0);
  
  useEffect(() => { 
    const t = setTimeout(() => setW(val), 300 + delay); 
    return () => clearTimeout(t); 
  }, [val, delay]);
  
  return (
    <div style={{ height: 6, background: "rgba(0,0,0,0.07)", borderRadius: 50, overflow: "hidden", marginTop: 4 }}>
      <div 
        style={{ 
          height: "100%", 
          width: `${w}%`, 
          background: `linear-gradient(90deg, ${color}, #4a9fd5)`, 
          borderRadius: 50, 
          transition: "width 1.2s cubic-bezier(.22, 1, .36, 1)" 
        }}
      />
    </div>
  );
};

export default AnimatedBar;