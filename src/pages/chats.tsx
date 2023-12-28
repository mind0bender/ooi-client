import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Socket } from "socket.io-client";
import { socketContext } from "../components/contextproviders/socketprovider";
import { toast } from "react-toastify";

export default function ChatsPage(): JSX.Element {
  const socket: Socket | null = useContext<Socket | null>(socketContext);

  const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    socket?.on("rooms_change", setRooms);

    function joinRoomAskHandler({
      userId,
      roomId,
    }: {
      userId: string;
      roomId: string;
    }) {
      toast.info(
        <div className={`flex flex-col gap-2`}>
          <div>
            user {userId} wants to join room {roomId}
          </div>
          <div className={`flex gap-4`}>
            <button
              onClick={() => {
                socket?.emit("accept_join", {
                  roomId,
                  userId,
                  accept: true,
                });
              }}
              className={`px-1 py-0.5 rounded-sm bg-blue-500`}
            >
              accept
            </button>
            <button
              onClick={() => {
                socket?.emit("accept_join", {
                  roomId,
                  userId,
                  accept: false,
                });
              }}
              className={`px-1 py-0.5 rounded-sm bg-red-500`}
            >
              decline
            </button>
          </div>
        </div>,
        {
          autoClose: false,
        }
      );
    }

    function joinAcceptedHandler({ roomId }: { roomId: string }): void {
      toast.success(
        <div>
          joined room{" "}
          <code className={`bg-white bg-opacity-20 px-1 py-0.5 rounded-sm`}>
            {roomId}
          </code>
        </div>
      );
    }

    socket?.on("join_room_ask", joinRoomAskHandler);
    socket?.on("join_accepted", joinAcceptedHandler);

    return () => {
      socket?.off("rooms_change", setRooms);
      socket?.off("join_room_ask", joinRoomAskHandler);
      socket?.on("join_accepted", joinAcceptedHandler);
    };
  }, [socket]);

  return (
    <div className={`flex grow`}>
      <div
        className={`w-1/3 px-3 py-4 flex flex-col gap-4 border-r border-blue-950`}
      >
        <input
          className={`rounded-md px-3 py-1.5 outline-none placeholder:text-blue-500 bg-sky-200 dark:bg-blue-950 duration-300`}
          placeholder="Search"
          type="text"
          name="search"
        />
        <div className={`divide-y divide-blue-900`}>
          {rooms.map((room: string): JSX.Element => {
            return <ChatPreview name={room} roomId={room} />;
          })}
        </div>
      </div>
      <div className={`flex grow flex-col`}>
        <nav
          className={`flex w-full px-4 py-3 border-b border-b-blue-950 justify-around items-center`}
        >
          <Link to={`/`}>
            <h3 className={`text-3xl font-bold`}>Ooi</h3>
          </Link>
          <ul className={`flex gap-2 md:gap-4 text-lg font-semibold`}>
            <li>
              <NavLink
                to="/chats/new"
                className={({ isActive }): string => {
                  return `border border-blue-700 px-2 py-1 rounded-md text-blue-500 ${
                    isActive && "hidden"
                  }`;
                }}
              >
                Create
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/chats/join"
                className={({ isActive }): string => {
                  return `border border-blue-700 px-2 py-1 rounded-md text-blue-500 ${
                    isActive && "hidden"
                  }`;
                }}
              >
                Join
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

interface ChatPreviewProps {
  name?: string;
  roomId: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

function ChatPreview({
  roomId,
  name = roomId,
  lastMessage = "",
  lastMessageTime = "",
}: ChatPreviewProps) {
  return (
    <div>
      <Link to={`/chats/${roomId}`}>
        <div className={`px-1 py-2`}>
          <div>{name}</div>
          <div className={`flex justify-between`}>
            <div
              className={`text-sm text-slate-300 line-clamp-1 text-ellipsis`}
            >
              {lastMessage}
            </div>
            <div className={`text-xs`}>{lastMessageTime}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
