import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Target, TrendingUp, ArrowRight, Smartphone, Shield } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function CreateTab() {
  const { t } = useTranslation();
  const [stokvelType, setStokvelType] = useState('');
  const [stokvelName, setStokvelName] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [maxMembers, setMaxMembers] = useState('');

  const stokvelTypes = [
    {
      id: 'savings',
      name: t('savingsStokvel'),
      description: 'Pool funds for bulk purchases, Christmas, or emergencies',
      icon: Target,
      color: '#16A34A',
      benefits: ['Bulk buying power', 'Disciplined saving', 'Year-end payout']
    },
    {
      id: 'rotational',
      name: t('rotationalStokvel'),
      description: 'Members take turns receiving the monthly pool',
      icon: Users,
      color: '#3B82F6',
      benefits: ['Regular access to lump sum', 'No interest charges', 'Community support']
    },
    {
      id: 'investment',
      name: t('investmentStokvel'),
      description: 'Invest pooled funds for long-term wealth building',
      icon: TrendingUp,
      color: '#8B5CF6',
      benefits: ['Wealth building', 'Professional management', 'Higher returns']
    },
  ];

  const handleCreateStokvel = () => {
    if (!stokvelType || !stokvelName || !contributionAmount || !duration || !maxMembers) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Stokvel Created!', 
      `Your ${stokvelTypes.find(t => t.id === stokvelType)?.name} "${stokvelName}" has been created successfully. You can now invite members.`,
      [{ text: 'OK', style: 'default' }]
    );

    // Reset form
    setStokvelType('');
    setStokvelName('');
    setContributionAmount('');
    setDuration('');
    setMaxMembers('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('createStokvel')}</Text>
          <Text style={styles.subtitle}>Start your financial journey with friends</Text>
        </View>

        {/* MoMo Integration Notice */}
        <View style={styles.momoNotice}>
          <Smartphone size={20} color="#3B82F6" />
          <View style={styles.momoNoticeText}>
            <Text style={styles.momoTitle}>Powered by MTN MoMo</Text>
            <Text style={styles.momoDescription}>
              Secure, automated payments with your mobile money wallet
            </Text>
          </View>
          <Shield size={20} color="#16A34A" />
        </View>

        {/* Stokvel Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Stokvel Type</Text>
          {stokvelTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  stokvelType === type.id && { borderColor: type.color, borderWidth: 2 }
                ]}
                onPress={() => setStokvelType(type.id)}
              >
                <View style={styles.typeCardLeft}>
                  <View style={[styles.typeIcon, { backgroundColor: type.color + '20' }]}>
                    <IconComponent size={24} color={type.color} />
                  </View>
                  <View style={styles.typeInfo}>
                    <Text style={styles.typeName}>{type.name}</Text>
                    <Text style={styles.typeDescription}>{type.description}</Text>
                    <View style={styles.benefitsList}>
                      {type.benefits.map((benefit, index) => (
                        <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
                      ))}
                    </View>
                  </View>
                </View>
                <ArrowRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Form Fields */}
        {stokvelType && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Setup Details</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Stokvel Name</Text>
                <TextInput
                  style={styles.input}
                  value={stokvelName}
                  onChangeText={setStokvelName}
                  placeholder="e.g., Family Christmas Fund"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputGroupHalf}>
                  <Text style={styles.inputLabel}>Monthly Amount (ZAR)</Text>
                  <TextInput
                    style={styles.input}
                    value={contributionAmount}
                    onChangeText={setContributionAmount}
                    placeholder="2500"
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View style={styles.inputGroupHalf}>
                  <Text style={styles.inputLabel}>Duration (Months)</Text>
                  <TextInput
                    style={styles.input}
                    value={duration}
                    onChangeText={setDuration}
                    placeholder="12"
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Maximum Members</Text>
                <TextInput
                  style={styles.input}
                  value={maxMembers}
                  onChangeText={setMaxMembers}
                  placeholder="10"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Financial Summary</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total Pool (All Members)</Text>
                  <Text style={styles.summaryValue}>
                    R{(parseInt(contributionAmount || '0') * parseInt(maxMembers || '0') * parseInt(duration || '0')).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Monthly Collection</Text>
                  <Text style={styles.summaryValue}>
                    R{(parseInt(contributionAmount || '0') * parseInt(maxMembers || '0')).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Your Total Investment</Text>
                  <Text style={styles.summaryValue}>
                    R{(parseInt(contributionAmount || '0') * parseInt(duration || '0')).toLocaleString()}
                  </Text>
                </View>
              </View>
              
              <View style={styles.autoPayNotice}>
                <Text style={styles.autoPayText}>
                  💡 Automatic MoMo debit orders will be set up for hassle-free payments
                </Text>
              </View>
            </View>

            {/* Create Button */}
            <View style={styles.section}>
              <TouchableOpacity style={styles.createButton} onPress={handleCreateStokvel}>
                <Text style={styles.createButtonText}>Create & Invite Members</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  momoNotice: {
    backgroundColor: '#EFF6FF',
    margin: 20,
    marginTop: 10,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  momoNoticeText: {
    flex: 1,
    marginHorizontal: 12,
  },
  momoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 2,
  },
  momoDescription: {
    fontSize: 12,
    color: '#3B82F6',
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  typeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  typeCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  benefitsList: {
    marginTop: 4,
  },
  benefitItem: {
    fontSize: 12,
    color: '#16A34A',
    marginBottom: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroupHalf: {
    flex: 1,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  autoPayNotice: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  autoPayText: {
    fontSize: 12,
    color: '#15803D',
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#16A34A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});