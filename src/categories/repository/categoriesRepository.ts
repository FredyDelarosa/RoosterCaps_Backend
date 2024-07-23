import { query } from "../../database/mysql";
import { deleteCategories } from "../controllers/categoriesController";
import { Categories } from "../models/categories";

export class CategorieRepository{

    public static async createCategorie(name:string,descripcion:string,created_by:string,image:string):Promise<Categories>{
        try {
            const sql = 'INSERT INTO categories (name, descripcion, created_by, updated_by, imagen) VALUES (?, ?, ?, ?, ?)';
            const params = [name, descripcion, created_by, created_by, image];

            const [result]: any = await query(sql, params);

            // Verifica si la categoría fue creada exitosamente
            if (!result.insertId) {
                throw new Error('Failed to create categorie, no insertId returned');
            }

            // Obtén el ID de la categoría creada
            const createdCategorieId = result.insertId;

            // Construye la entidad Categories completa
            const newCategorie: Categories = {
                id: createdCategorieId,
                name: name,
                descripcion: descripcion,
                image:image,
                created_by: created_by,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                updated_by:created_by,
                deleted: false
            };

            return newCategorie;
        } catch (error: any) {
            throw new Error(`Error creating categorie: ${error.message}`);
        }
    }

    public static async updateCategorie(id:string ,name:string,descripcion:string,updated_by:string,imagen:string):Promise<Categories |string | any>{
        try {
            const sql = 'UPDATE categories SET name = ?, descripcion = ?, updated_by = ?, imagen = ? WHERE id = ?'
            const params = [name,descripcion,updated_by,imagen,id]
            const [result]:any = await query(sql,params);

            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('Customer not found or no change in data');
            }

            // Retorna un mensaje de éxito junto con el ID actualizado
            return { message: `Categorie with ID ${id} updated successfully.` };
            
        } catch (error:any) {
            throw new Error(`${error.message}`)
        }

    }
    public static async getAllCategories():Promise<Categories[]>{
        try {
            const sql = 'SELECT * FROM categories';
            const [rows]: any = await query(sql);
            
            // Verifica si se encontraron registros
            if (!rows.length) {
                throw new Error('No categories found');
            }

            // Retorna los registros como un arreglo de objetos Customer
            return rows as Categories[];
        } catch (error: any) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    }
    
    public static async getAllCategoriesActive():Promise<Categories[]>{
        try {
            const sql = 'SELECT * FROM categories WHERE deleted = false';
            const [rows]: any = await query(sql);
            
            // Verifica si se encontraron registros
            if (!rows.length) {
                throw new Error('No categories found');
            }

            // Retorna los registros como un arreglo de objetos Customer
            return rows as Categories[];
        } catch (error: any) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    }
    
    public static async deleteCategorie(id:string){
        try {
            const sql = 'UPDATE categories SET deleted = true WHERE id = ?';
            const params = [id];
            const [result]: any = await query(sql, params);

            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('Categories not found or no change in data');
            }

            // Retorna un mensaje de éxito junto con el ID actualizado
            return `Categorie with ID ${id} marked as deleted successfully.`;

        } catch (error: any) {
            throw new Error(`Error deleting Categories: ${error.message}`);
        }
    }
    public static async deleteCategoriePermant(id:string){
        try {
            const sql = 'DELETE FROM categories WHERE id = ?';
            const params = [id];
            const [result]: any = await query(sql, params);

            // Verifica si se eliminó algún registro
            if (result.affectedRows === 0) {
                throw new Error('Category not found or no records deleted');
            }

            // Retorna un mensaje de éxito junto con el ID eliminado
            return `Category with ID ${id} deleted successfully.`;

        } catch (error: any) {
            throw new Error(`Error deleting category: ${error.message}`);
        }
    }
}