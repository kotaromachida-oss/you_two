import styles from "./index.module.css"

interface IFormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
}

export default function FormLabel({ children, htmlFor }: IFormLabelProps) {

  const Tag = htmlFor ? "label" : "span";

  return (
    <Tag htmlFor={htmlFor} className={styles.formLabel}>
      {children}
    </Tag>
  )
}