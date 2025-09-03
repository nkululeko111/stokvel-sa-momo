import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Calendar, DollarSign, Target, ArrowRight } from 'lucide-react-native';

export default function CreateTab() {
  const [stokvelType, setStokvelType] = useState('');
  const [stokvelName, setStokvelName] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [maxMembers, setMaxMembers] = useState('');

  const stokvelTypes = [
    {
      id: 'savings',
      name: 'Savings Stokvel',
      description: 'Pool funds together for bulk purchases or year-end payouts',
      icon: Target,
      color: '#16A34A',
    },
    {
      id: 'rotational',
      name: 'Rotational Stokvel',
      description: 'Members take turns receiving the full contribution pot',
      icon: Users,
      color: '#3B82F6',
    },
    {
      id: 'investment',
      name: 'Investment Stokvel',
      description: 'Invest pooled funds in property, shares, or business ventures',
      icon: TrendingUp,
      color: '#8B5CF6',
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
          <Text style={styles.title}>Create New Stokvel</Text>
          <Text style={styles.subtitle}>Build your community savings group</Text>
        </View>

        {/* Stokvel Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Stokvel Type</Text>
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
              <Text style={styles.sectionTitle}>Stokvel Details</Text>
              
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
                  <Text style={styles.inputLabel}>Monthly Contribution</Text>
                  <TextInput
                    style={styles.input}
                    value={contributionAmount}
                    onChangeText={setContributionAmount}
                    placeholder="R2,500"
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
              <Text style={styles.sectionTitle}>Summary</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total Pool Value</Text>
                  <Text style={styles.summaryValue}>
                    R{(parseInt(contributionAmount || '0') * parseInt(maxMembers || '0') * parseInt(duration || '0')).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Monthly Pool</Text>
                  <Text style={styles.summaryValue}>
                    R{(parseInt(contributionAmount || '0') * parseInt(maxMembers || '0')).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Your Total Contribution</Text>
                  <Text style={styles.summaryValue}>
                    R{(parseInt(contributionAmount || '0') * parseInt(duration || '0')).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>

            {/* Create Button */}
            <View style={styles.section}>
              <TouchableOpacity style={styles.createButton} onPress={handleCreateStokvel}>
                <Text style={styles.createButtonText}>Create Stokvel</Text>
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
    lineHeight: 20,
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