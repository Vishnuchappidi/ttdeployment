import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportWaste from './pages/ReportWaste';
import TrackRequest from './pages/TrackRequest';
import About from './pages/About';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRequests from './pages/admin/AdminRequests';
import AssignWorker from './pages/admin/AssignWorker';
import AdminUsers from './pages/admin/AdminUsers';
import Analytics from './pages/admin/Analytics';

// Worker Pages
import WorkerDashboard from './pages/worker/WorkerDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin routes with sidebar layout */}
          <Route path="/admin" element={
            <ProtectedRoute roles={['ADMIN']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="assign" element={<AssignWorker />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>

          {/* Public & Citizen routes with Navbar + Footer */}
          <Route path="*" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/report" element={<ReportWaste />} />
                  <Route path="/track" element={<TrackRequest />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/worker/dashboard" element={
                    <ProtectedRoute roles={['WORKER']}>
                      <WorkerDashboard />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
