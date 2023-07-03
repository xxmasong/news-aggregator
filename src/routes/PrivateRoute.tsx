import { Route, Redirect } from "react-router-dom";

import Layout from "./Layout/Layout";
import useAuth from "@/hooks/useAuth";

interface Props {
  path: string;
  component?: (props?: { [k: string]: any }) => JSX.Element;
  page?: JSX.Element;
}

// Accessible only to logged in users - Example: User Page
// Components are shown only when the user is logged in,
// Otherwise, redirect the user to the login page
const PrivateRoute = ({ component: RenderComponent, path, page }: Props) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      exact
      path={path}
      render={(props) =>
        isAuthenticated ? (
          RenderComponent ? (
            <RenderComponent {...props} />
          ) : (
            <Layout {...props} page={page} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
