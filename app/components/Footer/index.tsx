import { FiInstagram } from "react-icons/fi";
import AppFooterCopyright from "./AppFooterCopyright";

function AppFooter() {
  return (
    <div className="container mx-auto">
      <div className="py-8 border-t border-border-dimmed">
        {/* Footer social links */}
        {/* <div className="font-medium flex flex-col justify-center items-center mb-12 sm:my-10">
          <p className="text-xl sm:text-2xl text-text-secondary mb-5">
            Follow Me
          </p>
          <ul className="">
            <a
              href={"https://www.instagram.com/makeitlook_"}
              target="__blank"
              className="cursor-pointer rounded-lgshadow-sm duration-300 shadow"
            >
              <FiInstagram className="h-8 w-8 text-elements-primary-main" />
            </a>
          </ul>
        </div> */}

        <AppFooterCopyright />
      </div>
    </div>
  );
}

export default AppFooter;
