"use client";

const Navbar =  () => {

	const handleClick = () => {
		const sidebar = document.querySelector("#sidebar");
		if (sidebar) {
			if (sidebar.classList.contains("hidden")) {
				sidebar.classList.remove("hidden");
			} else {
                sidebar.classList.add("hidden");
			}
		}
	};

	return (
		<nav
			id="topbar"
			className={`topbar border-b dark:border-slate-700/40 sticky top-0 inset-x-0 transition-all duration-300 block print:hidden z-50 $`}
		>
			<div className="mx-0 flex max-w-full flex-wrap items-center py-2 px-4 lg:mx-auto relative2">
				<button
                    onClick={handleClick}
					className="group button-menu-mobile flex flex-col justify-around md:me-0 relative p-2 w-10 aspect-square"
				>
                    <span className="line block w-6 h-[3px] bg-black transition-all duration-200 group-hover:w-3"></span>
                    <span className="block w-3 h-[3px] bg-black transition-all duration-200 group-hover:w-6"></span>
                    <span className="block w-5 h-[3px] bg-black transition-all duration-200 group-hover:w-4"></span>
                </button>
			</div>
		</nav>
	);
};

export default Navbar;
