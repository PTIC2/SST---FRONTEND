import './app/assets/css/index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from './app/config/config';
import { HomePage } from './app/pages/HomePage';

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={router.home} element={<HomePage />} />

        </Routes>
      </Router>   
    </>
  )
}
