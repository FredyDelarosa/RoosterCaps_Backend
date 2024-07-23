export interface DetailsOrden{
    id : number;
    orden_id: number;
    gorra_id:number,
    tipo_gorra_id:number,
    talla_id : number;
    cantidad:number;
    precio_unitario:number,
    created_at: string;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;

}