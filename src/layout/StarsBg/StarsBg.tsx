import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { setupStars, updateStars } from "./stars";
import styles from "./StarsBg.module.scss";

const StarsBg = ({ isLoading, children }: PropsWithChildren<{ isLoading: boolean }>) => {
  const router = useRouter();
  const [isWarp, setIsWarp] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && setIsWarp(true);
    const handleComplete = (url: string) => url === router.asPath && setIsWarp(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  useEffect(() => {
    const stars: any = document.getElementById("stars");
    const starsCtx = stars.getContext("2d");
    let starsParams = { speed: isWarp ? 100 : 5, number: 300, extinction: 2 };
    const { starsCanvas, starsElements } = setupStars(
      stars,
      starsCtx,
      starsParams.number,
      starsParams.speed,
      starsParams.extinction,
    );
    updateStars(starsCtx, starsCanvas.width, starsCanvas.height, starsElements);
  }, [isWarp]);
  //   const stars: any = document.getElementById("stars");
  //   const starsCtx = stars.getContext("2d");
  //   let screenWindow = { w: 0, h: 0, c: [0, 0] };
  //   let starsElements: Star[] = [];
  //   let starsParams = { speed: isLoading ? 40 : 5, number: 300, extinction: 2 };

  //   class Star {
  //     x = Math.random() * stars.width;
  //     y = Math.random() * stars.height;
  //     z = Math.random() * stars.width;
  //     constructor() {
  //       console.log(
  //         this.x,
  //         this.y,
  //         this.z,
  //         screenWindow.c,
  //         starsParams.speed,
  //         stars.width,
  //         stars.height,
  //       );
  //     }
  //     move() {
  //       this.z -= starsParams.speed;
  //       if (this.z <= 0) {
  //         this.z = stars.width;
  //       }
  //     }

  //     show() {
  //       let x, y, rad, opacity;
  //       x = (this.x - screenWindow.c[0]) * (stars.width / this.z);
  //       x = x + screenWindow.c[0];
  //       y = (this.y - screenWindow.c[1]) * (stars.width / this.z);
  //       y = y + screenWindow.c[1];
  //       rad = stars.width / this.z;
  //       opacity = rad > starsParams.extinction ? 1.5 * (2 - rad / starsParams.extinction) : 1;
  //       starsCtx.beginPath();
  //       starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
  //       starsCtx.arc(x, y, rad, 0, Math.PI * 2);
  //       starsCtx.fill();
  //     }
  //   }

  //   // redraw the frame
  //   function updateStars() {
  //     starsCtx.fillStyle = "black";
  //     starsCtx.fillRect(0, 0, stars.width, stars.height);
  //     starsElements.forEach(function (s) {
  //       s.show();
  //       s.move();
  //     });
  //     window.requestAnimationFrame(updateStars);
  //   }

  //   // setup <canvas>, create all the starts
  //   function setupStars() {
  //     screenWindow = {
  //       w: window.innerWidth,
  //       h: window.innerHeight,
  //       c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
  //     };
  //     //window.cancelAnimationFrame(updateStars);
  //     stars.width = screenWindow.w;
  //     stars.height = screenWindow.h;

  //     starsElements = [];
  //     for (let i = 0; i < starsParams.number; i++) {
  //       starsElements[i] = new Star();
  //     }
  //   }
  //   setupStars();

  //   updateStars();
  // });

  return (
    <>
      <canvas id="stars" className={styles.stars_wrapper}></canvas>
      <div className={`container ${isWarp ? styles.warp_start : styles.warp_end}`}>{children}</div>
    </>
  );
};

export default StarsBg;
