import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes inside Layout */}
          <Route 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            
            {/* Placeholders for future sections */}
            <Route path="/chat" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">AI Chat (Coming Soon)</h2></div>} />
            <Route path="/screening" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Screening (Coming Soon)</h2></div>} />
            <Route path="/book" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Counsellors (Coming Soon)</h2></div>} />
            <Route path="/community" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Community (Coming Soon)</h2></div>} />
            
            {/* Fallback internal route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
