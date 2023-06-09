import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {CacheData, LocalKeyStorage} from './src/Cache';
import ControlPresupuesto from './src/componments/ControlPresupuesto';
import Filtro from './src/componments/Filtro';
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
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState<IGasto[]>([]);

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

  const onEditGasto = (gasto: IGasto) => {
    setGastoEditar(gasto);
    setAgregarOEditarGastoModal(true);
  };

  const onDeleteGasto = (id: string) => {
    const gastosFiltrado = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosFiltrado);
  };

  const onChangeTipoGasto = (tipoGasto: string) => {
    setFiltro(tipoGasto);
  };

  const handlerClearApp = () => {
    Alert.alert(
      'Reiniciar presupuesto',
      'Se perderan los gastos y el presupuesto ¿desea continuar?',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Si, reiniciar',
          onPress: () => {
            const clearApp = async () => {
              await CacheData.Limpiar();
              setPresupuesto(0);
              setGastos([]);
              setGastosFiltrados([]);
              setGastoEditar(undefined);
              setFiltro('');
            };
            clearApp();
          },
        },
      ],
    );
  };

  useEffect(() => {
    const obtenerPresupuesto = async () => {
      const presupuestoStorage = await CacheData.ObtenerDato(
        LocalKeyStorage.presupuesto,
      );
      if (presupuestoStorage !== null) {
        setPresupuesto(Number(presupuestoStorage));
      }
    };
    obtenerPresupuesto();
  }, []);

  useEffect(() => {
    const obtenerGastos = async () => {
      const gastosStorage = await CacheData.ObtenerDato(LocalKeyStorage.gastos);
      if (gastosStorage !== null) {
        try {
          setGastos(JSON.parse(gastosStorage));
        } catch (err) {}
      }
    };
    obtenerGastos();
  }, []);

  useEffect(() => {
    const obtenerFiltro = async () => {
      const filtroStorage = await CacheData.ObtenerDato(LocalKeyStorage.filtro);
      if (filtroStorage !== null) {
        setFiltro(filtroStorage);
      }
    };
    obtenerFiltro();
  }, []);

  useEffect(() => {
    let gastosFiltrado = gastos;
    if (filtro !== '') {
      gastosFiltrado = gastos.filter(gasto => gasto.tipo === filtro);
    }
    setGastosFiltrados(gastosFiltrado);
  }, [filtro, gastos]);

  useEffect(() => {
    if (presupuesto > 0) {
      const guardarPresupuesto = async () => {
        await CacheData.GuardarDato(
          LocalKeyStorage.presupuesto,
          presupuesto.toString(),
        );
      };
      guardarPresupuesto();
    }
  }, [presupuesto]);

  useEffect(() => {
    const guardarFiltro = async () => {
      await CacheData.GuardarDato(LocalKeyStorage.filtro, filtro);
    };
    guardarFiltro();
  }, [filtro]);

  useEffect(() => {
    const guardarGastos = async () => {
      await CacheData.GuardarDato(
        LocalKeyStorage.gastos,
        JSON.stringify(gastos),
      );
    };
    guardarGastos();
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />

          {presupuesto === 0 ? (
            <NuevoPresupuesto savePresupuesto={savePresupuesto} />
          ) : (
            <ControlPresupuesto
              presupuesto={presupuesto}
              gastos={gastos}
              handlerClearApp={handlerClearApp}
            />
          )}
        </View>
        {presupuesto > 0 ? (
          <View style={styles.contenedorListado}>
            <Filtro filtro={filtro} onChangeTipoGasto={onChangeTipoGasto} />
            <ListadoGastos
              gastos={gastosFiltrados}
              onEditGasto={onEditGasto}
              onDeleteGasto={onDeleteGasto}
            />
          </View>
        ) : (
          /**
           * hack for transform in android,if there is the only component with traslateY to be able to render the complete component
           */
          <View style={styles.nuevoPresupuestoViewShadow}></View>
        )}

        {/*<View style={styles.containerScroll}></View>*/}
      </ScrollView>

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
  nuevoPresupuestoViewShadow: {height: 50},
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
    height: 45,
    width: 45,
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  agregarGastoImg: {
    height: 45,
    width: 45,
  },
});

export default App;
