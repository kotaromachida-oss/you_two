
import styles from "./index.module.css"

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  prefixIcon?: React.ReactNode;
}

export default function TextField({ placeholder, prefixIcon, ...props }: TextFieldProps) {
  return (
    <div className={styles.inputWrapper}>
      {prefixIcon && <span className={styles.prefixIcon}>{prefixIcon}</span>}
      <input {...props} placeholder={placeholder} />
    </div>
  )
}