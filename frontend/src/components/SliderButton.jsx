import classNames from "classnames";

const SliderButton = ({ children, onClick, position }) => (
    <button
        onClick={onClick}
        className={classNames(
            "w-10 h-10 grid place-content-center bg-white rounded-full shadow-sm absolute top-1/2 transform -translate-y-1/2 z-[1200] transition-colors duration-100 cursor-pointer hover:bg-gray-200",
            {
              "-left-5": position === "left",
              "-right-5": position === "right",
            }
        )}
    >
      {children}
    </button>
);

export default SliderButton;
