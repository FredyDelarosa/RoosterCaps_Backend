import { SizeRepository } from "../repository/sizeRepository";
export class SizeService{
    public static async createSize(descripcion:string,created_by:string){
        try {
            
            return await SizeRepository.createSize(descripcion,created_by);
        } catch (error:any) {
            throw new Error(`Error al crear talla: ${error.message}`);
        }
    }
    public static async updateSize(id:string,descripcion:string,updated_by:string){
        try {
            return await SizeRepository.updateSize(id,descripcion,updated_by);

        } catch (error:any) {
            throw new Error(`Error al modificar talla: ${error.message}`)
        }
    }

    public static async getAllSize(){
        try {
            return await SizeRepository.getAllSize();

        } catch (error:any) {
            throw new Error(`Error al obtener las tallas: ${error.message}`);
        }
    }
    public static async getAllSizeActivate(id:string){
        try {
            return await SizeRepository.getAllSizeActive(id);

        } catch (error:any) {
            throw new Error(`Error al obtener las tallas: ${error.message}`);
        }
    }
    public static async deleteSize(id:string){
        try {
            return await SizeRepository.deleteSize(id);

        } catch (error:any) {
            throw new Error(`Error al eliminar cap: ${error.message}`);
        }
    }

    public static async deleteSizePermant(id:string){
        try {
            return await SizeRepository.deleteSizePermant(id);

        } catch (error:any) {
            throw new Error(`Error al eliminar cap: ${error.message}`);
        }
    }
}