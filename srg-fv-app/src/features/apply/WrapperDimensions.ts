import { useEffect, useState } from 'react';

export const useContainerDimensions = (myRef: any) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const paddingTop = parseInt(
      window
        .getComputedStyle(myRef.current)
        .getPropertyValue('border-top-width')
        .replace('px', ''),
    );
    const paddingBottom = parseInt(
      window
        .getComputedStyle(myRef.current)
        .getPropertyValue('border-bottom-width')
        .replace('px', ''),
    );
    const paddingLeft = parseInt(
      window
        .getComputedStyle(myRef.current)
        .getPropertyValue('border-left-width')
        .replace('px', ''),
    );
    const paddingRight = parseInt(
      window
        .getComputedStyle(myRef.current)
        .getPropertyValue('border-right-width')
        .replace('px', ''),
    );

    const getDimensions = () => ({
      width: (myRef.current.offsetWidth as number) - paddingLeft - paddingRight,
      height:
        (myRef.current.offsetHeight as number) - paddingTop - paddingBottom - 1,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return dimensions;
};
