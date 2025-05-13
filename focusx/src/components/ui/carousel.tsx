"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useRef, useState } from "react";
import TypingText from "../TypingText";

interface SlideData {
  title: string;
  src: string;
  width?: string;
  height?: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}



const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const videoLoaded = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, title, width, height } = slide;

  return (
    
      <li
        ref={slideRef}
        className="relative flex flex-1 flex-col items-center
         justify-center  text-center text-white
          opacity-100 transition-all duration-300 ease-in-out
            z-10 "
        onClick={() => handleSlideClick(index)}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
          <TypingText text={title} className="font-bold text-3xl uppercase mb-2"  />

        <div
          className={`relative ${width} ${height}  bg-[#1D1F2F]
           rounded-xl overflow-hidden transition-all duration-150 ease-out`}
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          
          <video
            className={`w-full h-auto inset-0 opacity-100
             transition-opacity duration-600 ease-in-out`}
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            muted
            src={src}
            autoPlay
            loop={true}
            onLoad={videoLoaded}
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>
      </li>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200
         dark:bg-neutral-800 border-3 border-transparent rounded-full
          focus:border-zinc-500
          focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
 
  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  return (
    <div className="relative mx-auto max-w-fit">
      <ul
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
