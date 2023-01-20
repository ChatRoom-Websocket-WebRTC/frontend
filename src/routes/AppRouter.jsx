import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="footer" element={<Footer />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
