import { Routes } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import Home from "./pages/Home";

function AppRoutes() {
  // wrap any component that needs to be protected by super tokens in the SessionAuth component
  return (
    <Routes>
      {/* for super token auth integration */}
      {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
        EmailPasswordPreBuiltUI,
      ])}
      <reactRouterDom.Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
