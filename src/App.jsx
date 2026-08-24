import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import OrganizerLayout from './components/layout/OrganizerLayout';

// Public & Attendee Pages
import HomePage from './pages/HomePage';
import BrowseEventsPage from './pages/BrowseEventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import TicketPage from './pages/TicketPage';
import AboutPage from './pages/AboutPage';

// Organizer / Admin Pages
import OrganizerDashboardPage from './pages/OrganizerDashboardPage';
import ManageEventsPage from './pages/ManageEventsPage';
import CreateEditEventPage from './pages/CreateEditEventPage';
import ManageRegistrationsPage from './pages/ManageRegistrationsPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public / Attendee Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<BrowseEventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/tickets/:id" element={<TicketPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Organizer / Admin Routes */}
          <Route path="/organizer" element={<OrganizerLayout />}>
            <Route index element={<Navigate to="/organizer/dashboard" replace />} />
            <Route path="dashboard" element={<OrganizerDashboardPage />} />
            <Route path="events" element={<ManageEventsPage />} />
            <Route path="events/create" element={<CreateEditEventPage />} />
            <Route path="events/edit/:id" element={<CreateEditEventPage />} />
            <Route path="registrations" element={<ManageRegistrationsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
