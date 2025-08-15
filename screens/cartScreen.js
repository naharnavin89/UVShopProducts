import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { styles } from './commonstyle';
import {useStore} from '../stores/useStore';
import {Header} from '../components/header'
import {Row} from '../components/row';
import {QtyControl} from '../components/qtyControl';
const CartScreen = ({ navigation }) => {
  const products = useStore((s) => s.products);
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const removeFromCart = useStore((s) => s.removeFromCart);

  const items = Object.entries(cart).map(([id, v]) => ({ product: products.find((p) => p.id === id), ...v }));
  const subtotal = items.reduce((sum, it) => sum + (it.product?.price || 0) * it.qty, 0);
  const delivery = items.length ? 49 : 0;
  const total = subtotal + delivery;
  const formatINR = (num) => `₹${Number(num).toLocaleString('en-IN')}`;

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Cart"
        left={<TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.topIcon}>←</Text></TouchableOpacity>}
        right={<View />}
      />

      <FlatList
        data={items}
        keyExtractor={(it) => it.product?.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 140 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.product.image }} style={styles.cartImage} />
            <View style={{ flex: 1, marginHorizontal: 12 }}>
              <Text style={styles.cartTitle} numberOfLines={1}>{item.product.name}</Text>
              <Text style={styles.muted}>{item.selectedColor} {item.selectedSize ? `• ${item.selectedSize}` : ''}</Text>
              <Text style={[styles.price, { marginTop: 2 }]}>{formatINR(item.product.price)}</Text>
              <QtyControl
                qty={item.qty}
                onInc={() => updateQty(item.product.id, item.qty + 1)}
                onDec={() => updateQty(item.product.id, item.qty - 1)}
              />
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
              <Text style={{ fontSize: 18 }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={items.length ? (
          <View style={styles.summary}>
            <Row label="Subtotal" value={formatINR(subtotal)} />
            <Row label="Delivery" value={delivery ? formatINR(delivery) : 'Free'} />
            <Row label="Total" value={formatINR(total)} bold />
            <TouchableOpacity style={[styles.ctaBtn, { marginTop: 12 }]} onPress={() => navigation.navigate('Checkout') }>
              <Text style={styles.ctaBtnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      />
    </SafeAreaView>
  );
};
export default CartScreen;
