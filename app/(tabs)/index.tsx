import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { faults } from '../../data/faults';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedFault, setSelectedFault] = useState<any>(null);
  const [selectedSystem, setSelectedSystem] = useState('ALL');

  const systems = [
    'ALL',
    ...new Set(faults.map((fault: any) => fault.system).filter(Boolean)),
  ];

  const filteredFaults = faults.filter((fault: any) => {
    const text = `${fault.id} ${fault.title} ${fault.system} ${fault.description} ${fault.check}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());
    const matchesSystem =
      selectedSystem === 'ALL' || fault.system === selectedSystem;

    return matchesSearch && matchesSystem;
  });

  const getPriorityColor = (priority: any) => {
    if (priority === '1') return '#ff3b30';
    if (priority === '2') return '#ff9500';
    if (priority === '3') return '#007AFF';
    return '#777';
  };

  if (selectedFault) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setSelectedFault(null);
          }}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back to faults</Text>
        </TouchableOpacity>

        <Text style={styles.detailHeader}>Fault {selectedFault.id}</Text>
        <Text style={styles.detailTitle}>{selectedFault.title}</Text>

        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(selectedFault.priority) },
          ]}
        >
          <Text style={styles.priorityText}>
            Priority: {selectedFault.priority || 'N/A'}
          </Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.label}>System</Text>
          <Text style={styles.detailText}>{selectedFault.system || 'N/A'}</Text>

          <Text style={styles.label}>Description</Text>
          <Text style={styles.detailText}>
            {selectedFault.description || 'N/A'}
          </Text>

          <Text style={styles.label}>Check First</Text>
          <Text style={styles.detailText}>{selectedFault.check || 'N/A'}</Text>

          <Text style={styles.label}>Remote Suggestion</Text>
          <Text style={styles.detailText}>
            {selectedFault.remoteSuggestion || 'N/A'}
          </Text>

          <Text style={styles.label}>Site Suggestion</Text>
          <Text style={styles.detailText}>
            {selectedFault.siteSuggestion || 'N/A'}
          </Text>

          <Text style={styles.label}>IO Points</Text>
          <Text style={styles.detailText}>{selectedFault.io || 'N/A'}</Text>

          <Text style={styles.label}>Parts</Text>
          <Text style={styles.detailText}>{selectedFault.parts || 'N/A'}</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Siemens 2.3 Troubleshooting</Text>

      <TextInput
        style={styles.search}
        placeholder="Search fault, system, or symptom..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.count}>
        Showing {filteredFaults.length} of {faults.length} faults
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
      >
        {systems.map((system: any) => (
          <TouchableOpacity
            key={system}
            style={[
              styles.filterButton,
              selectedSystem === system && styles.activeFilter,
            ]}
            onPress={() => setSelectedSystem(system)}
          >
            <Text
              style={[
                styles.filterText,
                selectedSystem === system && styles.activeFilterText,
              ]}
            >
              {system}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredFaults}
        keyExtractor={(item: any, index) => `${item.id}-${index}`}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={[
              styles.card,
              { borderLeftColor: getPriorityColor(item.priority) },
            ]}
            onPress={() => setSelectedFault(item)}
          >
            <View style={styles.cardTop}>
              <Text style={styles.faultId}>Fault: {item.id}</Text>

              <View
                style={[
                  styles.smallPriorityBadge,
                  { backgroundColor: getPriorityColor(item.priority) },
                ]}
              >
                <Text style={styles.smallPriorityText}>
                  P{item.priority || '?'}
                </Text>
              </View>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text>System: {item.system}</Text>
            <Text numberOfLines={2}>Check First: {item.check}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },

  count: {
    marginBottom: 12,
    fontWeight: 'bold',
    color: '#555',
  },

  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
    minHeight: 50,
  },

  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#d9d9d9',
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: '#007AFF',
  },

  filterText: {
    color: '#000',
    fontWeight: 'bold',
  },

  activeFilterText: {
    color: '#fff',
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  faultId: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
  },

  title: {
    fontSize: 19,
    marginTop: 8,
    marginBottom: 8,
  },

  smallPriorityBadge: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  smallPriorityText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  backButton: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginBottom: 20,
  },

  backButtonText: {
    color: '#007AFF',
    fontSize: 20,
    fontWeight: '600',
  },

  detailHeader: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  detailTitle: {
    fontSize: 24,
    marginBottom: 20,
  },

  priorityBadge: {
    alignSelf: 'flex-start',
    padding: 14,
    borderRadius: 12,
    marginBottom: 25,
  },

  priorityText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  detailBox: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 16,
    marginBottom: 40,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 16,
  },

  detailText: {
    fontSize: 17,
    marginTop: 4,
  },
});