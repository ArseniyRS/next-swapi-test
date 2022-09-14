import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import "~/styles/globals.scss";
import StarsBg from "~/layout/starsBg/StarsBg";
import Header from "~/layout/header/Header";
import PersonVisited from "~/HOC/PersonVisited";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <>
      <Header />
      <PersonVisited>
        <StarsBg isLoading={isLoading}>
          <Component {...pageProps} />
        </StarsBg>
      </PersonVisited>
    </>
  );
}

export default MyApp;
