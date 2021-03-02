import React from "react";

import { withTranslation } from "react-i18next";

const Login = ({ t }) => {
  return (
    <React.Fragment>
      <div className="login-page">LOGIN</div>
    </React.Fragment>
  );
};

export default withTranslation()(Login);
