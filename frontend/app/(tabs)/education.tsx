import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GraduationCap, BookOpen, Calculator, Trophy, Play, CheckCircle } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EducationTab() {
  const { t } = useTranslation();
  const [selectedModule, setSelectedModule] = useState<{
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    duration: string;
    lessons: number;
    completed: boolean;
  } | null>(null);
  const [userProgress, setUserProgress] = useState({
    completedModules: [1],
    currentModule: 2,
    totalScore: 85,
    certificates: ['basic-stokvel'],
    streakDays: 7
  });

  const modules = [
    {
      id: 1,
      title: t('understandingStokvels'),
      description: 'Learn the basics of traditional South African savings groups',
      icon: BookOpen,
      color: '#16A34A',
      duration: '15 min',
      lessons: 5,
      completed: true
    },
    {
      id: 2,
      title: t('digitalPayments'),
      description: 'Master mobile money transactions with MTN MoMo',
      icon: Calculator,
      color: '#3B82F6',
      duration: '20 min',
      lessons: 7,
      completed: false
    },
    {
      id: 3,
      title: t('buildingCredit'),
      description: 'Learn how to build a strong financial foundation',
      icon: Trophy,
      color: '#F59E0B',
      duration: '25 min',
      lessons: 6,
      completed: false
    }
  ];

  const SavingsCalculator = () => {
    const [monthlyAmount, setMonthlyAmount] = useState(1000);
    const [months, setMonths] = useState(12);
    
    const data = {
      labels: Array.from({ length: months }, (_, i) => `M${i + 1}`),
      datasets: [{
        data: Array.from({ length: months }, (_, i) => monthlyAmount * (i + 1)),
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(22, 163, 74, ${opacity})`
      }]
    };

    return (
      <View style={styles.calculatorCard}>
        <Text style={styles.calculatorTitle}>Savings Growth Calculator</Text>
        <LineChart
          data={data}
          width={screenWidth - 80}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(22, 163, 74, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={styles.chart}
        />
        <View style={styles.calculatorResult}>
          <Text style={styles.resultText}>
            Total after {months} months: R{(monthlyAmount * months).toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('financialLiteracy')}</Text>
          <Text style={styles.subtitle}>Build your financial knowledge</Text>
        </View>

        {/* Progress Overview */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <GraduationCap size={24} color="#16A34A" />
            <Text style={styles.progressTitle}>Your Progress</Text>
          </View>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>{userProgress.totalScore}%</Text>
              <Text style={styles.progressLabel}>Overall Score</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>{userProgress.streakDays}</Text>
              <Text style={styles.progressLabel}>Day Streak</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>{userProgress.completedModules.length}</Text>
              <Text style={styles.progressLabel}>Completed</Text>
            </View>
          </View>
        </View>

        {/* Learning Modules */}
        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>Learning Modules</Text>
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <TouchableOpacity
                key={module.id}
                style={styles.moduleCard}
                onPress={() => setSelectedModule(module)}
              >
                <View style={styles.moduleHeader}>
                  <View style={[styles.moduleIcon, { backgroundColor: module.color + '20' }]}>
                    <IconComponent size={24} color={module.color} />
                  </View>
                  <View style={styles.moduleInfo}>
                    <Text style={styles.moduleTitle}>{module.title}</Text>
                    <Text style={styles.moduleDescription}>{module.description}</Text>
                    <View style={styles.moduleStats}>
                      <Text style={styles.moduleDuration}>{module.duration}</Text>
                      <Text style={styles.moduleLessons}>{module.lessons} lessons</Text>
                    </View>
                  </View>
                  {module.completed && (
                    <CheckCircle size={20} color="#16A34A" />
                  )}
                </View>
                <View style={styles.moduleProgress}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { 
                          width: module.completed ? '100%' : '30%',
                          backgroundColor: module.color
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressPercentage}>
                    {module.completed ? '100%' : '30%'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Interactive Tools */}
        <View style={styles.toolsSection}>
          <Text style={styles.sectionTitle}>Financial Tools</Text>
          <SavingsCalculator />
          
          <TouchableOpacity style={styles.toolCard}>
            <View style={styles.toolHeader}>
              <Calculator size={24} color="#3B82F6" />
              <Text style={styles.toolTitle}>Stokvel Calculator</Text>
            </View>
            <Text style={styles.toolDescription}>
              Calculate potential returns from different stokvel types
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolCard}>
            <View style={styles.toolHeader}>
              <Play size={24} color="#8B5CF6" />
              <Text style={styles.toolTitle}>MoMo Simulator</Text>
            </View>
            <Text style={styles.toolDescription}>
              Practice making payments and transfers safely
            </Text>
          </TouchableOpacity>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementCard}>
            <Trophy size={24} color="#F59E0B" />
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>Stokvel Expert</Text>
              <Text style={styles.achievementDescription}>
                Completed the Understanding Stokvels module
              </Text>
            </View>
          </View>
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
  progressCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16A34A',
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  modulesSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  moduleStats: {
    flexDirection: 'row',
    gap: 12,
  },
  moduleDuration: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  moduleLessons: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  moduleProgress: {
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
  progressPercentage: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  toolsSection: {
    padding: 20,
    paddingTop: 0,
  },
  calculatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  calculatorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  calculatorResult: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16A34A',
    textAlign: 'center',
  },
  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
  },
  toolDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  achievementsSection: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 100,
  },
  achievementCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  achievementInfo: {
    marginLeft: 12,
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#A16207',
    lineHeight: 20,
  },
});