export const returnRate = () => {
  return [
    {
      nameCouple1: 'EUR/USD',
      nameCouple2: 'USD/EUR',
      couple1: null,
      couple2: null,
    },
    {
      nameCouple1: 'EUR/RUB',
      nameCouple2: 'RUB/EUR',
      couple1: null,
      couple2: null,
    },
    {
      nameCouple1: 'USD/RUB',
      nameCouple2: 'RUB/USD',
      couple1: null,
      couple2: null,
    },
  ];
};

export const returnCopyRate = (
  rate,
  eurUsd,
  usdEur,
  eurRub,
  rubEur,
  usdRub,
  rubUsd
) => {
  return [
    {
      ...rate[0],
      nameCouple1: 'EUR/USD',
      nameCouple2: 'USD/EUR',
      couple1: eurUsd,
      couple2: usdEur,
    },

    {
      ...rate[1],
      nameCouple1: 'EUR/RUB',
      nameCouple2: 'RUB/EUR',
      couple1: eurRub,
      couple2: rubEur,
    },
    {
      ...rate[2],
      nameCouple1: 'USD/RUB',
      nameCouple2: 'RUB/USD',
      couple1: usdRub,
      couple2: rubUsd,
    },
  ];
};
