import Login from "./app-authorization/components/login/Login";
import Register from "./app-authorization/components/register/Register";
import { Routes, Route } from 'react-router-dom';
import ChatRoomComponent from "./app-chat-room/components/chat-room/ChatRoomComponent";



const App = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<ChatRoutes />} />
    </Routes>
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

const ChatRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatRoomComponent />} />
    </Routes>
  );
};

export default App;
