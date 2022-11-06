import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IOrder, ShippingAddress } from '../interfaces/order';
import Order from "../models/Order";



export const getOrderById = async (id: string): Promise<IOrder | null> => {
 
    if ( !isValidObjectId(id)) {
        return null;
    }


    await db.connect();
    const order = await Order.findById(id).lean();
    await db.disconnect();

    if( !order ) {
        return null;
    }


    return JSON.parse(JSON.stringify(order));

}

export const getOrdersByUser = async (userLast: string): Promise<IOrder[]> => {
    // if(!isValidObjectId(userLast)) {
    //   return [];
    // }
    
    await db.connect();
    const orders = await Order.find({ userLast }).lean();
    console.log('ORDERS',orders);
    await db.disconnect();
  
    return JSON.parse(JSON.stringify(orders)); 
  }