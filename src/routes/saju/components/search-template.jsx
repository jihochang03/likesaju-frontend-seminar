import React, { useState } from 'react';
import { SajuLion } from './saju-lion';
import { SajuSearchContainer } from './search-container';

const SajuSearch = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="flex flex-row gap-4 justify-center items-center pb-20">
      <SajuLion step={step} />
      <SajuSearchContainer step={step} setStep={setStep} />
    </div>
  );
};

export default SajuSearch;
