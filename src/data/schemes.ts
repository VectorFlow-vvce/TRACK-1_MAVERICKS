import type { LangKey } from "./translations";

export type BenefitType = "cash" | "subsidy" | "loan" | "service";

export interface Scheme {
  id: string;
  name: Record<LangKey, string>;
  ministry: string;
  category: "agriculture" | "health" | "housing" | "education" | "financial" | "energy";
  benefit_type: BenefitType;
  annual_benefit_inr: number;
  benefit_display: Record<LangKey, string>;
  eligibility: {
    max_income?: number;
    categories?: string[];
    requires_aadhaar?: boolean;
    requires_land?: boolean;
    occupations?: string[];
    age_min?: number;
    age_max?: number;
  };
  match_score: number;
  why_qualify: Record<LangKey, string>;
  documents: string[];
  steps: Record<LangKey, string[]>;
  apply_url: string;
}

const baseSteps = {
  en: [
    "Visit your nearest Common Service Center (CSC)",
    "Carry all required documents (originals + photocopies)",
    "Fill the application form with help of CSC operator",
    "Submit form and collect acknowledgement receipt",
    "Track application status online using receipt number",
  ],
  hi: [
    "अपने नज़दीकी CSC केंद्र पर जाएं",
    "सभी आवश्यक दस्तावेज़ साथ ले जाएं (मूल + फोटोकॉपी)",
    "CSC ऑपरेटर की मदद से आवेदन फॉर्म भरें",
    "फॉर्म जमा करें और रसीद प्राप्त करें",
    "रसीद नंबर से ऑनलाइन स्थिति देखें",
  ],
  kn: [
    "ಹತ್ತಿರದ CSC ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ",
    "ಎಲ್ಲ ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ತೆಗೆದುಕೊಂಡು ಹೋಗಿ",
    "CSC ಸಿಬ್ಬಂದಿಯ ಸಹಾಯದಿಂದ ಫಾರಂ ಭರ್ತಿ ಮಾಡಿ",
    "ಫಾರಂ ಸಲ್ಲಿಸಿ ರಸೀದಿ ಪಡೆಯಿರಿ",
    "ರಸೀದಿ ಸಂಖ್ಯೆಯಿಂದ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
  ],
  ta: [
    "அருகிலுள்ள CSC மையத்தைப் பார்வையிடவும்",
    "தேவையான அனைத்து ஆவணங்களையும் கொண்டு செல்லவும்",
    "CSC ஊழியர் உதவியுடன் படிவத்தை நிரப்பவும்",
    "படிவத்தை சமர்ப்பித்து ரசீது பெறவும்",
    "ரசீது எண் மூலம் நிலையை கண்காணிக்கவும்",
  ],
  te: [
    "మీ సమీప CSC కేంద్రాన్ని సందర్శించండి",
    "అవసరమైన అన్ని పత్రాలను తీసుకెళ్లండి",
    "CSC సిబ్బంది సహాయంతో దరఖాస్తు ఫారం నింపండి",
    "ఫారం సమర్పించి రశీదు తీసుకోండి",
    "రశీదు సంఖ్యతో ఆన్‌లైన్‌లో స్థితి ట్రాక్ చేయండి",
  ],
  bn: [
    "নিকটস্থ CSC কেন্দ্রে যান",
    "সমস্ত প্রয়োজনীয় কাগজপত্র সঙ্গে নিয়ে যান",
    "CSC কর্মীর সহায়তায় ফর্ম পূরণ করুন",
    "ফর্ম জমা দিয়ে রসিদ সংগ্রহ করুন",
    "রসিদ নম্বর দিয়ে অনলাইনে স্ট্যাটাস দেখুন",
  ],
  mr: [
    "जवळच्या CSC केंद्राला भेट द्या",
    "सर्व आवश्यक कागदपत्रे सोबत न्या",
    "CSC ऑपरेटरच्या मदतीने अर्ज भरा",
    "अर्ज जमा करा आणि पावती घ्या",
    "पावती क्रमांकाद्वारे ऑनलाइन स्थिती तपासा",
  ],
  gu: [
    "નજીકના CSC કેન્દ્રની મુલાકાત લો",
    "જરૂરી તમામ દસ્તાવેજો સાથે લો",
    "CSC ઓપરેટરની મદદથી ફોર્મ ભરો",
    "ફોર્મ સબમિટ કરો અને રસીદ મેળવો",
    "રસીદ નંબરથી ઓનલાઇન સ્થિતિ ટ્રેક કરો",
  ],
  pa: [
    "ਨੇੜਲੇ CSC ਕੇਂਦਰ 'ਤੇ ਜਾਓ",
    "ਸਾਰੇ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ ਨਾਲ ਲੈ ਜਾਓ",
    "CSC ਆਪਰੇਟਰ ਦੀ ਮਦਦ ਨਾਲ ਫਾਰਮ ਭਰੋ",
    "ਫਾਰਮ ਜਮ੍ਹਾਂ ਕਰੋ ਅਤੇ ਰਸੀਦ ਲਓ",
    "ਰਸੀਦ ਨੰਬਰ ਨਾਲ ਆਨਲਾਈਨ ਸਥਿਤੀ ਟਰੈਕ ਕਰੋ",
  ],
  ml: [
    "അടുത്തുള്ള CSC കേന്ദ്രം സന്ദർശിക്കുക",
    "ആവശ്യമായ എല്ലാ രേഖകളും കൊണ്ടുപോകുക",
    "CSC ജീവനക്കാരന്റെ സഹായത്തോടെ ഫോം പൂരിപ്പിക്കുക",
    "ഫോം സമർപ്പിച്ച് രസീത് വാങ്ങുക",
    "രസീത് നമ്പറുപയോഗിച്ച് ഓൺലൈനിൽ സ്റ്റാറ്റസ് ട്രാക്ക് ചെയ്യുക",
  ],
} as Record<LangKey, string[]>;

const tr = (en: string, hi: string, kn?: string): Record<LangKey, string> => ({
  en, hi, kn: kn ?? en, ta: en, te: en, bn: en, mr: hi, gu: en, pa: en, ml: en,
});

export const SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    name: tr("PM-KISAN", "पीएम-किसान", "ಪಿಎಂ-ಕಿಸಾನ್"),
    ministry: "Agriculture",
    category: "agriculture",
    benefit_type: "cash",
    annual_benefit_inr: 6000,
    benefit_display: tr("₹6,000/year direct cash", "₹6,000/वर्ष नकद", "₹6,000/ವರ್ಷ ನಗದು"),
    eligibility: { max_income: 200000, requires_aadhaar: true, requires_land: true, occupations: ["farmer"] },
    match_score: 92,
    why_qualify: tr(
      "You are a farmer with land and an Aadhaar-linked bank account.",
      "आप किसान हैं और आपके पास भूमि व आधार-लिंक्ड बैंक खाता है।",
      "ನೀವು ಭೂಮಿ ಮತ್ತು ಆಧಾರ್ ಲಿಂಕ್ಡ್ ಬ್ಯಾಂಕ್ ಖಾತೆ ಹೊಂದಿರುವ ರೈತ.",
    ),
    documents: ["Aadhaar Card", "Land Records", "Bank Passbook", "Passport Photo"],
    steps: baseSteps,
    apply_url: "https://pmkisan.gov.in",
  },
  {
    id: "ayushman-bharat",
    name: tr("Ayushman Bharat (PM-JAY)", "आयुष्मान भारत", "ಆಯುಷ್ಮಾನ್ ಭಾರತ್"),
    ministry: "Health & Family Welfare",
    category: "health",
    benefit_type: "service",
    annual_benefit_inr: 500000,
    benefit_display: tr("₹5,00,000 health cover/year", "₹5,00,000 स्वास्थ्य कवर", "₹5,00,000 ಆರೋಗ್ಯ ಕವರ್"),
    eligibility: { max_income: 500000, requires_aadhaar: true },
    match_score: 88,
    why_qualify: tr(
      "Your household income makes you eligible for cashless hospitalisation.",
      "आपकी आय के आधार पर आप कैशलेस इलाज के पात्र हैं।",
      "ನಿಮ್ಮ ಆದಾಯದ ಆಧಾರದ ಮೇಲೆ ನೀವು ನಗದುರಹಿತ ಚಿಕಿತ್ಸೆಗೆ ಅರ್ಹರು.",
    ),
    documents: ["Aadhaar Card", "Ration Card", "Income Certificate", "Family Photo"],
    steps: baseSteps,
    apply_url: "https://pmjay.gov.in",
  },
  {
    id: "pmay-urban",
    name: tr("PMAY (Urban)", "पीएमएवाई शहरी", "ಪಿಎಂಎವೈ ನಗರ"),
    ministry: "Housing & Urban Affairs",
    category: "housing",
    benefit_type: "subsidy",
    annual_benefit_inr: 250000,
    benefit_display: tr("Up to ₹2,50,000 home subsidy", "₹2,50,000 तक मकान सब्सिडी", "₹2,50,000 ಮನೆ ಸಬ್ಸಿಡಿ"),
    eligibility: { max_income: 1800000, requires_aadhaar: true },
    match_score: 76,
    why_qualify: tr(
      "Your income falls under the EWS/LIG/MIG segment for housing subsidy.",
      "आपकी आय EWS/LIG/MIG श्रेणी में आती है।",
      "ನಿಮ್ಮ ಆದಾಯ EWS/LIG/MIG ವರ್ಗದಲ್ಲಿ ಬರುತ್ತದೆ.",
    ),
    documents: ["Aadhaar Card", "Income Certificate", "Bank Passbook", "Property Documents"],
    steps: baseSteps,
    apply_url: "https://pmaymis.gov.in",
  },
  {
    id: "kcc",
    name: tr("Kisan Credit Card", "किसान क्रेडिट कार्ड", "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್"),
    ministry: "Agriculture",
    category: "agriculture",
    benefit_type: "loan",
    annual_benefit_inr: 300000,
    benefit_display: tr("Up to ₹3,00,000 crop loan @ 4%", "₹3,00,000 तक फसल ऋण", "₹3,00,000 ಬೆಳೆ ಸಾಲ"),
    eligibility: { requires_land: true, occupations: ["farmer"] },
    match_score: 85,
    why_qualify: tr(
      "As a landholding farmer you qualify for short-term crop credit.",
      "भूमिधारी किसान के रूप में आप अल्पकालिक ऋण के पात्र हैं।",
      "ಭೂಹಿಡುವ ರೈತರಾಗಿ ನೀವು ಸಾಲಕ್ಕೆ ಅರ್ಹರು.",
    ),
    documents: ["Aadhaar Card", "Land Records", "Bank Passbook", "Photo"],
    steps: baseSteps,
    apply_url: "https://www.myscheme.gov.in/schemes/kcc",
  },
  {
    id: "pmjdy",
    name: tr("Pradhan Mantri Jan Dhan Yojana", "पीएमजेडीवाई", "ಪಿಎಂಜೆಡಿವೈ"),
    ministry: "Finance",
    category: "financial",
    benefit_type: "service",
    annual_benefit_inr: 0,
    benefit_display: tr("Zero-balance bank account + ₹2L insurance", "ज़ीरो-बैलेंस खाता + बीमा", "ಶೂನ್ಯ-ಬ್ಯಾಲೆನ್ಸ್ ಖಾತೆ"),
    eligibility: { requires_aadhaar: false },
    match_score: 95,
    why_qualify: tr(
      "Every Indian citizen can open a free Jan Dhan account.",
      "हर भारतीय नागरिक मुफ्त खाता खोल सकता है।",
      "ಪ್ರತಿಯೊಬ್ಬ ಭಾರತೀಯ ನಾಗರಿಕರು ಉಚಿತ ಖಾತೆ ತೆರೆಯಬಹುದು.",
    ),
    documents: ["Aadhaar Card", "PAN (optional)", "Photo"],
    steps: baseSteps,
    apply_url: "https://pmjdy.gov.in",
  },
  {
    id: "ujjwala",
    name: tr("Pradhan Mantri Ujjwala Yojana", "उज्ज्वला योजना", "ಉಜ್ವಲಾ ಯೋಜನೆ"),
    ministry: "Petroleum",
    category: "energy",
    benefit_type: "subsidy",
    annual_benefit_inr: 1600,
    benefit_display: tr("Free LPG connection + subsidy", "मुफ्त LPG कनेक्शन", "ಉಚಿತ LPG ಸಂಪರ್ಕ"),
    eligibility: { max_income: 250000 },
    match_score: 80,
    why_qualify: tr(
      "Your income makes you eligible for a free LPG connection.",
      "आपकी आय के आधार पर आप पात्र हैं।",
      "ನಿಮ್ಮ ಆದಾಯದ ಆಧಾರದ ಮೇಲೆ ನೀವು ಅರ್ಹರು.",
    ),
    documents: ["Aadhaar Card", "Ration Card", "Bank Passbook", "Photo"],
    steps: baseSteps,
    apply_url: "https://pmuy.gov.in",
  },
  {
    id: "scholarship-scst",
    name: tr("Post-Matric Scholarship (SC/ST)", "पोस्ट-मैट्रिक छात्रवृत्ति", "ಪೋಸ್ಟ್-ಮ್ಯಾಟ್ರಿಕ್ ವಿದ್ಯಾರ್ಥಿವೇತನ"),
    ministry: "Social Justice",
    category: "education",
    benefit_type: "cash",
    annual_benefit_inr: 48000,
    benefit_display: tr("Up to ₹48,000/year scholarship", "₹48,000/वर्ष छात्रवृत्ति", "₹48,000/ವರ್ಷ ಸ್ಕಾಲರ್‌ಶಿಪ್"),
    eligibility: { max_income: 250000, categories: ["SC", "ST"], occupations: ["student"] },
    match_score: 70,
    why_qualify: tr(
      "Available for SC/ST students with income under ₹2.5L.",
      "SC/ST छात्रों के लिए जिनकी आय ₹2.5L से कम है।",
      "₹2.5L ಗಿಂತ ಕಡಿಮೆ ಆದಾಯ ಹೊಂದಿರುವ SC/ST ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ.",
    ),
    documents: ["Aadhaar Card", "Caste Certificate", "Income Certificate", "Mark Sheets"],
    steps: baseSteps,
    apply_url: "https://scholarships.gov.in",
  },
  {
    id: "pmfby",
    name: tr("PM Fasal Bima Yojana", "पीएम फसल बीमा", "ಪಿಎಂ ಫಸಲ್ ಬೀಮಾ"),
    ministry: "Agriculture",
    category: "agriculture",
    benefit_type: "service",
    annual_benefit_inr: 200000,
    benefit_display: tr("Crop insurance up to ₹2,00,000", "फसल बीमा ₹2,00,000 तक", "ಬೆಳೆ ವಿಮೆ"),
    eligibility: { requires_land: true, occupations: ["farmer"] },
    match_score: 82,
    why_qualify: tr(
      "Farmers can insure crops at heavily subsidised premium.",
      "किसान कम प्रीमियम पर फसल बीमा करा सकते हैं।",
      "ರೈತರು ಕಡಿಮೆ ಪ್ರೀಮಿಯಂನಲ್ಲಿ ಬೆಳೆ ವಿಮೆ ಮಾಡಿಸಬಹುದು.",
    ),
    documents: ["Aadhaar Card", "Land Records", "Sowing Certificate", "Bank Passbook"],
    steps: baseSteps,
    apply_url: "https://pmfby.gov.in",
  },
  {
    id: "stand-up-india",
    name: tr("Stand-Up India", "स्टैंड-अप इंडिया", "ಸ್ಟ್ಯಾಂಡ್-ಅಪ್ ಇಂಡಿಯಾ"),
    ministry: "Finance",
    category: "financial",
    benefit_type: "loan",
    annual_benefit_inr: 1000000,
    benefit_display: tr("₹10L–₹1Cr loan for SC/ST/Women", "₹10L–₹1Cr ऋण", "₹10L–₹1Cr ಸಾಲ"),
    eligibility: { categories: ["SC", "ST"], age_min: 18 },
    match_score: 65,
    why_qualify: tr(
      "Loans for SC/ST or women entrepreneurs starting greenfield enterprise.",
      "SC/ST या महिला उद्यमियों के लिए ऋण।",
      "SC/ST ಅಥವಾ ಮಹಿಳಾ ಉದ್ಯಮಿಗಳಿಗೆ ಸಾಲ.",
    ),
    documents: ["Aadhaar Card", "Caste Certificate", "Business Plan", "Bank Statement"],
    steps: baseSteps,
    apply_url: "https://www.standupmitra.in",
  },
  {
    id: "soil-health",
    name: tr("Soil Health Card", "मृदा स्वास्थ्य कार्ड", "ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್"),
    ministry: "Agriculture",
    category: "agriculture",
    benefit_type: "service",
    annual_benefit_inr: 0,
    benefit_display: tr("Free soil testing every 3 years", "मुफ्त मृदा जांच", "ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ"),
    eligibility: { requires_land: true, occupations: ["farmer"] },
    match_score: 78,
    why_qualify: tr(
      "All farmers receive a free soil health card with nutrient recommendations.",
      "सभी किसानों को मुफ्त मृदा कार्ड मिलता है।",
      "ಎಲ್ಲಾ ರೈತರಿಗೆ ಉಚಿತ ಮಣ್ಣು ಕಾರ್ಡ್ ಸಿಗುತ್ತದೆ.",
    ),
    documents: ["Aadhaar Card", "Land Records"],
    steps: baseSteps,
    apply_url: "https://soilhealth.dac.gov.in",
  },
];

export interface UserProfile {
  state?: string;
  income?: number;
  occupation?: string;
  category?: string;
  age?: number;
  gender?: string;
  has_aadhaar?: boolean;
  has_land?: boolean;
  land_size?: number;
}

export function matchSchemes(profile: UserProfile): Scheme[] {
  return SCHEMES.map((s) => {
    let score = s.match_score;
    const e = s.eligibility;
    if (e.max_income && profile.income !== undefined && profile.income > e.max_income) score -= 30;
    if (e.requires_aadhaar && profile.has_aadhaar === false) score -= 25;
    if (e.requires_land && profile.has_land === false) score -= 30;
    if (e.occupations && profile.occupation && !e.occupations.includes(profile.occupation)) score -= 15;
    if (e.categories && profile.category && !e.categories.includes(profile.category)) score -= 10;
    if (e.age_min && profile.age !== undefined && profile.age < e.age_min) score -= 20;
    return { ...s, match_score: Math.max(0, Math.min(100, score)) };
  }).sort((a, b) => b.match_score - a.match_score);
}
