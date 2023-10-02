import { Link, Outlet } from "react-router-dom";

export default function ChatsPage(): JSX.Element {
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
          <ChatPreview
            name="Yash"
            userId="yash"
            lastMessage={`lorem ipsum dolor sit amet consectetur adipisicing elit`}
            lastMessageTime="now"
          />
          <ChatPreview
            name="Yash"
            userId="yash"
            lastMessage={`lorem ipsum dolor sit amet consectetur adipisicing elit`}
            lastMessageTime="now"
          />
          <ChatPreview
            name="Yash"
            userId="yash"
            lastMessage={`lorem ipsum dolor sit amet consectetur adipisicing elit`}
            lastMessageTime="now"
          />
        </div>
      </div>
      <div className={`flex grow flex-col`}>
        <nav
          className={`flex w-full px-4 py-3 border-b border-b-blue-950 justify-around items-center`}
        >
          <Link to={`/`}>
            <h3 className={`text-3xl font-bold`}>Ooi</h3>
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

interface ChatPreviewProps {
  name: string;
  userId: string;
  lastMessage: string;
  lastMessageTime: string;
}

function ChatPreview({
  name,
  userId,
  lastMessage,
  lastMessageTime,
}: ChatPreviewProps) {
  return (
    <div>
      <Link to={`/chats/${userId}`}>
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
