import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";

import AppRoute from "./routes/route";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/index.js";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, key) => (
            <AppRoute
              path={route.path}
              component={route.component}
              key={key}
              isAuthProtected={false}
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <AppRoute
              path={route.path}
              component={route.component}
              key={idx}
              // TODO: Desmomment this line
              // isAuthProtected={true}
              isPermissionProtected={route.isPermissionProtected}
              permissionName={route.permissionName}
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
