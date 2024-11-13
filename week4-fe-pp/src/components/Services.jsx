import { useState } from "react";
import { services } from "../data";
import Title from "./Title";
import Service from "./Service";

const Services = () => {
  const [serviceData, setServicesData] = useState(services);

  const updateData = (removedService) => {
    const updatedServiceData = serviceData.filter(
      (service) => service.id !== removedService.id
    );
    setServicesData(updatedServiceData);
  };

  return (
    <section className="section services" id="services">
      <Title title="our" subTitle="services" />

      <div className="section-center services-center">
        {serviceData.map((service) => {
          return (
            <div className="service-card-object" key={service.id}>
              <Service {...service}  />
              <button className='not-interested' onClick={() => updateData(service)}>
                x
              </button>
              </div>
          );
        })}
      </div>
    </section>
  );
};
export default Services;
