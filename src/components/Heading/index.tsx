import styles from "./index.module.css"

interface IHeadingProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function Heading({ children, level }: IHeadingProps) {

  const HeadingTag = `h${level}` as React.ElementType;
  const className = level === 1 ? styles[`heading-level-1`] : styles[`heading-level-${level}`];

  return (
    <HeadingTag className={className}>{children}</HeadingTag>
  )
}