import {
  View,
  Text,
} from 'react-native';
import {styles} from '../screens/commonstyle'; // Assuming you have a common style file
export const Row = ({ label, value, bold }) => {
    return(
  <View style={styles.rowBetween}>
    <Text style={[styles.rowText, bold && { fontWeight: '700', fontSize: 16 }]}>{label}</Text>
    <Text style={[styles.rowText, bold && { fontWeight: '700', fontSize: 16 }]}>{value}</Text>
  </View>
)};
