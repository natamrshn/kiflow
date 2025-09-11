import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ContentWithExampleProps {
  title: string;
  mainPoint?: string;
  tips?: string[];
  example?: string;
}

const ContentWithExample: React.FC<ContentWithExampleProps> = ({ title, mainPoint, tips, example }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>

        <View style={styles.alertRow}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <Text style={styles.alertText}>{mainPoint}</Text>
        </View>

        {/* <View style={styles.tips}>
          {tips.map((t, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={styles.tipIcon}>✔️</Text>
              <Text style={styles.tipText}>{t}</Text>
            </View>
          ))}
        </View> */}

        <View style={styles.exampleBox}>
          <Text style={styles.exampleTitle}>Приклад</Text>
          <Text style={styles.exampleText}>{example}</Text>
        </View>
      </View>
    </View>
  );
};

export default ContentWithExample;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#ffffff', padding: 18 },
  container: { maxWidth: 900, alignSelf: 'center', width: '100%' },
  sectionTitle: { fontSize: 14, fontWeight: '800', marginBottom: 12, color: '#0f172a' },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 12,
    marginBottom: 12,
  },
  alertIcon: { fontSize: 20, marginRight: 10 },
  alertText: { flex: 1, fontSize: 16, color: '#0f172a' },
  tips: { marginBottom: 12 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  tipIcon: { marginTop: 4, marginRight: 10 },
  tipText: { flex: 1, color: '#0f172a' },
  exampleBox: {
    borderRadius: 12,
    padding: 14,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  exampleTitle: { fontWeight: '700', marginBottom: 6 },
  exampleText: { color: '#0f172a', lineHeight: 20 },
});
