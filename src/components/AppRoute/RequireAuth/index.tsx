import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypeSelector';

function RequireAuth({ children, redirect }: { children: JSX.Element; redirect: string }) {
  const token = useTypedSelector((state) => state.auth.token);
  const location = useLocation();

  if (token === null) {
    return <Navigate to={redirect} state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
