import React from "react";
// import { match } from "react-router-dom";

import CardDetail from "../../components/Card-Detail/Card-Detail.component";
import NewClientForm from "../../components/NewClientForm/NewClientForm.component";

const SingleCardPage = ({ match }) => {
  return match.path !== "/add" ? (
    <CardDetail match={match} />
  ) : (
    <NewClientForm />
  );
};

export default SingleCardPage;
