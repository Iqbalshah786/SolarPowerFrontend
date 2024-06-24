import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <header className="h-20 flex justify-between items-center px-4 font-semibold text-white" style={{ backgroundColor: '#21618C' }}>
      <h1>SP</h1>
      <NavLinks />
    </header>
  );
};

export default Navbar;
