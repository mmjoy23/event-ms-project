import { createContext, useContext, useState, useCallback } from 'react';
import { users, registrations as initialRegistrations, events as initialEvents } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRegistrations, setUserRegistrations] = useState(initialRegistrations);
  const [events, setEvents] = useState(initialEvents);
  const [bookmarks, setBookmarks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const login = useCallback((email, _password) => {
    // Simulate login — accepts any email
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      setCurrentUser(existingUser);
      return { success: true, user: existingUser };
    }
    // Default: login as attendee
    const user = { ...users[0], email };
    setCurrentUser(user);
    return { success: true, user };
  }, []);

  const loginAsOrganizer = useCallback(() => {
    const organizer = users.find(u => u.role === 'organizer');
    setCurrentUser(organizer);
    return { success: true, user: organizer };
  }, []);

  const register = useCallback((name, email, _password) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name,
      email,
      phone: '',
      avatar: null,
      role: 'attendee',
      joinedDate: new Date().toISOString().split('T')[0],
      bio: '',
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const registerForEvent = useCallback((eventId, formData, ticketType) => {
    const regId = 'reg-' + Date.now();
    const newReg = {
      id: regId,
      eventId,
      userId: currentUser?.id || 'guest',
      ticketType: ticketType || 'General',
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'confirmed',
      qrCode: regId.toUpperCase(),
      attendeeName: formData.name,
      attendeeEmail: formData.email,
      attendeePhone: formData.phone || '',
    };
    setUserRegistrations(prev => [...prev, newReg]);
    setEvents(prev => prev.map(e =>
      e.id === eventId ? { ...e, registered: e.registered + 1 } : e
    ));
    return { success: true, registration: newReg };
  }, [currentUser]);

  const cancelRegistration = useCallback((regId) => {
    setUserRegistrations(prev =>
      prev.map(r => r.id === regId ? { ...r, status: 'cancelled' } : r)
    );
  }, []);

  const toggleBookmark = useCallback((eventId) => {
    setBookmarks(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  }, []);

  const isBookmarked = useCallback((eventId) => {
    return bookmarks.includes(eventId);
  }, [bookmarks]);

  const addEvent = useCallback((eventData) => {
    const newEvent = {
      ...eventData,
      id: 'evt-' + Date.now(),
      registered: 0,
      organizerId: currentUser?.id,
      organizer: currentUser?.name || currentUser?.organization || 'Organizer',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setEvents(prev => [...prev, newEvent]);
    return { success: true, event: newEvent };
  }, [currentUser]);

  const updateEvent = useCallback((eventId, data) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, ...data } : e));
  }, []);

  const deleteEvent = useCallback((eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  }, []);

  const addNotification = useCallback((message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  const value = {
    currentUser,
    events,
    userRegistrations,
    bookmarks,
    notifications,
    login,
    loginAsOrganizer,
    register,
    logout,
    registerForEvent,
    cancelRegistration,
    toggleBookmark,
    isBookmarked,
    addEvent,
    updateEvent,
    deleteEvent,
    addNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
