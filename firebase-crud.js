

import {db} from './firebase.js';
export const fireBaseOperations = {
    async read(){
        const docs  = await db.collection('tasks').get();
        console.log('Docs are ', docs);
        return docs;
 },
    readRealTime(){
        
         return db.collection('tasks');
    },
    add(task){
        
        console.log(task)
        const promise = db.collection('tasks').add(task);
        promise.then(data=>{
            console.log('Record Added', data);
        }).catch(err=>{
            console.log('Error in Add ',err);
        })
       
    }
}