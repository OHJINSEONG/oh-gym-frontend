import React from 'react';

import ProgressBar from '@ramonak/react-progress-bar';
import { diaryProgressCalculator } from '../utils/DiaryProgressCalculator';

export default function Progress({ diary }) {
  return (
    <div>
      <ProgressBar
        completed={diaryProgressCalculator.calculate(diary)}
        maxCompleted={100}
        width="300px"
        bgColor="rgb(223,134,45)"
      />
    </div>
  );
}
