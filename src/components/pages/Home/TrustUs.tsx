import { FC } from "react";

const TrustUs: FC = () => {
 return (
  <div className="mt-12 lg:mt-20 text-center">
   <p>
    Trusted by these six companies so far
   </p>
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
        width="158"
        height="48"
        decoding="async"
        data-nimg="1"
        className="text-transparent"
        src="/transistor.7274e6c3.svg"
       />
      </li>
      <li className="flex">
       <img
        alt="Tuple"
        loading="lazy"
        width="105"
        height="48"
        decoding="async"
        data-nimg="1"
        className="text-transparent"
        src="/tuple.74eb0ae0.svg"
       />
      </li>
      <li className="flex">
       <img
        alt="StaticKit"
        loading="lazy"
        width="127"
        height="48"
        decoding="async"
        data-nimg="1"
        className="text-transparent"
        src="/statickit.d7937794.svg"
       />
      </li>
     </ul>
    </li>
    <li>
     <ul
      role="list"
      className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
     >
      <li className="flex">
       <img
        alt="Mirage"
        loading="lazy"
        width="138"
        height="48"
        decoding="async"
        data-nimg="1"
        className="text-transparent"
        src="/mirage.18d2ec4e.svg"
       />
      </li>
      <li className="flex">
       <img
        alt="Laravel"
        loading="lazy"
        width="136"
        height="48"
        decoding="async"
        data-nimg="1"
        className="text-transparent"
        src="/laravel.7deed17e.svg"
       />
      </li>
      <li className="flex">
       <img
        alt="Statamic"
        loading="lazy"
        width="147"
        height="48"
        decoding="async"
        data-nimg="1"
        className="text-transparent"
        src="/statamic.6da5ebfb.svg"
       />
      </li>
     </ul>
    </li>
   </ul>
  </div>
 );
};

export default TrustUs;
