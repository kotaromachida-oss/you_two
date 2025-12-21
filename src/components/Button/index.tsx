import styles from "./index.module.css"

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", children, ...props }: IButtonProps) {
  return (
    <button className={styles[variant]} {...props}>{children}</button>
  )
}