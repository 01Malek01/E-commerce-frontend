import { Routes } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

function AppRoutes() {
  // wrap any component that needs to be protected by super tokens in the SessionAuth component
  return (
    <Routes>
      {/* for super token auth integration */}
      {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
        EmailPasswordPreBuiltUI,
      ])}
      <reactRouterDom.Route path="/" element={<Home />} />

      <reactRouterDom.Route
        path="/product/:id"
        element={
          <SessionAuth>
            <Product />
          </SessionAuth>
        }
      />
      <reactRouterDom.Route
        path="/cart"
        element={
          <SessionAuth>
            <Cart />
          </SessionAuth>
        }
      />
      <reactRouterDom.Route
        path="/orders"
        element={
          <SessionAuth>
            <Orders />
          </SessionAuth>
        }
      />
      <reactRouterDom.Route
        path="/profile"
        element={
          <SessionAuth>
            <Profile />
          </SessionAuth>
        }
      />
      <reactRouterDom.Route
        path="*"
        element={<reactRouterDom.Navigate to="/" />}
      />
    </Routes>
  );
}

export default AppRoutes;
