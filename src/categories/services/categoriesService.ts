import { CategorieRepository } from "../repository/categoriesRepository";


export class CategoriaService{

    public static async createCategorie(name:string){
        try {
            
            return await CategorieRepository.createCategorie(name);

        } catch (error:any) {
            throw new Error(`Error al crear categorie: ${error.message}`);
        }
    }

    public static async updateCategorie(id:string,name:string){
        try {
    
            return await CategorieRepository.updateCategorie(id,name);

        } catch (error:any) {
            throw new Error(`Error al crear categorie: ${error.message}`);
        }
    }

    public static async getAllCategories(){
        try {
            return await CategorieRepository.getAllCategories();

        } catch (error:any) {
            throw new Error(`Error al crear categorie: ${error.message}`);
        }
    }

    public static async getAllCategoriesActive(){
        try {
            return await CategorieRepository.getAllCategoriesActive();

        } catch (error:any) {
            throw new Error(`Error al crear categorie: ${error.message}`);
        }
    }

    public static async deleteCategories(id:string){
        try {
            return await CategorieRepository.deleteCategorie(id);

        } catch (error:any) {
            throw new Error(`Error al crear categorie: ${error.message}`);
        }
    }

    public static async deleteCategoriesPermant(id:string){
        try {
            return await CategorieRepository.deleteCategoriePermant(id);

        } catch (error:any) {
            throw new Error(`Error al crear categorie: ${error.message}`);
        }
    }
}