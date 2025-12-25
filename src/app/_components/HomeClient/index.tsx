'use client';

import { useCallback, useEffect, useState } from "react";
import TopContent from "../Top";
import UserContent from "../User";
import PartnerContent from "../Partner";
import { UserInput } from "@/lib/scoring-tables";
import { useRouter } from "next/navigation";
import { encodeResultToUrl } from "@/lib/scoring-encoder";

export default function HomeClient() {

  const router = useRouter();

  const [userInput, setUserInput] = useState<UserInput>({
    companySize: undefined,
    position: undefined,
    annualIncome: undefined,
    ageGroup: undefined,
  });

  const [partnerInput, setPartnerInput] = useState<UserInput>({
    companySize: undefined,
    position: undefined,
    annualIncome: undefined,
    ageGroup: undefined,
  });

  const [hash, setHash] = useState(() => {
    // Initialize with current hash on mount
    if (typeof window !== 'undefined') {
      return window.location.hash;
    }
    return '';
  });

  useEffect(() => {
    const handleHashChange = () => {
      console.log(window.location.hash);
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleResult = useCallback(() => {
    if (!userInput.ageGroup) return; // ageGroup is required for encodeResultToUrl

    const encoded = encodeResultToUrl({
      user: userInput,
      partner: partnerInput,
    });

    router.push(`/result?data=${encoded}`);
  }, [router, userInput, partnerInput]);

  return (
    <>
      {
        hash === '' ? <TopContent />
        : hash === '#user' ? <UserContent value={userInput} onChange={setUserInput} />
        : hash === '#partner' ? <PartnerContent value={partnerInput} onChange={setPartnerInput} onResult={handleResult} />
        : null
      }
    </>
  );
}