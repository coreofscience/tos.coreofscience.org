import { FC } from "react";

const FAQ: FC = () => {
 return (
  <section aria-labelledby="faq-title">
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:mx-0">
     <h2 className="text-3xl font-tall sm:text-4xl">Frequently asked
      questions</h2>
     <p className="mt-4 text-lg">If you can’t find what you’re looking for, email our support
      team and if you’re lucky someone will get back to you.</p>
    </div>
    <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
     <li>
      <ul role="list" className="flex flex-col gap-y-8">
       <li>
        <h3 className="text-lg font-tall">Does TaxPal handle VAT?</h3>
        <p className="mt-2 text-sm">Well no, but if you move your company offshore you can probably
         ignore it.</p>
       </li>
       <li>
        <h3 className="text-lg font-tall">Can I pay for my subscription via purchase order?
        </h3>
        <p className="mt-2 text-sm">Absolutely, we are happy to take your money in all forms.</p>
       </li>
       <li>
        <h3 className="text-lg font-tall">How do I apply for a job at TaxPal?</h3>
        <p className="mt-2 text-sm">We only hire our customers, so subscribe for a minimum of 6 months
         and then let’s talk.</p>
       </li>
      </ul>
     </li>
     <li>
      <ul role="list" className="flex flex-col gap-y-8">
       <li>
        <h3 className="text-lg font-tall">What was that testimonial about tax fraud all
         about?</h3>
        <p className="mt-2 text-sm">TaxPal is just a software application, ultimately your books are your
         responsibility.</p>
       </li>
       <li>
        <h3 className="text-lg font-tall">TaxPal sounds horrible but why do I still feel
         compelled to purchase?</h3>
        <p className="mt-2 text-sm">This is the power of excellent visual design. You just can’t resist
         it, no matter how poorly it actually functions.</p>
       </li>
       <li>
        <h3 className="text-lg font-tall">I found other companies called TaxPal, are you
         sure you can use this name?</h3>
        <p className="mt-2 text-sm">Honestly not sure at all. We haven’t actually incorporated or
         anything, we just thought it sounded cool and made this website.</p>
       </li>
      </ul>
     </li>
     <li>
      <ul role="list" className="flex flex-col gap-y-8">
       <li>
        <h3 className="text-lg font-tall">How do you generate reports?</h3>
        <p className="mt-2 text-sm">You just tell us what data you need a report for, and we get our kids
         to create beautiful charts for you using only the finest crayons.</p>
       </li>
       <li>
        <h3 className="text-lg font-tall">Can we expect more inventory features?</h3>
        <p className="mt-2 text-sm">In life it’s really better to never expect anything at all.</p>
       </li>
       <li>
        <h3 className="text-lg font-tall">I lost my password, how do I get into my account?
        </h3>
        <p className="mt-2 text-sm">Send us an email and we will send you a copy of our latest password
         spreadsheet so you can find your information.</p>
       </li>
      </ul>
     </li>
    </ul>
   </div>
  </section>
 );
};

export default FAQ;
