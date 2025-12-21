import styles from "./index.module.css"

export default function FormWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={styles.formWrapper + " " + className}>
      {children}
    </div>
  )

}