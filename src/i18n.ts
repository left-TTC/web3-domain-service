
import en from "@/locales/en_translation.json"
import zh from "@/locales/zh_transalation.json"

import i18n from 'i18next';

import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(LanguageDetector)      
    .use(initReactI18next)    
    .init({
        resources: {
            en: { translation: en },
            zh: { translation: zh }
        },
            fallbackLng: "en",        
            interpolation: {
                escapeValue: false,
            },
            detection: {
            order: ["navigator", "localStorage", "cookie", "htmlTag", "path", "subdomain"],
            caches: ["localStorage"], 
        },
    });

export default i18n;
