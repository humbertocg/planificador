import React, {PropsWithChildren} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';

interface IProps {}

const Header = (props: PropsWithChildren<IProps>) => {
  return (
    <View>
      <SafeAreaView>
        <Text style={styles.texto}>Planificador de Gastos</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Header;
