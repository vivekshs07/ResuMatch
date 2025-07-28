'use client';

import { MatchResultsComponent } from "@/components/match-results";
import { useDataContext } from '../context/Datacontext';
import { MatchUnavailableComponent } from "@/components/match-unavailable";

export default function Page() {
  const { data } = useDataContext();
  return (
    <>
    {data ? <MatchResultsComponent data={data}/> : <MatchUnavailableComponent />}
    </>
  );
}
