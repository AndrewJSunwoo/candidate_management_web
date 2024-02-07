import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/themeContext";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import CustomLinearProgress from "./components/customLinearLoader/CustomLinearLoader";

// Lazy loading
const HomePage = lazy(() => import("./pages/home/HomePage"));
const CompanyPage = lazy(() => import("./pages/companies/CompanyPage"));
const AddCompanyPage = lazy(() => import("./pages/companies/AddCompanyPage"));
const JobPage = lazy(() => import("./pages/jobs/JobPage"));
const AddJobPage = lazy(() => import("./pages/jobs/AddJobPage"));
const CandidatePage = lazy(() => import("./pages/candidates/CandidatePage"));
const AddCandidatePage = lazy(
  () => import("./pages/candidates/AddCandidatePage")
);

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/companies">
              <Route index element={<CompanyPage />} />
              <Route path="add" element={<AddCompanyPage />} />
            </Route>
            <Route path="/jobs">
              <Route index element={<JobPage />} />
              <Route path="add" element={<AddJobPage />} />
            </Route>
            <Route path="/candidates">
              <Route index element={<CandidatePage />} />
              <Route path="add" element={<AddCandidatePage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
