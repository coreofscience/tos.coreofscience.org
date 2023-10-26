import { FC } from "react";

const TrustUs: FC = () => {
 return (
  <section className="mt-12 lg:mt-20 text-center">
   <p>Trusted by these universities</p>
   <ul
    role="list"
    className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
   >
    <li>
     <ul
      role="list"
      className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
     >
      <li className="flex">
       <img
        alt="Transistor"
        loading="lazy"
        width="110"
        height="48"
        decoding="async"
        data-nimg="1"
        className="text-transparent"
        src="/assets/trustUs/unal.svg"
       />
      </li>
      <li className="flex">
       <img
        alt="Tuple"
        loading="lazy"
        width="200"
        decoding="async"
        data-nimg="1"
        className="text-transparent"
        src="/assets/trustUs/funlam.svg"
       />
      </li>
     </ul>
    </li>
   </ul>
  </section>
 );
};

export default TrustUs;
