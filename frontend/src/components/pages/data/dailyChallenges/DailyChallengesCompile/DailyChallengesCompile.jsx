import React, { useState } from "react";
import "./DailyChallengesCompile.css";
import DailyChallengePage from "../DailyChallengePage/DailyChallengePage";
import DailyChallengeList from "../DailyChallengeList/DailyChallengeList";

export default function DailyChallengesCompile() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="dcp-root">
      <div className="dcp-bg-blobs">
        <div className="bg-b1"/><div className="bg-b2"/><div className="bg-b3"/>
      </div>

      {selected
        ? <DailyChallengePage challenge={selected} onBack={() => setSelected(null)} />
        : <DailyChallengeList onSelect={setSelected} />
      }
    </div>
  );
}