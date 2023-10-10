import { OrderDetailsContext } from "@context/OrderContext";
import { db } from "./firebase_options";

export const getOrders = async () => {
    const { setOrderDetails } = useContext(OrderDetailsContext);

    const snapshot = await db.collection("orders").get();
    snapshot.forEach(doc => {
        setOrderDetails({
            id: doc.id,
            ...doc.data()
        });
    });
}

export const storeOrder = async (orderData) => {
    await db.collection("orders").add(orderData).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    return docRef.id;
}
