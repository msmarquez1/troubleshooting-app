import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function SchematicsScreen() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>R15 KK Schematics</Text>

        {React.createElement('iframe', {
          src: '/schematics/R15 KK Schematics.pdf',
          style: {
            width: '100%',
            height: '90vh',
            border: 'none',
          },
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schematics</Text>
      <Text>PDF viewer is for web preview right now.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});