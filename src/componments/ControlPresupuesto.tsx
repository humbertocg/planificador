import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {formatearCantidad} from '../helpers';
import {IGasto} from '../interfaces/IGasto';
import globalStyles from '../styles';

interface IProps {
  presupuesto: number;
  gastos: IGasto[];
  handlerClearApp: () => void;
}

const ControlPresupuesto = (props: PropsWithChildren<IProps>) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGasto = props.gastos.reduce(
      (total, gasto) => total + gasto.total,
      0,
    );
    setGastado(totalGasto);
    setDisponible(props.presupuesto - totalGasto);
  }, [props.gastos, props.presupuesto]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={(gastado / props.presupuesto) * 100}
          radius={150}
          valueSuffix={'%'}
          title="Gastado"
          inActiveStrokeColor="#f5f5f5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3b82f6"
          activeStrokeWidth={20}
          titleStyle={{fontWeight: 'bold', fontSize: 20}}
          titleColor="#64748B"
        />

        <View style={styles.contenedorTextos}>
          <Pressable
            style={styles.btnClearPresupuesto}
            onPress={props.handlerClearApp}>
            <Text style={styles.btnClearPresupuestoTexto}>Reiniciar App</Text>
          </Pressable>

          <Text style={styles.valor}>
            <Text style={styles.label}>Presupuesto:</Text>{' '}
            {`${formatearCantidad(props.presupuesto)}`}
          </Text>

          <Text style={styles.valor}>
            <Text style={styles.label}>Disponible:</Text>{' '}
            {`${formatearCantidad(disponible)}`}
          </Text>

          <Text style={styles.valor}>
            <Text style={styles.label}>Gastado:</Text>{' '}
            {`${formatearCantidad(gastado)}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: 'center',
  },
  contenedorTextos: {marginTop: 50},
  valor: {fontSize: 24, textAlign: 'center', marginBottom: 10, color: '#000'},
  label: {fontWeight: '700', color: '#3B82F6'},
  btnClearPresupuesto: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  btnClearPresupuestoTexto: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default ControlPresupuesto;
