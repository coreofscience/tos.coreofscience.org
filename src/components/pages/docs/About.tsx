import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="prose prose-stone m-auto prose-a:text-sky-600 prose-a:hover:text-sky-800 prose-a:active:text-sky-800">
      <h1 className="font-tall uppercase">About Tree of Science</h1>
      <p>
        <strong>Tree of Science</strong> is a pioneering division of{" "}
        <a href="https://coreofscience.org">Core of Science</a>, a non-profit
        organization dedicated to advancing science and data science education
        among young and graduate students. Our mission is to inspire and nurture
        growth in these vital fields, fostering a new generation of scientific
        thinkers and data analysts.
      </p>
      <p>
        The inception of <strong>Tree of Science</strong> can be traced back to
        a groundbreaking doctoral thesis that explored the diffusion process
        without monetary incentives. This research garnered acclaim and was
        published in the prestigious Journal of Business Research, marking a
        significant milestone in our journey.
      </p>
      <p>
        Since its initial launch, <strong>Tree of Science</strong> has
        captivated the global academic community. Our first version engaged
        around 11,000 users and processed over 2 million queries from the Web of
        Science (WoS), showcasing our tool&#39;s broad appeal and utility. The
        overwhelming response led to the formation of Core of Science, with{" "}
        <strong>Tree of Science</strong> as its cornerstone, but with a broader
        vision of creating an array of scientometric products.
      </p>
      <p>
        Our innovative algorithm, which underpins the{" "}
        <strong>Tree of Science</strong> platform, has been recognized and
        published in esteemed international journals such as IEEE Access,
        Molecules, and Sustainability. These publications underscore our
        commitment to scientific rigor and our contribution to the academic
        community.
      </p>
      <p>
        <strong>Tree of Science</strong> is not just a tool; it&#39;s a gateway
        to a world of scientific discovery and analysis. Our platform offers
        intuitive and powerful visualization and analysis capabilities, making
        complex scientific data accessible and engaging. We are proud to serve a
        diverse and growing user base, ranging from budding scientists and
        seasoned researchers to academic institutions and research
        organizations.
      </p>
      <p>
        Join us in our quest to demystify science and data science, making these
        fields more approachable and exciting for the next generation.
      </p>
    </article>
  );
};

export default About;
