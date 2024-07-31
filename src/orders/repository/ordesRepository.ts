import { query } from "../../database/mysql";
import { Order } from "../models/order";
import { DetailsOrden } from "../models/detailsOrder";
import { CartDetails } from "../../cart/models/cartDetails";

export class OrdersRepository {
  public static async createOrder(
    cliente_id: number,
    id_gorra: number,
    cantidad: number,
    total: number,
    created_by: string
  ): Promise<Order | any> {
    try {
      // 6. Insertar una nueva orden en la tabla Orders
      const orderSql =
        "INSERT INTO Orders (cliente_id, id_gorra, status,cantidad, total, created_by, updated_by) VALUES (?, ?, ?, ?, ?,?,?)";
      const [orderResult]: any = await query(orderSql, [
        cliente_id,
        id_gorra,
        "Pendiente",
        cantidad,
        total,
        created_by,
        created_by,
      ]);
      if (!orderResult.insertId) {
        throw new Error("Failed to create order, no insertId returned");
      }

      const order_id = orderResult.insertId;
      /*
            // 1. Buscar el carrito de compras del cliente
            const cartSql = 'SELECT id FROM ShoppingCart WHERE cliente_id = ?';
            const [cartRows]: any = await query(cartSql, [cliente_id]);
            if (cartRows.length === 0) {
                throw new Error('No shopping cart found for this customer');
            }
            const carrito_id = cartRows[0].id;

            // 2. Obtener los detalles del carrito con el status 'Pendiente'
            const cartDetailsSql = 'SELECT * FROM CartDetails WHERE carrito_id = ? AND status_apartado = "Pendiente"';
            const [cartDetailsRows]: any = await query(cartDetailsSql, [carrito_id]);
            if (cartDetailsRows.length === 0) {
                throw new Error('No pending cart details found for this shopping cart');
            }

            // 3. Agrupar las cantidades por gorra_id y talla_id
            const groupedDetails: { [key: string]: number } = {};
            for (const detail of cartDetailsRows) {
                const key = `${detail.gorra_id}-${detail.talla_id}`;
                if (!groupedDetails[key]) {
                    groupedDetails[key] = 0;
                }
                groupedDetails[key] += detail.cantidad;
            }

            // 4. Verificar la cantidad disponible en el inventario
            for (const key in groupedDetails) {
                const [gorra_id, talla_id] = key.split('-').map(Number);
                const inventorySql = 'SELECT cantidad FROM Inventary WHERE gorra_id = ? AND talla_id = ?';
                const [inventoryRows]: any = await query(inventorySql, [gorra_id, talla_id]);
                if (inventoryRows.length === 0) {
                    throw new Error(`No inventory found for gorra_id ${gorra_id} and talla_id ${talla_id}`);
                }
                const availableQuantity = inventoryRows[0].cantidad;
                if (groupedDetails[key] > availableQuantity) {
                    throw new Error(`Insufficient stock for gorra_id ${gorra_id} and talla_id ${talla_id}. Requested: ${groupedDetails[key]}, Available: ${availableQuantity}`);
                }
            }

            // 5. Calcular el total
            let total = 0;
            const cartDetails: CartDetails[] = cartDetailsRows;

            

            // 7. Preparar los valores para insertar en DetailsOrden
            const detailsOrdenValues = [];
            for (const detail of cartDetails) {
                const capSql = 'SELECT price FROM caps WHERE id = ?';
                const [capRows]: any = await query(capSql, [detail.gorra_id]);
                if (capRows.length === 0) {
                    throw new Error(`Cap not found for id ${detail.gorra_id}`);
                }
                const price = capRows[0].price;
                total += detail.cantidad * price;

                detailsOrdenValues.push([
                    order_id,
                    detail.gorra_id,
                    detail.tipo_gorra_id,
                    detail.talla_id,
                    detail.cantidad,
                    price, // Precio unitario
                    created_by,
                    created_by
                ]);

                // 8. Disminuir el stock en la tabla Inventary
                const updateInventorySql = 'UPDATE Inventary SET cantidad = cantidad - ? WHERE gorra_id = ? AND talla_id = ?';
                await query(updateInventorySql, [detail.cantidad, detail.gorra_id, detail.talla_id]);
            }

            // 9. Actualizar el total en la orden creada
            const updateOrderSql = 'UPDATE Orders SET total = ? WHERE id = ?';
            await query(updateOrderSql, [total, order_id]);

            // 10. Insertar los detalles de la orden en la tabla DetailsOrden
            const detailsOrdenSql = 'INSERT INTO DetailsOrden (orden_id, gorra_id, tipo_gorra_id, talla_id, cantidad, precio_unitario, created_by, updated_by) VALUES ?';
            const flattenedValues = detailsOrdenValues.reduce((acc, val) => acc.concat(val), []);
            const placeholders = detailsOrdenValues.map(() => '(?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
            const fullSql = `INSERT INTO DetailsOrden (orden_id, gorra_id, tipo_gorra_id, talla_id, cantidad, precio_unitario, created_by, updated_by) VALUES ${placeholders}`;
            await query(fullSql, flattenedValues);

            // 11. Actualizar el status_apartado a "Hecho" en CartDetails
            const updateCartDetailsSql = 'UPDATE CartDetails SET status_apartado = "Hecho" WHERE carrito_id = ? AND status_apartado = "Pendiente"';
            await query(updateCartDetailsSql, [carrito_id]);

            const newOrder: Order = {
                id: order_id,
                cliente_id: cliente_id,
                status: 'Pendiente',
                date: new Date(),
                total: total,
                created_by: created_by,
                updated_at: new Date().toISOString(),
                updated_by: created_by,
                deleted: false
            };
            */

      return order_id;
    } catch (error: any) {
        console.error(error);
        
      throw new Error(`Error creating order: ${error.message}`);
    }
  }

  public static async getAllPendingOrdersWithCustomer(id:number): Promise<any[]> {
    try {
      // 1. Obtener todas las órdenes con estatus "Pendiente"
      const ordersSql =
        'SELECT * FROM Orders WHERE cliente_id = ?';
      const [ordersRows]: any = await query(ordersSql,[id]);
      if (ordersRows.length === 0) {
        throw new Error("No pending orders found");
      }
       /* 
      // 2. Preparar la consulta para obtener la información del cliente
      const pendingOrdersWithCustomer = await Promise.all(
        ordersRows.map(async (order: Order) => {
          const customerSql =
            "SELECT id, name FROM Customer WHERE id = ? AND deleted = false";
          const [customerRows]: any = await query(customerSql, [
            order.cliente_id,
          ]);
          if (customerRows.length === 0) {
            throw new Error(`No customer found for id ${order.cliente_id}`);
          }
          const customer = customerRows[0];
          return {
            order,
            customer,
          };
        })
      );
  */
      return ordersRows;
    } catch (error: any) {
      throw new Error(
        `Error fetching pending orders with customer: ${error.message}`
      );
    }
  }

  public static async updateOrderDate(
    id: string,
    newDate: Date
  ): Promise<string> {
    try {
      const sql = "UPDATE Orders SET date = ? WHERE id = ?";
      const params = [newDate, id];
      const [result]: any = await query(sql, params);

      // Verifica si se actualizó algún registro
      if (result.affectedRows === 0) {
        throw new Error("Order not found or no change in data");
      }

      // Retorna un mensaje de éxito junto con el ID actualizado
      return `Order with ID ${id} updated with new date ${newDate} successfully.`;
    } catch (error: any) {
      throw new Error(`Error updating order date: ${error.message}`);
    }
  }

  public static async updateOrderStatus(
    id: string,
    newStatus: string
  ): Promise<string> {
    try {
      // Verificar que el nuevo estado sea válido
      const validStatuses = ["Completado", "Cancelado"];
      if (!validStatuses.includes(newStatus)) {
        throw new Error(
          'Invalid status. Allowed values are "Completado" or "Cancelado"'
        );
      }

      const sql = "UPDATE Orders SET status = ? WHERE id = ?";
      const params = [newStatus, id];
      const [result]: any = await query(sql, params);

      // Verifica si se actualizó algún registro
      if (result.affectedRows === 0) {
        throw new Error("Order not found or no change in data");
      }

      // Retorna un mensaje de éxito junto con el ID actualizado
      return `Order with ID ${id} updated with new status ${newStatus} successfully.`;
    } catch (error: any) {
      throw new Error(`Error updating order status: ${error.message}`);
    }
  }

  public static async getAllOrdersAsignedDate(): Promise<any[]> {
    try {
      // 1. Obtener todas las órdenes donde el campo de fecha no esté vacío
      const ordersSql =
        "SELECT * FROM Orders WHERE date IS NULL AND status = 'Pendiente'";
      const [ordersRows]: any = await query(ordersSql);
      if (ordersRows.length === 0) {
        throw new Error("No orders found with a date");
      }

      // 2. Preparar la consulta para obtener la información del cliente
      const ordersWithCustomer = await Promise.all(
        ordersRows.map(async (order: Order) => {
          const customerSql =
            "SELECT id, name FROM Customer WHERE id = ? AND deleted = false";
          const [customerRows]: any = await query(customerSql, [
            order.cliente_id,
          ]);
          if (customerRows.length === 0) {
            throw new Error(`No customer found for id ${order.cliente_id}`);
          }
          const customer = customerRows[0];
          return {
            order
          };
        })
      );

      return ordersWithCustomer;
    } catch (error: any) {
      throw new Error(
        `Error fetching orders with date and customer: ${error.message}`
      );
    }
  }
  public static async getAllCompletedOrCancelledOrdersWithCustomer(): Promise<
    any[]
  > {
    try {
      // 1. Obtener todas las órdenes con estatus "Completado" o "Cancelado" y donde el campo de fecha no sea NULL
      const ordersSql =
        'SELECT * FROM Orders WHERE date IS NOT NULL AND status= ?';
      const [ordersRows]: any = await query(ordersSql,["Pendiente"]);
      if (ordersRows.length === 0) {
        throw new Error("No completed or cancelled orders with a date found");
      }
      /*
      // 2. Preparar la consulta para obtener la información del cliente
      const ordersWithCustomer = await Promise.all(
        ordersRows.map(async (order: any) => {
          const customerSql =
            "SELECT id, name FROM Customer WHERE id = ? AND deleted = false";
          const [customerRows]: any = await query(customerSql, [
            order.cliente_id,
          ]);
          if (customerRows.length === 0) {
            throw new Error(`No customer found for id ${order.cliente_id}`);
          }
          const customer = customerRows[0];
          return {
            order,
            customer,
          };
        })
      );
      */
      return ordersRows;
    } catch (error: any) {
        console.error(error);
        
      throw new Error(
        `Error fetching completed or cancelled orders with customer: ${error.message}`
      );
    }
  }
  public static async getOrderDetails(): Promise<any> {
    try {
      // 1. Obtener la orden específica por ID
      const orderSql = "SELECT * FROM Orders WHERE status = ? OR status= ?";
      const [orderRows]: any = await query(orderSql, ["Completado", "Cancelado"]);
      if (orderRows.length === 0) {
        throw new Error(`Order with ID not found`);
      }
      const order = orderRows;
       /*
      // 2. Obtener la información del cliente
      const customerSql =
        "SELECT id, name FROM Customer WHERE id = ? AND deleted = false";
      const [customerRows]: any = await query(customerSql, [order.cliente_id]);
      if (customerRows.length === 0) {
        throw new Error(`No customer found for id ${order.cliente_id}`);
      }
      const customer = customerRows[0];

      // 3. Obtener los detalles de la orden
      const detailsSql = "SELECT * FROM DetailsOrden WHERE orden_id = ?";
      const [detailsRows]: any = await query(detailsSql, [order.id]);
      if (detailsRows.length === 0) {
        throw new Error(`No order details found for order id ${order.id}`);
      }

      // 4. Obtener información adicional para cada detalle
      const detailedItems = await Promise.all(
        detailsRows.map(async (detail: any) => {
          // Obtener información de la gorra
          const capSql = "SELECT name, imagen FROM caps WHERE id = ?";
          const [capRows]: any = await query(capSql, [detail.gorra_id]);
          if (capRows.length === 0) {
            throw new Error(`No cap found for id ${detail.gorra_id}`);
          }
          const cap = capRows[0];

          // Obtener información del tipo de gorra
          const typeCapSql = "SELECT tipo FROM TypeCap WHERE id = ?";
          const [typeCapRows]: any = await query(typeCapSql, [
            detail.tipo_gorra_id,
          ]);
          if (typeCapRows.length === 0) {
            throw new Error(`No type cap found for id ${detail.tipo_gorra_id}`);
          }
          const typeCap = typeCapRows[0];

          // Obtener información de la talla
          const sizeSql = "SELECT description FROM Size WHERE id = ?";
          const [sizeRows]: any = await query(sizeSql, [detail.talla_id]);
          if (sizeRows.length === 0) {
            throw new Error(`No size found for id ${detail.talla_id}`);
          }
          const size = sizeRows[0];

          return {
            ...detail,
            cap,
            typeCap,
            size,
          };
        })
      );
*/
      return order;
    } catch (error: any) {
      throw new Error(
        `Error fetching order with customer and details: ${error.message}`
      );
    }
  }
  public static async getshoppingClient(clientId: string): Promise<any> {
    try {
      const sql = `
                SELECT 
                    o.id AS order_id,
                    o.created_at AS order_date,
                    do.id AS detail_id,
                    do.cantidad,
                    do.precio_unitario,
                    c.id AS cap_id,
                    c.name AS cap_name,
                    c.imagen AS cap_imagen,
                    c.price AS cap_price,
                    s.id AS size_id,
                    s.description AS size_description,
                    tc.id AS type_cap_id,
                    tc.tipo AS type_cap_tipo
                FROM 
                    orders o
                JOIN DetailsOrden do ON o.id = do.orden_id
                JOIN caps c ON do.gorra_id = c.id
                JOIN Size s ON do.talla_id = s.id
                JOIN TypeCap tc ON do.tipo_gorra_id = tc.id
                WHERE 
                    o.cliente_id = ?
                ORDER BY o.created_at DESC, o.id, do.id
            `;

      const params = [clientId];
      const [rows]: any = await query(sql, params);

      console.log("Número de filas devueltas por la consulta:", rows.length);

      if (rows.length === 0) {
        throw new Error("No orders found for this client");
      }

      // Agrupar los resultados por orden
      const orderDetails: { [key: string]: any } = {};

      rows.forEach((row: any) => {
        if (!orderDetails[row.order_id]) {
          orderDetails[row.order_id] = {
            order_id: row.order_id,
            order_date: row.order_date,
            details: [],
          };
        }

        orderDetails[row.order_id].details.push({
          detail_id: row.detail_id,
          cantidad: row.cantidad,
          precio_unitario: row.precio_unitario,
          cap: {
            id: row.cap_id,
            name: row.cap_name,
            imagen: row.cap_imagen,
            price: row.cap_price,
          },
          size: {
            id: row.size_id,
            description: row.size_description,
          },
          type_cap: {
            id: row.type_cap_id,
            tipo: row.type_cap_tipo,
          },
        });
      });

      const result = Object.values(orderDetails);
      console.log("Número de órdenes encontradas:", result.length);
      return result;
    } catch (error: any) {
      throw new Error(`Error fetching order details: ${error.message}`);
    }
  }
  public static async getOne(id:number): Promise<any[]> {
    try {
      // 1. Obtener todas las órdenes con estatus "Pendiente"
      const ordersSql =
        'SELECT * FROM Orders WHERE id = ?';
      const [ordersRows]: any = await query(ordersSql,[id]);
      if (ordersRows.length === 0) {
        throw new Error("No pending orders found");
      }
       
      return ordersRows;
    } catch (error: any) {
      throw new Error(
        `Error fetching pending orders with customer: ${error.message}`
      );
    }
  }
}
