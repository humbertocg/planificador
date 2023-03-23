import {Picker} from '@react-native-picker/picker';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {tipoGasto} from '../Enums/TipoGastoEnum';
import {IGasto} from '../interfaces/IGasto';
import globalStyles from '../styles';

interface IProps {
  isVisible: boolean;
  gasto?: IGasto;
  onDismissModal: () => void;
  agregarOEditarGasto: (gasto: IGasto, isEdit: boolean) => void;
}
const initGasto: IGasto = {
  id: '',
  nombre: '',
  tipo: '',
  total: 0,
  fecha: new Date(),
};

const FormularioGasto = (props: PropsWithChildren<IProps>) => {
  const [gasto, setGasto] = useState<IGasto>(initGasto);

  const handleAgregarOEditarGasto = () => {
    const {nombre, tipo, total} = gasto;
    const valuesEmpty = Object.values({
      nombre,
      tipo,
    }).includes('');

    if (!valuesEmpty && total > 0) {
      const isEdit = props.gasto !== undefined;
      const gastoEditado = {
        ...gasto,
        id: isEdit ? gasto.id : new Date().getTime().toString(),
        fecha: new Date(),
      };
      props.agregarOEditarGasto(gastoEditado, isEdit);
    } else {
      Alert.alert('Error', 'Todos los campos son obligatorios', [
        {text: 'Cerrar'},
      ]);
    }
  };

  useEffect(() => {
    if (props.gasto !== undefined) {
      setGasto(props.gasto);
    } else {
      setGasto(initGasto);
    }
  }, [props.gasto]);

  return (
    <Modal animationType="slide" visible={props.isVisible}>
      <SafeAreaView style={styles.contenedor}>
        <View>
          <Pressable
            style={styles.CancelarBtn}
            onPress={() => {
              props.onDismissModal();
            }}>
            <Text style={styles.CancelarTextoBtn}>cerrar modal</Text>
          </Pressable>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.titulo}>
            {props.gasto !== undefined ? 'Editar' : 'Nuevo'} {''}Gasto
          </Text>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Gasto</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#ACADA8"
              placeholder="Nombre del gasto. ej Comida"
              value={gasto.nombre}
              onChangeText={value => setGasto({...gasto, nombre: value})}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Cantidad Gasto</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#ACADA8"
              placeholder="cantidad del gasto"
              keyboardType="numeric"
              value={gasto.total === 0 ? '' : gasto.total.toString()}
              onChangeText={value => {
                const totalValue = Number(value);
                if (totalValue >= 0) {
                  setGasto({...gasto, total: totalValue});
                } else if (isNaN(totalValue)) {
                  setGasto({...gasto, total: 0});
                }
              }}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Categoria Gasto</Text>
            <Picker
              style={styles.pickerStyle}
              selectedValue={gasto.tipo}
              onValueChange={(itemValue, itemIndex) => {
                setGasto({
                  ...gasto,
                  tipo: itemValue,
                });
              }}>
              <Picker.Item label="-- Seleccione --" value="" />
              {tipoGasto.map((item, index) => {
                return (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={index}
                  />
                );
              })}
            </Picker>
          </View>

          <Pressable
            style={
              props.gasto !== undefined
                ? styles.submitEditarBtn
                : styles.submitBtn
            }
            onPress={handleAgregarOEditarGasto}>
            <Text style={styles.submitBtnTexto}>
              {props.gasto !== undefined ? 'Editar' : 'Agregar'} {''} Gasto
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  formulario: {...globalStyles.contenedor},
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748B',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5f5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    color: '#000',
  },
  submitBtn: {
    backgroundColor: '#3b82f6',
    padding: 10,
    marginTop: 20,
  },
  submitBtnTexto: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  submitEditarBtn: {
    backgroundColor: 'orange',
    padding: 10,
    marginTop: 20,
  },
  CancelarBtn: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  CancelarTextoBtn: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
  pickerStyle: {
    color: '#000',
  },
});

export default FormularioGasto;
