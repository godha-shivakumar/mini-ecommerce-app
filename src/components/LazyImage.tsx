// import { useEffect, useRef, useState } from "react";

// function LazyImage({ src, alt }: { src: string; alt: string }) {
//   const imgRef = useRef<HTMLImageElement | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       const entry = entries[0];
//       if (entry.isIntersecting) {
//         setIsVisible(true);
//       }
//     });

//     if (imgRef.current) observer.observe(imgRef.current);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <img
//       ref={imgRef}
//       src={isVisible ? src : ""}
//       alt={alt}
//       width={150}
//       height={150}
//       loading="lazy"
//     />
//   );
// }

// export default LazyImage;

import { useEffect, useRef, useState } from "react";

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Observe image visibility within the viewport
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      // Trigger image loading when visible
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });

    if (imgRef.current) observer.observe(imgRef.current);

    // Remove observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ""}
      alt={alt}
      width={150}
      height={150}
      loading="lazy"
    />
  );
}

export default LazyImage;
