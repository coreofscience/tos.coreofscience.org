import { FC } from "react";
import TestimonialCard from "./TestimonialCard";

const Testimonials: FC = () => {
  return (
    <section
      id="testimonials"
      className="flex flex-col container xs:px-0 gap-10 mx-auto max-w-7xl"
    >
      <div className="mx-auto max-w-2xl md:text-center">
        <h2 className="text-3xl font-tall text-center sm:text-4xl">
          Loved by researchers
        </h2>
      </div>
      <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:max-w-none xl:grid-cols-3">
        <li>
          <ul className="flex flex-col gap-y-6 sm:gap-y-8">
            <TestimonialCard
              review="This organization has a great impact on researchers worldwide! Their methodologies and products (software) are exceptional! This organization comes highly recommended, and Professor Sebastian Robledo is a wonderful human being."
              name="Jose Miguel Lopez Zuluaga"
              occupation="Industrial Engineer"
              img="/assets/testimonials/jose-miguel-lopez.png"
              country="Colombia"
            />
          </ul>
        </li>
        <li>
          <ul className="flex flex-col gap-y-6 sm:gap-y-8">
            <TestimonialCard
              review="It has been an excellent teaching and learning experience in the field of scientometric analysis. It will always be a pleasure to work again with a high-performance team like Core of Science, as we concluded the course with the submission of our scientific article to the Journal of Scientometric Research."
              name="Ronny Omar Molina Morán"
              occupation="PhD in Administration and Management of Organizations"
              img="/assets/testimonials/ronny-omar-molina.png"
              country="Ecuador"
            />
          </ul>
        </li>
        <li>
          <ul className="flex flex-col gap-y-6 sm:gap-y-8">
            <TestimonialCard
              review="Excellent methodology, it allows you to create a structure for the theoretical framework of the research to be developed in record time."
              name="Jhon Antuny Pabón León"
              occupation="PhD in Management"
              img="/assets/testimonials/jhon-antuny.png"
              country="Colombia"
            />
          </ul>
        </li>
      </ul>
    </section>
  );
};

export default Testimonials;
