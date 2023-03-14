import {TipoGasto} from '../Enums/TipoGastoEnum';

export interface IGasto {
  id: string;
  nombre: string;
  tipo: string;
  total: number;
}
