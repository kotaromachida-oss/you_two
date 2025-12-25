"use client"
import styles from "./index.module.css"
import Heading from "@/components/Heading"
import Card from "@/components/Card"
import Button from "@/components/Button"
import IconUser from "@/components/Icons/user"
import FormWrapper from "@/components/FormWrapper"
import FormLabel from "@/components/FormLabel"
import RadioButton from "@/components/RadioButton"
import Select from "@/components/Select"
import { AGE_GROUP_OPTIONS, AgeGroup, AnnualIncome, COMPANY_SIZE_COEFFICIENTS, CompanySize, INCOME_GROUP_OPTIONS, Position, POSITION_COEFFICIENTS, UserInput } from "@/lib/scoring-tables"
import { useCallback } from "react"

interface UserContentProps {
  value: UserInput;
  onChange: (value: UserInput) => void;
}

export default function UserContent({ value, onChange }: UserContentProps) {

  const handleChangeCompanySize = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, companySize: e.target.value as CompanySize });
  }, [value, onChange]);

  const handleChangePosition = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, position: e.target.value as Position });
  }, [value, onChange]);

  const handleChangeAnnualIncome = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, annualIncome: e.target.value as AnnualIncome });
  }, [value, onChange]);

  const handleChangeAgeGroup = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, ageGroup: e.target.value as AgeGroup });
  }, [value, onChange]);

  const handleNext = useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    console.log(value);

    if (!value.companySize || !value.position || !value.annualIncome || !value.ageGroup) {
      alert("すべての項目を入力してください");
      return;
    }

    window.location.hash = "#partner";

  }, [value]);

  return (
    <Card>
      <div className={styles.inner}>
        <Heading level={2}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
            <IconUser size={24} />
            <span>本人情報(1/2)</span>
          </div>
        </Heading>

        <FormWrapper>
          <FormLabel htmlFor="">所属企業の社員数</FormLabel>
          <Select name="userCompanySize" id="userCompanySize" value={value.companySize} onChange={handleChangeCompanySize}>
            <option value="">-</option>
            {
              COMPANY_SIZE_COEFFICIENTS.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))
            }
          </Select>
        </FormWrapper>

        <FormWrapper>
          <FormLabel htmlFor="">役職</FormLabel>
          <Select name="userPosition" id="userPosition" value={value.position} onChange={handleChangePosition}>
            <option value="">-</option>
            { 
              POSITION_COEFFICIENTS.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))
            }
          </Select>
        </FormWrapper>

        <FormWrapper>
          <FormLabel htmlFor="">年収</FormLabel>
          <Select name="userIncome" id="userIncome" value={value.annualIncome} onChange={handleChangeAnnualIncome}>
            <option value="">-</option>
            {
              INCOME_GROUP_OPTIONS.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))
            }
          </Select>
        </FormWrapper>

        <FormWrapper>
          <FormLabel>年齢帯</FormLabel>
          <ul className={styles.ageList}>
            {
              AGE_GROUP_OPTIONS.map((item) => (
                <li key={item.value}>
                  <RadioButton
                    name="userAge"
                    id={`userAge-${item.value}`}
                    value={item.value}
                    checked={value.ageGroup === item.value}
                    label={item.label}
                    onChange={handleChangeAgeGroup}
                  />
                </li>
              ))
            }
          </ul>
        </FormWrapper>

        <div className={styles.buttonWrapper}>
          <Button variant="primary" onClick={handleNext}>パートナーの情報を入力</Button>
        </div>
      </div>
    </Card>
  )
}