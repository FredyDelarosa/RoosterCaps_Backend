import { CapsRepository } from "../repository/capsRepository";

export class CapsService {
  public static async createCaps(
    categoria_id: number,
    name: string,
    price: number,
    created_by: string,
    imagen: string,
    talla: number,
    tipo:string,
    descripcion:string
  ) {
    try {
      return await CapsRepository.createCaps(
        categoria_id,
        name,
        price,
        created_by,
        imagen,
        talla,
        tipo,
        descripcion
      );
    } catch (error: any) {
      throw new Error(`Error al crear categorie: ${error.message}`);
    }
  }
  public static async updateCaps(
    name2: string,
    name: string,
    price: number,
    updated_by: string,
    imagen: string,
    descripcion:string,
    tipo:string,
    talla:number,
    categoria_id:number
  ) {
    try {
      return await CapsRepository.updateCap(
        name2,
        name,
        price,
        updated_by,
        imagen,
        descripcion,
        tipo,
        talla,
        categoria_id
      );
    } catch (error: any) {
      throw new Error(`Error al actualizar categorie: ${error.message}`);
    }
  }
  public static async getAllCaps() {
    try {
      return await CapsRepository.getAllCaps();
    } catch (error: any) {
      throw new Error(`Error al optener caps: ${error.message}`);
    }
  }
  public static async getAllCapsActivate() {
    try {
      return await CapsRepository.getAllCapsActive();
    } catch (error: any) {
      throw new Error(`Error al optener caps: ${error.message}`);
    }
  }
  public static async getByIdCap(id: string) {
    try {
      return await CapsRepository.getByIdCap(id);
    } catch (error: any) {
      throw new Error(`Error al optener cap: ${error.message}`);
    }
  }
  public static async getCapsByCategorieId(id: string) {
    try {
      return await CapsRepository.getCapsByCategorieId(id);
    } catch (error: any) {
      throw new Error(`Error al optener cap: ${error.message}`);
    }
  }

  public static async deleteCap(name: string) {
    try {
      return await CapsRepository.deleteCap(name);
    } catch (error: any) {
      throw new Error(`Error al eliminar cap: ${error.message}`);
    }
  }

  public static async deleteCapPermant(id: string) {
    try {
      return await CapsRepository.deleteCapPermant(id);
    } catch (error: any) {
      throw new Error(`Error al eliminar cap: ${error.message}`);
    }
  }
  public static async getInfoAllCap(id: string) {
    try {
      return await CapsRepository.getInfoAllCap(id);
    } catch (error: any) {
      throw new Error(
        `Error al obtener la toda la informacion de la gorra: ${error.message}`
      );
    }
  }
}
