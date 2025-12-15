
function Checkbox({ id, name, value, label, checked, onChange }) {
    return (
        <div className="flex items-center gap-2">
            <input 
                type="checkbox" 
                id={id} 
                name={name} 
                value={value}
                checked={checked}
                onChange={onChange} 
                className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor={id} className="cursor-pointer select-none">
                {label}
            </label>
        </div>
    )
}

export default Checkbox;