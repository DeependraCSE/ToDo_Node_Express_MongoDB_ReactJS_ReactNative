import type { CheckboxInputProps, LabelProps, TextInputProps, ButtonProps, TextClickWithPreTextProps} from "./commonProps"

export const Label = ({htmlFor, text}: LabelProps) => {
    return(<div>
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-600 mb-1">{text}</label>
    </div>)
}

export const TextInput = ( {type, id, placeholder, value, onChange, disable=false} : TextInputProps ) => {
    return(<>
        <input
              type={type} id={id}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={placeholder}
              value={value}
              onChange={(onChange)}
              disabled={disable}
            />
    </>)
}

export const CheckboxInput = ({id, value, checked, onChange} : CheckboxInputProps ) => {
    return(
        <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox" id={id}
                checked={checked} onChange={onChange}               
                className="form-checkbox rounded text-blue-500"
              />
              {value}
            </label>
          </div>
    )
}

export const Button = ({lable, onClick} : ButtonProps) => {
    return(
        <button
            type="button" onClick={onClick}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-200"
          >
            {lable}
          </button>
    )
}

export const TextClickWithPreText = ({text, onClick, preText=""} : TextClickWithPreTextProps) => {
    return(
        <p className="mt-6 text-sm text-center text-gray-600"> 
        {preText}{" "}         
          <button onClick={onClick} className="text-blue-500 hover:underline">
            {text}
          </button>
        </p>
    )
}

export const DeleteButton = ({lable, onClick} : ButtonProps) => {
    return(
        <button
            type="button" onClick={onClick}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition duration-200"
          >
            {lable}
          </button>
    )
}

export const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  );
};