'use client';

import { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

export default function TypingText({ 
  text, 
  speed = 100, 
  as: Component = 'span',
  className = ''
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (displayedText.length === text.length) {
      setIsComplete(true);
    }
  }, [displayedText, text, speed]);

  return (
    <Component className={className}>
      {displayedText}
      {!isComplete && <span className="typing-cursor">|</span>}
    </Component>
  );
}
