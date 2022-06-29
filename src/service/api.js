import firebase from "firebase/compat/app";
import { db } from './firebase'
import dayjs from 'dayjs';

export const saveExercise = (uid, region, exercise, weight, sets, reps) => {
    db.collection(region).add({
        uid: uid,
        exercise: exercise,
        weight: parseInt(weight),
        sets: parseInt(sets),
        reps: parseInt(reps),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export const selectExerciseLog = async (uid, region) => {
    const regionCollection = await db.collection(region)
        .orderBy("createdAt", "desc")
        .where("uid", "==", uid);

    return regionCollection.get().then((snapShot) => {
        let exerciseLog = [];
        snapShot.forEach((doc) => {
            exerciseLog.push({
                id: doc.id,
                exercise: doc.data().exercise,
                weight: doc.data().weight,
                sets: doc.data().sets,
                reps: doc.data().reps,
                createdAt: dayjs(doc.data().createdAt.toDate()).format('YYYY/MM/DD'),
            })
        });
        return exerciseLog;
    });
}

export const todoDelete = (id) => {
    db.collection("todo").doc(id).delete();   
}

export const toggleComplete = async (id) => {
    const todo = await db.collection("todo").doc(id).get();
    return db.collection("todo").doc(id).update({
        isComplete: todo.data().isComplete ? false : true,
    });

}