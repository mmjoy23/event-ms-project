import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import NotificationToast from '../ui/NotificationToast';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-50 text-surface-900 selection:bg-primary-500 selection:text-white">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <NotificationToast />
    </div>
  );
}
