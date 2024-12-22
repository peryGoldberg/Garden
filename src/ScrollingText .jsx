import React from 'react';
import { useSpring, animated } from 'react-spring';

const ScrollingText = () => {
  // הגדרת האנימציה שזזה מצד ימין לשמאל
  const props = useSpring({
    to: { transform: 'translateX(-100%)' },  // מיקום המילים - זוז משמאל לימין
    from: { transform: 'translateX(0%)' }, // מתחילים מכיוון הימין ורוחב השורה
    reset: true, // להפעיל מחדש את האנימציה כל הזמן
    reverse: false, // שלא תתחיל להסתובב לאחור
    loop: true, // לבצע את האנימציה שוב ושוב
    config: { duration: 20000 }, // הזמן שלוקח להשלמת האנימציה
  });

  return (
    <div style={{
      width: '100%', 
      overflow: 'hidden', 
      position: 'relative', 
      display: 'flex',
    }}>
      <animated.div style={{
        ...props,
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
            fontFamily:"Atma",
          fontSize: '60px', 
          opacity:'0.4',
          color:'gray',
         overflow:'hidden',
         position: 'relative'
        }}>
          {/* טקסט שזז כל הזמן */}
           About us About us About us About us About us  About us About us
           
        </span>
      </animated.div>
    </div>
  );
};

export default ScrollingText;
