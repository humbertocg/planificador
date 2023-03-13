import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from './src/componments/Header';
import NuevoPresupuesto from './src/componments/NuevoPresupuesto';

const App = () => {
  const savePresupuesto = (value: number) => {};
  return (
    <View style={styles.contenedor}>
      <View style={styles.header}>
        <Header />
        <NuevoPresupuesto savePresupuesto={savePresupuesto} />
      </View>
      <ScrollView
        style={styles.scrollViewStyle}
        contentInsetAdjustmentBehavior="automatic">
        <Text>te</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
  },
  scrollViewStyle: {marginTop: 30},
});

export default App;
