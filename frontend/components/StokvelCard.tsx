import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users, Calendar, TrendingUp } from 'lucide-react-native';

interface StokvelCardProps {
  stokvel: {
    id: number;
    name: string;
    type: string;
    balance: number;
    myContribution: number;
    members: number;
    nextPayout: string;
    status: string;
    progress: number;
  };
  onPress?: () => void;
}

export default function StokvelCard({ stokvel, onPress }: StokvelCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Savings': return '#16A34A';
      case 'Rotational': return '#3B82F6';
      case 'Investment': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.name}>{stokvel.name}</Text>
          <View style={[styles.typeTag, { backgroundColor: getTypeColor(stokvel.type) + '20' }]}>
            <Text style={[styles.typeText, { color: getTypeColor(stokvel.type) }]}>
              {stokvel.type}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>R{stokvel.balance.toLocaleString()}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Users size={16} color="#6B7280" />
          <Text style={styles.statText}>{stokvel.members} members</Text>
        </View>
        <View style={styles.statItem}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.statText}>{new Date(stokvel.nextPayout).toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${stokvel.progress}%`, 
                backgroundColor: getTypeColor(stokvel.type) 
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{stokvel.progress}% Complete</Text>
      </View>
    </TouchableOpacity>
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
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
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
  balanceSection: {
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
});