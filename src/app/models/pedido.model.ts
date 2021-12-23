import { Pelicula } from "../services/peliculas.service";

export class Pedido{
    idCliente: string;
    fecha: Date;
    peliculas: Pelicula[];
    precio: number;
  }