import {connect,connection} from "mongoose";


const conn ={
    isConnected:false
}

export async function dbConnect(){
    if(conn.isConnected) return;
    
    const db = await connect(process.env.NEXT_PUBLIC_MONGO_URL);
    conn.isConnected = db.connections[0].readyState;
}

connection.on("connected",()=>{
    console.log('Database is up......')
});

connection.on("error",(err)=>{
    console.log("Error",err.message)
})