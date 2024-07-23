import { CartRepository } from "../repository/cartRepository";

export class CartService{

    public static async addCartDetail(cliente_id:number, gorra_id: number, tipo_gorra_id: number, talla_id: number, cantidad: number){
        try {
            
            const carrito_id = await CartRepository.getOrCreateShoppingCart(cliente_id)
            // Verificar que carrito_id no sea null
            if (!carrito_id) {
            throw new Error('Failed to get or create shopping cart');
            }
            
            const status_apartado = "Pendiente";
            return await CartRepository.addCartDetail(carrito_id,gorra_id,tipo_gorra_id,talla_id,cantidad,status_apartado);

        } catch (error:any) {
            throw new Error(`Error al crear detalle del carrito: ${error.message}`);
        }
    }
    public static async deleteCartDetail(id:string){
        try {
            return await CartRepository.deleteCartDetail(id);

        } catch (error:any) {
            throw new Error(`Error al eliminar cart detail: ${error.message}`);
        }
    }
    public static async getAllCartDetails(){
        try {
            return await CartRepository.getAllCartDetails();

        } catch (error:any) {
            throw new Error(`Error al optener cart details: ${error.message}`);
        }
    }
}