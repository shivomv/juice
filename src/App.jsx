import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const sections = [
  {
    number: '01',
    title: 'Orange Juice',
    desc: 'Freshly squeezed, 100% natural orange juice packed with vitamin C.',
    mainImg: '/juices/1.png',
    decoImg: '/juices/11.png',
    imgweb: '/juices/111.png',
    shadow: '0 0 20px rgba(255, 165, 0, 0.6)',
    hoverBg: 'group-hover:bg-orange-100',
    buttonColor: 'bg-orange-500',
    titleColor: 'text-orange-600',
    descColor: 'text-orange-800',
  },
  {
    number: '02',
    title: 'Plum Juice',
    desc: 'Sweet and tangy plum juice to refresh your senses.',
    mainImg: '/juices/2.png',
    decoImg: '/juices/22.png',
    imgweb: '/juices/222.png',
    shadow: '0 0 20px rgba(128, 0, 128, 0.5)',
    hoverBg: 'group-hover:bg-purple-100',
    buttonColor: 'bg-purple-500',
    titleColor: 'text-purple-600',
    descColor: 'text-purple-800',
  },
  {
    number: '03',
    title: 'Kiwi Juice',
    desc: 'Zesty kiwi flavor with a tropical twist, perfect for summer.',
    mainImg: '/juices/3.png',
    decoImg: '/juices/33.png',
    imgweb: '/juices/333.png',
    shadow: '0 0 20px rgba(0, 128, 0, 0.5)',
    hoverBg: 'group-hover:bg-green-100',
    buttonColor: 'bg-green-500',
    titleColor: 'text-green-600',
    descColor: 'text-green-800',
  },
  {
    number: '04',
    title: 'Strawberry Juice',
    desc: 'Delicious strawberry blend, sweet and refreshing.',
    mainImg: '/juices/4.png',
    decoImg: '/juices/44.png',
    imgweb: '/juices/444.png',
    shadow: '0 0 20px rgba(255, 0, 0, 0.5)',
    hoverBg: 'group-hover:bg-red-100',
    buttonColor: 'bg-red-500',
    titleColor: 'text-red-600',
    descColor: 'text-red-800',
  },
];

const App = () => {
  return (
    <div className="min-h-screen flex">
      {sections.map((section, idx) => (
        <SectionCard key={idx} section={section} />
      ))}
    </div>
  );
};

const SectionCard = ({ section }) => {
  const mainRef = useRef();
  const decoRef = useRef();
  const blobRef = useRef();
  const containerRef = useRef();
  const contentRef = useRef();
  const descRef = useRef();

  useEffect(() => {
    const el = containerRef.current;

    const onEnter = () => {
      gsap.to(mainRef.current, {
        scale: 1.6,
        left: '50%',
        top: '40%',
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(decoRef.current, {
        x: -10,
        y: -10,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(blobRef.current, {
        x: -20,
        y: 10,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(contentRef.current, {
        left: '30%',
        top: '80%',
        transform: 'translate(-50%, -50%)',
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(mainRef.current, {
        scale: 1,
        left: '25%',
        top: '50%',
        duration: 0.5,
        ease: 'power2.inOut',
      });
      gsap.to(decoRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
      gsap.to(blobRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
      gsap.to(contentRef.current, {
        left: '65%',
        top: '50%',
        duration: 0.5,
        ease: 'power2.inOut',
      });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex-1 group cursor-pointer overflow-hidden transition-colors duration-300`}
    >
      {/* Background Layer */}
      <div
        className={`absolute inset-0 transition-colors duration-300 z-[-1] ${section.hoverBg}`}
      ></div>

      {/* Blob Image (Background Shape) */}
      <img
        ref={blobRef}
        src={section.imgweb}
        alt="Decorative Shape"
        className="absolute top-[5%] left-[10%] w-[250px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1] pointer-events-none"
        style={{ filter: `blur(1px) drop-shadow(${section.shadow})` }}
      />

      {/* Main Juice Image */}
      <img
        ref={mainRef}
        src={section.mainImg}
        alt={section.title}
        className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-32 h-auto z-10"
        style={{ filter: `drop-shadow(${section.shadow})` }}
      />

      {/* Decorative Image */}
      <img
        ref={decoRef}
        src={section.decoImg}
        alt={`${section.title} Decoration`}
        className="absolute bottom-[6%] right-[-10%] w-[300px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2]"
        style={{ filter: `drop-shadow(${section.shadow})` }}
      />

      {/* Text Content */}
      <div ref={contentRef} className="absolute top-1/3 left-1/2 text-left space-y-2 scale-110 z-20">
        <div className={`text-lg font-bold text-gray-600 ${section.titleColor}`}>{section.number}.</div>
        <h2 className={`text-xl font-bold ${section.titleColor}`}>{section.title}</h2>
        <p ref={descRef} className={`text-md max-w-[160px] ${section.descColor}`}>{section.desc}</p>
        <button
          className={`mt-2 px-4 py-1 ${section.buttonColor || 'bg-black'} text-white text-sm rounded hover:bg-gray-800 transition`}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default App;
