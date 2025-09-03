import { Stokvel, Vote, Member, Activity } from '@/types/stokvel';

// Mock data service - in production this would connect to MoMo API and backend
class StokvelService {
  private stokvels: Stokvel[] = [
    {
      id: 1,
      name: 'Family Christmas Fund',
      type: 'Savings',
      balance: 45000,
      myContribution: 15000,
      members: 8,
      nextPayout: '2024-12-15',
      contributionAmount: 2500,
      status: 'active',
      progress: 75,
      description: 'Annual Christmas savings for family celebrations',
      createdBy: 'user123',
      createdDate: '2024-01-01'
    },
    {
      id: 2,
      name: 'Grocery Rotation',
      type: 'Rotational',
      balance: 12000,
      myContribution: 3000,
      members: 4,
      nextPayout: '2024-02-01',
      contributionAmount: 3000,
      status: 'active',
      progress: 100,
      description: 'Monthly grocery fund rotation among family members',
      createdBy: 'user456',
      createdDate: '2023-09-01'
    }
  ];

  private votes: Vote[] = [
    {
      id: 1,
      title: 'Property Investment Decision',
      stokvel: 'Property Investment Club',
      description: 'Should we invest R180,000 in the Sandton apartment complex project?',
      type: 'investment',
      status: 'active',
      endDate: '2024-02-10',
      totalVotes: 8,
      requiredVotes: 12,
      hasVoted: false,
      yesVotes: 6,
      noVotes: 2,
      options: ['Yes, proceed with investment', 'No, keep funds in savings']
    }
  ];

  async getStokvels(userId: string): Promise<Stokvel[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.stokvels;
  }

  async createStokvel(stokvelData: Partial<Stokvel>): Promise<Stokvel> {
    const newStokvel: Stokvel = {
      id: Date.now(),
      name: stokvelData.name || '',
      type: stokvelData.type || 'Savings',
      balance: 0,
      myContribution: 0,
      members: 1,
      nextPayout: stokvelData.nextPayout || '',
      contributionAmount: stokvelData.contributionAmount || 0,
      status: 'active',
      progress: 0,
      description: stokvelData.description,
      createdBy: 'currentUser',
      createdDate: new Date().toISOString()
    };

    this.stokvels.push(newStokvel);
    return newStokvel;
  }

  async getVotes(userId: string): Promise<Vote[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.votes;
  }

  async castVote(voteId: number, option: string): Promise<boolean> {
    const vote = this.votes.find(v => v.id === voteId);
    if (!vote || vote.hasVoted) return false;

    // Update vote counts
    if (option.toLowerCase().includes('yes') || option.toLowerCase().includes('approve')) {
      vote.yesVotes++;
    } else {
      vote.noVotes++;
    }

    vote.totalVotes++;
    vote.hasVoted = true;

    return true;
  }

  async setupMoMoDebitOrder(stokvelId: number, amount: number): Promise<boolean> {
    // Simulate MoMo API integration
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Setting up MoMo debit order for stokvel ${stokvelId} with amount ${amount}`);
    return true;
  }

  async inviteMembers(stokvelId: number, emails: string[]): Promise<boolean> {
    // Simulate member invitation
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Inviting ${emails.length} members to stokvel ${stokvelId}`);
    return true;
  }

  async getRecentActivity(userId: string): Promise<Activity[]> {
    return [
      {
        id: 1,
        type: 'contribution',
        title: 'Contribution Received',
        subtitle: 'Family Christmas Fund • R2,500',
        timestamp: '2024-01-29T10:00:00Z',
        stokvelId: 1,
        amount: 2500
      },
      {
        id: 2,
        type: 'vote',
        title: 'New Vote Created',
        subtitle: 'Property Investment Club • Investment Decision',
        timestamp: '2024-01-28T14:30:00Z',
        stokvelId: 3
      },
      {
        id: 3,
        type: 'member_joined',
        title: 'Member Joined',
        subtitle: 'Grocery Rotation • Nomsa Mthembu',
        timestamp: '2024-01-26T09:15:00Z',
        stokvelId: 2
      }
    ];
  }
}

export const stokvelService = new StokvelService();