import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Users, Calendar, CircleAlert as AlertCircle, Plus, Vote } from 'lucide-react-native';

export default function DashboardTab() {
  const userStokvels = [
    {
      id: 1,
      name: 'Family Christmas Fund',
      type: 'Savings',
      totalBalance: 45000,
      myContribution: 15000,
      members: 8,
      nextPayout: '2024-12-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Grocery Rotation',
      type: 'Rotational',
      totalBalance: 12000,
      myContribution: 3000,
      members: 4,
      nextPayout: '2024-02-01',
      status: 'active'
    },
    {
      id: 3,
      name: 'Property Investment Club',
      type: 'Investment',
      totalBalance: 180000,
      myContribution: 45000,
      members: 12,
      nextPayout: '2024-06-01',
      status: 'active'
    }
  ];

  const totalBalance = userStokvels.reduce((sum, stokvel) => sum + stokvel.myContribution, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, Thabo!</Text>
          <Text style={styles.subtitle}>Your stokvel portfolio</Text>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={['#16A34A', '#15803D']}
          style={styles.balanceCard}
        >
          <Text style={styles.balanceLabel}>Total Contributions</Text>
          <Text style={styles.balanceAmount}>R{totalBalance.toLocaleString()}</Text>
          <View style={styles.balanceStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Active Stokvels</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Total Members</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#F59E0B' }]}>
                <Plus size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>Create Stokvel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}>
                <Users size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>Join Stokvel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#8B5CF6' }]}>
                <Vote size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>Vote Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#EF4444' }]}>
                <TrendingUp size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>View Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#DCFCE7' }]}>
              <TrendingUp size={16} color="#16A34A" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Contribution Received</Text>
              <Text style={styles.activitySubtitle}>Family Christmas Fund • R2,500</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#FEF3C7' }]}>
              <Vote size={16} color="#F59E0B" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New Vote Created</Text>
              <Text style={styles.activitySubtitle}>Property Investment Club • Investment Decision</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#DBEAFE' }]}>
              <Users size={16} color="#3B82F6" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Member Joined</Text>
              <Text style={styles.activitySubtitle}>Grocery Rotation • Nomsa Mthembu</Text>
              <Text style={styles.activityTime}>3 days ago</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Payments */}
        <View style={styles.upcomingPayments}>
          <Text style={styles.sectionTitle}>Upcoming Payments</Text>
          <TouchableOpacity style={styles.paymentCard}>
            <View style={styles.paymentLeft}>
              <View style={[styles.paymentIcon, { backgroundColor: '#FEF3C7' }]}>
                <AlertCircle size={20} color="#F59E0B" />
              </View>
              <View>
                <Text style={styles.paymentTitle}>Family Christmas Fund</Text>
                <Text style={styles.paymentSubtitle}>Monthly contribution due</Text>
              </View>
            </View>
            <View style={styles.paymentRight}>
              <Text style={styles.paymentAmount}>R2,500</Text>
              <Text style={styles.paymentDate}>Due: Jan 31</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  balanceCard: {
    margin: 20,
    marginTop: 10,
    padding: 24,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
  quickActions: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  recentActivity: {
    padding: 20,
    paddingTop: 0,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  upcomingPayments: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 100,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  paymentSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentRight: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  paymentDate: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 2,
  },
});