import { Link } from "react-router-dom";
import { MouseEvent, useContext } from "react";
import { socketContext } from "../components/contextproviders/socketprovider";
import { Socket } from "socket.io-client";
import CopyIcon from "../assets/copy.png";

export default function Homepage(): JSX.Element {
  const socket: Socket | null = useContext<Socket | null>(socketContext);

  return (
    <main className={`flex flex-col grow`}>
      <nav
        className={`flex w-full px-4 py-3 border-b border-b-slate-300 justify-around items-center`}
      >
        <Link to={`/`}>
          <h3 className={`text-3xl font-bold`}>Ooi</h3>
        </Link>
        <ul className={`flex gap-2 md:gap-4 text-lg font-semibold`}>
          <li>
            <Link to={`/join`}>
              <div
                className={`border border-blue-600 px-4 py-1 rounded-md text-blue-600`}
              >
                join
              </div>
            </Link>
          </li>
          <li>
            <Link to={`/create`}>
              <div className={`bg-blue-600 px-4 py-1 rounded-md text-white`}>
                create
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <section
        className={`grow flex flex-col items-center justify-center bg-black`}
      >
        <div
          className={`bg-gradient-to-b from-slate-100 to-slate-950 bg-clip-text text-transparent`}
        >
          <h1 className={`text-6xl md:text-8xl font-bold`}>Ooi</h1>
          <div className={`text-xl md:text-3xl`}>
            <div>A fast and simple,</div>
            <div>ananymous messenger</div>
            <div>ananymous messenger</div>
            <div>ananymous messenger</div>
          </div>
        </div>
      </section>
      <section className={`grow flex flex-col justify-center items-center`}>
        <div
          className={`flex flex-col justify-center items-center gap-4 px-8 py-6 border-2 border-slate-300 border-dashed rounded-md`}
        >
          <div className={`text-2xl font-semibold`}>Your ID</div>
          <div
            className={`flex bg-blue-200 ring-blue-100 hover:ring-4 duration-100 font-mono rounded-full whitespace-pre`}
          >
            <div
              onClick={(e: MouseEvent<HTMLDivElement>) => {
                const selection: Selection | null = window.getSelection();
                selection?.selectAllChildren(e.target as Node);
              }}
              className={`px-4 py-3`}
            >
              {socket?.id || `Loading...${Array(10).fill(" ").join("")}`}
            </div>
            <button
              title="copy"
              onClick={() => {
                if (socket?.id) navigator.clipboard.writeText(socket.id);
              }}
              className={`bg-white border-2 border-blue-200 rounded-full w-12 p-2 aspect-square`}
            >
              <img src={CopyIcon} alt="copy" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
