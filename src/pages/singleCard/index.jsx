import React from "react";

import { CardDetail, ProfileForm } from "../../components";

const SingleCardPage = ({ match }) => {
  return match.path !== "/new" ? <CardDetail match={match} /> : <ProfileForm />;
};

export default SingleCardPage;
