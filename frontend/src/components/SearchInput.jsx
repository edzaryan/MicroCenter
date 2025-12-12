import { LuSearch } from "react-icons/lu";

const SearchInput = ({ type = "text", text, onChange, onClick, value }) => {
    return (
        <div className="w-full grid grid-cols-[1fr_60px]">
            <input
                type={type}
                placeholder={text}
                value={value}
                onChange={onChange}
                className="px-4 py-[7px] rounded-l-full border border-gray-400 outline-none
                           border-r-0 focus:border-r-1 focus:shadow-[inset_0_0_3px_rgba(0,0,0,0.2)]
                           focus:border-gray-500 focus:border-[1px] text-[15px] 
                           placeholder:text-gray-500"
            />
            <button 
                type={type}
                onClick={onClick}
                className="grid place-items-center cursor-pointer rounded-r-full transition duration-200 bg-red-600 hover:bg-red-700"
            >
                <LuSearch className="text-white" size={22} />
            </button>
        </div>
    );
};


export default SearchInput;
