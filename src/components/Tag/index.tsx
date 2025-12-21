import styles from "./index.module.css"

interface TagProps {
  size?: "sm" | "md";
  children: React.ReactNode;
}

export default function Tag({ size = "sm", children }: TagProps) {

  const sizeClassName = size === "sm" ? styles.tag_sm : styles.tag_md;
  return (
    <span className={sizeClassName}>{children}</span>
  )
}