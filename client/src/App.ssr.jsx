// client/App.ssr.jsx
import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./AppRoutes";
import { UserProvider } from "./providers/UserProvider";
import { PlaceProvider } from "./providers/PlaceProvider";

function AppSSR({ location }) {
  return (
    <HelmetProvider context={{}}>
      <UserProvider>
        <PlaceProvider>
          <StaticRouter location={location}>
            <AppRoutes />
          </StaticRouter>
        </PlaceProvider>
      </UserProvider>
    </HelmetProvider>
  );
}

export default AppSSR;
