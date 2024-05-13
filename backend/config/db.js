import mongoose from 'mongoose';

const connectingDB = async () => {
    try {
        const urlConnection = '';
        const db = await mongoose.connect(urlConnection);
        const dbResponse = `${db.connection.host}:${db.connection.port})`;
        console.log(dbResponse);


    } catch(error) {
        console.log(`There was an error: ${error}`);
        process.exit(1);
    }
}

export default connectingDB;