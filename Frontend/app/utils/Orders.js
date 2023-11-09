import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase_options";

export const getOrders = async (userId) => {
    const orders = [];
    const querySnapshot = await getDocs(collection(db, "users", userId, "orders"));
    querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, data: doc.data() });
        console.log(`${doc.id} => ${doc.data()}`);
    });
    return orders;
}

export const getOrder = async (userId, order_id) => {
    const orderRef = doc(db, "users", userId, "orders", order_id);
    const orderDoc = await getDoc(orderRef);

    if (orderDoc.exists()) {
        const orderData = { id: orderDoc.id, data: orderDoc.data() };
        console.log(`${orderDoc.id} => ${JSON.stringify(orderDoc.data())}`);
        return orderData;
    } else {
        console.log("No such document!");
        return null;
    }
}

export const storeOrder = async (userId, orderData) => {

    try {
        if (userId != "") {
            const orderRef = await addDoc(collection(db, "users", userId, "orders"), orderData);
            console.log("Document written with ID: ", orderRef.id);
        }

        const orderRef = await addDoc(collection(db, "orders"), orderData);
        console.log("Document written with ID: ", orderRef.id);
        return orderRef.id;


    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
}
