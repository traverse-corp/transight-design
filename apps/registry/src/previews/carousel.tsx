import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@transight-design/ui/components/carousel'

export const Preview = () => (
  <Carousel className='w-72'>
    <CarouselContent>
      {[1, 2, 3, 4, 5].map((n) => (
        <CarouselItem key={n}>
          <div className='bg-cool-grey-02 border-cool-grey-04 flex h-32 items-center justify-center rounded-md border'>
            <span className='typo-eb32 text-cool-grey-09'>{n}</span>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
)
