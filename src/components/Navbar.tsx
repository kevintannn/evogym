import Logo from "@/assets/Logo.png";
import Link from "./Link";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import ActionButton from "./ActionButton";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isTopOfPage: boolean;
};

const Navbar = ({ selectedPage, setSelectedPage, isTopOfPage }: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

  const flexBetween = "flex items-center justify-between";
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

  return (
    <nav>
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-50 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6 gap-16`}>
          {/* LEFT SIDE */}
          <img src={Logo} alt="logo" />

          {/* RIGHT SIDE */}
          {isAboveMediumScreens ? (
            <div className={`${flexBetween} w-full`}>
              {/* INNER LEFT SIDE */}
              <div className={`${flexBetween} gap-8 text-sm`}>
                {["Home", "Benefits", "Our Classes", "Contact Us"].map(
                  (item, idx) => (
                    <Link
                      key={idx}
                      page={item}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  ),
                )}
              </div>

              {/* INNER RIGHT SIDE */}
              <div className={`${flexBetween} gap-8`}>
                <a href="#">Sign In</a>
                <ActionButton setSelectedPage={setSelectedPage}>
                  Become a Member
                </ActionButton>
              </div>
            </div>
          ) : (
            <button
              className="rounded-full bg-secondary-500 p-2"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Bars3Icon className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed bottom-0 right-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="mr-[20%] flex flex-col gap-10 text-right text-2xl">
            {["Home", "Benefits", "Our Classes", "Contact Us"].map(
              (item, idx) => (
                <Link
                  key={idx}
                  page={item}
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
