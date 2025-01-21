import React from "react";

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import AppRoutes from "./AppRoutes";
import Layout from "./Layout";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/references/app-info
    appName: "E-Commerce",
    apiDomain: import.meta.env.VITE_BACKEND_URL,
    websiteDomain: import.meta.env.VITE_FRONTEND_URL,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

/* Your App */
class App extends React.Component {
  render() {
    return (
      <SuperTokensWrapper>
        <Layout>
          <AppRoutes />
        </Layout>
      </SuperTokensWrapper>
    );
  }
}

export default App;
