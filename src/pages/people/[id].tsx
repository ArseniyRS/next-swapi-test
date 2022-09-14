import { GetServerSideProps } from "next";
import React, { useContext, useEffect } from "react";
import { getPeopleById } from "../../services/service";
import Head from "next/head";
import PersonProp from "components/Person/PersonProp/PersonRow";
import styles from "./PersonPage.module.scss";
import { PersonVisitedContext } from "HOC/PersonVisited";
import { Person } from "interfaces/person.interface";
import type { NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.params;
  if (!+id) {
    return {
      notFound: true,
    };
  }
  const response = await getPeopleById(+id);
  if (!response.data) {
    return {
      notFound: true,
    };
  }
  return {
    props: response.data,
  };
};

const PersonPage: NextPage<Person> = (props: Person) => {
  const { handlePersonVisited } = useContext(PersonVisitedContext);
  const { url, created, edited, ...otherProps } = props;
  const renderMainInfo = Object.entries(otherProps).map(([propLable, propValue]) => (
    <PersonProp key={propLable} label={propLable} value={propValue} />
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
