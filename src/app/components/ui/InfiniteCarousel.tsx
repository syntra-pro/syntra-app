import Image from 'next/image';

const InfiniteCarousel = () => {
  const items = [
    { text: 'Your All-in-One Solution', image: '/seedLogo.png' },
    { text: 'Your All-in-One Solution', image: '/seedLogo.png' },
    { text: 'Your All-in-One Solution', image: '/seedLogo.png' },
    { text: 'Your All-in-One Solution', image: '/seedLogo.png' },
  ];

  return (
    <div className="w-full overflow-hidden py-4 border-y border-stone-300 dark:border-stone-500 my-10">
      <div className="flex gap-8 animate-[scroll_20s_linear_infinite]">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center whitespace-nowrap mx-4">
            <span className="text-xl lg:text-2xl dark:text-stone-400">
              {item.text}
            </span>
            <Image
              src={item.image}
              width={32}
              height={32}
              alt="Seed Logo"
              className="inline-block ml-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
