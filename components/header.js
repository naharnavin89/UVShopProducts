  import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {styles} from '../screens/commonstyle'; // Assuming you have a common style file
  export const Header = ({ title, right, left }) => (
    <View style={styles.header}>
      <View style={{ width: 44 }}>{left}</View>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 44, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
  