import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Calendar, TrendingUp, ArrowRight, Filter } from 'lucide-react-native';

export default function StokvelsTab() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const stokvels = [
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
    },
    {
      id: 3,
      name: 'Property Investment Club',
      type: 'Investment',
      balance: 180000,
      myContribution: 45000,
      members: 12,
      nextPayout: '2024-06-01',
      contributionAmount: 7500,
      status: 'active',
      progress: 60,
    },
    {
      id: 4,
      name: 'School Fees Savings',
      type: 'Savings',
      balance: 28000,
      myContribution: 14000,
      members: 6,
      nextPayout: '2024-01-15',
      contributionAmount: 2000,
      status: 'completed',
      progress: 100,
    }
  ];

  const filteredStokvels = selectedFilter === 'all' 
    ? stokvels 
    : stokvels.filter(s => s.status === selectedFilter);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Savings': return '#16A34A';
      case 'Rotational': return '#3B82F6';
      case 'Investment': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#16A34A' : '#6B7280';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Stokvels</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterTabs}
        contentContainerStyle={styles.filterTabsContent}
      >
        {['all', 'active', 'completed'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.filterTabActive
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterTabText,
              selectedFilter === filter && styles.filterTabTextActive
            ]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {filteredStokvels.map((stokvel) => (
          <TouchableOpacity key={stokvel.id} style={styles.stokvelCard}>
            <View style={styles.stokvelHeader}>
              <View style={styles.stokvelInfo}>
                <Text style={styles.stokvelName}>{stokvel.name}</Text>
                <View style={styles.stokvelMeta}>
                  <View style={[styles.typeTag, { backgroundColor: getTypeColor(stokvel.type) + '20' }]}>
                    <Text style={[styles.typeText, { color: getTypeColor(stokvel.type) }]}>
                      {stokvel.type}
                    </Text>
                  </View>
                  <View style={[styles.statusTag, { backgroundColor: getStatusColor(stokvel.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(stokvel.status) }]}>
                      {stokvel.status}
                    </Text>
                  </View>
                </View>
              </View>
              <ArrowRight size={20} color="#9CA3AF" />
            </View>

            <View style={styles.stokvelStats}>
              <View style={styles.statRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Total Balance</Text>
                  <Text style={styles.statValue}>R{stokvel.balance.toLocaleString()}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>My Contribution</Text>
                  <Text style={styles.statValue}>R{stokvel.myContribution.toLocaleString()}</Text>
                </View>
              </View>
              
              <View style={styles.statRow}>
                <View style={styles.statItemIcon}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.statTextSmall}>{stokvel.members} members</Text>
                </View>
                <View style={styles.statItemIcon}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.statTextSmall}>Next: {new Date(stokvel.nextPayout).toLocaleDateString()}</Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${stokvel.progress}%`, backgroundColor: getTypeColor(stokvel.type) }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{stokvel.progress}% Complete</Text>
              </View>
            </View>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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
  stokvelCard: {
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
  stokvelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stokvelInfo: {
    flex: 1,
  },
  stokvelName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  stokvelMeta: {
    flexDirection: 'row',
    gap: 8,
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
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  stokvelStats: {
    gap: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  statItemIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statTextSmall: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
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
    marginTop: 4,
    textAlign: 'right',
  },
});