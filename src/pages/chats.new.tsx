import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { socketContext } from "../components/contextproviders/socketprovider";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface RoomExistStatus {
  roomId: string;
  exists: boolean | null;
}

export default function CreatePage() {
  const socket: Socket | null = useContext<Socket | null>(socketContext);

  const navigate: NavigateFunction = useNavigate();

  const [roomExists, setRoomExists] = useState<RoomExistStatus>({
    roomId: "",
    exists: null,
  });

  useEffect(() => {
    function handleRoomCreated(roomId: string) {
      navigate(`/chats/${roomId}`);
      toast.success(
        <div>
          room{" "}
          <code className={`bg-white bg-opacity-20 px-1 py-0.5 rounded-sm`}>
            {roomId}
          </code>{" "}
          created
        </div>
      );
    }
    function handleRoomExists(roomId: string) {
      toast.error(
        <div>
          room{" "}
          <code className={`bg-white bg-opacity-20 px-1 py-0.5 rounded-sm`}>
            {roomId}
          </code>{" "}
          already exists
        </div>
      );
    }
    function handleCheckRoomExistsRes({ roomId, exists }: RoomExistStatus) {
      setRoomExists({ roomId, exists });
    }
    socket?.on("room_created", handleRoomCreated);
    socket?.on("room_exists", handleRoomExists);
    socket?.on("check_room_exists_res", handleCheckRoomExistsRes);

    return () => {
      socket?.off("room_created", handleRoomCreated);
      socket?.off("room_exists", handleRoomExists);
      socket?.off("check_room_exists_res", handleCheckRoomExistsRes);
    };
  }, [socket]);

  const [roomId, setRoomId] = useState<string>("");

  const createRoom = useCallback(() => {
    socket?.emit("create_room", roomId);
  }, [roomId, socket]);

  const roomIdChangeHandler = useCallback<ChangeEventHandler>(
    ({ target: { value: newRoomId } }: ChangeEvent<HTMLInputElement>) => {
      setRoomId(newRoomId);
      socket?.emit("check_room_exists", newRoomId);
    },
    []
  );
  return (
    <div className={`grow flex flex-col justify-center items-center`}>
      <div className={`flex flex-col gap-4 justify-center items-center`}>
        <h2 className={`text-2xl md:text-4xl`}>Create a room</h2>
        <div className={`flex flex-col gap-1 grow`}>
          <div className={`flex justify-center items-center`}>
            <input
              className={`rounded-l-md h-full px-3 py-1.5 outline-none placeholder:text-blue-500 bg-sky-200 dark:bg-blue-950 duration-300`}
              placeholder="room id"
              type="text"
              name="room_id"
              value={roomId}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createRoom();
                }
              }}
              onChange={roomIdChangeHandler}
            />
            <button
              onClick={createRoom}
              className={`rounded-r-md focus:outline-none border-2 border-l-0 border-blue-200 dark:border-blue-950`}
            >
              <svg
                className={`text-blue-600`}
                width="40"
                height="40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="20"
                  y1="10"
                  x2="20"
                  y2="30"
                  stroke="rgb(37 99 235)"
                  strokeWidth="3"
                />
                <line
                  x1="10"
                  y1="20"
                  x2="30"
                  y2="20"
                  stroke="rgb(37 99 235)"
                  strokeWidth="3"
                />
              </svg>
            </button>
          </div>
          <div>
            <div className={`text-sm absolute text-red-400`}>
              {roomExists.exists && (
                <span>
                  room{" "}
                  <code
                    className={`font-bold border border-red-300 p-0.5 rounded-sm`}
                  >
                    {roomExists.roomId}
                  </code>{" "}
                  already exists
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
