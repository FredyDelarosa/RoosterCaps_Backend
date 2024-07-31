import { query } from "../../database/mysql";
import { Inventary } from "../models/inventary";

export class InventaryRepository {
  public static async createInventary(
    cantidad: number,
    gorra_id: number,
    talla_id: number,
    created_by: string
  ): Promise<Inventary | any> {
    try {
      const sql =
        "INSERT INTO Inventary (cantidad, gorra_id, talla_id, created_by, updated_by) VALUES (?, ?, ?, ?, ?)";
      const params = [cantidad, gorra_id, talla_id, created_by, created_by];

      const [result]: any = await query(sql, params);

      if (!result.insertId) {
        throw new Error("Failed to create Inventary, no insertId returned");
      }

      // Obtén el ID del Inventary creado
      const createdInventaryId = result.insertId;

      // Construye la entidad Inventary completa
      const newInventary: Inventary = {
        id: createdInventaryId,
        cantidad: cantidad,
        gorra_id: gorra_id,
        talla_id: talla_id,
        created_at: new Date().toISOString(),
        created_by: created_by,
        updated_at: new Date().toISOString(),
        updated_by: created_by,
        deleted: false,
      };

      return newInventary;
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  }

  public static async updateInventary(
    name: number,
    cantidad: number,
    updated_by: string,
    talla_id: string
  ): Promise<Inventary | string | any> {
    try {
      const sql = `UPDATE Inventary SET cantidad = ?, updated_by = ?
      WHERE gorra_id = ? AND talla_id = ?`;
      const params = [cantidad, updated_by, name, talla_id];
      const [result]: any = await query(sql, params);

      if (result.affectedRows === 0) {
        throw new Error("Inventary not found or no change in data");
      }

      // Retorna un mensaje de éxito junto con el ID actualizado
      return { message: `Inventary with ID ${name} updated successfully.` };
    } catch (error: any) {
      console.log(error);

      throw new Error(`${error.message}`);
    }
  }

  public static async getAllInventaries(): Promise<Inventary[]> {
    try {
      const sql = "SELECT * FROM Inventary where deleted = 0";
      const [rows]: any = await query(sql);

      if (!rows.length) {
        throw new Error("No Inventary found");
      }

      return rows as Inventary[];
    } catch (error: any) {
      throw new Error(`Error fetching Inventary: ${error.message}`);
    }
  }

  public static async getAllInventariesActive(
    id_talla: string,
    name: string
  ): Promise<Inventary[]> {
    try {
      const sql = `SELECT Inventary.cantidad AS cantidad, Inventary.talla_id AS talla FROM Inventary
      JOIN caps ON Inventary.gorra_id = caps.id WHERE Inventary.talla_id = ? AND caps.name = ?`;
      const [rows]: any = await query(sql, [Number(id_talla), name]);

      if (!rows.length) {
        throw new Error("No Inventary found");
      }

      return rows as Inventary[];
    } catch (error: any) {
      throw new Error(`Error fetching Inventary: ${error.message}`);
    }
  }

  public static async deleteInventary(id: string): Promise<Inventary | string> {
    try {
      const sql = "UPDATE Inventary SET deleted = true WHERE id = ?";
      const params = [id];
      const [result]: any = await query(sql, params);

      if (result.affectedRows === 0) {
        throw new Error("Inventary not found or no change in data");
      }

      return `Inventary with ID ${id} marked as deleted successfully.`;
    } catch (error: any) {
      throw new Error(`Error deleting Inventary: ${error.message}`);
    }
  }

  public static async deleteInventaryPermanent(
    id: string
  ): Promise<Inventary | string> {
    try {
      const sql = "DELETE FROM Inventary WHERE id = ?";
      const params = [id];
      const [result]: any = await query(sql, params);

      // Verifica si se eliminó algún registro
      if (result.affectedRows === 0) {
        throw new Error("Inventary not found or no change in data");
      }

      // Retorna un mensaje de éxito junto con el ID eliminado
      return `Inventary with ID ${id} deleted permanently successfully.`;
    } catch (error: any) {
      throw new Error(`Error deleting Inventary: ${error.message}`);
    }
  }
  public static async getAllInventariCaps(name: string): Promise<Inventary[]> {
    try {
      const sql = `
                SELECT 
                    i.*, 
                    c.id AS cap_id, 
                    c.name AS cap_name, 
                    c.price AS cap_price
                FROM Inventary i
                JOIN caps c ON i.gorra_id = c.id
                WHERE i.deleted = false AND c.deleted = false AND c.name = ?
            `;
      const [rows]: any = await query(sql, [name]);

      // Verifica si se encontraron registros
      if (!rows.length) {
        throw new Error("No Inventary found");
      }

      // Retorna los registros como un arreglo de objetos Inventary
      return rows as Inventary[];
    } catch (error: any) {
      throw new Error(`Error fetching Inventary: ${error.message}`);
    }
  }
}
