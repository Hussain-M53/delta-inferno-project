import { AuthContext } from "@context/AuthContext";
import { db } from "./firebase_options";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const getOrders = async () => {
    const orders = []
    const { user } = useContext(AuthContext);
    const querySnapshot = await getDocs(collection(db, "users", user.userId));
    querySnapshot.forEach((doc) => {
        orders.push(doc.data())
        console.log(`${doc.id} => ${doc.data()}`);
    });
    return orders;
}

export const storeOrder = async (orderData) => {
    const { user } = useContext(AuthContext);

    try {
        const docRef = await addDoc(collection(db, "users", user.userId), orderData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }

}
