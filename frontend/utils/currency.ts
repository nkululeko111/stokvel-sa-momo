/**
 * Format currency amounts for display
 */
export const formatCurrency = (amount: number, currency: string = 'R'): string => {
  return `${currency}${amount.toLocaleString('en-ZA')}`;
};

/**
 * Parse currency string to number
 */
export const parseCurrency = (currencyString: string): number => {
  const cleanString = currencyString.replace(/[^\d.]/g, '');
  return parseFloat(cleanString) || 0;
};

/**
 * Calculate percentage with fallback for division by zero
 */
export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Calculate time remaining until a date
 */
export const timeUntilDate = (targetDate: string): string => {
  const target = new Date(targetDate);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  
  if (diff < 0) return 'Expired';
  
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  if (days < 30) return `${Math.ceil(days / 7)} weeks`;
  return `${Math.ceil(days / 30)} months`;
};