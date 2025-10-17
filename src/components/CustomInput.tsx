
function CustomInput({ label, name, value, onChange, type = "text", placeholder, className }) {
    return (
    <div className="input-container">
        {label && <label htmlFor={name} className="">{label}</label>}
        <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="all-inputs"
        />
    </div>
    )
}

export default CustomInput
