import { MainSection } from 'routes/main/components/main-section';
import { SajuSection } from 'routes/main/components/saju-section';
import { ShareSection } from 'routes/main/components/share-section';
import { FAQSection } from 'routes/main/components/faq-section';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../../redux/dark-slice';
import { FiSun } from 'react-icons/fi';
import { FiMoon } from 'react-icons/fi';
import { useEffect, useRef } from 'react';

const MainPage = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();

  const mainSectionRef = useRef(null);
  const sajuSectionRef = useRef(null);
  const shareSectionRef = useRef(null);
  const faqSectionRef = useRef(null);

  const sections = [sajuSectionRef, shareSectionRef, faqSectionRef];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
          } else {
            entry.target.classList.add('opacity-0');
          }
        });
      },
      {
        threshold: 0.2, // 10% 이상 보이면 애니메이션 시작
      },
    );

    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current);
        }
      });
    };
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center bg-gradient-to-b ${darkMode ? 'from-neutral-900 to-neutral-800' : 'from-neutral-400 to-neutral-200'} ${darkMode ? 'dark' : ''}`}
    >
      <div className="fixed w-full flex justify-end pt-3 px-3 z-[9999]">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-3 bg-primary text-white rounded"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
      <div className="transition duration-1000" ref={mainSectionRef}>
        <MainSection />
      </div>
      <div className="transition duration-1000" ref={sajuSectionRef}>
        <SajuSection />
      </div>
      <div className="transition duration-1000" ref={shareSectionRef}>
        <ShareSection />
      </div>
      <div className="transition duration-1000" ref={faqSectionRef}>
        <FAQSection />
      </div>
    </div>
  );
};

export default MainPage;
