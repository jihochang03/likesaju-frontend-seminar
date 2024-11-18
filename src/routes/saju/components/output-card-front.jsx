import { useState } from 'react';

export const OutputCardFront = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute [backface-visibility:hidden] flex flex-col w-[500px] h-[370px] p-[20px] justify-center items-center bg-white text-neutral-800 rounded-[12px] transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? '0px 0px 16px 0px rgba(197, 179, 255, 0.5)'
          : '0px 5px 16px 0px rgba(8, 15, 52, 0.06)',
        backdropFilter: isHovered ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: isHovered ? 'blur(10px)' : 'none',
      }}
    >
      <div className="flex flex-col gap-[50px]">
        <img
          src={data.image}
          alt="output-card-front"
          className="w-[180px] h-[180px]"
        />
        <h1 className="text-[28px] font-extrabold leading-[28px] nanum-extra-bold">
          {data.title}
        </h1>
      </div>
    </div>
  );
};
