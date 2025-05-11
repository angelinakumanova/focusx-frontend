import Carousel from '../ui/carousel';

const ProcessCarousel = () => {
  const slideData = [
    {
      title: 'Set up your goal',
      src: "/src/assets/videos/setting-up-a-goal.mp4",
      width: 'w-[60%]'
    },
    {
      title: 'Track your goals and earn rewards!',
      src: "/src/assets/videos/track-goal.mp4",
      height: 'w-[75%]'
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}

export default ProcessCarousel
