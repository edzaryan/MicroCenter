import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const NavLink = ({ to, variant, children }) => (
    <Link
        to={to}
        className={classNames(
            "inline-block rounded-full transition-colors duration-200",
            {
                "px-4 py-1 text-white bg-blue-600 hover:bg-blue-700": variant === 'primary',
                "px-4 py-1 text-white bg-red-600 hover:bg-red-700": variant === 'danger',
                "underline text-black hover:no-underline p-0": variant === 'underlined',
                "p-0": !variant,
            }
        )}
    >
        {children}
    </Link>
);

export default NavLink;
