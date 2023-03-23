import React, {PropsWithChildren, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  GestureResponderEvent,
  Alert,
} from 'react-native';
import globalStyles from '../styles';

interface IProps {
  savePresupuesto: (monto: number) => void;
}

const NuevoPresupuesto = (props: PropsWithChildren<IProps>) => {
  const [presupuesto, setPresupuesto] = useState<string>('');

  const onPressPresupuesto = (event: GestureResponderEvent) => {
    const presu = Number(presupuesto);
    if (presu > 0) {
      props.savePresupuesto(presu);
    } else if (isNaN(presu)) {
      Alert.alert('Error', 'El valor debe ser un numero', [{text: 'Cerrar'}]);
    } else {
      Alert.alert('Error', 'El valor debe ser un numero positivo', [
        {text: 'Cerrar'},
      ]);
    }
  };
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir nuevo presupuesto</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#ACADA8"
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto"
        value={presupuesto}
        onChangeText={value => {
          setPresupuesto(value);
        }}
      />
      <Pressable style={styles.btnAgregar} onPress={onPressPresupuesto}>
        <Text style={styles.btnTextoAgregar}>Agregar presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3b82f6',
  },
  input: {
    marginTop: 30,
    backgroundColor: '#F5F5f5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  btnAgregar: {
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: 'orange',
    padding: 10,
  },
  btnTextoAgregar: {
    color: '#FFF',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default NuevoPresupuesto;
