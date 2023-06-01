
import Login from "./app-authorization/components/login/Login";
import Register from "./app-authorization/components/register/Register";
import { Routes, Route } from 'react-router-dom';
import HomeComponent from "./app-chat-room/components/home/HomeComponent";
import AuthService from "./app-authorization/services/AuthService";
import ProtectedRoute, { ProtectedRouteProps } from "./common/utils/ProtectedRoute";

//styles import
import './global.scss'
import "react-chat-elements/dist/main.css"
import { ThemeProvider } from "@mui/material";
import { colorTheme } from "./MaterialTheme";


const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  isAuthenticated: AuthService.isLoggedIn(),
  authenticationPath: '/auth/login',
};


const App = () => {
  return (
    <ThemeProvider theme={colorTheme}>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path='/' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HomeComponent />} />} />
      </Routes>
    </ThemeProvider>
  );
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
