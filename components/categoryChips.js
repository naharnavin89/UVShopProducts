import React from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {styles} from '../screens/commonstyle';

export const CategoryChips = ({ value, onChange }) => {
    const CATEGORIES = [
  'All',
  'T-Shirts',
  'Jeans',
  'Shoes',
  'Jackets',
  'Accessories',
];
    return(
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
    {CATEGORIES.map((c) => (
      <TouchableOpacity
        key={c}
        onPress={() => onChange(c)}
        style={[styles.chip, value === c && styles.chipActive]}
      >
        <Text style={[styles.chipText, value === c && styles.chipTextActive]}>{c}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
)
};
