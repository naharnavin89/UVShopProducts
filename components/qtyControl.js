import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {styles} from '../screens/commonstyle';
export const QtyControl = ({ qty, onInc, onDec }) => {
    return(
  <View style={styles.qtyWrap}>
    <TouchableOpacity onPress={onDec} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>−</Text></TouchableOpacity>
    <Text style={styles.qty}>{qty}</Text>
    <TouchableOpacity onPress={onInc} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>＋</Text></TouchableOpacity>
  </View>
)};
