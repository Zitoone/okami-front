
export type CustomInputProps = {
    label?: string,
    name?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    type?: string,
    placeholder?: string
    className?: string
    required?: boolean
}

function CustomInput({ label, name, value, onChange, type = "text", placeholder, required=false }: CustomInputProps) {
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
        required={required}
        />
    </div>
    )
}

export default CustomInput
