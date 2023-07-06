import {Slot} from 'expo-router';
import React, {createContext, useEffect, useState} from 'react';
import dbConnector from '../utils/database/dbConnector';

export const DbContext = createContext<dbConnector | null>(null);


export default function MainLayout() {

  const [db, setDb] = useState<dbConnector | null>(null);

  useEffect(() => {
    const connector = new dbConnector();
    connector.migrate().then(() => {
      setDb(connector);
    });
  }, []);

  return (
    <DbContext.Provider value={db}>
      <Slot />
    </DbContext.Provider>
  );
}

export function useDb(): dbConnector | null {
  return React.useContext(DbContext);
}