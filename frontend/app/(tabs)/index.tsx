import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Users, Plus, GraduationCap, CreditCard, BarChart3, Smartphone } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function DashboardTab() {
  const { t } = useTranslation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 17) return t('goodAfternoon');
    return t('goodEvening');
  };

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
          <Text style={styles.greeting}>{getGreeting()}, Thabo!</Text>
          <Text style={styles.subtitle}>Your financial journey</Text>
        </View>

        {/* Balance Card - Simplified */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>{t('totalContributions')}</Text>
          <Text style={styles.balanceAmount}>R{totalBalance.toLocaleString()}</Text>
          <View style={styles.balanceStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>{t('activeStokvels')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>{t('totalMembers')}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#16A34A' }]}>
                <Plus size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>{t('createStokvel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}>
                <Smartphone size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>{t('makePayment')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#F59E0B' }]}>
                <GraduationCap size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>{t('learnMore')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#8B5CF6' }]}>
                <BarChart3 size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>{t('viewReports')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>{t('recentActivity')}</Text>
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
            <View style={[styles.activityIcon, { backgroundColor: '#DBEAFE' }]}>
              <CreditCard size={16} color="#3B82F6" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>MoMo Payment Successful</Text>
              <Text style={styles.activitySubtitle}>Grocery Rotation • R3,000</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#FEF3C7' }]}>
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
          <Text style={styles.sectionTitle}>{t('upcomingPayments')}</Text>
          <TouchableOpacity style={styles.paymentCard}>
            <View style={styles.paymentLeft}>
              <View style={[styles.paymentIcon, { backgroundColor: '#DCFCE7' }]}>
                <Smartphone size={20} color="#16A34A" />
              </View>
              <View>
                <Text style={styles.paymentTitle}>Family Christmas Fund</Text>
                <Text style={styles.paymentSubtitle}>Auto-debit via MoMo</Text>
              </View>
            </View>
            <View style={styles.paymentRight}>
              <Text style={styles.paymentAmount}>R2,500</Text>
              <Text style={styles.paymentDate}>Jan 31</Text>
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
    backgroundColor: '#16A34A',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
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
    color: '#16A34A',
    marginTop: 2,
  },
});