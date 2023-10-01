import { Link } from "react-router-dom";

export default function Homepage(): JSX.Element {
  return (
    <main className={`grow`}>
      <nav
        className={`flex w-full px-4 py-3 border-b border-b-slate-300 justify-around items-center`}
      >
        <Link to={`/`}>
          <h3 className={`text-3xl font-bold`}>Ooi</h3>
        </Link>
        <ul className={`flex gap-2 md:gap-4 text-lg`}>
          <li>
            <button className={`bg-blue-600 px-4 py-1 rounded-md text-white`}>
              join
            </button>
          </li>
          <li>
            <button className={`border border-blue-600 px-4 py-1 rounded-md`}>
              create
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
}
