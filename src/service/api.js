import firebase from "firebase/compat/app";
import { db } from './firebase'

export const addTodo = (content, uid) => {
  db.collection("todo").add({
    content: content,
    uid: uid,
    isComplete: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export const saveExercise = async (uid, region, exercise, weight, sets, reps) => {
    console.log(uid, region, exercise, weight, sets, reps)
  db.collection(region).add({
    uid: uid,
    exercise: exercise,
    weight: parseInt(weight),
    sets: parseInt(sets),
    reps: parseInt(reps),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export const initGet = async (uid) => {
    const todo = await db.collection("todo")
    .orderBy("createdAt", "desc")
    .where("uid", "==", uid);

    return todo.get().then((snapShot) => {
        let todos = [];
        snapShot.forEach((doc) => {
            todos.push({
                id: doc.id,
                content: doc.data().content,
                isComplete: doc.data().isComplete,
            });
        });
        return todos;
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