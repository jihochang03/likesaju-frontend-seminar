import { ArrowIcon } from './arrow-icon';
import { useChatWebSocketContext } from 'routes/chat/contexts/chat-websocket-context';
import { ProfileImage } from '../../../../components/profile-image';
import { useSelector } from 'react-redux';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { SendIcon } from './send-icon';

import { ReceiveSpeechBubble } from './receive-speech-bubble';
import { SendSpeechBubble } from './send-speech-bubble';

const UsernameStyledText = ({ username }) => (
  <div className="text-[var(--Neutral-800,#170F49)] font-pretendard text-[20px] font-semibold leading-[30px]">
    {username}
  </div>
);

export const ChatRoom = () => {
  const {
    chatRoomId,
    setChatRoomId,
    chatRoomList,
    messageList,
    sendJsonMessage,
  } = useChatWebSocketContext(); //추가

  const [message, setMessage] = useState('');
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  const userId = useSelector((state) => state.user.user?.id);

  const selectedChatRoom = useMemo(
    () => chatRoomList.find((room) => room.id === chatRoomId),
    [chatRoomList, chatRoomId],
  );

  const representativeParticipant = useMemo(
    () =>
      selectedChatRoom.participants.length === 1
        ? selectedChatRoom.participants[0]
        : selectedChatRoom.participants.find((value) => value.id !== userId),
    [selectedChatRoom, userId],
  );

  const handleChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (message.trim() === '') {
      return;
    }
    //TODO
    alert('전송');

    sendJsonMessage({
      message: message,
      chat_room_id: chatRoomId,
    });

    setMessage('');
  }, [message, chatRoomId]);

  return (
    <div className="flex flex-1 flex-col h-[calc(100vh-80px)] overflow-y-auto animate-fadeIn">
      <div className="flex flex-row h-[92px] w-full px-[25px] py-[14px] gap-4 items-center bg-[var(--background,#FFFFFF)]">
        <button onClick={() => setChatRoomId(null)}>
          <ArrowIcon />
        </button>
        <ProfileImage
          profileImageId={parseInt(
            representativeParticipant.profile.profilepic_id,
          )}
        />
        <UsernameStyledText
          username={representativeParticipant.profile.nickname}
        />
      </div>
      <div className="flex flex-col h-full overflow-y-auto px-4 p-3 space-y-4">
        {messageList.map((message) =>
          message.sender !== userId ? (
            <div className="self-start" key={message.id}>
              <ReceiveSpeechBubble text={message.content} />
            </div>
          ) : (
            <div className="self-end" key={message.id}>
              <SendSpeechBubble text={message.content} />
            </div>
          ),
        )}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="flex flex-row h-[92px] w-full px-[25px] py-[14px] gap-4 items-center bg-[var(--background,#FFFFFF)]">
        <div className="flex items-center w-full h-[50px] border border-[#E3E5F2] bg-[#FFF] rounded-lg px-[12px] py-[12px] gap-[16px]">
          <input
            type="text"
            placeholder="메시지를 입력하세요."
            className="flex-1 h-full px-2 py-1 border-none bg-transparent outline-none"
            value={message}
            onChange={handleChange}
          />
          <button
            className="flex-shrink-0 p-2 rounded-lg hover:bg-[#F7F7FB]"
            onClick={handleSubmit}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
