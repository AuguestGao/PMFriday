import React from "react";
// import { match } from "react-router-dom";

import CardDetail from "../../components/Card-Detail/Card-Detail.component";
import ProfileForm from "../../components/ProfileForm/ProfileForm.component";

const SingleCardPage = ({ match }) => {
  return match.path !== "/new" ? <CardDetail match={match} /> : <ProfileForm />;
};

export default SingleCardPage;
