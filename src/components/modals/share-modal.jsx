import React, { useEffect, useState } from 'react';
import circle from '../../assets/icons/radio-btn.png';
import circle_selected from '../../assets/icons/radio-btn-selected.png';
import { useChatWebSocketContext } from 'routes/chat/contexts/chat-websocket-context';
import { getUserList } from 'apis/api';
import { ProfileImage } from 'components/profile-image';
const ProfileComponent = ({ profileImageId, name, isSelected, onSelect }) => {
  return (
    <div
      className="flex flex-row w-full items-center justify-between px-4 py-3 hover:bg-[#EFF0F6] cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex flex-row items-center gap-4">
        <ProfileImage profileImageId={profileImageId} />
        <span className="text-[#170F49] font-bold text-lg">{name}</span>
      </div>
      <img
        src={isSelected ? circle_selected : circle}
        alt="circle"
        className="w-[20px] h-[20px] justify-end"
      />
    </div>
  );
};

export const SajuShareModal = ({ setIsModalOpen, OutputCardData }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const { sendJsonMessage } = useChatWebSocketContext();
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getUserList();
        setProfiles(data);
      } catch (error) {
        console.error('Failed to fetch profiles', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelect = (id) => {
    setSelectedUserId(id);
  };

  const onClickCancel = () => {
    setIsModalOpen(false);
  };

  const onClickShare = async () => {
    try {
      if (!selectedUserId) {
        alert('유저를 선택해주세요.');
        return;
      }
      const formattedMessage =
        '내 사주 공유' +
        '<br>' +
        `${OutputCardData[0].title}: ${OutputCardData[0].msg}` +
        '<br>' +
        `${OutputCardData[1].title}: ${OutputCardData[1].msg}` +
        '<br>' +
        `${OutputCardData[2].title}: ${OutputCardData[2].msg}` +
        '<br>' +
        `${OutputCardData[3].title}: ${OutputCardData[3].msg}`;

      sendJsonMessage({
        message: formattedMessage,
        participant_id: selectedUserId,
      });

      setIsModalOpen(false);
    } catch (error) {
      alert('Failed to create chatroom. Please try again.');
    }
  };
  const filteredProfiles = profiles.filter((profile) =>
    profile.nickname.toLowerCase().includes(searchText.toLowerCase()),
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[532px] bg-white rounded-[18px] shadow-md px-[30px] py-5">
        <div className="flex justify-end">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <path
              d="M23.875 8.13754C23.7594 8.02166 23.622 7.92972 23.4708 7.86699C23.3196 7.80427 23.1575 7.77198 22.9938 7.77198C22.8301 7.77198 22.668 7.80427 22.5168 7.86699C22.3655 7.92972 22.2282 8.02166 22.1125 8.13754L16 14.2375L9.88754 8.12504C9.77181 8.00931 9.63442 7.91751 9.48321 7.85488C9.33201 7.79225 9.16995 7.76001 9.00629 7.76001C8.84262 7.76001 8.68056 7.79225 8.52936 7.85488C8.37815 7.91751 8.24076 8.00931 8.12504 8.12504C8.00931 8.24076 7.91751 8.37815 7.85488 8.52936C7.79225 8.68056 7.76001 8.84262 7.76001 9.00629C7.76001 9.16995 7.79225 9.33201 7.85488 9.48321C7.91751 9.63442 8.00931 9.77181 8.12504 9.88754L14.2375 16L8.12504 22.1125C8.00931 22.2283 7.91751 22.3656 7.85488 22.5169C7.79225 22.6681 7.76001 22.8301 7.76001 22.9938C7.76001 23.1574 7.79225 23.3195 7.85488 23.4707C7.91751 23.6219 8.00931 23.7593 8.12504 23.875C8.24076 23.9908 8.37815 24.0826 8.52936 24.1452C8.68056 24.2078 8.84262 24.2401 9.00629 24.2401C9.16995 24.2401 9.33201 24.2078 9.48321 24.1452C9.63442 24.0826 9.77181 23.9908 9.88754 23.875L16 17.7625L22.1125 23.875C22.2283 23.9908 22.3656 24.0826 22.5169 24.1452C22.6681 24.2078 22.8301 24.2401 22.9938 24.2401C23.1574 24.2401 23.3195 24.2078 23.4707 24.1452C23.6219 24.0826 23.7593 23.9908 23.875 23.875C23.9908 23.7593 24.0826 23.6219 24.1452 23.4707C24.2078 23.3195 24.2401 23.1574 24.2401 22.9938C24.2401 22.8301 24.2078 22.6681 24.1452 22.5169C24.0826 22.3656 23.9908 22.2283 23.875 22.1125L17.7625 16L23.875 9.88754C24.35 9.41254 24.35 8.61254 23.875 8.13754Z"
              fill="#333333"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center mt-[10px] gap-[30px]">
          <span className="text-[#170F49] font-extrabold text-[22px] leading-10 tracking-tighter">
            공유 대상 선택
          </span>
          <div className="flex flex-row border-[1px] border-[#E3E5F2] rounded-xl w-[472px] px-5 py-3 gap-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="search">
                <path
                  id="Vector"
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#A0A3BD"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  id="Vector_2"
                  d="M21.0004 20.9999L16.6504 16.6499"
                  stroke="#A0A3BD"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
            <input
              type="text"
              placeholder="닉네임 검색"
              className="w-full outline-none"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-col w-full h-[314px] overflow-y-auto">
            {filteredProfiles &&
              filteredProfiles.map((value) => {
                return (
                  <ProfileComponent
                    profileImageId={value.profilepic_id}
                    name={value.nickname}
                    isSelected={selectedUserId === value.user.id}
                    onSelect={() => handleSelect(value.user.id)}
                  />
                );
              })}
          </div>
          <div className="flex flex-row items-center justify-center gap-5">
            <button
              onClick={onClickCancel}
              className="w-[215px] h-[58px] px-10 py-[13px] bg-white border-[#E3E5F2] border-2 text-[#170F49] rounded-xl font-bold text-lg tracking-tighter"
            >
              취소
            </button>
            <button
              onClick={onClickShare}
              className="w-[215px] h-[58px] px-10 py-[13px] bg-[#4A3AFF] text-white rounded-xl font-bold text-lg tracking-tighter"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
