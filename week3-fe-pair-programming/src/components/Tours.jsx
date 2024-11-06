import Tour from './Tour';
import Title from './Title'
import {tours} from '../data'
function Tours() {
  return (
    <section className="section" id="tours">
      <Title title = 'Featured' subtitle ='tours'/>
      
      <div className="section-center featured-center">
        {tours.map((tour)=> {
          return <Tour {...tour} key ={tour.id}/>
        })}
    </div>
</section>
    

  
  );
}

export default Tours;
