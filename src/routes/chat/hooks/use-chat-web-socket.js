import useWebSocket from 'react-use-websocket';
import { useRef, useEffect, useState } from 'react';
import { getChatRoomList, getMessageList } from 'apis/api';

const useChatWebSocket = () => {
  const [messageList, setMessageList] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [chatRoomList, setChatRoomList] = useState([]);
  const didUnmount = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (chatRoomId !== null) {
        const data = await getMessageList(chatRoomId);
        setMessageList(Array.isArray(data) ? data : []);
      }
    };
    fetchData();
  }, [chatRoomId]);

  const socketUrl = 'ws://localhost:8000/ws/chat/';

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await getChatRoomList();
        setChatRoomList(data ? data : []);
        console.log('Connected!!!');
      } catch (error) {
        console.log(error);
      }
    },
    onClose: (event) => {
      if (event.code === 4001) {
        console.log('Authentication Error');
      }
      console.log('Close');
    },
    onError: () => {
      console.log('Error!');
    },
    onMessage: async (msg) => {
      const data = JSON.parse(msg.data);
      if (
        chatRoomList.filter((chatRoom) => chatRoom.id === data.chatroom)
          .length === 0
      ) {
        const newChatRoomList = await getChatRoomList();
        setChatRoomList(newChatRoomList ? newChatRoomList : []);
      } else {
        if (data.chatroom === chatRoomId) {
          setMessageList((prev_msg) => [
            ...prev_msg,
            {
              id: data.id,
              sender: data.sender,
              chatroom: data.chatroom,
              content: data.content,
              timestamp: data.timestamp,
            },
          ]);
        }

        setChatRoomList((prevChatRoomList) =>
          prevChatRoomList.map((chatRoom) =>
            chatRoom.id === data.chatroom
              ? { ...chatRoom, last_message: data.content }
              : chatRoom,
          ),
        );
      }
    },
    shouldReconnect: (closeEvent) => {
      if (closeEvent.code === 4001) {
        return false;
      }
      return didUnmount.current === false;
    },
    reconnectInterval: 1000,
    share: true,
  });

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  return {
    messageList,
    setMessageList,
    chatRoomId,
    setChatRoomId,
    chatRoomList,
    setChatRoomList,
    sendJsonMessage,
  };
};
export default useChatWebSocket;
