import { IoSearch } from "../utils/imports";


const SearchInput = ({ type = "text", text, onChange, value }) => {
    return (
        <div className="w-full grid grid-cols-[1fr_60px]">
            <input
                type={type}
                placeholder={text}
                value={value}
                onChange={onChange}
                className="px-3 py-1.5 rounded-l-full border border-gray-400 border-r-0"
            />
            <button className="grid place-items-center cursor-pointer rounded-r-full bg-red-600 transition duration-100 border-none hover:bg-red-700">
                <IoSearch className="text-white text-2xl" />
            </button>
        </div>
    );
};


export default SearchInput;
