import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <h1 className="error-page-title">404 </h1>
      <h2 className="error-page-subtitle">Page Not Found</h2>
      <Link href="/" className="error-page-link">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
