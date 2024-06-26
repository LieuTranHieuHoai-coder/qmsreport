import { Route } from "react-router-dom";
import HomePage from "../pages/HomeTemplate/HomePage";
import HomeTemplate from "../pages/HomeTemplate";
import HooksPage from "../pages/HomeTemplate/HooksPage";
// import FactoryA01 from "../pages/HomeTemplate/Factory/FactoryA01";
// import FactoryA08 from "../pages/HomeTemplate/Factory/FactoryA08";
import FactoryA02 from "../pages/HomeTemplate/Factory/FactoryA02";
// import FactoryB05 from "../pages/HomeTemplate/Factory/FactoryB05";
// import FactoryB06 from "../pages/HomeTemplate/Factory/FactoryB06";
// import FactoryC03 from "../pages/HomeTemplate/Factory/FactoryC03";
// import FactoryC07 from "../pages/HomeTemplate/Factory/FactoryC07";
import LoginComponent from "../pages/AuthenPage";

type TRoute = {
  path: string;
  element: any;
  nested?: TRoute[]; // optional
};

const routes: TRoute[] = [
  {
    path: "/home",
    element: HomeTemplate,
    nested: [
      { path: "index", element: HomePage },
      { path: "hooks", element: HooksPage },
      { path: "FactoryA01", element: FactoryA02 },
      { path: "FactoryA02", element: FactoryA02 },
      { path: "FactoryA08", element: FactoryA02 },
      { path: "FactoryB05", element: FactoryA02 },
      { path: "FactoryB06", element: FactoryA02 },
      { path: "FactoryC03", element: FactoryA02 },
      { path: "FactoryC07", element: FactoryA02 },
    ],
  },
  
  {
    path: "/", element: LoginComponent
  },
  
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};

export default renderRoutes;
