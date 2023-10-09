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
    await db.collection("orders").add(orderData).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    // return docRef.id;
}
