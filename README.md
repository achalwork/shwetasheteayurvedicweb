# Dr. Shweta Sanjay Shete – Premium Ayurvedic Website (React + Vite + TS + Tailwind)

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build

## Where to edit
- src/data/services.ts   – services, durations, fees (fee: null = "To be confirmed"), isActive
- src/data/availability.ts – MOCK availability rules (replace with backend/Google Calendar)
- src/data/mockApi.ts    – replaceable mock service layer (Spring Boot later)
- src/data/doctor.ts, faqs.ts – identity/contact, FAQs
- src/i18n/strings.ts    – English / मराठी booking strings
- src/assets/portrait.webp – doctor's portrait

## Demo mode vs LIVE mode
- **Demo (default):** `VITE_API_URL` empty. Sample availability, nothing is sent anywhere. Banner says so.
- **LIVE:** set `VITE_API_URL` (see `.env.example`) to the Spring Boot backend. Slots, bookings and the contact form
  then use the real API (`src/data/api.ts`); the confirmation tells the patient the Google Meet link arrives by
  email + WhatsApp ~10 minutes before the appointment. The backend must list this site in `CORS_ORIGINS`.

```
# terminal 1 (backend)           # terminal 2 (frontend)
cd backend && mvn spring-boot:run     cd frontend && echo VITE_API_URL=http://localhost:8080 > .env.local && npm run dev
```

## Notes
- Academic details (marks, research, workshops, etc.) removed. Old /about, /journey, /research redirect to home; /consultation redirects to /book.
- The site is English-only.
