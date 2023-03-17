import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ControlPresupuesto from './src/componments/ControlPresupuesto';
import FormularioGasto from './src/componments/FormularioGasto';
import Header from './src/componments/Header';
import ListadoGastos from './src/componments/ListadoGastos';
import NuevoPresupuesto from './src/componments/NuevoPresupuesto';
import {IGasto} from './src/interfaces/IGasto';

const App = () => {
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState<IGasto[]>([]);
  const [agregarOEditarGastoModal, setAgregarOEditarGastoModal] =
    useState(false);
  const [gastoEditar, setGastoEditar] = useState<IGasto>();

  const savePresupuesto = (value: number) => {
    setPresupuesto(value);
  };

  const agregarOEditarGasto = (gasto: IGasto, isEdit: boolean) => {
    if (isEdit) {
      const gastosEditados = gastos.map(item => {
        if (item.id === gasto.id) {
          return {...gasto};
        }
        return item;
      });
      setGastoEditar(undefined);
      setGastos(gastosEditados);
    } else {
      setGastos([...gastos, gasto]);
    }
    setAgregarOEditarGastoModal(false);
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />

          {presupuesto === 0 ? (
            <NuevoPresupuesto savePresupuesto={savePresupuesto} />
          ) : (
            <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} />
          )}
        </View>

        {agregarOEditarGastoModal && (
          <FormularioGasto
            isVisible={agregarOEditarGastoModal}
            gasto={gastoEditar}
            onDismissModal={() => {
              setGastoEditar(undefined);
              setAgregarOEditarGastoModal(false);
            }}
            agregarOEditarGasto={agregarOEditarGasto}
          />
        )}
        {presupuesto > 0 && (
          <View style={styles.contenedorListado}>
            <ListadoGastos gastos={gastos} />
          </View>
        )}

        {/*<View style={styles.containerScroll}></View>*/}
      </ScrollView>

      {presupuesto > 0 && (
        <Pressable
          style={styles.agregarGastoBtn}
          onPress={() => {
            setAgregarOEditarGastoModal(true);
          }}>
          <Image
            style={styles.agregarGastoImg}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
  },
  contenedorListado: {
    marginTop: 30,
  },
  scrollViewStyle: {
    marginTop: 30,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  containerScroll: {
    paddingTop: 10,
  },
  agregarGastoBtn: {
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  agregarGastoImg: {
    height: 60,
    width: 60,
  },
});

export default App;
