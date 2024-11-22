import './App.css';
import { Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './config/app-routes'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import useUserAuthentication from './hooks/useAthuntication';
import ProtectedRoutes from './component/protected-routes/index'

const Login = React.lazy(() => import("./pages/login"));
const Register = React.lazy(() => import('./pages/register/index'));
const Chat = React.lazy(() => import('./component/chat'));
const NotFound = React.lazy(() => import("./pages/Notfound"));

function App() {
  const userAuthenticationStatus = useUserAuthentication();

  return (
    <div className="App">
      <Routes>
        <Route
          element={
            <ProtectedRoutes
              redirectPath={APP_ROUTES.LOGIN}
              isAllowed={userAuthenticationStatus}
            />
          }
        >
          <Route path={APP_ROUTES.DASHBOARD} element={<Chat />} />
        </Route>

        <Route path={APP_ROUTES.REGISTER} element={<Register />} />
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>

      <ToastContainer
        position={"bottom-right"}
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
