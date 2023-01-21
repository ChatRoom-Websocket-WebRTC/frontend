import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import Conversation from "../components/Chat/Conversation";
import LoginPage from "../components/LoginPage";
import EmailVerification from "../components/EmailVerification";
import SignupPage from "../components/SignupPage";
import ForgetPasswordPage from "../components/ForgetPasswordPage";
import ResetPasswordPage from "../components/ResetPasswordPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
