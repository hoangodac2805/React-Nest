import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div>
      NotFound
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
