import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import "styles/globals.scss";
import StarsBg from "layout/StarsBg/StarsBg";
import PersonVisited from "HOC/PersonVisited";
import Header from "layout/Header/Header";
function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <>
      <StarsBg isLoading={isLoading} />
      <Header />
      <div className="container">
        <PersonVisited>
          <Component {...pageProps} />
        </PersonVisited>
      </div>
    </>
  );
}

export default MyApp;
