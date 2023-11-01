import { AuthContext } from "@context/AuthContext";
import { db } from "./firebase_options";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const getOrders = async (userId) => {
    const orders = []
    const querySnapshot = await getDocs(collection(db, "users", userId));
    querySnapshot.forEach((doc) => {
        orders.push(doc.data())
        console.log(`${doc.id} => ${doc.data()}`);
    });
    return orders;
}

export const getOrder = async (userId, order_id) => {
    const order = []
    const querySnapshot = await getDocs(collection(db, "users", userId, order_id));
    querySnapshot.forEach((doc) => {
        order.push(doc.data())
        console.log(`${doc.id} => ${doc.data()}`);
    });
    return order;
}

export const storeOrder = async (userId,orderData) => {
    try {
        const docRef = await addDoc(collection(db, "users",userId), orderData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }

}
