import { EstadisticasRankingCategoriaAdmin } from "./estadisticasRankingCategoriaAdmin";
import { EstadisticasRankingPlatoAdmin } from "./estadisticasRankingPlatoAdmin";

export class EstadisticasAdmin{

    constructor() {}

    cantidadVentas:number = 0;
    pedidosPendiente:number = 0;
    pedidosCancelados:number = 0;
    totalPedido:number = 0;
    totalVentaNeto:number = 0;
    ventaPromedio:number = 0;
    margenPorcentual:number = 0;
    margenTotal:number = 0;
    pagoVisa:number = 0;
    pagosMasterCard:number = 0;
    pagosEfectivos:number = 0;
    pagosOtros:number = 0;

    rankingPlato:EstadisticasRankingPlatoAdmin[] = [];
    rankingCategoria:EstadisticasRankingCategoriaAdmin[] = [];
}