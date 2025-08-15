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
import {useStore} from '../stores/useStore';
import { styles } from './commonstyle';
import { Header } from '../components/header';
const ProductScreen = ({ route, navigation }) => {

  const { id } = route.params;
  const product = useStore((s) => s.products.find((p) => p.id === id));
  const addToCart = useStore((s) => s.addToCart);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const favorites = useStore((s) => s.favorites);
const formatINR = (num) => `₹${Number(num).toLocaleString('en-IN')}`;
const ratingStars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);

  if (!product) {
    return (
      <SafeAreaView style={styles.screen}><Text style={{ padding: 16 }}>Product not found.</Text></SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={product.name}
        left={<TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.topIcon}>←</Text></TouchableOpacity>}
        right={<TouchableOpacity onPress={() => toggleFavorite(product.id)}><Text style={styles.topIcon}>{favorites[product.id] ? '❤️' : '🤍'}</Text></TouchableOpacity>}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Image source={{ uri: product.image }} style={styles.detailImage} />
        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
          <Text style={styles.detailTitle}>{product.name}</Text>
          <Text style={styles.muted}>{product.category} • {ratingStars(product.rating)}</Text>
          <Text style={[styles.price, { fontSize: 22, marginTop: 4 }]}>{formatINR(product.price)}</Text>
          <Text style={{ marginTop: 12, lineHeight: 20 }}>{product.description}</Text>

          {product.sizes?.length ? (
            <View style={{ marginTop: 16 }}>
              <Text style={styles.sectionLabel}>Select Size</Text>
              <View style={styles.rowWrap}>
                {product.sizes.map((s) => (
                  <TouchableOpacity key={s} onPress={() => setSelectedSize(s)} style={[styles.selector, selectedSize === s && styles.selectorActive]}>
                    <Text style={[styles.selectorText, selectedSize === s && styles.selectorTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : null}

          {product.colors?.length ? (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.sectionLabel}>Select Color</Text>
              <View style={styles.rowWrap}>
                {product.colors.map((c) => (
                  <TouchableOpacity key={c} onPress={() => setSelectedColor(c)} style={[styles.selector, selectedColor === c && styles.selectorActive]}>
                    <Text style={[styles.selectorText, selectedColor === c && styles.selectorTextActive]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.ctaBtn, { marginTop: 24 }]}
            onPress={() => {
              addToCart(product.id, { selectedSize, selectedColor });
            }}
          >
            <Text style={styles.ctaBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProductScreen;
