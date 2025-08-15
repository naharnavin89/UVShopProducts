import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../screens/commonstyle';
export const ProductCard = ({ item, onPress, isFav, toggleFav, addToCart }) => {
    const formatINR = (num) => `₹${Number(num).toLocaleString('en-IN')}`;
const ratingStars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
    return(
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <TouchableOpacity style={styles.heart} onPress={toggleFav}>
      <Text style={{ fontSize: 18 }}>{isFav ? '❤️' : '🤍'}</Text>
    </TouchableOpacity>
    <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
    <Text style={styles.muted}>{item.category} • {ratingStars(item.rating)}</Text>
    <View style={styles.cardFooter}>
      <Text style={styles.price}>{formatINR(item.price)}</Text>
      <TouchableOpacity style={styles.addBtn} onPress={addToCart}>
        <Text style={styles.addBtnText}>Add</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
    )};
