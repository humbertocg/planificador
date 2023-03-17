import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IGasto} from '../interfaces/IGasto';
import globalStyles from '../styles';

interface IProps {
  gasto: IGasto;
}

const GastoItem = (props: PropsWithChildren<IProps>) => {
  return (
    <View style={styles.contenedor}>
      <View style={styles.info}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.dato}>{props.gasto.nombre}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Categoria:</Text>
        <Text style={styles.dato}>{props.gasto.tipo}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.dato}>{props.gasto.total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.card,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {fontWeight: 'bold', fontSize: 16, color: '#000'},
  dato: {fontWeight: '400', fontSize: 14, color: '#000'},
});

export default GastoItem;
