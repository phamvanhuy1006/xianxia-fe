import { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { IRoutesState } from "./route.model";

const renderScreens = (routes: IRoutesState[]) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;
        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard routes={routes} path={route.path || ""}>
                {/* <Permission role={route.role}> */}
                <Layout>
                  {route.routes ? (
                    renderScreens(route.routes)
                  ) : (
                    <Component screenName={route.role} />
                  )}
                </Layout>
                {/* </Permission> */}
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

export default renderScreens;
