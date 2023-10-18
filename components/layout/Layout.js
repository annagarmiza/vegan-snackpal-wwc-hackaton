import Header from "./Header";

const Layout = ({ hideHeaderElements, children }) => {
  return (
    <div>
      <Header hideHeaderElements={hideHeaderElements} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
