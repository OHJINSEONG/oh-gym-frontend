export default class DiaryProgressCalculator {
  calculate(diary) {
    const setCount = diary.exerciseInformations
      ?.reduce((acc, cur) => acc + cur.sets.length, 0);

    const unCompleteCount = diary.exerciseInformations?.reduce((acc, cur) => acc + cur.sets.filter((e) => e.status === 'COMPLETE').length, 0);

    const completed = Math.floor((unCompleteCount / setCount) * 1000) / 10;

    return completed;
  }
}

export const diaryProgressCalculator = new DiaryProgressCalculator();
