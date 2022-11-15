export default function StrainCard({ strain, allTerpenes, benefitsList, handleAddTerpene }) {
  return (
    <div className='card'>
      <h5 className='relaxed-header-bottom text-align-left'><strong><u>{strain.name}</u></strong></h5>
      <div className='row'>
        <div className='column'>
          <div className='centred-img-content'><img alt="something" src='/weed.jpg' /></div>
        </div>
        <div className='column text-align-left'>
          <h6 className='relaxed-header-bottom'><strong>Terpenes</strong></h6>
          <ul className='comapact-list'>
            {strain.terpenes.map((obj, _index) => (
              <li key={`terp-${obj.id}`}>{obj.name}</li>
            ))}
          </ul>
          <form onSubmit={handleAddTerpene}>
            <select id="ageRangeField" name="terpeneId">
              {allTerpenes.map((obj, _index) => (
                <option key={`opt-terp-${obj.id}`} value={obj.id}>{obj.name}</option>
              ))}
            </select>
            <input type="hidden" name="strainId" value={strain.id} />
            <button type="submit">Add</button>
          </form>
          <h6 className='relaxed-header-bottom'><strong>Feelings</strong></h6>
          <ul className='comapact-list'>
            {benefitsList.map((obj, index) => (
              <li key={`ben-${index}`}>{obj.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='align-bottom'>THC {strain.thc}%, CBD {strain.cbd}%</div>
    </div>
  );
}