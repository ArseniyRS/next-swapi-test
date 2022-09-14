import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { setupStars, updateStars } from "./stars";
import styles from "./StarsBg.module.scss";

const StarsBg = ({ isLoading, children }: PropsWithChildren<{ isLoading: boolean }>) => {
  const router = useRouter();
  const [isWarp, setIsWarp] = useState(false);

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
  }, [isWarp, isLoading]);

  return (
    <>
      <canvas id="stars" className={styles.stars_wrapper}></canvas>
      <div className={`container ${isWarp || isLoading ? styles.warp_start : styles.warp_end}`}>
        {children}
      </div>
    </>
  );
};

export default StarsBg;
