// ── Internationalization (EN / AR / DE) ──

const translations = {
  en: {
    // Navbar
    nav_home: 'Home',
    nav_tours: 'Tours',
    nav_categories: 'Categories',
    nav_about: 'About Us',
    nav_contact: 'Contact Us',
    nav_blog: 'Blog',
    nav_faq: 'FAQ',

    // Hero
    hero_badge: '✦ Premium Tourism Experiences',
    hero_title: 'Discover the Blue Sea of Adventures',
    hero_subtitle: 'Explore Egypt\'s most breathtaking destinations with Blau Meer. From ancient wonders to crystal-clear waters, we craft unforgettable journeys.',
    hero_cta_tours: 'Explore Our Tours',
    hero_cta_book: 'Book Now',

    // Categories
    cat_cultural: 'Historical & Cultural',
    cat_desert: 'Desert Safari',
    cat_sea: 'Sea Trips',
    cat_nile: 'Nile Cruise',
    cat_hamam: 'Turkish Bath & Spa',
    cat_diving: 'Diving',

    // Sections
    section_categories: 'Tour Categories',
    section_categories_sub: 'Choose your adventure from our curated collection',
    section_popular: 'Most Popular Tours',
    section_popular_sub: 'Handpicked experiences loved by travelers worldwide',
    section_why: 'Why Choose Blau Meer',
    section_why_sub: 'We are committed to delivering exceptional travel experiences',
    section_testimonials: 'What Our Clients Say',
    section_testimonials_sub: 'Real stories from satisfied travelers',
    section_blog: 'Latest News & Updates',
    section_blog_sub: 'Travel tips, insights, and destination guides',
    section_newsletter: 'Stay Updated',
    section_newsletter_sub: 'Subscribe to our newsletter for exclusive deals',

    // Value Props
    value_service: '24/7 Customer Service',
    value_service_desc: 'Round-the-clock support for all your travel needs',
    value_guides: 'Certified Expert Guides',
    value_guides_desc: 'Professional, trained, and knowledgeable local guides',
    value_prices: 'Best Price Guarantee',
    value_prices_desc: 'Competitive pricing without compromising on quality',
    value_cancel: 'Free Cancellation',
    value_cancel_desc: 'Flexible booking with hassle-free cancellation policy',

    // Tour Card
    tour_from: 'from',
    tour_per_person: 'per person',
    tour_private: 'Private',
    tour_view: 'View Details',
    tour_duration: 'Duration',
    tour_type: 'Tour Type',
    tour_location: 'Location',

    // Tour Detail
    detail_intro: 'Introduction',
    detail_highlights: 'Highlights',
    detail_itinerary: 'Tour Details',
    detail_included: 'What\'s Included',
    detail_excluded: 'Not Included',
    detail_advantages: 'Advantages',
    detail_reviews: 'Reviews',
    detail_related: 'Related Tours',
    detail_book_now: 'Book This Tour',
    detail_inquiry: 'Send Inquiry',

    // Booking Form
    book_first_name: 'First Name',
    book_last_name: 'Last Name',
    book_phone: 'Phone Number',
    book_email: 'Email Address',
    book_hotel: 'Hotel (Meeting Point)',
    book_date: 'Preferred Date',
    book_adults: 'Adults',
    book_children: 'Children',
    book_submit: 'Book Now — Pay on Travel',
    book_pay_online: 'Pay Online',

    // About
    about_title: 'About Blau Meer',
    about_subtitle: 'Your trusted partner for unforgettable Egyptian adventures',
    about_story_title: 'Our Story',
    about_story_p1: 'Blau Meer was founded with a simple yet powerful vision: to share the beauty and wonder of Egypt with travelers from around the world. Our name, meaning "Blue Sea" in German, reflects our deep connection to the stunning Red Sea coastline where our journey began.',
    about_story_p2: 'From Hurghada\'s crystal-clear waters to Cairo\'s ancient pyramids, from the Sahara\'s golden dunes to the Nile\'s timeless banks — we bring you closer to Egypt\'s most extraordinary experiences with care, expertise, and passion.',
    about_mission: 'Our Mission',
    about_mission_desc: 'To create meaningful and memorable travel experiences that connect people with Egypt\'s rich culture, history, and natural beauty.',
    about_vision: 'Our Vision',
    about_vision_desc: 'To become the leading sustainable tourism company in Egypt, setting new standards for quality, safety, and customer satisfaction.',
    about_values: 'Our Values',
    about_values_desc: 'Excellence, integrity, safety, and respect for local communities and the environment guide everything we do.',
    about_team: 'Meet Our Team',

    // Contact
    contact_title: 'Contact Us',
    contact_subtitle: 'We\'d love to hear from you. Reach out anytime!',
    contact_form_name: 'Your Name',
    contact_form_email: 'Email Address',
    contact_form_subject: 'Subject',
    contact_form_message: 'Your Message',
    contact_form_submit: 'Send Message',
    contact_phone: 'Phone',
    contact_email: 'Email',
    contact_address: 'Address',
    contact_hours: 'Working Hours',
    contact_address_val: 'Hurghada, Red Sea, Egypt',
    contact_hours_val: '24/7 — Always available',

    // Blog
    blog_title: 'Our Blog',
    blog_subtitle: 'Travel tips, destination guides, and insider knowledge',
    blog_read_more: 'Read More',

    // FAQ
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Find answers to common questions about our tours and services',
    faq_search: 'Search for a question...',

    // Footer
    footer_about: 'Blau Meer is your gateway to Egypt\'s most extraordinary experiences. We combine local expertise with world-class service to create unforgettable journeys.',
    footer_quick: 'Quick Links',
    footer_services: 'Our Services',
    footer_contact: 'Contact Info',
    footer_rights: '© 2026 Blau Meer Tourism. All rights reserved.',
    footer_newsletter: 'Newsletter',
    footer_newsletter_placeholder: 'Enter your email',
    footer_subscribe: 'Subscribe',

    // General
    explore_tours: 'Explore Tours',
    view_all: 'View All',
    learn_more: 'Learn More',
    load_more: 'Load More',
    write_review: 'Write a Review',
  },

  ar: {
    nav_home: 'الرئيسية',
    nav_tours: 'الجولات',
    nav_categories: 'الفئات',
    nav_about: 'من نحن',
    nav_contact: 'اتصل بنا',
    nav_blog: 'المدونة',
    nav_faq: 'الأسئلة الشائعة',

    hero_badge: '✦ تجارب سياحية متميزة',
    hero_title: 'اكتشف البحر الأزرق من المغامرات',
    hero_subtitle: 'استكشف أروع الوجهات في مصر مع بلاو مير. من العجائب القديمة إلى المياه الصافية، نصنع رحلات لا تُنسى.',
    hero_cta_tours: 'استكشف جولاتنا',
    hero_cta_book: 'احجز الآن',

    cat_cultural: 'رحلات تاريخية وثقافية',
    cat_desert: 'سفاري صحراوي',
    cat_sea: 'رحلات بحرية',
    cat_nile: 'رحلات نيلية',
    cat_hamam: 'حمام تركي وسبا',
    cat_diving: 'غوص',

    section_categories: 'فئات الجولات',
    section_categories_sub: 'اختر مغامرتك من مجموعتنا المختارة',
    section_popular: 'أشهر الجولات',
    section_popular_sub: 'تجارب مختارة يحبها المسافرون حول العالم',
    section_why: 'لماذا بلاو مير؟',
    section_why_sub: 'نحن ملتزمون بتقديم تجارب سفر استثنائية',
    section_testimonials: 'ماذا يقول عملاؤنا',
    section_testimonials_sub: 'قصص حقيقية من مسافرين راضين',
    section_blog: 'آخر الأخبار والمستجدات',
    section_blog_sub: 'نصائح سفر ورؤى ودليل الوجهات',
    section_newsletter: 'ابق على اطلاع',
    section_newsletter_sub: 'اشترك في نشرتنا الإخبارية للحصول على عروض حصرية',

    value_service: 'خدمة عملاء 24/7',
    value_service_desc: 'دعم على مدار الساعة لجميع احتياجات سفرك',
    value_guides: 'مرشدون معتمدون',
    value_guides_desc: 'مرشدون محليون محترفون ومدربون وذوو خبرة',
    value_prices: 'ضمان أفضل سعر',
    value_prices_desc: 'أسعار تنافسية دون التنازل عن الجودة',
    value_cancel: 'إلغاء مجاني',
    value_cancel_desc: 'حجز مرن مع سياسة إلغاء بدون متاعب',

    tour_from: 'يبدأ من',
    tour_per_person: 'للشخص',
    tour_private: 'خاص',
    tour_view: 'عرض التفاصيل',
    tour_duration: 'المدة',
    tour_type: 'نوع الجولة',
    tour_location: 'الموقع',

    detail_intro: 'مقدمة',
    detail_highlights: 'أبرز المعالم',
    detail_itinerary: 'تفاصيل الجولة',
    detail_included: 'ما يشمله',
    detail_excluded: 'غير مشمول',
    detail_advantages: 'المزايا',
    detail_reviews: 'التقييمات',
    detail_related: 'جولات ذات صلة',
    detail_book_now: 'احجز هذه الجولة',
    detail_inquiry: 'إرسال استفسار',

    book_first_name: 'الاسم الأول',
    book_last_name: 'اسم العائلة',
    book_phone: 'رقم الهاتف',
    book_email: 'البريد الإلكتروني',
    book_hotel: 'الفندق (نقطة الالتقاء)',
    book_date: 'التاريخ المفضل',
    book_adults: 'البالغون',
    book_children: 'الأطفال',
    book_submit: 'احجز الآن — ادفع عند السفر',
    book_pay_online: 'ادفع عبر الإنترنت',

    about_title: 'عن بلاو مير',
    about_subtitle: 'شريكك الموثوق لمغامرات مصرية لا تُنسى',
    about_story_title: 'قصتنا',
    about_story_p1: 'تأسست بلاو مير برؤية بسيطة لكنها قوية: مشاركة جمال وروعة مصر مع المسافرين من جميع أنحاء العالم. اسمنا الذي يعني "البحر الأزرق" بالألمانية يعكس ارتباطنا العميق بساحل البحر الأحمر الساحر حيث بدأت رحلتنا.',
    about_story_p2: 'من مياه الغردقة الصافية إلى أهرامات القاهرة القديمة، ومن كثبان الصحراء الذهبية إلى ضفاف النيل الخالدة — نقربك من أروع تجارب مصر بعناية وخبرة وشغف.',
    about_mission: 'رسالتنا',
    about_mission_desc: 'خلق تجارب سفر ذات معنى ولا تُنسى تربط الناس بثقافة مصر الغنية وتاريخها وجمالها الطبيعي.',
    about_vision: 'رؤيتنا',
    about_vision_desc: 'أن نصبح شركة السياحة المستدامة الرائدة في مصر، ونضع معايير جديدة للجودة والسلامة ورضا العملاء.',
    about_values: 'قيمنا',
    about_values_desc: 'التميز والنزاهة والسلامة واحترام المجتمعات المحلية والبيئة توجه كل ما نقوم به.',
    about_team: 'فريق العمل',

    contact_title: 'اتصل بنا',
    contact_subtitle: 'يسعدنا سماع رأيك. تواصل معنا في أي وقت!',
    contact_form_name: 'اسمك',
    contact_form_email: 'البريد الإلكتروني',
    contact_form_subject: 'الموضوع',
    contact_form_message: 'رسالتك',
    contact_form_submit: 'إرسال الرسالة',
    contact_phone: 'الهاتف',
    contact_email: 'البريد الإلكتروني',
    contact_address: 'العنوان',
    contact_hours: 'ساعات العمل',
    contact_address_val: 'الغردقة، البحر الأحمر، مصر',
    contact_hours_val: '24/7 — متاحون دائماً',

    blog_title: 'مدونتنا',
    blog_subtitle: 'نصائح سفر وأدلة الوجهات ومعلومات داخلية',
    blog_read_more: 'اقرأ المزيد',

    faq_title: 'الأسئلة الشائعة',
    faq_subtitle: 'اعثر على إجابات للأسئلة الشائعة حول جولاتنا وخدماتنا',
    faq_search: 'ابحث عن سؤال...',

    footer_about: 'بلاو مير هي بوابتك لأروع التجارب في مصر. نجمع بين الخبرة المحلية والخدمة العالمية لخلق رحلات لا تُنسى.',
    footer_quick: 'روابط سريعة',
    footer_services: 'خدماتنا',
    footer_contact: 'معلومات الاتصال',
    footer_rights: '© 2026 بلاو مير للسياحة. جميع الحقوق محفوظة.',
    footer_newsletter: 'النشرة الإخبارية',
    footer_newsletter_placeholder: 'أدخل بريدك الإلكتروني',
    footer_subscribe: 'اشترك',

    explore_tours: 'استكشف الجولات',
    view_all: 'عرض الكل',
    learn_more: 'اعرف المزيد',
    load_more: 'تحميل المزيد',
    write_review: 'اكتب تقييم',
  },

  de: {
    nav_home: 'Startseite',
    nav_tours: 'Touren',
    nav_categories: 'Kategorien',
    nav_about: 'Über Uns',
    nav_contact: 'Kontakt',
    nav_blog: 'Blog',
    nav_faq: 'FAQ',

    hero_badge: '✦ Premium-Tourismuserlebnisse',
    hero_title: 'Entdecken Sie das Blaue Meer der Abenteuer',
    hero_subtitle: 'Erkunden Sie Ägyptens atemberaubendste Reiseziele mit Blau Meer. Von antiken Wundern bis hin zu kristallklarem Wasser – wir gestalten unvergessliche Reisen.',
    hero_cta_tours: 'Touren Entdecken',
    hero_cta_book: 'Jetzt Buchen',

    cat_cultural: 'Historie & Kultur',
    cat_desert: 'Wüstensafari',
    cat_sea: 'Seeausflüge',
    cat_nile: 'Nilkreuzfahrt',
    cat_hamam: 'Türkisches Bad & Spa',
    cat_diving: 'Tauchen',

    section_categories: 'Tourkategorien',
    section_categories_sub: 'Wählen Sie Ihr Abenteuer aus unserer kuratierten Sammlung',
    section_popular: 'Beliebteste Touren',
    section_popular_sub: 'Handverlesene Erlebnisse, die von Reisenden weltweit geschätzt werden',
    section_why: 'Warum Blau Meer?',
    section_why_sub: 'Wir setzen uns für außergewöhnliche Reiseerlebnisse ein',
    section_testimonials: 'Was Unsere Kunden Sagen',
    section_testimonials_sub: 'Echte Geschichten von zufriedenen Reisenden',
    section_blog: 'Neueste Nachrichten',
    section_blog_sub: 'Reisetipps, Einblicke und Reiseführer',
    section_newsletter: 'Bleiben Sie Informiert',
    section_newsletter_sub: 'Abonnieren Sie unseren Newsletter für exklusive Angebote',

    value_service: '24/7 Kundenservice',
    value_service_desc: 'Rund-um-die-Uhr-Support für alle Ihre Reisebedürfnisse',
    value_guides: 'Zertifizierte Reiseleiter',
    value_guides_desc: 'Professionelle, geschulte und sachkundige lokale Guides',
    value_prices: 'Bestpreisgarantie',
    value_prices_desc: 'Wettbewerbsfähige Preise ohne Qualitätseinbußen',
    value_cancel: 'Kostenlose Stornierung',
    value_cancel_desc: 'Flexible Buchung mit unkomplizierter Stornierung',

    tour_from: 'ab',
    tour_per_person: 'pro Person',
    tour_private: 'Privat',
    tour_view: 'Details Ansehen',
    tour_duration: 'Dauer',
    tour_type: 'Tourtyp',
    tour_location: 'Standort',

    detail_intro: 'Einführung',
    detail_highlights: 'Höhepunkte',
    detail_itinerary: 'Tourdetails',
    detail_included: 'Inklusive',
    detail_excluded: 'Nicht Enthalten',
    detail_advantages: 'Vorteile',
    detail_reviews: 'Bewertungen',
    detail_related: 'Ähnliche Touren',
    detail_book_now: 'Diese Tour Buchen',
    detail_inquiry: 'Anfrage Senden',

    book_first_name: 'Vorname',
    book_last_name: 'Nachname',
    book_phone: 'Telefonnummer',
    book_email: 'E-Mail-Adresse',
    book_hotel: 'Hotel (Treffpunkt)',
    book_date: 'Wunschtermin',
    book_adults: 'Erwachsene',
    book_children: 'Kinder',
    book_submit: 'Jetzt Buchen — Zahlung bei Reiseantritt',
    book_pay_online: 'Online Bezahlen',

    about_title: 'Über Blau Meer',
    about_subtitle: 'Ihr vertrauenswürdiger Partner für unvergessliche ägyptische Abenteuer',
    about_story_title: 'Unsere Geschichte',
    about_story_p1: 'Blau Meer wurde mit einer einfachen, aber kraftvollen Vision gegründet: die Schönheit und das Wunder Ägyptens mit Reisenden aus aller Welt zu teilen. Unser Name spiegelt unsere tiefe Verbindung zur atemberaubenden Küste des Roten Meeres wider, wo unsere Reise begann.',
    about_story_p2: 'Von Hurghadas kristallklarem Wasser bis zu Kairos antiken Pyramiden, von den goldenen Dünen der Sahara bis zu den zeitlosen Ufern des Nils — wir bringen Sie näher an Ägyptens außergewöhnlichste Erlebnisse.',
    about_mission: 'Unsere Mission',
    about_mission_desc: 'Bedeutungsvolle und unvergessliche Reiseerlebnisse zu schaffen, die Menschen mit Ägyptens reicher Kultur verbinden.',
    about_vision: 'Unsere Vision',
    about_vision_desc: 'Das führende nachhaltige Tourismusunternehmen in Ägypten zu werden und neue Standards zu setzen.',
    about_values: 'Unsere Werte',
    about_values_desc: 'Exzellenz, Integrität, Sicherheit und Respekt für lokale Gemeinschaften leiten unser Handeln.',
    about_team: 'Unser Team',

    contact_title: 'Kontakt',
    contact_subtitle: 'Wir freuen uns von Ihnen zu hören. Kontaktieren Sie uns jederzeit!',
    contact_form_name: 'Ihr Name',
    contact_form_email: 'E-Mail-Adresse',
    contact_form_subject: 'Betreff',
    contact_form_message: 'Ihre Nachricht',
    contact_form_submit: 'Nachricht Senden',
    contact_phone: 'Telefon',
    contact_email: 'E-Mail',
    contact_address: 'Adresse',
    contact_hours: 'Öffnungszeiten',
    contact_address_val: 'Hurghada, Rotes Meer, Ägypten',
    contact_hours_val: '24/7 — Immer erreichbar',

    blog_title: 'Unser Blog',
    blog_subtitle: 'Reisetipps, Reiseführer und Insider-Wissen',
    blog_read_more: 'Weiterlesen',

    faq_title: 'Häufig Gestellte Fragen',
    faq_subtitle: 'Antworten auf häufige Fragen zu unseren Touren und Services',
    faq_search: 'Suche nach einer Frage...',

    footer_about: 'Blau Meer ist Ihr Tor zu Ägyptens außergewöhnlichsten Erlebnissen. Wir verbinden lokale Expertise mit erstklassigem Service.',
    footer_quick: 'Schnelllinks',
    footer_services: 'Unsere Services',
    footer_contact: 'Kontaktinfo',
    footer_rights: '© 2026 Blau Meer Tourismus. Alle Rechte vorbehalten.',
    footer_newsletter: 'Newsletter',
    footer_newsletter_placeholder: 'E-Mail eingeben',
    footer_subscribe: 'Abonnieren',

    explore_tours: 'Touren Entdecken',
    view_all: 'Alle Anzeigen',
    learn_more: 'Mehr Erfahren',
    load_more: 'Mehr Laden',
    write_review: 'Bewertung Schreiben',
  }
};

let currentLang = localStorage.getItem('blaumeer_lang') || 'en';

export function t(key) {
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('blaumeer_lang', lang);
  
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Re-render the app
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function initLang() {
  const html = document.documentElement;
  html.lang = currentLang;
  html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}
