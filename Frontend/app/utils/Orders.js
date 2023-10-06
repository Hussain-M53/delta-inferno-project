import { db } from "./firebase_options";

export const getOrders = async () => {
    const orders = [];

    const snapshot = await db.collection("orders").get();
    snapshot.forEach(doc => {
        orders.push({
            id: doc.id,
            ...doc.data()
        });
    });

    return orders;
}

export const storeOrder = async (orderData) => {
    const docRef = await db.collection("orders").add(orderData);
    return docRef.id;
}
