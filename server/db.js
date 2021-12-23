import mongoose from 'mongoose';
const Connection=async(username,password)=>{
    const URL=`mongodb://${username}:${password}@cluster0-shard-00-00.ba8we.mongodb.net:27017,cluster0-shard-00-01.ba8we.mongodb.net:27017,cluster0-shard-00-02.ba8we.mongodb.net:27017/WHATSAPPCLONE?ssl=true&replicaSet=atlas-tcmj92-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true});
        console.log('Database Connected Succesfully');
    } catch(error) {console.log('Error: ', error.message);}   
}; 
export default Connection;