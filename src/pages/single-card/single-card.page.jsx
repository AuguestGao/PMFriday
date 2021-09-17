import React from "react";

import CardDetail from "../../components/Card-Detail/card-detail.component";
import ProfileForm from "../../components/Forms/ProfileForm.component";

const SingleCardPage = ({ match }) => {
  return match.path !== "/new" ? <CardDetail match={match} /> : <ProfileForm />;
};

export default SingleCardPage;
