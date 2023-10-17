import { FC } from "react";
import QuoteIcon from "../../vectors/QuoteIcon";
import TestimonialCard from "./TestimonialCard";

const Testimonials: FC = () => {
 return (
  <section id="testimonials" className="flex flex-col gap-10 mx-auto max-w-7xl">
   <div className="mx-auto max-w-2xl md:text-center">
    <h2 className="text-3xl font-tall sm:text-4xl">Loved by businesses worldwide.</h2>
    <p className="mt-4 text-lg">Our software is so simple that people can’t help but fall in love with it. Simplicity is easy when you just skip tons of mission-critical features.</p>
   </div>
   <ul role="list" className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:max-w-none lg:grid-cols-3">
    <li>
     <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
      <TestimonialCard
       review="TaxPal is so easy to use I can’t help but wonder if it’s really doing the things the government expects me to do."
       name="Sheryl Berge"
       occupation="CEO at Lynch LLC"
       img="/avatar-1.webp"
      />
      <TestimonialCard
       review="I’m trying to get a hold of someone in support, I’m in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away."
       name="Amy Hahn"
       occupation="Director at Velocity Industries"
       img="/avatar-2.webp"
      />
     </ul>
    </li>
    <li>
     <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
      <TestimonialCard
       review="The best part about TaxPal is every time I pay my employees, my bank balance doesn’t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined."
       name="Leland Kiehn"
       occupation="Founder of Kiehn and Sons"
       img="/avatar-3.webp"
      />
      <TestimonialCard
       review="There are so many things I had to do with my old software that I just don’t do at all with TaxPal. Suspicious but I can’t say I don’t love it."
       name="Erin Powlowski"
       occupation="COO at Armstrong Inc"
       img="/avatar-4.webp"
      />
     </ul>
    </li>
    <li>
     <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
      <TestimonialCard
       review="I used to have to remit tax to the EU and with TaxPal I somehow don’t have to do that anymore. Nervous to travel there now though."
       name="Peter Renolds"
       occupation="Founder of West Inc"
       img="/avatar-5.webp"
      />
      <TestimonialCard
       review="This is the fourth email I’ve sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important."
       name="Amy Hahn"
       occupation="Director at Velocity Industries"
       img="/avatar-6.webp"
      />
     </ul>
    </li>
   </ul>
  </section>
 )
}

export default Testimonials
