// Importing mongoose library along with Connection type from it
import mongoose, { Connection } from "mongoose";

// Declaring a variable to store the cached database connection
let cachedConnection: Connection | null = null;

// Function to establish a connection to MongoDB
export async function connect() {
    // If a cached connection exists, return it
    if (cachedConnection) {
        console.log("Using cached db connection");
        return cachedConnection;
    }
    try {
        // If no cached connection exists, establish a new connection to MongoDB
        mongoose.connect(process.env.MONGO_URI!,
            {
                dbName: process.env.MONGO_NAME!,
                autoCreate: true,
                autoIndex: true
            });
        const connection = mongoose.connection;
        cachedConnection = connection;
        connection.on('connected', () => {
            console.log("New mongodb connection established");
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err);
            process.exit();
        })
    } catch (error) {
        console.log(error);
    }
}



