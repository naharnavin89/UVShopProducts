import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { styles } from './commonstyle';
import {useStore} from '../stores/useStore';
import {Header} from '../components/header';
import {CategoryChips} from '../components/categoryChips';
import {ProductCard} from '../components/productCards'; // Assuming you have a ProductCard component
 const HomeScreen = ({navigation}) => {
      const products = useStore((s) => s.products);
  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const addToCart = useStore((s) => s.addToCart);
  const {fetchProducts} = useStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Popular'); // Popular | Price: Low to High | Price: High to Low

  // useEffect(() => {
  //  fetchProducts();
  // }, [fetchProducts])
  const filtered = useMemo(() => {
    let list = products;
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'Popular') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, query, category, sort]);

  console.log('addToCart//',addToCart)
  return (
    <>
      <Header
        title="Shop"
        left={<TouchableOpacity onPress={() => navigation.navigate('Favorites')}><Text style={styles.topIcon}>❤</Text></TouchableOpacity>}
        right={<TouchableOpacity onPress={() => navigation.navigate('Cart')}><Text style={styles.topIcon}>🛒</Text></TouchableOpacity>}
      />

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search clothes, categories…"
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
        <TouchableOpacity
          onPress={() => setSort((s) => (s === 'Popular' ? 'Price: Low to High' : s === 'Price: Low to High' ? 'Price: High to Low' : 'Popular'))}
          style={styles.sortBtn}
        >
          <Text style={styles.sortText}>{sort}</Text>
        </TouchableOpacity>
      </View>

   <CategoryChips value={category} onChange={setCategory} />

   <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 12 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('Product', { id: item.id })}
            isFav={!!favorites[item.id]}
            toggleFav={() => toggleFavorite(item.id)}
            addToCart={() => addToCart(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
      </>
  );
};
export default HomeScreen;
