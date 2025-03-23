import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  ratioHeight: number;
  ratioWidth: number;
}

export const AspectRatio = ({ children, ratioHeight, ratioWidth }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const updateHeight = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.getBoundingClientRect().width;
      setHeight((width * ratioHeight) / ratioWidth);
    }
  }, [ratioHeight, ratioWidth]);

  useEffect(() => {
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateHeight]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${height}px` }}>
      {children}
    </div>
  );
};
