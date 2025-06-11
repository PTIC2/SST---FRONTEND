import './app/assets/css/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from './app/config/config';
import { HomePage } from './app/pages/HomePage';
import { AuthProvider } from './auth/context/AuthContext';
import { StaffManager } from './staff/pages/StaffManager';
import { SurveillancePage } from './surveillance/pages/SurveillancePage';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer 
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path={router.home} element={<HomePage />} />
          <Route path={router.staff} element={<StaffManager />} />
          <Route path={router.surveillance} element={<SurveillancePage />} />

        </Routes>
      </Router>  
    </AuthProvider>
  )
}
