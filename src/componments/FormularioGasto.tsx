import {Picker} from '@react-native-picker/picker';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TipoGasto} from '../Enums/TipoGastoEnum';
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
};

const FormularioGasto = (props: PropsWithChildren<IProps>) => {
  const [gasto, setGasto] = useState<IGasto>(initGasto);

  const handleAgregarOEditarGasto = () => {
    const isEdit = props.gasto !== undefined;
    let gastoEditado = {...gasto};
    if (!isEdit) {
      gastoEditado.id = new Date().getTime().toString();
    }
    props.agregarOEditarGasto(gastoEditado, isEdit);
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
          <Text style={styles.titulo}>Nuevo Gasto</Text>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Gasto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del gasto. ej Comida"
              value={gasto.nombre}
              onChangeText={value => setGasto({...gasto, nombre: value})}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Cantidad Gasto</Text>
            <TextInput
              style={styles.input}
              placeholder="cantidad del gasto"
              keyboardType="numeric"
              value={gasto.total === 0 ? '' : gasto.total.toString()}
              onChangeText={value => {
                const totalValue = Number(value);
                if (totalValue > 0) {
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
              selectedValue={
                gasto.tipo /*TipoGasto[gasto.tipo as keyof typeof TipoGasto]*/
              }
              onValueChange={(itemValue, itemIndex) => {
                setGasto({
                  ...gasto,
                  tipo: itemValue /*TipoGasto[itemValue as keyof typeof TipoGasto]*/,
                });
              }}>
              <Picker.Item label="-- Seleccione --" value="" />
              {
                // Object.keys(TipoGasto).map(item => {
                //   return (
                //     <Picker.Item
                //       label={TipoGasto[item as keyof typeof TipoGasto]}
                //       value={item}
                //     />
                //   );
                // })
              }
              <Picker.Item label="Ahorro" value="Ahorro" />
              <Picker.Item label="Comida" value="Comida" />
              <Picker.Item label="Gastos Varios" value="Gastos Varios" />
              <Picker.Item label="Ocio" value="Ocio" />
              <Picker.Item label="Salud" value="Salud" />
              <Picker.Item label="Subscripciones" value="Subscripciones" />
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
});

export default FormularioGasto;
