import React, {PropsWithChildren, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  GestureResponderEvent,
} from 'react-native';

interface IProps {
  savePresupuesto: (monto: number) => void;
}

const NuevoPresupuesto = (props: PropsWithChildren<IProps>) => {
  const [presupuesto, setPresupuesto] = useState<string>('');

  const onPressPresupuesto = (event: GestureResponderEvent) => {
    try {
      const presu = Number(presupuesto);
      props.savePresupuesto(presu);
    } catch (ex) {}
  };
  return (
    <View style={styles.contenedor}>
      <Text>Definir nuevo presupuesto</Text>
      <TextInput
        value={presupuesto}
        onChangeText={value => {
          setPresupuesto(value);
        }}
      />
      <Pressable onPress={onPressPresupuesto}>
        <Text>Agregar presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{translateY: 50}],
  },
});

export default NuevoPresupuesto;
