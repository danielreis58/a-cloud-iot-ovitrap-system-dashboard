import React from "react";

//i18n
import { withTranslation } from "react-i18next";

const index = () => {
  return (
    <React.Fragment>
      <div className="dashboard">DASHBOARD</div>
    </React.Fragment>
  );
};

export default withTranslation()(index);
