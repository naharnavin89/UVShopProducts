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
import {Header} from '../components/header';
import {ProductCard} from '../components/productCards'; // Assuming you have a ProductCard component
import { styles } from './commonstyle';
const FavoritesScreen = ({ navigation }) => {
    console.log('navigation', navigation);
  const favorites = useStore((s) => s.favorites);
  const products = useStore((s) => s.products);
  const addToCart = useStore((s) => s.addToCart);
  const toggleFavorite = useStore((s) => s.toggleFavorite);

  const favList = products.filter((p) => favorites[p.id]);

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Favorites"
        left={<TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.topIcon}>←</Text></TouchableOpacity>}
        right={<View />}
      />
      <FlatList
        data={favList}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 12 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>No favorites yet.</Text>}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('Product', { id: item.id })}
            isFav={true}
            toggleFav={() => toggleFavorite(item.id)}
            addToCart={() => addToCart(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};
export default FavoritesScreen;
