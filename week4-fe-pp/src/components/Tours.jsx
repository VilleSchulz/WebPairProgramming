import { tours } from "../data";
import { useState } from "react";
import Title from "./Title";
import Tour from "./Tour";

const Tours = () => {
  const [toursData, setToursData] = useState(tours);

  const updateData = (removedTour) => {
    const updatedTourData = toursData.filter(
      (tour) => tour.id !== removedTour.id
    );
    setToursData(updatedTourData);
  };

  return (
    <section className="section" id="tours">
      <Title title="featured" subTitle="tours" />

      <div className="section-center featured-center">
        {toursData.map((tour) => {
          return (
            <div className="tour-card-object">
              <Tour {...tour} key={tour.id} />
              <button className='not-interested' onClick={() => updateData(tour)}>x</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Tours;
