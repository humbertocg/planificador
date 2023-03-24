import AsyncStorage from '@react-native-async-storage/async-storage';

export enum LocalKeyStorage {
  presupuesto = 'presupuesto',
  gastos = 'gastos',
  filtro = 'filtro',
}

export const CacheData = {
  GuardarDato: async (localKeyStorage: string, data: string) => {
    await AsyncStorage.setItem(localKeyStorage, data);
  },
  ObtenerDato: async (localKeyStorage: string) => {
    return await AsyncStorage.getItem(localKeyStorage);
  },
  EliminarDato: async (localKeyStorage: string) => {
    await AsyncStorage.removeItem(localKeyStorage);
  },
  Limpiar: async () => {
    return await AsyncStorage.clear();
  },
};
