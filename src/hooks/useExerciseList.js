export default function useExerciseList() {
  const exerciseList = [
    {
      id: 1, img: 'https://user-images.githubusercontent.com/107606892/212608490-80b15b0c-6111-48b0-aa33-3563ed0d87c9.png', type: '등', name: '풀업',
    },
    {
      id: 2, img: 'https://user-images.githubusercontent.com/107606892/212609356-86a3674a-1728-4754-8398-9ea720cec446.png', type: '등', name: '바벨 로우',
    },
    {
      id: 3, img: 'https://user-images.githubusercontent.com/107606892/212609914-64f991b9-199e-49d4-93f9-b9005352f103.png', type: '등', name: '덤벨 로우',
    },
    {
      id: 4, img: 'https://user-images.githubusercontent.com/107606892/212611136-228fa5c6-961e-4110-9e03-5c3c5f66c0d0.png', type: '등', name: '랙 풀',
    },
    {
      id: 5, img: 'https://user-images.githubusercontent.com/107606892/212609875-b33f20af-814c-433a-b7e6-5013780bac2f.png', type: '등', name: '시티드 케이블 로우',
    },
    {
      id: 6, img: 'https://user-images.githubusercontent.com/107606892/212609685-40a24380-ae79-4bc7-9779-ed59f989556f.png', type: '등', name: '랫풀다운',
    },
    {
      id: 7, img: 'https://user-images.githubusercontent.com/107606892/212610674-f7c86e6b-1be7-447b-b256-986527103faf.png', type: '등', name: '친업',
    },
    {
      id: 8, img: 'https://user-images.githubusercontent.com/107606892/212609187-c2f899b7-1000-4836-b5f6-164e918bd3a9.png', type: '등', name: '어시스트 풀업',
    },
    {
      id: 9, img: 'https://user-images.githubusercontent.com/107606892/212608821-54ebefd7-9129-4307-944a-0ad6b3af5045.png', type: '등', name: '바벨 스모 데드리프트',
    },
    {
      id: 10, img: 'https://user-images.githubusercontent.com/107606892/212610369-5c0ebbea-6783-4843-ab93-904be89f0449.png', type: '등', name: '머신 하이 로우',
    },
    {
      id: 11, img: 'https://user-images.githubusercontent.com/107606892/212610092-36a8390c-2619-415d-87fb-58077c256c97.png', type: '등', name: '루마니안 데드리프트',
    },
    {
      id: 12, img: 'https://user-images.githubusercontent.com/107606892/212609031-72db066b-7f61-413b-ae4e-910f0fa27ab9.png', type: '등', name: '머신 원암 로우',
    },
    {
      id: 13, img: 'https://user-images.githubusercontent.com/107606892/212609511-120be818-47ca-4aa4-8f85-ae09df1de24b.png', type: '등', name: '데드리프트',
    },
    {
      id: 14, img: 'https://user-images.githubusercontent.com/107606892/212611275-a4cb04b1-1bb0-4ca0-b69b-2ea0ee68dda7.png', type: '등', name: '하이퍼익스텐션',
    },
    {
      id: 15, img: 'https://user-images.githubusercontent.com/107606892/212610306-ef424cd2-1ac3-4204-8f10-7c5f3eb34380.png', type: '등', name: '인버티드 로우',
    },
    {
      id: 31, img: 'https://user-images.githubusercontent.com/107606892/212612834-b2141adb-9519-448c-b175-75fc7458c600.png', type: '어깨', name: '시티드 덤벨 리버스 플라이',
    },
    {
      id: 32, img: 'https://user-images.githubusercontent.com/107606892/212611598-76544856-0179-4092-aabb-edd0f5e5e08f.png', type: '어깨', name: '바벨 숄더 프레스',
    },
    {
      id: 33, img: 'https://user-images.githubusercontent.com/107606892/212612598-32301731-dbb9-4cd1-a80f-a942c0911b7c.png', type: '어깨', name: '케이블 프론트 레이즈',
    },
    {
      id: 34, img: 'https://user-images.githubusercontent.com/107606892/212614522-1be0145d-c12f-4cc3-ac85-f9a9f071c672.png', type: '어깨', name: '덤벨 프론트 레이즈',
    },
    {
      id: 36, img: 'https://user-images.githubusercontent.com/107606892/212612404-eccd6192-7efc-40f2-ab17-eaa59192347c.png', type: '어깨', name: '바벨 프론트 레이즈',
    },
    {
      id: 37, img: 'https://user-images.githubusercontent.com/107606892/212613967-5908400a-3fd7-4f61-84ff-a6417b262441.png', type: '어깨', name: '플래이트 프론트 레이즈',
    },
    {
      id: 38, img: 'https://user-images.githubusercontent.com/107606892/212613503-8f1c5147-2425-4094-80cd-9865d592e396.png', type: '어깨', name: '덤벨 숄더 프레스',
    },
    {
      id: 39, img: 'https://user-images.githubusercontent.com/107606892/212612081-4f747def-10aa-41cc-a35b-d49515ea962f.png', type: '어깨', name: '덤벨 레터럴 레이즈',
    },
    {
      id: 40, img: 'https://user-images.githubusercontent.com/107606892/212612274-777de050-0a75-427e-8711-4ada7d589799.png', type: '어깨', name: '비하인드 넥프레스',
    },
    {
      id: 41, img: 'https://user-images.githubusercontent.com/107606892/212614130-282490af-db2f-4f6f-a24a-e6a76c8b247a.png', type: '어깨', name: '페이스 풀',
    },
    {
      id: 42, img: 'https://user-images.githubusercontent.com/107606892/212611885-2dc5890d-1e83-4a32-af1a-ba8abfacc1c3.png', type: '어깨', name: '업라이트 로우',
    },
    {
      id: 43, img: 'https://user-images.githubusercontent.com/107606892/212614824-e6b23cf2-c910-4f95-bdbe-5bfae5e57c86.png', type: '어깨', name: '아놀드 프레스',
    },
    {
      id: 45, img: 'https://user-images.githubusercontent.com/107606892/212615832-c5e6bcf7-a5cd-4cfc-b6f1-0e0224e763df.png', type: '팔', name: '덤벨 해머컬',
    },
    {
      id: 46, img: 'https://user-images.githubusercontent.com/107606892/212615420-d0af8c52-dc41-4693-b34a-b76fe4c819b7.png', type: '팔', name: '덤벨 킥백',
    },
    {
      id: 47, img: 'https://user-images.githubusercontent.com/107606892/212615190-6f9c7ac7-af7c-4826-aa07-c66dc5c27741.png', type: '팔', name: '덤벨 컬',
    },
    {
      id: 48, img: 'https://user-images.githubusercontent.com/107606892/212615522-7883e726-28a5-41cd-9773-9e0e34a4fa20.png', type: '팔', name: '이지바 컬',
    },
    {
      id: 49, img: 'https://user-images.githubusercontent.com/107606892/212616245-222c7bbd-10bf-4a06-8b4d-38c9172d5a5f.png', type: '팔', name: '케이블 컬',
    },
    {
      id: 50, img: 'https://user-images.githubusercontent.com/107606892/212616410-5d8d5dc0-204a-4860-80f7-1b942dfaecce.png', type: '팔', name: '바벨 프리쳐 컬',
    },
    {
      id: 51, img: 'https://user-images.githubusercontent.com/107606892/212615109-c2fb61b6-2dab-482e-8d03-fe210d0857b4.png', type: '팔', name: '덤벨 프리쳐 컬',
    },
    {
      id: 53, img: 'https://user-images.githubusercontent.com/107606892/212617657-1efde65c-36b5-49c2-b3c1-a22fdb10d8ae.png', type: '팔', name: '클로즈 그립 벤치프레스',
    },
    {
      id: 54, img: 'https://user-images.githubusercontent.com/107606892/212616074-b08cf7ef-357e-41d6-852a-cccab0b8c273.png', type: '팔', name: '케이블 익스텐션',
    },
    {
      id: 55, img: 'https://user-images.githubusercontent.com/107606892/212615693-1aba6c5d-e0f2-4812-ba73-c50d612fa870.png', type: '팔', name: '케이블 트라이셉 푸쉬다운',
    },
    {
      id: 56, img: 'https://user-images.githubusercontent.com/107606892/212616748-1912a313-c72c-4438-b96b-e2ea0abf8998.png', type: '팔', name: '클로즈 그립 푸쉬업',
    },
    {
      id: 57, img: 'https://user-images.githubusercontent.com/107606892/212618274-af4aabb9-48c1-41b8-bdec-99ce21a34078.png', type: '가슴', name: '벤치프레스',
    },
    {
      id: 58, img: 'https://user-images.githubusercontent.com/107606892/212618719-0f9406e9-34e6-4a78-92b3-fc0c7f4ce624.png', type: '가슴', name: '펙덱 플라이 머신',
    },
    {
      id: 59, img: 'https://user-images.githubusercontent.com/107606892/212617826-70e7add8-235a-467f-8134-97124020285c.png', type: '가슴', name: '푸쉬업',
    },
    {
      id: 60, img: 'https://user-images.githubusercontent.com/107606892/212618622-a853b649-b4c1-4f43-bf0f-7c641877ea9e.png', type: '가슴', name: '덤벨 플라이',
    },
    {
      id: 61, img: 'https://user-images.githubusercontent.com/107606892/212617914-b6975493-f0f2-4312-af41-47cebe9e0171.png', type: '가슴', name: '덤벨 벤치프레스',
    },
    {
      id: 62, img: 'https://user-images.githubusercontent.com/107606892/212618534-2adbdc55-85a2-4a32-b3d6-62368fbf71ed.png', type: '가슴', name: '인클라인 벤치프레스 머신',
    },
    {
      id: 63, img: 'https://user-images.githubusercontent.com/107606892/212618169-adbbeb7b-e2aa-4781-b1ea-4bbc344bcee8.png', type: '가슴', name: '딥스',
    },
    {
      id: 64, img: 'https://user-images.githubusercontent.com/107606892/212619086-89f68dc5-5b3f-4bf2-a285-8f64b5f31be2.png', type: '가슴', name: '인클라인 스미스 벤치 프레스',
    },
    {
      id: 65, img: 'https://user-images.githubusercontent.com/107606892/212618948-20831331-003c-412e-ac9a-6bab48116d83.png', type: '가슴', name: '인클라인 덤벨 플라이',
    },
    {
      id: 66, img: 'https://user-images.githubusercontent.com/107606892/212618393-8e0d1916-3ee8-48b7-8280-2b18dec78baf.png', type: '가슴', name: '디클라인 벤치프레스',
    },
    {
      id: 67, img: 'https://user-images.githubusercontent.com/107606892/212618090-99c35bee-c273-4b59-84ed-79edabc29d98.png', type: '가슴', name: '덤벨 풀오버',
    },
    {
      id: 69, img: 'https://user-images.githubusercontent.com/107606892/212619905-68c65ad7-107f-40f4-88f8-850e0d47182f.png', type: '하체', name: '바벨 스쿼트',
    },
    {
      id: 70, img: 'https://user-images.githubusercontent.com/107606892/212622167-1fc53c49-0f9e-459d-9685-a13e11a149f7.png', type: '하체', name: '바벨 힙 쓰러스트',
    },
    {
      id: 71, img: 'https://user-images.githubusercontent.com/107606892/212622334-9ed34577-5622-43c7-82ca-dcf5b09925a1.png', type: '하체', name: '스쿼트',
    },
    {
      id: 72, img: 'https://user-images.githubusercontent.com/107606892/212621649-61df6db7-54b1-46c1-a1a2-55ed4530a4e8.png', type: '하체', name: '스티프 데드리프트',
    },
    {
      id: 73, img: 'https://user-images.githubusercontent.com/107606892/212620511-1643b6c9-d383-419b-9273-c903ab9c1d6c.png', type: '하체', name: '머신 힙 어브덕션',
    },
    {
      id: 74, img: 'https://user-images.githubusercontent.com/107606892/212620636-1a07b3a3-816a-4f93-8aa7-25d86fee45d3.png', type: '하체', name: '핵 스쿼트 머신',
    },
    {
      id: 75, img: 'https://user-images.githubusercontent.com/107606892/212619336-97143906-298d-40c2-998d-e04668de9389.png', type: '하체', name: '레그 프레스',
    },
    {
      id: 76, img: 'https://user-images.githubusercontent.com/107606892/212620350-48b6558a-74ca-431c-b2ba-14e3d584841f.png', type: '하체', name: '카프 레이즈',
    },
    {
      id: 77, img: 'https://user-images.githubusercontent.com/107606892/212620964-1ed33fc8-5065-48dd-9f76-2c0f3a10a71c.png', type: '하체', name: '덤벨 런지',
    },
    {
      id: 78, img: 'https://user-images.githubusercontent.com/107606892/212619790-cd27c4e3-f26d-44a7-b288-bca9d694a7e8.png', type: '하체', name: '레그 컬',
    },
    {
      id: 79, img: 'https://user-images.githubusercontent.com/107606892/212619718-76783034-3fc9-4421-b371-c216d7a93a77.png', type: '하체', name: '레그 익스텐션 머신',
    },
    {
      id: 80, img: 'https://user-images.githubusercontent.com/107606892/212620419-ddc3e057-fdca-4251-af6a-da34736f3bef.png', type: '하체', name: '점프 스쿼트',
    },
  ];

  return exerciseList;
}
