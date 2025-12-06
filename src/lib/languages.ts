export const INDIAN_LANGUAGES = [
  { code: 'hi', name: 'हिन्दी', englishName: 'Hindi' },
  { code: 'bn', name: 'বাংলা', englishName: 'Bengali' },
  { code: 'te', name: 'తెలుగు', englishName: 'Telugu' },
  { code: 'mr', name: 'मराठी', englishName: 'Marathi' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil' },
  { code: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati' },
  { code: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada' },
  { code: 'ml', name: 'മലയാളം', englishName: 'Malayalam' },
  { code: 'or', name: 'ଓଡ଼ିଆ', englishName: 'Odia' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi' },
  { code: 'as', name: 'অসমীয়া', englishName: 'Assamese' },
  { code: 'mai', name: 'मैथिली', englishName: 'Maithili' },
  { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ', englishName: 'Santali' },
  { code: 'ks', name: 'کٲشُر', englishName: 'Kashmiri' },
  { code: 'ne', name: 'नेपाली', englishName: 'Nepali' },
  { code: 'sd', name: 'سنڌي', englishName: 'Sindhi' },
  { code: 'kok', name: 'कोंकणी', englishName: 'Konkani' },
  { code: 'doi', name: 'डोगरी', englishName: 'Dogri' },
  { code: 'mni', name: 'মৈতৈলোন্', englishName: 'Manipuri' },
  { code: 'bo', name: 'བོད་སྐད', englishName: 'Bodo' },
  { code: 'sa', name: 'संस्कृतम्', englishName: 'Sanskrit' },
  { code: 'ur', name: 'اردو', englishName: 'Urdu' },
  { code: 'en', name: 'English', englishName: 'English' },
] as const;

export type LanguageCode = typeof INDIAN_LANGUAGES[number]['code'];

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  language?: LanguageCode;
  translatedContent?: string;
}

export interface TranslationRequest {
  text: string;
  sourceLanguage: LanguageCode;
  targetLanguage: LanguageCode;
}
