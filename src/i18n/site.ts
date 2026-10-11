import { LIVE, REMINDER_MINUTES } from '../data/mode'
import { doctor } from '../data/doctor'

/**
 * All marketing-site copy in English and Marathi.
 * (Booking-flow copy lives in ./strings.ts.)
 * Marathi is typed as `typeof en`, so TypeScript fails the build if a key is missing in either language.
 */
const en = {
  meta: {
    title: 'Dr. Shweta Sanjay Shete | Ayurvedic Online Consultation, Kolhapur',
    description:
      'Personalized online Ayurvedic consultations with Dr. Shweta Sanjay Shete, MD (Rachana Sharir) | B.A.M.S., Kolhapur, Maharashtra. Marathi, Hindi and English.',
  },
  doctor: {
    name: 'Dr. Shweta Sanjay Shete',
    short: 'Dr. Shweta Shete',
    quals: 'MD (Rachana Sharir) | B.A.M.S.',
    location: 'Kolhapur, Maharashtra',
    languages: 'Marathi · Hindi · English',
  },
  langSwitch: { label: 'Language', en: 'English', mr: 'मराठी' },
  skip: 'Skip to content',
  nav: {
    links: { home: 'Home', services: 'Services', online: 'Online Consultation', contact: 'Contact' },
    book: 'Book Appointment',
    tagline: 'Ayurveda · Kolhapur',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeAria: 'home',
    mobileBar: 'Book Your Consultation',
  },
  footer: {
    explore: 'Explore',
    touch: 'Get in touch',
    privacy: 'Privacy Policy',
    rights: 'All rights reserved.',
    emergency: 'Online consultations are not a substitute for emergency care. In an emergency, visit the nearest hospital.',
  },
  hero: {
    eyebrow: 'Ayurvedic consultations · Kolhapur',
    lines: ['Discover the', 'Wisdom of', 'Ayurveda'] as [string, string, string],
    sub: 'Personalized Ayurvedic consultations designed around your wellbeing, lifestyle, and individual needs.',
    cta: 'Book Your Consultation',
    explore: 'Explore Our Services',
    badge: 'Online consultation',
  },
  marquee: [
    { name: 'Dinacharya', gloss: 'daily rhythm' },
    { name: 'Ritucharya', gloss: 'seasonal living' },
    { name: 'Ahara', gloss: 'nourishing food' },
    { name: 'Vihara', gloss: 'mindful lifestyle' },
    { name: 'Nidra', gloss: 'restful sleep' },
    { name: 'Prakriti', gloss: 'your constitution' },
    { name: 'Svasthya', gloss: 'true wellbeing' },
  ],
  intro: {
    eyebrow: 'Meet the doctor',
    heading: 'A Thoughtful Approach to Ayurvedic Wellbeing',
    p1: 'Dr. Shweta Sanjay Shete is an Ayurvedic doctor in Kolhapur, Maharashtra, with an MD in Rachana Sharir and a B.A.M.S. Her online consultations are unhurried and personal — she listens first, then looks at your concerns together with your routine, food habits and lifestyle.',
    p2: 'Whether you are visiting for the first time or following up, you can choose the kind of consultation that suits you and book a time that works for you.',
    book: 'Book a consultation',
    how: 'How online consultation works',
    facts: [
      { label: 'Online consultations', text: 'From the comfort of your home' },
      { label: 'Your language', text: 'Marathi, Hindi and English' },
      { label: 'Based in Kolhapur', text: 'Maharashtra, India' },
    ],
  },
  services: {
    eyebrow: 'What we offer',
    heading: 'Ayurvedic Services',
    intro: 'Choose the consultation that fits where you are today. Each can be booked online in a few steps.',
    note: 'Service details, durations and fees are being finalised by the doctor and may change. Consultations offer guidance and do not promise any particular result.',
    filterLabel: 'Filter services',
    filters: { all: 'All services', consultation: 'Consultations', wellness: 'Lifestyle & wellness', 'follow-up': 'Follow-up' },
    empty: 'No services in this category yet.',
    fee: 'Fee',
    online: 'Online consultation',
    bookThis: 'Book This Service',
    pageEyebrow: 'Services',
    pageTitle: 'Our Ayurvedic Services',
    pageSub: 'Six consultation options, each bookable online. Choose one to see what it includes.',
    pageHeading: 'Find the right consultation',
  },
  how: {
    eyebrow: 'Simple & unhurried',
    heading: 'How It Works',
    steps: [
      { title: 'Choose Your Service', text: 'Select the consultation that suits your needs.' },
      { title: 'Select Your Appointment', text: 'Choose an available date and time.' },
      { title: 'Connect Online', text: 'Receive appointment details and join your scheduled consultation.' },
    ],
  },
  why: {
    eyebrow: 'Why choose this practice',
    heading: 'Care that feels personal, simple and clear',
    intro: 'A calm, well-organised experience from booking to consultation — designed so you can focus on your wellbeing.',
    items: [
      { title: 'Individual attention', text: 'Every consultation is centred on you — your concerns, your routine, your questions.' },
      { title: 'Convenient online consultations', text: 'Speak with the doctor from home, wherever you are in Maharashtra and beyond.' },
      { title: 'A thoughtful approach to Ayurvedic wellbeing', text: 'Guidance that looks at lifestyle, food and daily rhythm together.' },
      { title: 'Simple appointment scheduling', text: 'Pick a service, a date and a time in a few clear steps.' },
      { title: 'Clear communication', text: 'In Marathi, Hindi or English — whichever you are most comfortable with.' },
    ],
  },
  faq: {
    eyebrow: 'Questions',
    heading: 'Frequently Asked Questions',
    items: [
      {
        q: 'How does an online consultation work?',
        a: LIVE
          ? `Choose a service, pick an available date and time, and share a few details. Your consultation takes place on Google Meet: the link is sent to you by email and WhatsApp about ${REMINDER_MINUTES} minutes before your appointment.`
          : 'Choose a service, pick an available date and time, and share a few details. Once live scheduling is connected, joining details will be shared with you by the practice before your appointment.',
      },
      {
        q: 'Is the booking on this website real?',
        a: LIVE
          ? 'Yes. The times shown are the doctor’s real availability. When you confirm, your appointment is saved and a confirmation is sent to your email and WhatsApp.'
          : 'Not yet. This version is a demonstration: the availability shown is sample data, and a demo booking is not sent to the doctor or scheduled anywhere.',
      },
      { q: 'Which languages are available?', a: 'You can ask for a consultation in Marathi, Hindi or English.' },
      { q: 'What are the fee and duration?', a: 'Each service shows an indicative duration. Fees are being confirmed by the doctor and will be shown against each service.' },
      { q: 'Can online consultation replace emergency care?', a: 'No. For urgent or severe symptoms, please visit the nearest hospital or call your local emergency number.' },
      {
        q: 'Will my details be kept private?',
        a: LIVE
          ? 'Your details are used only to arrange and run your consultation. Please see our Privacy Policy for what is collected and who processes it.'
          : 'Please see our Privacy Policy. In this demonstration, the details you enter stay in your own browser session and are not transmitted.',
      },
    ],
  },
  cta: {
    heading: 'Your Wellbeing Deserves a Thoughtful Approach.',
    sub: 'Take the first step with a consultation designed around you.',
    button: 'Schedule an Appointment',
  },
  contact: {
    pageEyebrow: 'Contact',
    pageTitle: 'Get in touch',
    pageSub: 'Questions before you book? We are happy to help.',
    heading: 'We would love to hear from you',
    intro: 'For questions about consultations, reach out using any of the details below. To book a consultation, please use the booking page.',
    phone: 'Phone',
    email: 'Email',
    location: 'Location',
    formTitle: 'Send a message',
    messagePlaceholder: 'How can we help?',
    thanks: 'Thank you',
    sent: 'Your message has been sent. The doctor will reply to you by email.',
    another: 'Write another message',
  },
  online: {
    eyebrow: 'Online consultation',
    title: 'Ayurvedic care, from home',
    sub: 'Consult Dr. Shweta Sanjay Shete over video — no travel needed.',
    prepTitle: 'Before your consultation',
    prep: [
      { title: 'A stable connection', text: 'A quiet spot with a steady internet connection helps the conversation flow.' },
      { title: 'A private space', text: 'Choose a place where you can speak comfortably and hear clearly.' },
      { title: 'Your language', text: 'Tell us whether you prefer Marathi, Hindi or English when you book.' },
    ],
    book: 'Book Your Consultation',
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'Privacy Policy',
    sub: LIVE ? 'How your information is collected and used when you book.' : 'How your information is handled on this website.',
    sections: (LIVE
      ? [
          ['Information we collect', 'When you book, we collect your name, mobile number, email address, preferred language, the reason for your consultation and any notes you add. The reason and notes may contain health information, so please share only what you are comfortable with. If you use the contact form we collect your name, email address and message.'],
          ['How we use it', `We use your details only to arrange and run your consultation: to reserve your time slot, create a Google Meet video room, send you a booking confirmation, and send you the Meet link about ${REMINDER_MINUTES} minutes before your appointment by email and WhatsApp.`],
          ['Who processes it', 'To do this, your details are processed by services that work on our behalf: our hosting and database provider, Google (Calendar and Meet), our email provider, and WhatsApp (Meta) for messages sent to your mobile number. The doctor can see your booking details.'],
          ['How long we keep it', 'Retention period: to be confirmed by the practice. You can contact us at any time to ask about, correct or delete your details.'],
          ['Medical information', 'Please do not rely on this website for emergencies or urgent medical advice. In an emergency, visit the nearest hospital or call your local emergency number.'],
          ['Contact', `Questions about privacy can be sent to ${doctor.email} or by phone to ${doctor.phone}.`],
        ]
      : [
          ['What this website currently does', 'This website is a frontend demonstration. The booking form and the contact form do not send your information to the doctor, to any server, or to any third-party service.'],
          ['Information you enter', 'Details you type into the booking form (such as your name, mobile number, email and reason for consultation) are kept only in your own browser session so that you can move between steps. They are cleared when you close the tab or start a new booking.'],
          ['When live booking is introduced', 'When real appointment booking is connected, this policy will be updated to explain what is collected, why, how long it is kept, and who can see it — before any real information is requested from you.'],
          ['Medical information', 'Please do not rely on this website for emergencies or urgent medical advice. In an emergency, visit the nearest hospital or call your local emergency number.'],
          ['Contact', `Questions about privacy can be sent to ${doctor.email} or by phone to ${doctor.phone}.`],
        ]) as [string, string][],
  },
  notFound: { title: 'Page not found', text: 'The page you are looking for does not exist.', home: 'Go to home' },
}

const mr: typeof en = {
  meta: {
    title: 'डॉ. श्वेता संजय शेटे | आयुर्वेदिक ऑनलाइन सल्लामसलत, कोल्हापूर',
    description:
      'डॉ. श्वेता संजय शेटे, एम.डी. (रचना शारीर) | बी.ए.एम.एस., कोल्हापूर, महाराष्ट्र यांची वैयक्तिक ऑनलाइन आयुर्वेदिक सल्लामसलत. मराठी, हिंदी आणि इंग्रजी भाषेत.',
  },
  doctor: {
    name: 'डॉ. श्वेता संजय शेटे',
    short: 'डॉ. श्वेता शेटे',
    quals: 'एम.डी. (रचना शारीर) | बी.ए.एम.एस.',
    location: 'कोल्हापूर, महाराष्ट्र',
    languages: 'मराठी · हिंदी · इंग्रजी',
  },
  langSwitch: { label: 'भाषा', en: 'English', mr: 'मराठी' },
  skip: 'मुख्य मजकुराकडे जा',
  nav: {
    links: { home: 'मुख्यपृष्ठ', services: 'सेवा', online: 'ऑनलाइन सल्लामसलत', contact: 'संपर्क' },
    book: 'अपॉइंटमेंट बुक करा',
    tagline: 'आयुर्वेद · कोल्हापूर',
    openMenu: 'मेनू उघडा',
    closeMenu: 'मेनू बंद करा',
    homeAria: 'मुख्यपृष्ठ',
    mobileBar: 'तुमची सल्लामसलत बुक करा',
  },
  footer: {
    explore: 'पाने',
    touch: 'संपर्क साधा',
    privacy: 'गोपनीयता धोरण',
    rights: 'सर्व हक्क राखीव.',
    emergency: 'ऑनलाइन सल्लामसलत ही आपत्कालीन उपचारांना पर्याय नाही. आणीबाणीच्या वेळी जवळच्या रुग्णालयात जा.',
  },
  hero: {
    eyebrow: 'आयुर्वेदिक सल्लामसलत · कोल्हापूर',
    lines: ['आयुर्वेदाचे', 'ज्ञान', 'जाणून घ्या'],
    sub: 'तुमचे स्वास्थ्य, जीवनशैली आणि वैयक्तिक गरजा लक्षात घेऊन तयार केलेली वैयक्तिक आयुर्वेदिक सल्लामसलत.',
    cta: 'तुमची सल्लामसलत बुक करा',
    explore: 'आमच्या सेवा पहा',
    badge: 'ऑनलाइन सल्लामसलत',
  },
  marquee: [
    { name: 'दिनचर्या', gloss: 'दैनंदिन लय' },
    { name: 'ऋतुचर्या', gloss: 'ऋतूनुसार जीवन' },
    { name: 'आहार', gloss: 'पोषक अन्न' },
    { name: 'विहार', gloss: 'सजग जीवनशैली' },
    { name: 'निद्रा', gloss: 'शांत झोप' },
    { name: 'प्रकृती', gloss: 'तुमची प्रकृती' },
    { name: 'स्वास्थ्य', gloss: 'खरे आरोग्य' },
  ],
  intro: {
    eyebrow: 'डॉक्टरांची ओळख',
    heading: 'आयुर्वेदिक स्वास्थ्याकडे विचारपूर्वक दृष्टिकोन',
    p1: 'डॉ. श्वेता संजय शेटे या कोल्हापूर, महाराष्ट्र येथील आयुर्वेदिक डॉक्टर असून त्यांच्याकडे एम.डी. (रचना शारीर) आणि बी.ए.एम.एस. या पदव्या आहेत. त्यांची ऑनलाइन सल्लामसलत घाई न करता, वैयक्तिक पद्धतीने होते — त्या आधी तुमचे ऐकून घेतात आणि मग तुमच्या तक्रारी, दिनचर्या, आहारसवयी आणि जीवनशैली यांचा एकत्र विचार करतात.',
    p2: 'तुम्ही पहिल्यांदाच येत असा किंवा पुनर्भेटीसाठी, तुम्हाला योग्य वाटेल ती सल्लामसलत निवडा आणि तुमच्या सोयीची वेळ बुक करा.',
    book: 'सल्लामसलत बुक करा',
    how: 'ऑनलाइन सल्लामसलत कशी चालते',
    facts: [
      { label: 'ऑनलाइन सल्लामसलत', text: 'घरबसल्या' },
      { label: 'तुमची भाषा', text: 'मराठी, हिंदी आणि इंग्रजी' },
      { label: 'कोल्हापूर येथे', text: 'महाराष्ट्र, भारत' },
    ],
  },
  services: {
    eyebrow: 'आम्ही काय देतो',
    heading: 'आयुर्वेदिक सेवा',
    intro: 'आजच्या तुमच्या गरजेला साजेशी सल्लामसलत निवडा. प्रत्येक सेवा काही सोप्या टप्प्यांत ऑनलाइन बुक करता येते.',
    note: 'सेवांचे तपशील, कालावधी आणि शुल्क डॉक्टरांकडून अंतिम केले जात आहेत व त्यात बदल होऊ शकतात. सल्लामसलत मार्गदर्शन देते; कोणत्याही विशिष्ट परिणामाची हमी देत नाही.',
    filterLabel: 'सेवा गाळा',
    filters: { all: 'सर्व सेवा', consultation: 'सल्लामसलत', wellness: 'जीवनशैली आणि स्वास्थ्य', 'follow-up': 'पुनर्भेट' },
    empty: 'या प्रकारात अद्याप कोणतीही सेवा नाही.',
    fee: 'शुल्क',
    online: 'ऑनलाइन सल्लामसलत',
    bookThis: 'ही सेवा बुक करा',
    pageEyebrow: 'सेवा',
    pageTitle: 'आमच्या आयुर्वेदिक सेवा',
    pageSub: 'सहा सल्लामसलत पर्याय, प्रत्येक ऑनलाइन बुक करता येतो. त्यात काय समाविष्ट आहे ते पाहण्यासाठी एक निवडा.',
    pageHeading: 'योग्य सल्लामसलत निवडा',
  },
  how: {
    eyebrow: 'सोपे आणि निवांत',
    heading: 'हे कसे चालते',
    steps: [
      { title: 'तुमची सेवा निवडा', text: 'तुमच्या गरजेला साजेशी सल्लामसलत निवडा.' },
      { title: 'तुमची अपॉइंटमेंट निवडा', text: 'उपलब्ध तारीख आणि वेळ निवडा.' },
      { title: 'ऑनलाइन जोडले जा', text: 'अपॉइंटमेंटचे तपशील मिळवा आणि ठरलेल्या वेळी सल्लामसलतीत सहभागी व्हा.' },
    ],
  },
  why: {
    eyebrow: 'हा दवाखाना का निवडावा',
    heading: 'वैयक्तिक, सोपी आणि स्पष्ट सेवा',
    intro: 'बुकिंगपासून सल्लामसलतीपर्यंत शांत आणि नीटनेटका अनुभव — जेणेकरून तुम्ही तुमच्या स्वास्थ्यावर लक्ष केंद्रित करू शकता.',
    items: [
      { title: 'वैयक्तिक लक्ष', text: 'प्रत्येक सल्लामसलत तुमच्यावर केंद्रित असते — तुमच्या तक्रारी, तुमची दिनचर्या, तुमचे प्रश्न.' },
      { title: 'सोयीस्कर ऑनलाइन सल्लामसलत', text: 'महाराष्ट्रात किंवा त्याबाहेर, तुम्ही कुठेही असा, घरबसल्या डॉक्टरांशी बोला.' },
      { title: 'आयुर्वेदिक स्वास्थ्याकडे विचारपूर्वक दृष्टिकोन', text: 'जीवनशैली, आहार आणि दैनंदिन लय यांचा एकत्र विचार करणारे मार्गदर्शन.' },
      { title: 'सोपी अपॉइंटमेंट नोंदणी', text: 'काही स्पष्ट टप्प्यांत सेवा, तारीख आणि वेळ निवडा.' },
      { title: 'स्पष्ट संवाद', text: 'मराठी, हिंदी किंवा इंग्रजी — जी भाषा तुम्हाला सोयीची वाटेल त्यात.' },
    ],
  },
  faq: {
    eyebrow: 'प्रश्न',
    heading: 'वारंवार विचारले जाणारे प्रश्न',
    items: [
      {
        q: 'ऑनलाइन सल्लामसलत कशी चालते?',
        a: LIVE
          ? `सेवा निवडा, उपलब्ध तारीख आणि वेळ निवडा आणि काही तपशील द्या. तुमची सल्लामसलत Google Meet वर होते: लिंक तुमच्या अपॉइंटमेंटच्या सुमारे ${REMINDER_MINUTES} मिनिटे आधी ईमेल आणि WhatsApp द्वारे पाठवली जाते.`
          : 'सेवा निवडा, उपलब्ध तारीख आणि वेळ निवडा आणि काही तपशील द्या. प्रत्यक्ष शेड्युलिंग जोडले गेल्यावर, सहभागी होण्याचे तपशील तुमच्या अपॉइंटमेंटपूर्वी दवाखान्याकडून तुम्हाला दिले जातील.',
      },
      {
        q: 'या वेबसाइटवरील बुकिंग खरे आहे का?',
        a: LIVE
          ? 'होय. दाखवलेल्या वेळा डॉक्टरांच्या प्रत्यक्ष उपलब्धतेनुसार आहेत. तुम्ही निश्चित केल्यावर तुमची अपॉइंटमेंट नोंदवली जाते आणि पुष्टी तुमच्या ईमेल आणि WhatsApp वर पाठवली जाते.'
          : 'अजून नाही. ही आवृत्ती केवळ एक डेमो आहे: दाखवलेली उपलब्धता नमुना माहिती आहे आणि डेमो बुकिंग डॉक्टरांना पाठवले जात नाही किंवा कुठेही ठरवले जात नाही.',
      },
      { q: 'कोणत्या भाषा उपलब्ध आहेत?', a: 'तुम्ही मराठी, हिंदी किंवा इंग्रजीत सल्लामसलत मागू शकता.' },
      { q: 'शुल्क आणि कालावधी किती आहे?', a: 'प्रत्येक सेवेसाठी अंदाजे कालावधी दाखवला आहे. शुल्क डॉक्टरांकडून निश्चित केले जात आहे आणि ते प्रत्येक सेवेसमोर दाखवले जाईल.' },
      { q: 'ऑनलाइन सल्लामसलत आपत्कालीन उपचारांना पर्याय ठरू शकते का?', a: 'नाही. तातडीच्या किंवा गंभीर लक्षणांसाठी कृपया जवळच्या रुग्णालयात जा किंवा तुमच्या स्थानिक आपत्कालीन क्रमांकावर फोन करा.' },
      {
        q: 'माझा तपशील गोपनीय ठेवला जाईल का?',
        a: LIVE
          ? 'तुमचा तपशील फक्त तुमची सल्लामसलत ठरवण्यासाठी आणि पार पाडण्यासाठी वापरला जातो. काय गोळा केले जाते आणि कोण प्रक्रिया करते हे पाहण्यासाठी कृपया आमचे गोपनीयता धोरण पहा.'
          : 'कृपया आमचे गोपनीयता धोरण पहा. या डेमोमध्ये, तुम्ही भरलेला तपशील तुमच्या स्वतःच्या ब्राउझर सत्रातच राहतो आणि कुठेही पाठवला जात नाही.',
      },
    ],
  },
  cta: {
    heading: 'तुमच्या स्वास्थ्याला विचारपूर्वक काळजी मिळायला हवी.',
    sub: 'तुमच्यासाठी खास तयार केलेल्या सल्लामसलतीने पहिले पाऊल उचला.',
    button: 'अपॉइंटमेंट ठरवा',
  },
  contact: {
    pageEyebrow: 'संपर्क',
    pageTitle: 'संपर्क साधा',
    pageSub: 'बुकिंग करण्यापूर्वी काही प्रश्न आहेत का? आम्हाला मदत करायला आनंद होईल.',
    heading: 'तुमच्याकडून ऐकायला आम्हाला आवडेल',
    intro: 'सल्लामसलतीबद्दलच्या प्रश्नांसाठी खालीलपैकी कोणत्याही माध्यमातून संपर्क साधा. सल्लामसलत बुक करण्यासाठी कृपया बुकिंग पृष्ठ वापरा.',
    phone: 'फोन',
    email: 'ईमेल',
    location: 'ठिकाण',
    formTitle: 'संदेश पाठवा',
    messagePlaceholder: 'आम्ही तुम्हाला कशी मदत करू शकतो?',
    thanks: 'धन्यवाद',
    sent: 'तुमचा संदेश पाठवला गेला आहे. डॉक्टर तुम्हाला ईमेलद्वारे उत्तर देतील.',
    another: 'आणखी एक संदेश लिहा',
  },
  online: {
    eyebrow: 'ऑनलाइन सल्लामसलत',
    title: 'आयुर्वेदिक सेवा, घरबसल्या',
    sub: 'डॉ. श्वेता संजय शेटे यांचा व्हिडिओद्वारे सल्ला घ्या — प्रवासाची गरज नाही.',
    prepTitle: 'तुमच्या सल्लामसलतीपूर्वी',
    prep: [
      { title: 'स्थिर कनेक्शन', text: 'शांत जागा आणि स्थिर इंटरनेट कनेक्शन असल्यास संवाद सुरळीत होतो.' },
      { title: 'खासगी जागा', text: 'जिथे तुम्ही मोकळेपणाने बोलू आणि स्पष्ट ऐकू शकाल अशी जागा निवडा.' },
      { title: 'तुमची भाषा', text: 'बुकिंग करताना तुम्हाला मराठी, हिंदी की इंग्रजी हवी ते सांगा.' },
    ],
    book: 'तुमची सल्लामसलत बुक करा',
  },
  privacy: {
    eyebrow: 'गोपनीयता',
    title: 'गोपनीयता धोरण',
    sub: LIVE ? 'बुकिंग करताना तुमची माहिती कशी गोळा केली आणि वापरली जाते.' : 'या वेबसाइटवर तुमची माहिती कशी हाताळली जाते.',
    sections: (LIVE
      ? [
          ['आम्ही कोणती माहिती गोळा करतो', 'तुम्ही बुकिंग करता तेव्हा आम्ही तुमचे नाव, मोबाइल नंबर, ईमेल पत्ता, पसंतीची भाषा, सल्लामसलतीचे कारण आणि तुम्ही जोडलेल्या नोट्स गोळा करतो. कारण आणि नोट्समध्ये आरोग्यविषयक माहिती असू शकते, म्हणून कृपया तुम्हाला सोयीची वाटेल तेवढीच माहिती द्या. तुम्ही संपर्क फॉर्म वापरल्यास आम्ही तुमचे नाव, ईमेल पत्ता आणि संदेश गोळा करतो.'],
          ['आम्ही ती कशी वापरतो', `आम्ही तुमचा तपशील फक्त तुमची सल्लामसलत ठरवण्यासाठी आणि पार पाडण्यासाठी वापरतो: तुमची वेळ राखून ठेवणे, Google Meet व्हिडिओ रूम तयार करणे, बुकिंगची पुष्टी पाठवणे आणि अपॉइंटमेंटच्या सुमारे ${REMINDER_MINUTES} मिनिटे आधी ईमेल आणि WhatsApp द्वारे Meet लिंक पाठवणे.`],
          ['तिच्यावर कोण प्रक्रिया करते', 'हे करण्यासाठी, तुमचा तपशील आमच्या वतीने काम करणाऱ्या सेवांकडून प्रक्रिया केला जातो: आमचे होस्टिंग आणि डेटाबेस प्रदाता, Google (Calendar आणि Meet), आमचा ईमेल प्रदाता आणि तुमच्या मोबाइल नंबरवर संदेश पाठवण्यासाठी WhatsApp (Meta). डॉक्टर तुमचा बुकिंग तपशील पाहू शकतात.'],
          ['आम्ही ती किती काळ ठेवतो', 'साठवण कालावधी: दवाखान्याकडून निश्चित केला जाईल. तुम्ही कधीही आमच्याशी संपर्क साधून तुमच्या तपशिलाबद्दल विचारू शकता, तो दुरुस्त करू शकता किंवा हटवण्यास सांगू शकता.'],
          ['वैद्यकीय माहिती', 'कृपया आणीबाणीसाठी किंवा तातडीच्या वैद्यकीय सल्ल्यासाठी या वेबसाइटवर अवलंबून राहू नका. आणीबाणीच्या वेळी जवळच्या रुग्णालयात जा किंवा तुमच्या स्थानिक आपत्कालीन क्रमांकावर फोन करा.'],
          ['संपर्क', `गोपनीयतेविषयीचे प्रश्न ${doctor.email} या पत्त्यावर किंवा ${doctor.phone} या क्रमांकावर फोन करून विचारता येतील.`],
        ]
      : [
          ['ही वेबसाइट सध्या काय करते', 'ही वेबसाइट एक फ्रंटएंड डेमो आहे. बुकिंग फॉर्म आणि संपर्क फॉर्म तुमची माहिती डॉक्टरांना, कोणत्याही सर्व्हरला किंवा कोणत्याही तृतीय-पक्ष सेवेला पाठवत नाहीत.'],
          ['तुम्ही दिलेली माहिती', 'बुकिंग फॉर्ममध्ये तुम्ही टाइप केलेला तपशील (जसे की नाव, मोबाइल नंबर, ईमेल आणि सल्लामसलतीचे कारण) फक्त तुमच्या स्वतःच्या ब्राउझर सत्रात ठेवला जातो, जेणेकरून तुम्हाला एका टप्प्यातून दुसऱ्या टप्प्यात जाता येईल. टॅब बंद केल्यावर किंवा नवीन बुकिंग सुरू केल्यावर तो पुसला जातो.'],
          ['प्रत्यक्ष बुकिंग सुरू झाल्यावर', 'प्रत्यक्ष अपॉइंटमेंट बुकिंग जोडले जाईल तेव्हा, कोणती माहिती गोळा केली जाते, का, किती काळ ठेवली जाते आणि ती कोण पाहू शकते हे स्पष्ट करण्यासाठी हे धोरण अद्ययावत केले जाईल — तुमच्याकडून कोणतीही खरी माहिती मागण्यापूर्वी.'],
          ['वैद्यकीय माहिती', 'कृपया आणीबाणीसाठी किंवा तातडीच्या वैद्यकीय सल्ल्यासाठी या वेबसाइटवर अवलंबून राहू नका. आणीबाणीच्या वेळी जवळच्या रुग्णालयात जा किंवा तुमच्या स्थानिक आपत्कालीन क्रमांकावर फोन करा.'],
          ['संपर्क', `गोपनीयतेविषयीचे प्रश्न ${doctor.email} या पत्त्यावर किंवा ${doctor.phone} या क्रमांकावर फोन करून विचारता येतील.`],
        ]) as [string, string][],
  },
  notFound: { title: 'पृष्ठ सापडले नाही', text: 'तुम्ही शोधत असलेले पृष्ठ अस्तित्वात नाही.', home: 'मुख्यपृष्ठावर जा' },
}

export type Site = typeof en
export const siteStrings = { en, mr }
