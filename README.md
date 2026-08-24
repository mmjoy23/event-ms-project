# EventHub — Online Event Registration System

A modern, production-grade frontend-only web application for exploring, registering, and managing conferences, summits, and workshops.

## 🚀 Key Features

### 👤 Attendee Experience
- **Landing / Home Page**: Hero section, quick topic categories, curated featured summits, upcoming events grid, platform statistics, and "How it works" timeline.
- **Browse & Filter Events**: Search by keyword/topic, filter by 8 categories, format (In-Person / Virtual), pricing (Free / Paid), and date range with custom sorting.
- **Event Details Page**: Rich visual banner, speaker bios, hourly agenda schedule, live seat availability meter, social sharing, and bookmarked events.
- **Interactive Registration Modal**: Ticket tier selector, attendee form validation, terms agreement, instant registration confirmation, and digital pass generation.
- **Attendee Dashboard**: Personal profile, upcoming registrations, past/cancelled records, bookmarked events, and cancel registration dialogs.
- **Digital Ticket Pass**: Scannable SVG QR code representation, verified admission status, pass details, and print/download UI.
- **Authentication Simulation**: Single-click login/register flows with quick-switch demo profiles for both Attendees and Organizers.

### 🏢 Organizer / Admin Experience
- **Organizer Dashboard**: Real-time KPI metrics (Total Events, Registrations, Ticket Volume, Occupancy Rate), event performance progress bars, and recent attendee activity ticker.
- **Manage Events**: Searchable and filterable event management table with quick publish/unpublish toggles, direct edit links, and destructive delete confirmations.
- **Create & Edit Event Studio**: Multi-section form supporting categories, tags, datetime scheduling, physical vs virtual platform switches, cover photo selector/presets, and multi-tier ticket pricing.
- **Manage Registrations**: Comprehensive attendee roster with search, event filters, status indicators (Confirmed, Pending, Cancelled), pass inspection modal, and CSV export simulation.

## 🛠 Tech Stack
- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **React Router DOM v6**
- **Lucide React Icons**

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```
