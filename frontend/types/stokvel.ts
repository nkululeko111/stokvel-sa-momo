export interface Stokvel {
  id: number;
  name: string;
  type: 'Savings' | 'Rotational' | 'Investment';
  balance: number;
  myContribution: number;
  members: number;
  nextPayout: string;
  contributionAmount: number;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  description?: string;
  createdBy?: string;
  createdDate?: string;
}

export interface Vote {
  id: number;
  title: string;
  stokvel: string;
  description: string;
  type: 'investment' | 'distribution' | 'membership' | 'general';
  status: 'active' | 'completed' | 'cancelled';
  endDate: string;
  totalVotes: number;
  requiredVotes: number;
  hasVoted: boolean;
  yesVotes: number;
  noVotes: number;
  options: string[];
}

export interface Member {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  contributionsTotal: number;
  contributionsMissed: number;
  status: 'active' | 'inactive' | 'suspended';
  trustScore: number;
}

export interface Activity {
  id: number;
  type: 'contribution' | 'vote' | 'member_joined' | 'payout' | 'investment';
  title: string;
  subtitle: string;
  timestamp: string;
  stokvelId?: number;
  amount?: number;
}