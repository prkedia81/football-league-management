// import mongoose, { Connection } from "mongoose";

// interface ConnectionState {
//   isConnected?: boolean;
// }

// const connection: ConnectionState = {};

// const connectMongo = async (): Promise<void> => {
//   if (connection.isConnected) {
//     return;
//   }
//   try {
//     const db = await mongoose.connect(process.env.MONGO_URI!);
//     connection.isConnected = db.connections[0].readyState === 1;
//   } catch (error) {
//     console.error("Error connecting to MongoDB", error);
//   }
// };

// export default connectMongo;

import mongoose from "mongoose";

const connectMongo = async () => mongoose.connect(`${process.env.MONGO_URI}`);

export default connectMongo;
