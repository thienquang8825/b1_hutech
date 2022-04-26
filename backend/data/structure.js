const structure = [
  {
    name: 'READING - WRITING',
    score: 60, //unit is pts
    time: 90, //unit is minute
    part1: {
      name: 'READING',
      score: 60,
      details: [
        {
          name: 'Vocabulary & Grammar',
          score: 10,
        },
        {
          name: 'Signs',
          score: 5,
        },
        {
          name: 'Reading Comprehension',
          score: 5,
        },
        {
          name: 'Cloze text',
          score: 10,
        },
      ],
    },
    part2: {
      name: 'WRITING',
      score: 30,
      details: [
        {
          name: 'Sentence Transformation ',
          score: 10,
        },
        {
          name: 'Writing emails, letter, essays',
          score: 20,
        },
      ],
    },
  },
  {
    name: 'LISTENING',
    score: 20,
    time: 30,
  },
  {
    name: 'SPEAKING',
    score: '20',
    time: '15',
  },
]

export default structure
