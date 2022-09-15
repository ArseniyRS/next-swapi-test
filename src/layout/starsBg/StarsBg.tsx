import { useRouter } from "next/router";
import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { setupStars, updateStars } from "./stars";
import styles from "./StarsBg.module.scss";

const StarsBg = ({ isLoading, children }: PropsWithChildren<{ isLoading: boolean }>) => {
  const router = useRouter();
  const [isWarp, setIsWarp] = useState(false);
  const [stars, setStars] = useState<any>();
  const [starsCtx, setStarsCtx] = useState<any>();
  let starsParams = { speed: isWarp ? 100 : 5, number: 300, extinction: 2 };
  useEffect(() => {
    const handleStart = () => setIsWarp(true);
    const handleComplete = () => setIsWarp(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  const startBg = () => {
    const { starsCanvas, starsElements } = setupStars(
      stars,
      starsCtx,
      starsParams.number,
      starsParams.speed,
      starsParams.extinction,
    );
    updateStars(starsCtx, starsCanvas.width, starsCanvas.height, starsElements);
  };
  useEffect(() => {
    if (stars && starsCtx) {
      startBg();
    }
  }, [isWarp, isLoading, stars, starsCtx]);
  useEffect(() => {
    setStars(document.getElementById("stars"));
    if (stars) {
      setStarsCtx(stars.getContext("2d"));
    }

    let resizeTimeout: any;
    if (stars && starsCtx) {
      window.onresize = function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(startBg, 500);
      };
    }
  }, [stars, starsCtx]);
  return (
    <>
      <canvas id="stars" className={styles.stars_wrapper}></canvas>
      <div className={isWarp || isLoading ? styles.warp_start : styles.warp_end}>{children}</div>
    </>
  );
};

export default StarsBg;
