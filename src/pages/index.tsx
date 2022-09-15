import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import PersonCardList from "~/components/person/PersonCardList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Swapi people</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <PersonCardList />
      </main>
    </>
  );
};

export default Home;
