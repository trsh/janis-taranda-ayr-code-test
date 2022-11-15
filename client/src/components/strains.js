import React, { useEffect, useState } from 'react';
import StrainCard from './strainCard';

export default function Strains() {
  const [refreshTime, setRefreshTime] = useState(Date.now());
  const [addTerpeneData, setAddTerpeneData] = useState(null);
  const [strains, setStrains] = useState([]);
  const [allTerpenes, setAllTerpenes] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/parser/strains').then(resp => resp.json()),
      fetch('http://localhost:3001/parser/all-terpenes').then(resp => resp.json())
    ])
      .then((data) => {
        setStrains(data[0]);
        setAllTerpenes(data[1]);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/parser/strains').then(resp => resp.json())
    ])
      .then((data) => {
        setStrains(data[0]);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [refreshTime]);

  useEffect(() => {
    if (addTerpeneData) {
      fetch('http://localhost:3001/parser/link-terpene-to-strain', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addTerpeneData)
      }).then((response) => {
        if (response.status === 200) {
          setRefreshTime(Date.now());
        } else {
          console.error(response);
        }
      }).catch((err) => {
        console.error(err.message);
      });
    }

  }, [addTerpeneData]);

  function handleAddTerpene(e) {
    e.preventDefault();
    if (e.target.terpeneId && e.target.strainId) {
      const terpeneId = +e.target.terpeneId.value;
      const strainId = +e.target.strainId.value;
      setAddTerpeneData({ strainId, terpeneId })
    }
  }

  return (
    <>
      <h3 className='header'>Strains</h3>
      <div className='container container-scroll'>
        <div className='row row-flex-wrap'>
          {strains.map((strain, _index) => (
            <div key={`strn-${strain.id}`} className='column column-50'>
              <StrainCard handleAddTerpene={handleAddTerpene} strain={strain} allTerpenes={allTerpenes} benefitsList={strain.benefits} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}