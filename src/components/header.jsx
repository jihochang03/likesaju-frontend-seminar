import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PointModal } from './modals/point-modal';
import coin from '../assets/icons/coin.png';
import { removeCookie } from '../utils/cookie';
import { signOut } from '../apis/api';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginState, setUserProfile } from '../redux/user-slice';
import { ProfileImage } from '../components/profile-image';

export const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [logoHidden, setLogoHidden] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const location = useLocation();

  const [showProfile, setShowProfile] = useState(false);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);

  const nickname = useSelector((state) => state.user.nickname);
  const point = useSelector((state) => state.user.remaining_points);
  const profileImgIndex = useSelector((state) => state.user.profilepic_id);
  const loggedIn = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 기준 너비 768px
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll event handling
  useEffect(() => {
    const handleScroll = () => {
      setScrollCount((prevCount) => prevCount + 1);

      if (scrollCount >= 2) {
        setLogoHidden(true); // 두 번의 스크롤 이후 로고 숨김
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollCount]);

  useEffect(() => {
    setIsLogin(loggedIn);
  }, [loggedIn]);

  const linkStyle =
    'text-xl font-bold text-[#14142B] leading-6 hover:font-extrabold hover:text-[#4A3AFF] hover:cursor-pointer';
  const activeLinkStyle = 'text-xl font-extrabold text-[#4A3AFF] leading-6';

  const onClickPoint = () => {
    setIsPointModalOpen(true);
  };

  const onClickLogout = async () => {
    const res = await signOut();
    if (res !== null) {
      removeCookie('access_token');
      removeCookie('refresh_token');
      dispatch(setLoginState(false));
      dispatch(
        setUserProfile({
          user: null,
          nickname: null,
          profilepic_id: null,
          remaining_points: null,
        }),
      );
      window.location.href = '/';
    }
  };

  return (
    <div className="sticky top-0 w-full flex flex-row items-center justify-between bg-white drop-shadow h-[80px] px-[68px] mobile:px-4 z-[999]">
      <Link
        to="/"
        className="text-[26px] font-extrabold text-[#14142B] leading-9 tracking-tighter mobile:text-xl flex items-center gap-2 relative"
      >
        {!isMobile && !logoHidden && (
          <img
            src="/path-to-lion-logo.png"
            alt="Lion Logo"
            className="w-[40px] h-[40px] mobile:hidden fixed left-1/2 top-[50px] transform -translate-x-1/2 transition-opacity duration-300"
          />
        )}
        <span>멋쟁이 사주처럼</span>
      </Link>
      <div className="flex flex-row items-center gap-[50px] mobile:gap-4">
        <Link
          to="/saju"
          className={
            location.pathname === '/saju'
              ? `${activeLinkStyle} mobile:text-base`
              : `${linkStyle} mobile:text-base`
          }
        >
          사주
        </Link>
        <Link
          to="/chat"
          className={
            location.pathname === '/chat'
              ? `${activeLinkStyle} mobile:text-base`
              : `${linkStyle} mobile:text-base`
          }
        >
          채팅
        </Link>
        {isLogin ? (
          <div
            className="relative"
            onMouseOver={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <span className="text-xl font-bold text-[#14142B] leading-6 hover:font-extrabold hover:text-[#4A3AFF] hover:cursor-pointer mobile:text-base">
              프로필
            </span>
            {showProfile && (
              <div className="absolute top-[25px] right-[-25px] bg-white drop-shadow w-[221px] p-[25px] rounded-[12px] flex flex-col gap-5 mobile:w-[180px] mobile:p-[15px]">
                {profileImgIndex && (
                  <div className="flex flex-row gap-[10px] items-center justify-start mobile:gap-[5px]">
                    <ProfileImage
                      profileImageId={profileImgIndex}
                      additionalClassName={
                        'w-[30px] h-[30px] mobile:w-[20px] mobile:h-[20px]'
                      }
                    />
                    <span className="text-lg font-bold text-[#170F49] leading-6 mobile:text-base">
                      {nickname}
                    </span>
                  </div>
                )}
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-[10px] items-center mobile:gap-[5px]">
                    <img
                      src={coin}
                      alt="coin"
                      className="w-[30px] h-[30px] mobile:w-[20px] mobile:h-[20px]"
                    />
                    <span className="text-lg font-bold text-[#170F49] leading-6 mobile:text-base">
                      포인트
                    </span>
                  </div>
                  <span className="text-lg font-bold text-[#4A3AFF] leading-6 mobile:text-base">
                    {point}
                    <span className="text-[#160F49]">P</span>
                  </span>
                </div>
                <button
                  onClick={onClickPoint}
                  className="bg-[#160F49] text-white text-base font-semibold leading-6 rounded-[50px] px-6 py-[6px] mobile:px-4 mobile:py-[4px]"
                >
                  충전하기
                </button>
                <span
                  onClick={onClickLogout}
                  className="text-base font-normal underline text-[#160F49] self-start cursor-pointer mobile:text-sm"
                >
                  로그아웃
                </span>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="login"
            className="text-xl font-bold text-[#4A3AFF] leading-6 bg-[#F3F1FF] px-7 py-[17px] rounded-[50px] mobile:text-base mobile:px-4 mobile:py-[10px]"
          >
            로그인
          </Link>
        )}
      </div>
      {isPointModalOpen && <PointModal setIsModalOpen={setIsPointModalOpen} />}
    </div>
  );
};
