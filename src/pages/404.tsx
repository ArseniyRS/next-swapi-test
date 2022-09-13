import { darthSVG } from "../assets";
import React from "react";
import Image from "next/image";

const Page404 = () => {
  return (
    <div className="not-found">
      <Image src={darthSVG} className="not-found__img" />
      <h1 className="not-found__text">
        404
        <br />
        Page Not Found
      </h1>
    </div>
  );
};

export default Page404;
