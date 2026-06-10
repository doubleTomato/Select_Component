import type { Option } from "../shared/types/select";

 export const options: Option[] = [
    { id: '1', label: '사과' },
    { id: '2', label: '바나나' },
    { id: '3', label: '딸기' },
    { id: '4', label: '망고', disabled: true },
    { id: '5', label: '자몽' },
    { id: '6', label: '용과' },
    { id: '7', label: '레몬' },
    { id: '8', label: '포도', disabled: true },
    { id: '9', label: '리치' },
    { id: '10', label: '수박', disabled: true },
  ];

 export const multiOptions: Option[] = [
    { id: '1', label: '사과' },
    { id: '2', label: '바나나' },
    { id: '3', label: '딸기' },
    { id: '4', label: '망고', disabled: true },
    { id: '5', label: '자몽' },
    { id: '6', label: '용과' },
    { id: '7', label: '레몬' },
    { id: '8', label: '포도', disabled: true },
    { id: '9', label: '리치' },
    { id: '10', label: '수박', disabled: true },
  ];
 export const TreeOption: Option[] = [
  {
    id: 'fruit',
    label: '과일',
    children: [
      { id: 'fruit_1', label: '사과' },
      { id: 'fruit_2', label: '바나나' },
      { id: 'fruit_3', label: '딸기' },
      { id: 'fruit_4', label: '망고' },
      // 자식 노드 비활성화 테스트
      { id: 'fruit_5', label: '자몽 (품절)', disabled: true }, 
      { id: 'fruit_6', label: '용과' },
      { id: 'fruit_7', label: '레몬' },
      { id: 'fruit_8', label: '포도' },
      { id: 'fruit_9', label: '리치' },
      { id: 'fruit_10', label: '수박' },
    ],
  },
  {
    id: 'vegetable',
    label: '채소',
    children: [
      { id: 'veg_1', label: '양상추' },
      { id: 'veg_2', label: '토마토' },
      { id: 'veg_3', label: '당근' },
      { id: 'veg_4', label: '브로콜리' },
      { id: 'veg_5', label: '양파' },
    ],
  },
  {
    id: 'meat',
    label: '육류 (준비중)',
    //  부모 노드 비활성화 테스트
    disabled: true, 
    children: [
      { id: 'meat_1', label: '소고기' },
      { id: 'meat_2', label: '돼지고기' },
      { id: 'meat_3', label: '닭고기' },
      { id: 'meat_4', label: '오리고기' },
    ],
  },
  {
    id: 'seafood',
    label: '해산물',
    children: [
      { id: 'sea_1', label: '연어' },
      { id: 'sea_2', label: '고등어' },
      { id: 'sea_3', label: '오징어 (금어기)', disabled: true },
      { id: 'sea_4', label: '새우' },
    ],
  },
  // 단일 뎁스일 시
  {
    id: 'beverage',
    label: '음료 (하위항목 없음)',
  }
];

// 여러 뎁스가 있는 데이터
export const multiDepthOptions: Option[] = [
  {
    id: "clothing",
    label: "의류 (1 Depth)",
    children: [
      {
        id: "mens",
        label: "남성 의류 (2 Depth)",
        children: [
          {
            id: "mens_top",
            label: "상의 (3 Depth)",
            children: [
              { id: "mens_top_short", label: "반팔 티셔츠 (4 Depth)" },
              { id: "mens_top_long", label: "긴팔 티셔츠 (4 Depth)" },
            ],
          },
          {
            id: "mens_bottom",
            label: "하의 (3 Depth)",
            children: [
              { id: "mens_bottom_jeans", label: "청바지 (품절)", disabled: true },
              { id: "mens_bottom_slacks", label: "슬랙스" },
            ],
          },
        ],
      },
      {
        id: "womens",
        label: "여성 의류 (2 Depth)",
        children: [
          { id: "womens_dress", label: "원피스 (3 Depth)" },
          { id: "womens_skirt", label: "치마 (3 Depth)" },
        ],
      },
    ],
  },
  {
    id: "electronics",
    label: "전자기기 (1 Depth)",
    disabled: true, // 부모 노드 비활성화 테스트
    children: [
      {
        id: "computer",
        label: "컴퓨터 (2 Depth)",
        children: [
          { id: "laptop", label: "노트북 (3 Depth)" },
          { id: "desktop", label: "데스크탑 (3 Depth)" },
        ],
      },
      {
        id: "smartphone",
        label: "스마트폰 (2 Depth / 하위 없음)",
      },
    ],
  },
  {
    id: "furniture",
    label: "가구 (1 Depth / 준비중)",
    disabled: true,
  },
];

/// 테스트 케이스 추가
// 중간 노드가 활성화되어 있지만 자식 노드가 모두 비활성화된 케이스 (부모는 선택 가능하나 자식이 전멸인 경우)
export const mixedDisabledOptions: Option[] = [
  {
    id: "food",
    label: "식품 (1 Depth)",
    children: [
      {
        id: "meat",
        label: "육류 (2 Depth - 모두 품절)",
        disabled: false, // 부모는 선택 가능하나 자식이 전멸인 케이스
        children: [
          { id: "beef", label: "소고기", disabled: true },
          { id: "pork", label: "돼지고기", disabled: true },
        ],
      },
      {
        id: "beverage",
        label: "음료 (2 Depth)",
        children: [
          {
            id: "coffee",
            label: "커피 (3 Depth)",
            children: [
              { id: "americano", label: "아메리카노" },
              { id: "latte", label: "카페라떼", disabled: true }, // 반만 품절
            ],
          },
          {
            id: "tea",
            label: "차 (3 Depth - 전체 품절)",
            disabled: true, // 중간 노드 자체가 막힌 케이스
            children: [
              { id: "green_tea", label: "녹차" },
              { id: "barley_tea", label: "보리차" },
            ],
          },
        ],
      },
    ],
  },
];

// 중간 노드가 막히고 자식은 활성화된 케이스 (중간 노드가 disabled이지만 자식 노드는 disabled가 아닌 경우)
export const middleBlockedOptions: Option[] = [
  {
    id: "sports",
    label: "스포츠 (1 Depth)",
    children: [
      {
        id: "ball_games",
        label: "구기종목 (2 Depth - 점검중)",
        disabled: true, // 중간 다리가 끊어짐
        children: [
          { id: "soccer", label: "축구" }, // 자식은 활성화
          { id: "basketball", label: "농구" },
        ],
      },
      {
        id: "fitness",
        label: "헬스 (2 Depth)",
        children: [
          { id: "dumbbell", label: "덤벨 운동" },
        ],
      },
    ],
  },
];