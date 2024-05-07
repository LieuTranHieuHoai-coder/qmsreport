import { Route } from "react-router-dom";

import AdminTemplate from "../pages/AdminTemplate";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import AuthenPage from "../pages/AuthenPage";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import HomePage from "../pages/HomeTemplate/HomePage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import HomeTemplate from "../pages/HomeTemplate";
import Another from "../pages/Another";
import HooksPage from "../pages/HomeTemplate/HooksPage";
import DetailMovie from "../pages/HomeTemplate/DetailMovie";
import FactoryA01 from "../pages/HomeTemplate/Factory/FactoryA01";
import FactoryA08 from "../pages/HomeTemplate/Factory/FactoryA08";
import FactoryA02 from "../pages/HomeTemplate/Factory/FactoryA02";
import FactoryB05 from "../pages/HomeTemplate/Factory/FactoryB05";
import FactoryB06 from "../pages/HomeTemplate/Factory/FactoryB06";
import FactoryC03 from "../pages/HomeTemplate/Factory/FactoryC03";
import FactoryC07 from "../pages/HomeTemplate/Factory/FactoryC07";

type TRoute = {
  path: string;
  element: any;
  nested?: TRoute[]; // optional
};

const routes: TRoute[] = [
  {
    path: "",
    element: HomeTemplate,
    nested: [
      { path: "", element: HomePage },
      { path: "about", element: AboutPage },
      { path: "list-movie", element: ListMoviePage },
      { path: "hooks", element: HooksPage },
      { path: "detail/:id", element: DetailMovie },
      { path: "FactoryA01", element: FactoryA01 },
      { path: "FactoryA02", element: FactoryA02 },
      { path: "FactoryA08", element: FactoryA08 },
      { path: "FactoryB05", element: FactoryB05 },
      { path: "FactoryB06", element: FactoryB06 },
      { path: "FactoryC03", element: FactoryC03 },
      { path: "FactoryC07", element: FactoryC07 },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    nested: [
      { path: "dashboard", element: DashboardPage },
      { path: "add-user", element: AddUserPage },
    ],
  },
  {
    path: "auth",
    element: AuthenPage,
  },
  {
    path: "another",
    element: Another,
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
