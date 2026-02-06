import { AdminProvider, useAdmin } from '../contexts/AdminContext';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

function AdminApp() {
  const { isAuthenticated } = useAdmin();
  
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}

export default function Admin() {
  return (
    <AdminProvider>
      <AdminApp />
    </AdminProvider>
  );
}
