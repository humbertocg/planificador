import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IGasto} from '../interfaces/IGasto';
import GastoItem from './GastoItem';

interface IProps {
  gastos: IGasto[];
}

const ListadoGastos = (props: PropsWithChildren<IProps>) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>ListadoGastos</Text>
      {props.gastos.length > 0 ? (
        props.gastos.map(item => <GastoItem gasto={item} key={item.id} />)
      ) : (
        <Text style={styles.noGasto}>No hay gastos</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  titulo: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
  noGasto: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ListadoGastos;
