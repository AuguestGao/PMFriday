import React from "react";
import { match } from "react-router-dom";

import CardDetail from "../../components/card-detail/card-detail.component";

const SingleCardPage = ({ match }) => <CardDetail match={match} />;

export default SingleCardPage;
