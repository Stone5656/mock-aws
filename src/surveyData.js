export const questions = [
  {
    id: 'q1',
    question: 'この建物は、昭和25年以前から存在していますか？',
    description: '建物のおおよその建築時期を確認してください。',
    yes: 'q2',
    no: 'result_not_target',
  },
  {
    id: 'q2',
    question: '建物の歴史的な外観や特徴を残したいですか？',
    description: '外観、構造、意匠などを保存したい場合を想定しています。',
    yes: 'q3',
    no: 'result_consider',
  },
  {
    id: 'q3',
    question: '用途変更や改修を予定していますか？',
    description: '店舗、宿泊施設、交流施設などへの活用を含みます。',
    yes: 'q4',
    no: 'result_consider',
  },
  {
    id: 'q4',
    question: '安全性を確保するための補強や手続きを検討できますか？',
    description: '専門家への相談や必要な改修を前向きに進められるかを確認します。',
    yes: 'result_possible',
    no: 'result_consider',
  },
];

export const results = {
  result_possible: {
    tone: 'possible',
    icon: '✓',
    title: '条例活用を検討できる可能性があります',
    description:
      '建物の歴史的な特徴を残しながら活用する方法について、制度の利用を検討できる可能性があります。',
  },
  result_consider: {
    tone: 'consider',
    icon: 'i',
    title: '一度相談してみることをおすすめします',
    description:
      '条件によって利用できる制度が異なるため、建物の情報を整理したうえで確認することをおすすめします。',
  },
  result_not_target: {
    tone: 'outside',
    icon: '×',
    title: '今回の条件では対象外の可能性があります',
    description:
      '入力された条件では、この条例を利用するケースには当てはまらない可能性があります。',
  },
};
