import { sliderBannerSettings } from '@/utils/sliderBannerSettings';
import Slider from 'react-slick';
import { Banner } from '../ui/Banner';

export const SliderBannerAds = () => {
  return (
    <Slider {...sliderBannerSettings}>
      <Banner size="large">
        <div className=" z-0 min-w-[350px] w-3/4 md:w-[700px] h-auto absolute right-0 bottom-0">
          <img
            src="/img/banners-ads/iphone-banner.jpg"
            alt="iPhone"
            className="w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="bg-darkSkyBlue-60 bg-opacity-50 rounded-full flex flex-col justify-between items-center text-center md:text-left p-4 w-3/4 mx-auto min-[1280px]:w-full min-[1280px]:items-start min-[1280px]:bg-transparent z-10">
          <span className="ml-[5%] text-dispS1 md:text-dispM font-semibold text-mystic-100 mb-6 md:animate-pulsate">
            останній iPhone вже тут
          </span>
          <span className="ml-[20%] text-parM md:text-dispS3 text-mystic-100 italic">
            відчуйте майбутнє технологій
          </span>
        </div>
      </Banner>
      <Banner size="large">
        <div className="absolute z-0 w-72 left-0 md:left-28 xl:left-48 bottom-0 lg:animate-bounce">
          <img
            src="/img/banners-ads/macbook-banner.jpg"
            alt="Macbook"
            className="w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="bg-darkSkyBlue-60 bg-opacity-30 rounded-full flex flex-col justify-between items-center p-8 xl:bg-transparent xl:w-full xl:items-end w-3/4 mx-auto xl:p-20 z-10">
          <span className=" xl:mr-[10%]  text-dispS1 md:text-dispM font-semibold text-mystic-40 mb-2 md:mb-6">
            MacBook. Потужність і Стиль
          </span>
          <span className="ml-[5%]  text-parM md:text-dispS3 text-mystic-20">
            спробуйте новий рівень продуктивності
          </span>
        </div>
      </Banner>
      <Banner size="large">
        <div className="absolute z-0 w-40 lg:w-[350px] right-5 bottom-0 lg:-bottom-12 lg:animate-pulse">
          <img
            src="/img/banners-ads/watch-banner.jpg"
            alt="Watch"
            className="w-full object-contain object-bottom"
          />
        </div>
        <div className="bg-darkSkyBlue-60 bg-opacity-30 rounded-full flex flex-col justify-between items-center p-8 lg:bg-transparent lg:w-1/2 lg:m-0 xl:w-full lg:items-start mx-auto w-fit z-10 opacity-70">
          <span className="ml-[5%] text-dispS1 md:text-dispM font-semibold text-mystic-60 lg:text-bannerWatch mb-2 md:mb-6">
            Apple Watch - ваше життя на зап'ясті
          </span>
          <span className="ml-[5%] md:ml-[35%] text-parM md:text-dispS3 text-mystic-80 lg:text-bannerWatch font-extrabold">
            будьте здорові, активні та на зв'язку
          </span>
        </div>
      </Banner>
      <Banner size="large">
        <div className="absolute z-0 min-w-[250px] max-w-[350px] lg:max-w-[400px] right-5 bottom-0 lg:animate-spiner">
          <img
            src="/img/banners-ads/ipad-banner.jpg"
            alt="iPad"
            className="w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="bg-darkSkyBlue-60 bg-opacity-50 rounded-full flex items-center flex-col lg:flex-row p-8 lg:bg-transparent lg:w-1/2 lg:m-0 xl:w-full lg:items-start mx-auto w-3/4 z-10">
          <span className="ml-[5%] text-dispS1 md:text-dispM text-orange-90 mb-2 md:mb-6 font-bold mr-2">
            iPad:
          </span>
          <span className="text-dispS1 md:text-dispM font-medium text-orange-90 mb-2 md:mb-6">
            Дивуйтесь. Творіть. Вражайтесь
          </span>
        </div>
      </Banner>
      <Banner size="large">
        <div className="absolute z-0 min-w-[250px] max-w-[350px] lg:max-w-[550px] left-5 lg:-bottom-24 rotate-[60deg]">
          <img
            src="/img/banners-ads/airpods-banner.jpg"
            alt="AirPods"
            className="w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="bg-darkSkyBlue-60 bg-opacity-30 rounded-full flex flex-col justify-between items-center p-8 xl:bg-transparent xl:w-full xl:items-end w-3/4 mx-auto xl:p-20 z-10">
          <span className="md:ml-[25%] text-dispS1 md:text-dispM font-semibold text-mystic-100 mb-2 md:mb-6">
            AirPods - чистий звук.
          </span>
          <span className="md:ml-[55%] text-parM md:text-dispS3 text-mystic-100 font-extrabold italic">
            почуйте музику такою як вона є
          </span>
        </div>
      </Banner>
    </Slider>
  );
};
