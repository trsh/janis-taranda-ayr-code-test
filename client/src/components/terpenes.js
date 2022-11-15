import React, { useEffect, useState } from 'react';
import TerpeneCard from './terpeneCard';

export default function Terpenes() {
  const [terpenes, setTerpenes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/parser/terpenes')
      .then((response) => response.json())
      .then((data) => {
        setTerpenes(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <>
      <h3 className='header'>Terpenes</h3>
      <div className='container container-scroll'>
        <div className='row row-flex-wrap'>
          {terpenes.map((terpene, _index) => (
            <div key={`strn-${terpene.id}`} className='column column-50'>
              <TerpeneCard terpene={terpene} benefitsList={terpene.benefits} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}