import Carousel from '../ui/carousel';

const ProcessCarousel = () => {
  const slideData = [
    {
      title: 'Set up your goal',
      src: "/src/assets/videos/setting-up-a-goal.mp4",
      width: 'xl:w-[60%] '
    },
    {
      title: 'Track your goals and earn rewards!',
      src: "/src/assets/videos/track-goal.mp4",
      height: 'xl:w-[75%] '
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full pt-0 py-20">
      <Carousel slides={slideData} />
    </div>
  );
}

export default ProcessCarousel
