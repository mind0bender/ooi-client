import { Link } from "react-router-dom";

export default function PageNotFound(): JSX.Element {
  return (
    <div className={`flex flex-col justify-center items-center grow gap-12`}>
      <div className={`flex flex-col gap-4 justify-center items-center`}>
        <h1 className={`text-4xl md:text-6xl font-bold`}>404</h1>
        <code
          className={`whitespace-pre border-l-4 border-l-red-400 bg-slate-800 text-slate-200 px-4 py-3 rounded-md`}
        >
          {`{
    "error": {
        "code": 404,
        "message": "Page not found"
    }
}`}
        </code>
      </div>
      <Link to={`/`}>
        <div
          className={`border border-blue-600 px-4 py-1 rounded-md text-blue-600`}
        >
          Go home
        </div>
      </Link>
    </div>
  );
}
