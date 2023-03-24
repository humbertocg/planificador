import React, {PropsWithChildren, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyles from '../styles';
import {tipoGasto} from '../Enums/TipoGastoEnum';

interface IProps {
  filtro: string;
  onChangeTipoGasto: (tipoGasto: string) => void;
}

const Filtro = (props: PropsWithChildren<IProps>) => {
  const [tipoGastoSelected, setTipoGastoSelected] = useState('');

  useEffect(() => {
    setTipoGastoSelected(props.filtro);
  }, [props.filtro]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtrar gastos</Text>
      <Picker
        style={styles.pickerStyle}
        selectedValue={tipoGastoSelected}
        onValueChange={(itemValue, itemIndex) => {
          setTipoGastoSelected(itemValue);
          props.onChangeTipoGasto(itemValue);
        }}>
        <Picker.Item label="-- Seleccione --" value="" />
        {tipoGasto.map((item, index) => {
          return (
            <Picker.Item label={item.label} value={item.value} key={index} />
          );
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.card,
  },
  label: {
    fontSize: 22,
    fontWeight: '900',
    color: '#64748B',
  },
  pickerStyle: {
    color: '#000',
  },
});

export default Filtro;
