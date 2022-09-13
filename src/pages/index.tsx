import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Search from "components/Search/Search";
import PersonCardList from "components/person/PersonCardList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Swapi people</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PersonCardList />
      </main>
    </>
  );
};

export default Home;
