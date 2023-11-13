import mongoose from "mongoose";
import { Book } from "../models/Book.js";
import { mongoDBConnection } from '../config.js';



async function clearCollection() {
  try {
    await mongoose.connect(mongoDBConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await Book.deleteMany({});
    console.log('Documentos excluídos:', result.deletedCount);
    await mongoose.connection.close();
  } catch (error) {
    console.error('Erro ao excluir documentos da coleção:', error);
  }
}


clearCollection();

