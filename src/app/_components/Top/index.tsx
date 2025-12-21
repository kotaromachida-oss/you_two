import styles from "./index.module.css"
import Heading from "@/components/Heading"
import Card from "@/components/Card"
import Button from "@/components/Button"
import Tag from "@/components/Tag"


export default function TopContent() {

  return (
    <Card>
      <div className={styles.inner}>
        <Heading level={1}>
          あなたとパートナーの<br />&quot;<span className={styles.accent}>実力</span>&quot;を<br />偏差値で可視化
        </Heading>

        <p>簡単な情報を入力するだけで、<br />お二人の総合的な実力を数値化。<br />客観的な視点から診断します。</p>

        <div className={styles.tags}>
          <Tag size="sm">即時診断</Tag>
          <Tag size="sm">所要2分</Tag>
          <Tag size="sm">年齢別評価</Tag>
        </div>

        <a href="#user">
          <Button variant="primary">診断をはじめる</Button>
        </a>
      </div>
    </Card>
  )
}