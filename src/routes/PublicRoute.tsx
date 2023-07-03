import useAuth from "@/hooks/useAuth";
import { Route, Redirect } from 'react-router-dom';

interface Props {
  path: string;
  component: (props?: {[k: string]: any}) => JSX.Element;
  restricted?: boolean;
}

// Accessible to every user unless restricted is true, where a page is
// exclusive to only those that are not logged in
// restricted === true ? "register, login, sign in" not accessible to logged in user
const PublicRoute = ({ component: RenderComponent, restricted, path, ...rest }: Props) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      exact
      path={path}
      render={(props) => 
        isAuthenticated && restricted 
          ? <Redirect to="/" />
          : <RenderComponent {...props} {...rest} />
      }
    />
  );
};

export default PublicRoute;