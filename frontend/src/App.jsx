import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthScreen from './screens/Authentication.view.jsx';
import TestScreen from './screens/Test.view.jsx';
import AboutScreen from './screens/About.view.jsx';
import ReportScreen from './screens/Result.view.jsx';
import NotFound from './screens/Error.view.jsx';
import PersonalInfoPage from './screens/PersonalInfo.view.jsx';
import { useLocation } from 'react-router-dom';
import "./App.css";

// Wrapper for ReportScreen to read reportData from state
function ReportScreenWrapper() {
  const location = useLocation();
  const reportData = location.state?.reportData; // Use optional chaining to handle undefined

  return <ReportScreen reportData={reportData} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalInfoPage />} />
        <Route path="/test" element={<TestScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        {/* Passing reportData via state, not via URL params */}
        <Route path="/report" element={<ReportScreenWrapper />} />
        <Route path="*" element={<NotFound />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
