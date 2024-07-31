import { OrdersRepository } from "../repository/ordesRepository";

export class OrderService {
  public static async createOrder(
    cliente_id: number,
    id_gorra: number,
    cantidad: number,
    total: number,
    created_by: string
  ) {
    try {
      return await OrdersRepository.createOrder(cliente_id,id_gorra,cantidad,total,created_by);
    } catch (error: any) {
      throw new Error(`Error al crear orden: ${error.message}`);
    }
  }
  public static async getAllPendingOrdersWithCustomer(id:number) {
    try {
      return await OrdersRepository.getAllPendingOrdersWithCustomer(id);
    } catch (error: any) {
      throw new Error(`Error al obtener las orden: ${error.message}`);
    }
  }
  public static async updateOrderDate(id: string, newDate: Date) {
    try {
      return await OrdersRepository.updateOrderDate(id, newDate);
    } catch (error: any) {
      throw new Error(`Error al actualizar las orden: ${error.message}`);
    }
  }
  public static async updateOrderStatus(id: string, newStatus: string) {
    try {
      return await OrdersRepository.updateOrderStatus(id, newStatus);
    } catch (error: any) {
      throw new Error(`Error al actualizar las orden: ${error.message}`);
    }
  }
  public static async getAllOrdersAsignedDate() {
    try {
      return await OrdersRepository.getAllOrdersAsignedDate();
    } catch (error: any) {
      throw new Error(`Error al obtener las orden: ${error.message}`);
    }
  }
  public static async getAllCompletedOrCancelledOrdersWithCustomer() {
    try {
      return await OrdersRepository.getAllCompletedOrCancelledOrdersWithCustomer();
    } catch (error: any) {
      throw new Error(`Error al obtener las orden: ${error.message}`);
    }
  }
  public static async getOrderDetails() {
    try {
      return await OrdersRepository.getOrderDetails();
    } catch (error: any) {
      throw new Error(`Error al obtener las orden: ${error.message}`);
    }
  }
  public static async getshoppingClient(cliente_id: string) {
    try {
      return await OrdersRepository.getshoppingClient(cliente_id);
    } catch (error: any) {
      throw new Error(
        `Error al obtener los detalles de la compras: ${error.message}`
      );
    }
  }
  public static async getOne(id: number) {
    try {
      return await OrdersRepository.getOne(id);
    } catch (error: any) {
      throw new Error(
        `Error al obtener los detalles de la compras: ${error.message}`
      );
    }
  }
}
