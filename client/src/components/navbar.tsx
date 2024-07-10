import logo from "../assets/logo.svg";
import search from "../assets/search.svg";

function Navbar() {
  return (
    <section className="flex justify-between items-center p-2">
      <div>
        <img src={logo} alt="Blogna Logo" />
      </div>
      <div className="flex line-height-[28px] items-center relative max-w-[190px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <img src={search} alt="Search Logo" />
        </div>
        <input
          className="input w-full h-[40px] line-height-[28px] px-[1rem] pl-[2.5rem] border-2 border-transparent rounded-[8px] outline-none bg-[#f3f3f4] text-[#0d0c22] transition-all duration-300 ease-in-out focus:border-[rgba(0,48,73,0.4)] focus:bg-white focus:ring-4 focus:ring-[rgba(0,48,73,0.1)] hover:border-[rgba(0,48,73,0.4)] hover:bg-white"
          type="search"
          placeholder="Search"
        />
      </div>
    </section>
  );
}

export default Navbar;