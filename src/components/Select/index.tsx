
import styles from "./index.module.css"

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export default function Select({ children, ...props }: ISelectProps) {
  return (
    <label htmlFor={props.id} className={styles.selectWrapper}>
      <select {...props} className={styles.select}>
        {children}
      </select>
    </label>
  )
}