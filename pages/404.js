import Link from "next/link";

const ErrorPage = () => {
  return (
    <div>
      <h1>404 </h1>
      <h2>Page Not Found</h2>
      <Link href="/">Go back to the homepage</Link>
    </div>
  );
};

export default ErrorPage;
