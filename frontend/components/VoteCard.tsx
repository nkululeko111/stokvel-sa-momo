import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users, Calendar, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';

interface VoteCardProps {
  vote: {
    id: number;
    title: string;
    stokvel: string;
    description: string;
    type: string;
    status: string;
    endDate: string;
    totalVotes: number;
    requiredVotes: number;
    hasVoted: boolean;
    yesVotes: number;
    noVotes: number;
    options: string[];
  };
  onVote?: (voteId: number, option: string) => void;
}

export default function VoteCard({ vote, onVote }: VoteCardProps) {
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

  return (
    <View style={styles.card}>
      <View style={styles.header}>
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
                  width: `${vote.totalVotes > 0 ? (vote.yesVotes / vote.totalVotes) * 100 : 0}%`,
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
                  width: `${vote.totalVotes > 0 ? (vote.noVotes / vote.totalVotes) * 100 : 0}%`,
                  backgroundColor: '#EF4444'
                }
              ]} 
            />
          </View>
          <Text style={styles.resultText}>No: {vote.noVotes}</Text>
        </View>
      </View>

      {/* Vote Buttons */}
      {vote.status === 'active' && !vote.hasVoted && onVote && (
        <View style={styles.voteButtons}>
          {vote.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.voteButton,
                { backgroundColor: index === 0 ? '#16A34A' : '#EF4444' }
              ]}
              onPress={() => onVote(vote.id, option)}
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
  );
}

const styles = StyleSheet.create({
  card: {
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
  header: {
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