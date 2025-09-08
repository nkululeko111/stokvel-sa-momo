import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      stokvels: 'My Stokvels',
      create: 'Create',
      education: 'Learn',
      profile: 'Profile',
      
      // Dashboard
      goodMorning: 'Good morning',
      goodAfternoon: 'Good afternoon',
      goodEvening: 'Good evening',
      totalContributions: 'Total Contributions',
      activeStokvels: 'Active Stokvels',
      totalMembers: 'Total Members',
      quickActions: 'Quick Actions',
      recentActivity: 'Recent Activity',
      upcomingPayments: 'Upcoming Payments',
      
      // Stokvel Types
      savingsStokvel: 'Savings Stokvel',
      rotationalStokvel: 'Rotational Stokvel',
      investmentStokvel: 'Investment Stokvel',
      
      // Actions
      createStokvel: 'Create Stokvel',
      joinStokvel: 'Join Stokvel',
      makePayment: 'Make Payment',
      viewReports: 'View Reports',
      learnMore: 'Learn More',
      
      // Financial Education
      financialLiteracy: 'Financial Literacy',
      understandingStokvels: 'Understanding Stokvels',
      digitalPayments: 'Digital Payments with MoMo',
      buildingCredit: 'Building Credit and Savings',
      
      // Common
      amount: 'Amount',
      members: 'members',
      balance: 'Balance',
      contribution: 'Contribution',
      next: 'Next',
      previous: 'Previous',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    }
  },
  zu: {
    translation: {
      // Navigation
      dashboard: 'Ibhodi',
      stokvels: 'Ama-Stokvel Ami',
      create: 'Dala',
      education: 'Funda',
      profile: 'Iphrofayela',
      
      // Dashboard
      goodMorning: 'Sawubona ekuseni',
      goodAfternoon: 'Sawubona emini',
      goodEvening: 'Sawubona kusihlwa',
      totalContributions: 'Iminikelo Ephelele',
      activeStokvels: 'Ama-Stokvel Asebenzayo',
      totalMembers: 'Amalungu Onke',
      quickActions: 'Izenzo Ezisheshayo',
      recentActivity: 'Umsebenzi Wakamuva',
      upcomingPayments: 'Izinkokhelo Ezizayo',
      
      // Stokvel Types
      savingsStokvel: 'I-Stokvel Yokonga',
      rotationalStokvel: 'I-Stokvel Yokuzulazula',
      investmentStokvel: 'I-Stokvel Yokutshalwa Kwezimali',
      
      // Actions
      createStokvel: 'Dala i-Stokvel',
      joinStokvel: 'Joyina i-Stokvel',
      makePayment: 'Yenza Inkokhelo',
      viewReports: 'Buka Imibiko',
      learnMore: 'Funda Kabanzi',
      
      // Financial Education
      financialLiteracy: 'Ukufunda Ngezezimali',
      understandingStokvels: 'Ukuqonda Ama-Stokvel',
      digitalPayments: 'Izinkokhelo Zedijithali nge-MoMo',
      buildingCredit: 'Ukwakha Isikweletu Nokonga',
      
      // Common
      amount: 'Inani',
      members: 'amalungu',
      balance: 'Ibhalansi',
      contribution: 'Umnikelo',
      next: 'Okulandelayo',
      previous: 'Okwangaphambili',
      save: 'Gcina',
      cancel: 'Khansela',
      confirm: 'Qinisekisa',
      loading: 'Iyalayisha...',
      error: 'Iphutha',
      success: 'Impumelelo'
    }
  },
  xh: {
    translation: {
      // Navigation
      dashboard: 'Ibhodi',
      stokvels: 'Ii-Stokvel Zam',
      create: 'Yenza',
      education: 'Funda',
      profile: 'Iprofayile',
      
      // Dashboard
      goodMorning: 'Molo kusasa',
      goodAfternoon: 'Molo emini',
      goodEvening: 'Molo ngokuhlwa',
      totalContributions: 'Iminikelo Iyonke',
      activeStokvels: 'Ii-Stokvel Ezisebenzayo',
      totalMembers: 'Amalungu Onke',
      quickActions: 'Izenzo Ezikhawulezayo',
      recentActivity: 'Umsebenzi Wamva Nje',
      upcomingPayments: 'Iintlawulo Ezizayo',
      
      // Stokvel Types
      savingsStokvel: 'I-Stokvel Yokonga',
      rotationalStokvel: 'I-Stokvel Ejikelezayo',
      investmentStokvel: 'I-Stokvel Yotyalo-mali',
      
      // Actions
      createStokvel: 'Yenza i-Stokvel',
      joinStokvel: 'Zibandakanye kwi-Stokvel',
      makePayment: 'Yenza Intlawulo',
      viewReports: 'Jonga Iingxelo',
      learnMore: 'Funda Ngakumbi',
      
      // Financial Education
      financialLiteracy: 'Ukufunda Ngemali',
      understandingStokvels: 'Ukuqonda ii-Stokvel',
      digitalPayments: 'Iintlawulo Zedijithali nge-MoMo',
      buildingCredit: 'Ukwakha Ityala Nokonga',
      
      // Common
      amount: 'Imali',
      members: 'amalungu',
      balance: 'Ibhalansi',
      contribution: 'Igalelo',
      next: 'Okulandelayo',
      previous: 'Okwangaphambili',
      save: 'Gcina',
      cancel: 'Rhoxisa',
      confirm: 'Qinisekisa',
      loading: 'Iyalayisha...',
      error: 'Impazamo',
      success: 'Impumelelo'
    }
  },
  af: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      stokvels: 'My Stokvels',
      create: 'Skep',
      education: 'Leer',
      profile: 'Profiel',
      
      // Dashboard
      goodMorning: 'Goeie môre',
      goodAfternoon: 'Goeie middag',
      goodEvening: 'Goeie aand',
      totalContributions: 'Totale Bydraes',
      activeStokvels: 'Aktiewe Stokvels',
      totalMembers: 'Totale Lede',
      quickActions: 'Vinnige Aksies',
      recentActivity: 'Onlangse Aktiwiteit',
      upcomingPayments: 'Komende Betalings',
      
      // Stokvel Types
      savingsStokvel: 'Spaar Stokvel',
      rotationalStokvel: 'Rotasie Stokvel',
      investmentStokvel: 'Belegging Stokvel',
      
      // Actions
      createStokvel: 'Skep Stokvel',
      joinStokvel: 'Sluit aan by Stokvel',
      makePayment: 'Maak Betaling',
      viewReports: 'Bekyk Verslae',
      learnMore: 'Leer Meer',
      
      // Financial Education
      financialLiteracy: 'Finansiële Geletterdheid',
      understandingStokvels: 'Verstaan Stokvels',
      digitalPayments: 'Digitale Betalings met MoMo',
      buildingCredit: 'Bou Krediet en Spaargeld',
      
      // Common
      amount: 'Bedrag',
      members: 'lede',
      balance: 'Balans',
      contribution: 'Bydrae',
      next: 'Volgende',
      previous: 'Vorige',
      save: 'Stoor',
      cancel: 'Kanselleer',
      confirm: 'Bevestig',
      loading: 'Laai...',
      error: 'Fout',
      success: 'Sukses'
    }
  }
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('user-language');
  
  if (!savedLanguage) {
    // Get device locale and map to supported languages
    const deviceLocale = Localization.locale;
    if (deviceLocale.startsWith('zu')) savedLanguage = 'zu';
    else if (deviceLocale.startsWith('xh')) savedLanguage = 'xh';
    else if (deviceLocale.startsWith('af')) savedLanguage = 'af';
    else savedLanguage = 'en';
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

initI18n();

export default i18n;