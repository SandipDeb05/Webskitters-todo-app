import Header from "./Header";
import Footer from "./Footer";

const Layout = (props: { children: any }) => {
  const { children } = props;
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
