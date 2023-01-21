import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import Conversation from "../components/Chat/Conversation";
import LoginPage from "../components/LoginPage";
import EmailVerification from "../components/EmailVerification";
import SignupPage from "../components/SignupPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/chat" element={<Conversation />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
