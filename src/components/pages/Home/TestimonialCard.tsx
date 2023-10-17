import { FC } from "react";
import QuoteIcon from "../../vectors/QuoteIcon";

type Props = {
 review: string;
 name: string;
 occupation: string;
 img: string;
};

const TestimonialCard: FC<Props> = ({ review, name, occupation, img }: Props) => {
 return (
  <li>
   <figure className="relative bg-white p-6 shadow-xl shadow-slate-900/10">
    <QuoteIcon />
    <blockquote className="relative">
     <p className="text-lg">{review}</p>
    </blockquote>
    <figcaption className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
     <div>
      <div>{name}</div>
      <div className="mt-1 text-sm text-slate-500">{occupation}</div>
     </div>
     <div className="overflow-hidden bg-slate-50">
      <img
       alt="Image of the avatar of the review"
       loading="lazy"
       width="56"
       height="56"
       decoding="async"
       data-nimg="1"
       className="h-14 w-14 object-cover"
       src={img}
      />
     </div>
    </figcaption>
   </figure>
  </li>
 );
};

export default TestimonialCard;