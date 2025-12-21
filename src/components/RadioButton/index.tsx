
import styles from "./index.module.css"

interface IRadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  value: string;
  label: string;
}

export default function RadioButton({ id, name, value, label, ...props }: IRadioButtonProps) {
  return (
    <label className={styles.radioButton} htmlFor={id}>
      <input type="radio" id={id} name={name} value={value} {...props} />
      <span>{label}</span>  
    </label>
  )
}