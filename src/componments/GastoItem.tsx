import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {tipoGasto} from '../Enums/TipoGastoEnum';
import {formatearCantidad, formatearFecha} from '../helpers';
import {IGasto} from '../interfaces/IGasto';
import globalStyles from '../styles';

interface IProps {
  gasto: IGasto;
  onPress: (gasto: IGasto) => void;
  onDeleteItem: (id: string) => void;
}

const GastoItem = (props: PropsWithChildren<IProps>) => {
  const [imageSource, setImageSource] = useState(tipoGasto[0].imgSource);

  useEffect(() => {
    const tipoGastoObj = tipoGasto.find(
      item => item.value === props.gasto.tipo,
    );
    if (tipoGastoObj !== undefined) {
      setImageSource(tipoGastoObj.imgSource);
    }
  }, [props.gasto.tipo]);

  return (
    <Pressable
      style={styles.contenedor}
      onPress={() => {
        props.onPress(props.gasto);
      }}
      onLongPress={() => {
        Alert.alert(
          '¿Desea Eliminar este gasto?',
          'Este cambio no se puede deshacer una vez confirmado.',
          [
            {text: 'Cancelar'},
            {
              text: 'Si, elminar',
              onPress: () => {
                props.onDeleteItem(props.gasto.id);
              },
            },
          ],
        );
      }}>
      <View style={styles.contenedorImg}>
        <Image source={imageSource} style={styles.categoriaImg} />

        <View style={styles.details}>
          <View style={styles.info}>
            <Text style={styles.nombreGasto}>{props.gasto.nombre}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.categoria}>{props.gasto.tipo}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.fecha}>
              {formatearFecha(props.gasto.fecha)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.cantidad}>
          {formatearCantidad(props.gasto.total)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.card,
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contenedorImg: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoriaImg: {height: 50, width: 50},
  nombreGasto: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  details: {flex: 1, marginLeft: 10},
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {fontWeight: 'bold', fontSize: 16, color: '#000'},
  dato: {fontWeight: '400', fontSize: 14, color: '#000'},
  categoria: {
    fontWeight: '400',
    fontSize: 12,
    color: '#000',
    textTransform: 'uppercase',
  },
  cantidad: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  fecha: {
    fontWeight: '400',
    fontSize: 10,
    color: '#DB2777',
    textTransform: 'uppercase',
  },
});

export default GastoItem;
