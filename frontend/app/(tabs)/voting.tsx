import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Vote, Clock, CircleCheck as CheckCircle, Circle as XCircle, Users, Calendar } from 'lucide-react-native';

export default function VotingTab() {
  const [selectedTab, setSelectedTab] = useState('active');

  const votes = [
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
    },
    {
      id: 2,
      title: 'Christmas Bonus Distribution',
      stokvel: 'Family Christmas Fund',
      description: 'How should we distribute the December payout?',
      type: 'distribution',
      status: 'active',
      endDate: '2024-02-05',
      totalVotes: 6,
      requiredVotes: 8,
      hasVoted: true,
      yesVotes: 4,
      noVotes: 2,
      options: ['Equal distribution', 'Based on contribution length', 'Bulk purchase discount']
    },
    {
      id: 3,
      title: 'New Member Approval',
      stokvel: 'Grocery Rotation',
      description: 'Approve Sipho Dlamini as a new member?',
      type: 'membership',
      status: 'completed',
      endDate: '2024-01-20',
      totalVotes: 4,
      requiredVotes: 4,
      hasVoted: true,
      yesVotes: 4,
      noVotes: 0,
      options: ['Approve', 'Reject']
    }
  ];

  const filteredVotes = votes.filter(vote => 
    selectedTab === 'all' || vote.status === selectedTab
  );

  const getVoteTypeColor = (type: string) => {
    switch (type) {
      case 'investment': return '#8B5CF6';
      case 'distribution': return '#F59E0B';
      case 'membership': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string, hasVoted: boolean) => {
    if (status === 'completed') {
      return <CheckCircle size={20} color="#16A34A" />;
    }
    if (hasVoted) {
      return <CheckCircle size={20} color="#16A34A" />;
    }
    return <Clock size={20} color="#F59E0B" />;
  };

  const handleVote = (voteId: number, option: string) => {
    // Handle voting logic here
    console.log(`Voting on ${voteId} with option: ${option}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voting Center</Text>
        <Text style={styles.subtitle}>Participate in group decisions</Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterTabs}
        contentContainerStyle={styles.filterTabsContent}
      >
        {['active', 'completed', 'all'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.filterTab,
              selectedTab === tab && styles.filterTabActive
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.filterTabText,
              selectedTab === tab && styles.filterTabTextActive
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {filteredVotes.map((vote) => (
          <View key={vote.id} style={styles.voteCard}>
            <View style={styles.voteHeader}>
              <View style={styles.voteInfo}>
                <View style={styles.voteMeta}>
                  <View style={[styles.typeTag, { backgroundColor: getVoteTypeColor(vote.type) + '20' }]}>
                    <Text style={[styles.typeText, { color: getVoteTypeColor(vote.type) }]}>
                      {vote.type}
                    </Text>
                  </View>
                  <Text style={styles.stokvelName}>{vote.stokvel}</Text>
                </View>
                <Text style={styles.voteTitle}>{vote.title}</Text>
                <Text style={styles.voteDescription}>{vote.description}</Text>
              </View>
              {getStatusIcon(vote.status, vote.hasVoted)}
            </View>

            {/* Vote Progress */}
            <View style={styles.voteProgress}>
              <View style={styles.progressStats}>
                <View style={styles.statItem}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.statText}>
                    {vote.totalVotes}/{vote.requiredVotes} voted
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.statText}>
                    Ends {new Date(vote.endDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { width: `${(vote.totalVotes / vote.requiredVotes) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round((vote.totalVotes / vote.requiredVotes) * 100)}%
                </Text>
              </View>
            </View>

            {/* Vote Results */}
            <View style={styles.voteResults}>
              <View style={styles.resultRow}>
                <View style={styles.resultBar}>
                  <View 
                    style={[
                      styles.resultFill,
                      { 
                        width: `${(vote.yesVotes / vote.totalVotes) * 100}%`,
                        backgroundColor: '#16A34A'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.resultText}>Yes: {vote.yesVotes}</Text>
              </View>
              <View style={styles.resultRow}>
                <View style={styles.resultBar}>
                  <View 
                    style={[
                      styles.resultFill,
                      { 
                        width: `${(vote.noVotes / vote.totalVotes) * 100}%`,
                        backgroundColor: '#EF4444'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.resultText}>No: {vote.noVotes}</Text>
              </View>
            </View>

            {/* Vote Buttons */}
            {vote.status === 'active' && !vote.hasVoted && (
              <View style={styles.voteButtons}>
                {vote.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.voteButton,
                      { backgroundColor: index === 0 ? '#16A34A' : '#EF4444' }
                    ]}
                    onPress={() => handleVote(vote.id, option)}
                  >
                    <Text style={styles.voteButtonText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {vote.hasVoted && (
              <View style={styles.votedIndicator}>
                <CheckCircle size={16} color="#16A34A" />
                <Text style={styles.votedText}>You have voted</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  filterTabs: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  filterTabsContent: {
    paddingRight: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  filterTabActive: {
    backgroundColor: '#16A34A',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  voteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  voteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  voteInfo: {
    flex: 1,
    marginRight: 12,
  },
  voteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  stokvelName: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  voteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  voteDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  voteProgress: {
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16A34A',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  voteResults: {
    marginBottom: 16,
    gap: 8,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  resultFill: {
    height: '100%',
    borderRadius: 2,
  },
  resultText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    minWidth: 60,
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  voteButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  voteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  votedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: 12,
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
  },
  votedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16A34A',
  },
});