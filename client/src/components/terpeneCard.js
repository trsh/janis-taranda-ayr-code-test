export default function TerpeneCard({ terpene, benefitsList }) {
  return (
    <div className='card'>
      <h5 className='relaxed-header-bottom text-align-left'><strong><u className='text-capitalize'>{terpene.name}</u></strong></h5>
      <div className='text-align-left'>
        <h6 className='relaxed-header-bottom'><strong>Feelings</strong></h6>
        <ul className='comapact-list'>
          {benefitsList.map((obj, index) => (
            <li key={`ben-${index}`}><span className='pln'>{obj.name} ({obj.cases} cases)</span></li>
          ))}
          {benefitsList.length === 0 &&
            <span>No data so far</span>
          }
        </ul>
      </div>
    </div>
  );
}