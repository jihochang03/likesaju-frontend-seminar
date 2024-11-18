import { SectionLayout } from './section-layout';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export const FAQSection = () => {
  const faqAccordionInfo = [
    {
      question: 'Q. 사주 운세를 확인하고 싶은데, 비용은 무료인가요?',
      answer:
        '첫 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.\n첫 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.',
    },
    {
      question: 'Q. 어떤 기술이 활용되었나요?',
      answer:
        '두 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.\n두 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.',
    },
    {
      question:
        'Q. 세 번째 질문입니다. 한 줄까지 들어갈 수 있습니다. 그 이상은 말줄임표 처리합니다. 바로 이렇게... 이렇게... 이렇게... 이렇게... 이렇게...',
      answer:
        '세 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.\n세 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.',
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScrollAnimation = () => {
      if (sectionRef.current) {
        const section = sectionRef.current;
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
            },
          },
        );
      }
    };

    handleScrollAnimation();
  }, []);

  return (
    <SectionLayout>
      <div
        ref={sectionRef}
        className="w-full h-full flex flex-col gap-[80px] opacity-0 transition-opacity duration-700"
      >
        <h3 className="text-left text-2xl lg:text-4xl nanum-extra-bold">
          FAQs
        </h3>
        <div className="flex flex-col gap-6 lg:gap-[30px] justify-center">
          {faqAccordionInfo.map((accordion) => (
            <FAQAccordion
              key={accordion.question}
              question={accordion.question}
              answer={accordion.answer}
            />
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-xl px-6 py-6 lg:px-[50px] lg:py-10 shadow-2xl w-full gap-5 bg-white dark:bg-neutral-800">
      <div className="flex justify-between items-center gap-3 lg:gap-5">
        <p className="text-base lg:text-xl font-bold truncate text-black dark:text-white">
          {question}
        </p>
        <button
          className="rounded-full shadow-md transition border border-[#D3D3D3] dark:border-neutral-600"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <svg
            className={`transition-transform transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      <div
        className={`transition-max-height duration-700 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <p className="text-sm lg:text-lg w-full text-left mt-4 text-black dark:text-white">
          {answer}
        </p>
      </div>
    </div>
  );
};
