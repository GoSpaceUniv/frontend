import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
  width?: number; // px, default 390 (iPhone 14)
  backgroundColor?: string;
}

const MobileViewport: React.FC<Props> = ({ children, width = 390, backgroundColor = '#f5f5f5' }) => {
  return (
    <View style={[styles.page, { backgroundColor }]}> 
      <View style={[styles.phone, { width }]}> 
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  phone: {
    flex: 1,
    maxWidth: 420,
    width: 390,
    backgroundColor: '#fff',
    minHeight: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
});

export default MobileViewport;
