import React from "react";

import { withTranslation } from "react-i18next";

const ResetPassword = ({ t }) => {
  return (
    <React.Fragment>
      <div className="new-password-page">RESET PASSWORD</div>
    </React.Fragment>
  );
};

export default withTranslation()(ResetPassword);
