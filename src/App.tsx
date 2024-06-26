import React from 'react';
import { useEffect, useState } from 'react';
import TableGrid from './components/Table';

export type TPerson = {
  id: number,
  age: number,
  visits: number,
  progress: number
  status: string,
  subRows: any;
}

function App() {

  const [data, setData] = useState<TPerson[]>([])
  const range = (len: number) => {
    const arr: number[] = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  };

  const newPerson = () => {
    const statusChance = Math.random();
    return {
      id: Math.floor(Math.random() * 2000),
      age: Math.floor(Math.random() * 30),
      visits: Math.floor(Math.random() * 100),
      progress: Math.floor(Math.random() * 100),
      status:
        statusChance > 0.66
          ? "relationship"
          : statusChance > 0.33
            ? "complicated"
            : "single",
    };
  };

  function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): TPerson[] => {
      const len = lens[depth];
      return range(len).map((d) => {
        return {
          ...newPerson(),
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        };
      });
    };

    return makeDataLevel();
  }
  useEffect(() => {
    const response = makeData(50)
    setData(response)
  }, [])

  return (
    <TableGrid data={data} />
  );
}

export default App;

