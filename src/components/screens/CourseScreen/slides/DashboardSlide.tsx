import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface DashboardSlideProps {
  title: string;
}

interface SkillSummaryItem {
  criterion_id: string;
  criterion_name: string;
  average_score: number;
}

interface UserAssessmentSummary {
  overall_average: number | null;
  characteristics: SkillSummaryItem[];
}

const DashboardSlide: React.FC<DashboardSlideProps> = ({ title }) => {
  const mockSummary: UserAssessmentSummary = {
    overall_average: 7.3,
    characteristics: [
      { criterion_id: '1', criterion_name: 'Комунікація', average_score: 8 },
      { criterion_id: '2', criterion_name: 'Креативність', average_score: 6 },
      { criterion_id: '3', criterion_name: 'Тайм-менеджмент', average_score: 7 },
      { criterion_id: '4', criterion_name: 'Лідерство', average_score: 8.5 },
      { criterion_id: '5', criterion_name: 'Аналіз', average_score: 6.5 },
    ],
  };

  const [summary] = useState<UserAssessmentSummary>(mockSummary);

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        {/* Іконка */}
        <View style={styles.iconWrapper}>
          <MaterialIcons name="insert-chart" size={40} color="#7c3aed" />
        </View>

        {/* Заголовки */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          Ця сторінка відображає твою персональну статистику
        </Text>

        {/* Загальна статистика */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Статистика</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: '#dbeafe' }]}>
              <Text style={styles.statLabel}>Час навчання</Text>
              <Text style={[styles.statValue, { color: '#1d4ed8' }]}>12 год</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: '#dcfce7' }]}>
              <Text style={styles.statLabel}>Середній бал</Text>
              <Text style={[styles.statValue, { color: '#15803d' }]}>
                {summary.overall_average?.toFixed(1)}/10
              </Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: '#ede9fe' }]}>
              <Text style={styles.statLabel}>Курси</Text>
              <Text style={[styles.statValue, { color: '#7c3aed' }]}>5</Text>
            </View>
          </View>
        </View>
        <View style={styles.skillsCard}>
          <Text style={styles.statsTitle}>Порівняння навичок</Text>
          {Platform.OS === 'web' ? (
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>
                📊 Тут можна підключити RadarChart (Recharts)
              </Text>
            </View>
          ) : (
            <Text style={styles.chartPlaceholderText}>
              📊 Графік доступний лише у веб-версії
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default DashboardSlide;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    borderRadius: 20,
    padding: 24,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  iconWrapper: {
    alignSelf: 'center',
    backgroundColor: '#f3e8ff',
    padding: 12,
    borderRadius: 50,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#475569',
    marginBottom: 16,
  },
  statsCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statBox: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  skillsCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  chartPlaceholder: {
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    color: '#64748b',
    textAlign: 'center',
  },
});

