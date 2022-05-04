

import {db} from './firebase.js';
export const fireBaseOperations = {
    async read(){
        const docs  = await db.collection('tasks').get();
        console.log('Docs are ', docs);
        return docs;
        // db.collection("tasks").get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log(`${doc.id} => ${doc.data()}`);
        //     });
        // });
    },
    readRealTime(){
        
         return db.collection('tasks');
    },
    add(task){
        //console.log(db.collection);
        const promise = db.collection('tasks').add(task);
        promise.then(data=>{
            console.log('Record Added', data);
        }).catch(err=>{
            console.log('Error in Add ',err);
        })
       // console.log("FireBase ", firebase.firestore());
    }
}