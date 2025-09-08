const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()]
});

class MoMoService {
  constructor() {
    this.baseURL = process.env.MOMO_BASE_URL || 'https://sandbox.momodeveloper.mtn.com';
    this.subscriptionKey = process.env.MOMO_SUBSCRIPTION_KEY;
    this.apiUser = process.env.MOMO_API_USER;
    this.apiKey = process.env.MOMO_API_KEY;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/collection/token/`,
        {},
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${this.apiUser}:${this.apiKey}`).toString('base64')}`,
            'Ocp-Apim-Subscription-Key': this.subscriptionKey,
            'Content-Type': 'application/json'
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      
      logger.info('MoMo access token obtained successfully');
      return this.accessToken;
    } catch (error) {
      logger.error('Failed to get MoMo access token:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with MoMo API');
    }
  }

  async requestToPay(amount, currency, externalId, payer, payerMessage, payeeNote) {
    try {
      const token = await this.getAccessToken();
      const referenceId = uuidv4();

      const requestBody = {
        amount: amount.toString(),
        currency: currency || 'EUR', 
        externalId: externalId,
        payer: {
          partyIdType: 'MSISDN',
          partyId: payer.phoneNumber
        },
        payerMessage: payerMessage,
        payeeNote: payeeNote
      };

      const response = await axios.post(
        `${this.baseURL}/collection/v1_0/requesttopay`,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Reference-Id': referenceId,
            'X-Target-Environment': process.env.MOMO_TARGET_ENVIRONMENT || 'sandbox',
            'Ocp-Apim-Subscription-Key': this.subscriptionKey,
            'Content-Type': 'application/json'
          }
        }
      );

      logger.info(`Payment request initiated: ${referenceId}`);
      return {
        success: true,
        referenceId: referenceId,
        status: 'PENDING'
      };
    } catch (error) {
      logger.error('Payment request failed:', error.response?.data || error.message);
      throw new Error('Payment request failed');
    }
  }

  async getPaymentStatus(referenceId) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get(
        `${this.baseURL}/collection/v1_0/requesttopay/${referenceId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Target-Environment': process.env.MOMO_TARGET_ENVIRONMENT || 'sandbox',
            'Ocp-Apim-Subscription-Key': this.subscriptionKey
          }
        }
      );

      return {
        success: true,
        status: response.data.status,
        amount: response.data.amount,
        currency: response.data.currency,
        financialTransactionId: response.data.financialTransactionId,
        externalId: response.data.externalId
      };
    } catch (error) {
      logger.error('Failed to get payment status:', error.response?.data || error.message);
      throw new Error('Failed to get payment status');
    }
  }

  async getAccountBalance() {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get(
        `${this.baseURL}/collection/v1_0/account/balance`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Target-Environment': process.env.MOMO_TARGET_ENVIRONMENT || 'sandbox',
            'Ocp-Apim-Subscription-Key': this.subscriptionKey
          }
        }
      );

      return {
        success: true,
        availableBalance: response.data.availableBalance,
        currency: response.data.currency
      };
    } catch (error) {
      logger.error('Failed to get account balance:', error.response?.data || error.message);
      throw new Error('Failed to get account balance');
    }
  }

  async transfer(amount, currency, externalId, payee, payerMessage, payeeNote) {
    try {
      const token = await this.getAccessToken();
      const referenceId = uuidv4();

      const requestBody = {
        amount: amount.toString(),
        currency: currency || 'EUR',
        externalId: externalId,
        payee: {
          partyIdType: 'MSISDN',
          partyId: payee.phoneNumber
        },
        payerMessage: payerMessage,
        payeeNote: payeeNote
      };

      const response = await axios.post(
        `${this.baseURL}/disbursement/v1_0/transfer`,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Reference-Id': referenceId,
            'X-Target-Environment': process.env.MOMO_TARGET_ENVIRONMENT || 'sandbox',
            'Ocp-Apim-Subscription-Key': this.subscriptionKey,
            'Content-Type': 'application/json'
          }
        }
      );

      logger.info(`Transfer initiated: ${referenceId}`);
      return {
        success: true,
        referenceId: referenceId,
        status: 'PENDING'
      };
    } catch (error) {
      logger.error('Transfer failed:', error.response?.data || error.message);
      throw new Error('Transfer failed');
    }
  }

  async setupRecurringPayment(stokvelId, userId, amount, frequency) {
    // This would integrate with MoMo's recurring payment system
    // For now, we'll simulate the setup
    try {
      logger.info(`Setting up recurring payment for stokvel ${stokvelId}, user ${userId}`);
      
      return {
        success: true,
        recurringPaymentId: uuidv4(),
        status: 'ACTIVE',
        amount: amount,
        frequency: frequency,
        nextPaymentDate: this.calculateNextPaymentDate(frequency)
      };
    } catch (error) {
      logger.error('Failed to setup recurring payment:', error.message);
      throw new Error('Failed to setup recurring payment');
    }
  }

  calculateNextPaymentDate(frequency) {
    const now = new Date();
    switch (frequency) {
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case 'monthly':
        return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
      case 'quarterly':
        return new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
      default:
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    }
  }
}

module.exports = new MoMoService();