import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem('auth_token');
          // Redirect to login
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(phoneNumber: string, pin: string) {
    const response = await this.api.post('/auth/login', { phoneNumber, pin });
    if (response.data.success) {
      await AsyncStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  }

  async register(userData: any) {
    const response = await this.api.post('/auth/register', userData);
    return response.data;
  }

  // Stokvel operations
  async getStokvels() {
    const response = await this.api.get('/stokvels');
    return response.data;
  }

  async createStokvel(stokvelData: any) {
    const response = await this.api.post('/stokvels', stokvelData);
    return response.data;
  }

  async joinStokvel(stokvelId: number, inviteCode: string) {
    const response = await this.api.post(`/stokvels/${stokvelId}/join`, { inviteCode });
    return response.data;
  }

  // MoMo operations
  async requestPayment(paymentData: any) {
    const response = await this.api.post('/momo/request-payment', paymentData);
    return response.data;
  }

  async getPaymentStatus(referenceId: string) {
    const response = await this.api.get(`/momo/payment-status/${referenceId}`);
    return response.data;
  }

  async setupRecurringPayment(recurringData: any) {
    const response = await this.api.post('/momo/setup-recurring', recurringData);
    return response.data;
  }

  async getMoMoBalance() {
    const response = await this.api.get('/momo/balance');
    return response.data;
  }

  // Education
  async getEducationModules(language = 'en') {
    const response = await this.api.get(`/education/modules?lang=${language}`);
    return response.data;
  }

  async getModule(moduleId: number, language = 'en') {
    const response = await this.api.get(`/education/modules/${moduleId}?lang=${language}`);
    return response.data;
  }

  async saveProgress(progressData: any) {
    const response = await this.api.post('/education/progress', progressData);
    return response.data;
  }

  async calculateSavings(calculationData: any) {
    const response = await this.api.post('/education/calculate/savings', calculationData);
    return response.data;
  }

  async calculateStokvel(calculationData: any) {
    const response = await this.api.post('/education/calculate/stokvel', calculationData);
    return response.data;
  }

  // Analytics
  async getAnalytics() {
    const response = await this.api.get('/analytics');
    return response.data;
  }
}

export const apiService = new ApiService();