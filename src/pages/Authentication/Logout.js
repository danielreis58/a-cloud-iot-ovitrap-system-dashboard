import React from "react";

import { withTranslation } from "react-i18next";

const Logout = ({ t }) => {
  return (
    <React.Fragment>
      <div className="logout-page">LOGOUT</div>
    </React.Fragment>
  );
};

export default withTranslation()(Logout);
