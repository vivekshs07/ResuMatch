'use client';


import { ResumeJdMatcher } from "@/components/resume-jd-matcher";
import { useDataContext } from './context/Datacontext';

export default function Page() {
  const { setData } = useDataContext();
  return (
    <>
    <ResumeJdMatcher setData={setData}/>
    {/* <MatchResultsComponent/> */}
    </>
  );
}
