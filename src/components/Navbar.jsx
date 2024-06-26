import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <header className="bg-blue-500  h-20 flex justify-between items-center px-4 font-semibold text-white">
      <h1>SP</h1>
      <NavLinks />
    </header>
  );
};

export default Navbar;
