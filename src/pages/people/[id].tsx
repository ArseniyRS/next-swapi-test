import { GetServerSideProps } from "next";
import React, { useContext, useEffect } from "react";
import Head from "next/head";
import styles from "./PersonPage.module.scss";
import type { NextPage } from "next";
import { Person } from "~/interfaces/person.interface";
import { PersonVisitedContext } from "~/HOC/PersonVisited";
import { getPeopleById } from "~/services/service";
import PersonRow from "~/components/person/personProp/PersonRow";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.params;
  if (!+id) {
    return {
      notFound: true,
    };
  }
  try {
    const response = await getPeopleById(+id);
    if (!response.data) {
      return {
        notFound: true,
      };
    }
    return {
      props: response.data,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const PersonPage: NextPage<Person> = (props: Person) => {
  const { handlePersonVisited } = useContext(PersonVisitedContext);
  const { url, created, edited, ...otherProps } = props;
  const renderMainInfo = Object.entries(otherProps).map(([propLable, propValue]) => (
    <PersonRow key={propLable} label={propLable} value={propValue} />
  ));
  useEffect(() => {
    handlePersonVisited(props);
  }, [props]);
  return (
    <>
      <Head>
        <title>{props.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.person}>
        <h2 className={styles.person__title}>person card</h2>
        {renderMainInfo}
      </div>
    </>
  );
};

export default PersonPage;
