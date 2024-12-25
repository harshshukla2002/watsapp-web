import { useEffect } from "react";
import { openDB } from "idb";

const useIndexedDB = (dbName) => {
  useEffect(() => {
    const setupDB = async () => {
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("messages")) {
            db.createObjectStore("messages", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      return db;
    };
    setupDB();
  }, [dbName]);

  const addMessage = async (message) => {
    const db = await openDB(dbName, 1);
    await db.add("messages", message);
  };

  const getMessages = async () => {
    const db = await openDB(dbName, 1);
    return await db.getAll("messages");
  };

  return { addMessage, getMessages };
};

export default useIndexedDB;
