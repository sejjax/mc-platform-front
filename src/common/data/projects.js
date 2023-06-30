const projects = [
  {
    id: 0,
    img: 'img1',
    name: 'New admin Design',
    description: 'It will be as simple as Occidental',
    startDate: '08 Sept, 2019',
    dueDate: '08 Sept, 2021',
    apy: 20,
    type: 'investment',
    risk: 2,
    projectDetails: {
      description:
        'To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,',
      points: [
        'To achieve this, it would be necessary',
        'Separate existence is a myth.',
        'If several languages coalesce',
      ],
    },
  },
  {
    id: 1,
    img: 'img2',
    name: 'Brand logo design',
    description: 'To achieve it would be necessary',
    dueDate: '2019-10-22',
    startDate: '08 Sept, 2019',
    apy: 20,
    type: 'staking',
    risk: 2,
    projectDetails: {
      description:
        'To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,',
      points: [
        'To achieve this, it would be necessary',
        'Separate existence is a myth.',
        'If several languages coalesce',
      ],
    },
  },
  {
    id: 2,
    img: 'img3',
    name: 'New Landing Design',
    description: 'For science, music, sport, etc',
    dueDate: '08 Sept, 2019',
    startDate: '08 Sept, 2022',
    apy: 18,
    type: 'investment',
    risk: 2,
    projectDetails: {
      description:
        'To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,',
      points: [
        'To achieve this, it would be necessary',
        'Separate existence is a myth.',
        'If several languages coalesce',
      ],
    },
  },
  {
    id: 3,
    img: 'img4',
    name: 'Redesign - Landing page',
    description: 'If several languages coalesce',
    startDate: '08 Sept, 2019',
    dueDate: '08 Sept, 2019',
    apy: 18,
    type: 'investment',
    risk: 1,
    projectDetails: {
      description:
        'To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,',
      points: [
        'To achieve this, it would be necessary',
        'Separate existence is a myth.',
        'If several languages coalesce',
      ],
    },
  },
  {
    id: 4,
    img: 'img5',
    name: 'Skote Dashboard UI',
    description: 'Separate existence is a myth',
    dueDate: '08 Sept, 2019',
    startDate: '08 Sept, 2019',
    apy: 10,
    type: 'investment-pro',
    risk: 1,
    projectDetails: {
      description:
        'To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,',
      points: [
        'To achieve this, it would be necessary',
        'Separate existence is a myth.',
        'If several languages coalesce',
      ],
    },
  },
  {
    id: 5,
    img: 'img6',
    name: 'Blog Template UI',
    description: 'For science, music, sport, etc',
    dueDate: '08 Sept, 2019',
    startDate: '08 Sept, 2021',
    apy: 10,
    type: 'investment',
    risk: 0,
    projectDetails: {
      description:
        'To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,',
      points: [
        'To achieve this, it would be necessary',
        'Separate existence is a myth.',
        'If several languages coalesce',
      ],
    },
  },
  {
    id: 6,
    img: 'img3',
    name: 'Multipurpose Landing',
    description: 'It will be as simple as Occidental',
    startDate: '08 Sept, 2020',
    dueDate: '2019-10-15',
    apy: 20,
    type: 'statement',
    risk: 0,
  },
  {
    id: 7,
    img: 'img4',
    name: 'App Landing UI',
    description: 'It will be as simple as Occidental',
    startDate: '08 Sept, 2019',
    dueDate: '08 Sept, 2020',
    apy: 22,
    type: 'investment',
    risk: 1,
    projectDetails: {
      description:
        'To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,',
      points: [
        'To achieve this, it would be necessary',
        'Separate existence is a myth.',
        'If several languages coalesce',
      ],
    },
  },
  {
    id: 8,
    img: 'img2',
    name: 'New admin Design',
    description: 'Their most common words.',
    apy: 20,
    startDate: '08 Sept, 2019',
    dueDate: '08 Sept, 2021',
    type: 'investment',
    risk: 1,
    projectDetails: {
      description:
        'To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,',
      points: [
        'To achieve this, it would be necessary',
        'Separate existence is a myth.',
        'If several languages coalesce',
      ],
    },
  },
];

const options = {
  chart: {
    height: 290,
    type: 'area',
    toolbar: {
      show: !1,
    },
  },
  stroke: {
    curve: 'smooth',
  },
  plotOptions: {
    bar: {
      columnWidth: '14%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: !1,
  },
  series: [
    {
      name: 'APY Changing',
      data: [42, 56, 40, 64, 26, 42, 56, 35, 62],
    },
  ],
  grid: {
    yaxis: {
      lines: {
        show: !1,
      },
    },
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-10-19T00:00:00.000Z',
      '2018-11-19T00:00:00.000Z',
      '2018-12-19T00:00:00.000Z',
      '2019-01-19T00:00:00.000Z',
      '2019-02-19T00:00:00.000Z',
      '2019-03-19T00:00:00.000Z',
      '2019-04-19T00:00:00.000Z',
      '2019-07-19T00:00:00.000Z',
    ],
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value + '%';
      },
    },
  },
  x: {
    format: 'MM',
  },
  tooltip: {
    y: {
      formatter: function (value) {
        return value.toFixed(0) + '%';
      },
    },
  },
  colors: ['#556ee6'],
};

const series = [
  {
    name: 'APY Changing',
    data: [42, 56, 40, 64, 26, 42, 56, 35, 62],
  },
];

export { projects, options, series };
