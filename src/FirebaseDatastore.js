
import { db } from './FirebaseConfig';
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";


const fetchData = async () => {
    try {
        const response = collection(db, 'my_house_details');
        const docObject = await getDocs(response);
        // const dataObject = docObject.docs.map(doc => doc.data());
        // console.log("final ===========================", dataObject)
        // return dataObject;
        const dataObject = docObject.docs.map(doc => {
            const documentId = doc.id; // Get the document ID
            const documentData = doc.data(); // Get the document data
            return { id: documentId, ...documentData }; // Include document ID in the data object
        });
        console.log("final ===========================", dataObject)
        return dataObject;
    } catch (error) {
        console.error('Error:', error);
    }
};

const updateData = async (updatedRecord) => {
    try {
        const docRef = doc(db, 'my_house_details', updatedRecord.id); // Assuming documentId is the ID of the document you want to update
        const docObject = await updateDoc(docRef, updatedRecord);
        console.log("Document updated successfully");
    } catch (error) {
        console.error('Error:', error);
    }
};

const addData = async (newRecord) => {
    try {
        const collectionRef = collection(db, 'my_house_details');
        const docRef = await addDoc(collectionRef, newRecord);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};

const firebaseDatastore = {
    fetchData,
    updateData,
    addData
};

export default firebaseDatastore;