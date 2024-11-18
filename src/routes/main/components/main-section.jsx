import { Button } from 'components/button';
import { SectionLayout } from './section-layout';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GRADIENT_TOP_START_COLOR = '#170F49';
const GRADIENT_TOP_END_COLOR = '#E3E6F7';
const GRADIENT_BOTTOM_START_COLOR = '#6F6C8F';
const GRADIENT_BOTTOM_END_COLOR = '#F7F7F7';

export const MainSection = () => {
  const sectionRef = useRef(null);
  const textSectionRef = useRef(null);

  const designOuterRef = useRef(null);
  const designInnerRef = useRef(null);
  const welcomeMsgRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const lionRef = useRef(null);

  const maxScroll = window.innerHeight * 5;

  useEffect(() => {
    interpolateBackground(0);
    interpolateDesignPosition(0);
    animateTextSection(0);

    const handleScroll = () => {
      /** 구체적인 스크롤 콜백 함수가 들어갈 예정 */
      interpolateBackground(window.scrollY);
      interpolateDesignPosition(window.scrollY);
      animateTextSection(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const interpolateBackground = (scrollY) => {
    // 보간되는 값을 정할 factor 변수입니다.
    // 0부터 window.innerHeight * 5까지 스크롤 함에 따라서 0부터 1까지 점진적으로 증가하겠죠?
    const factor = Math.min(scrollY / maxScroll, 1); // 0 ~ 1 사이 값으로 제한

    //ref의 경우, react의 lifecycle에서 관리되지 않는 값중 하나입니다. 꼭 존재하는지 체크해주는 습관을 들입시다.
    if (sectionRef.current) {
      //gsap.to 함수 사용, sectionRef에 연결된 div의 background 속성을 변경
      gsap.to(sectionRef.current, {
        background: `linear-gradient(to bottom,
          ${gsap.utils.interpolate(GRADIENT_TOP_START_COLOR, GRADIENT_TOP_END_COLOR, factor)},
          ${gsap.utils.interpolate(GRADIENT_BOTTOM_START_COLOR, GRADIENT_BOTTOM_END_COLOR, factor)}
        )`,
        duration: 0,
        ease: 'none',
      });
    }
  };
  const animateTextSection = (scrollY) => {
    // 사자와 카드가 움직이기 시작하는 시점을 텍스트 애니메이션 시작 시점으로 설정
    const startScroll = maxScroll / 3; // 사자와 카드 모양이 움직이기 시작할 스크롤
    const endScroll = maxScroll / 1.5; // 애니메이션 종료 스크롤
    const factor = Math.min(
      Math.max((scrollY - startScroll) / (endScroll - startScroll), 0),
      1,
    );

    if (textSectionRef.current) {
      gsap.to(textSectionRef.current, {
        x: -100 + 100 * factor, // 텍스트가 더 천천히 등장
        opacity: factor, // 점진적으로 나타남
        duration: 0.8, // 느리게 설정
        ease: 'power1.out', // 부드러운 애니메이션
      });
    }
  };

  const interpolateDesignPosition = (scrollY) => {
    const isMobile = window.innerWidth <= 768; // 모바일 화면 조건
    const factor1 =
      scrollY < maxScroll / 2
        ? 0
        : Math.min(((scrollY - maxScroll / 2) * 2) / maxScroll, 1);

    const originalX = designOuterRef.current.getBoundingClientRect().x;
    const offsetXFromMiddle = window.innerWidth / 2 - (originalX + 170);
    if (designInnerRef.current) {
      gsap.to(designInnerRef.current, {
        x: offsetXFromMiddle * (1 - factor1),
      });
    }

    const factor2 = Math.min(scrollY / (maxScroll / 2), 1);
    const viewportYMiddle = window.innerHeight / 2;

    if (welcomeMsgRef.current) {
      gsap.to(welcomeMsgRef.current, {
        y: -50,
        opacity: 1 - factor2,
      });
    }

    // PC에서는 사자가 항상 보이도록 기본 설정
    if (lionRef.current) {
      gsap.to(lionRef.current, {
        y: viewportYMiddle * 1.5 * (1 - factor2),
        opacity: isMobile ? (factor2 < 1 ? 1 : 0) : 1, // 모바일에서만 사라짐
        duration: 0.5,
      });
    }

    if (card1Ref.current) {
      gsap.to(card1Ref.current, {
        x: -180 + 30 * factor2,
        y: -80 * factor2,
        rotate: -45 * factor2,
        opacity: isMobile ? (factor2 < 1 ? 1 : 0) : 1, // 모바일에서만 사라짐
        duration: 0.5,
      });
    }

    if (card2Ref.current) {
      gsap.to(card2Ref.current, {
        x: -60,
        y: -160 * factor2,
        rotate: -15 * factor2,
        opacity: isMobile ? (factor2 < 1 ? 1 : 0) : 1,
        duration: 0.5,
      });
    }

    if (card3Ref.current) {
      gsap.to(card3Ref.current, {
        x: 60,
        y: -160 * factor2,
        rotate: 15 * factor2,
        opacity: isMobile ? (factor2 < 1 ? 1 : 0) : 1,
        duration: 0.5,
      });
    }

    if (card4Ref.current) {
      gsap.to(card4Ref.current, {
        x: 180 - 30 * factor2,
        y: -80 * factor2,
        rotate: 45 * factor2,
        opacity: isMobile ? (factor2 < 1 ? 1 : 0) : 1,
        duration: 0.5,
      });
    }
  };

  return (
    <SectionLayout
      outerLayerClassName={'h-[500vh] flex items-start'}
      innerLayerClassName={`sticky top-[80px] h-[calc(100vh-80px)]`}
      innerLayerRef={sectionRef}
    >
      <div className="relative flex flex-col w-full gap-8 items-start mobile:items-center">
        <div
          className="flex flex-col items-start mobile:items-center gap-8"
          ref={textSectionRef}
        >
          <h1 className="text-[64px] mobile:text-[32px] leading-normal whitespace-pre-wrap text-left mobile:text-center nanum-extra-bold text-black dark:text-white">
            <span>멋쟁이</span>{' '}
            <s className="text-gray-500 dark:text-gray-400">사자</s>
            {'\n'}
            <span>사주처럼</span>
          </h1>
          <p className="text-lg mobile:text-sm text-left mobile:text-center mobile:whitespace-pre-wrap dark:text-white">
            {'오늘의 사주 운세를 확인하고,\n친구에게 공유하자!'}
          </p>
          <a href="/saju">
            <Button>멋사주 시작하기</Button>
          </a>
        </div>
        <div
          ref={designOuterRef}
          className="absolute -bottom-10 right-0 size-[340px]"
        >
          <div
            className="w-full h-full flex justify-center"
            ref={designInnerRef}
          >
            <p
              ref={welcomeMsgRef}
              className="font-extrabold text-[44px] mobile:text-[28px] text-white text-nowrap w-fit opacity-0"
            >
              오늘의 운세가 궁금해?
            </p>
            <img
              ref={lionRef}
              src="/images/snulion.png"
              className="absolute z-50 scale-[60%] mobile:scale-[50%] object-contain" // 사자 크기 확대
              alt="Main Illustration"
            />
            <img
              ref={card1Ref}
              src="/images/card1.png"
              className="absolute scale-[60%] mobile:scale-[40%] object-contain" // 카드 크기 확대
              alt="Card1 Illustration"
            />
            <img
              ref={card2Ref}
              src="/images/card2.png"
              className="absolute scale-[60%] mobile:scale-[40%] object-contain"
              alt="Card2 Illustration"
            />
            <img
              ref={card3Ref}
              src="/images/card3.png"
              className="absolute scale-[60%] mobile:scale-[40%] object-contain"
              alt="Card3 Illustration"
            />
            <img
              ref={card4Ref}
              src="/images/card4.png"
              className="absolute scale-[60%] mobile:scale-[40%] object-contain"
              alt="Card4 Illustration"
            />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
