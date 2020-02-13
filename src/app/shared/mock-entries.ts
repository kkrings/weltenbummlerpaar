import { DiaryEntry } from './entry.model';

export const ENTRIES: DiaryEntry[] = [
  {
    _id: '0',
    title: '1st diary entry',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ' +
    'vulputate ac neque in mattis. Integer sit amet placerat quam, quis ' +
    'malesuada orci. Morbi non est ac erat sagittis bibendum. Aliquam erat ' +
    'volutpat. Phasellus a augue luctus, feugiat nisl a, bibendum lacus. ' +
    'Quisque et ullamcorper quam, ut rhoncus elit. Phasellus vel eros eget ' +
    'odio tincidunt faucibus. Pellentesque efficitur turpis porttitor ' +
    'lectus aliquam volutpat. Pellentesque habitant morbi tristique ' +
    'senectus et netus et malesuada fames ac turpis egestas. Vivamus ' +
    'egestas neque eget neque faucibus vestibulum. Interdum et malesuada ' +
    'fames ac ante ipsum primis in faucibus. Integer sit amet venenatis ' +
    'ligula. Sed sed elit dapibus, euismod sem sed, placerat est.',
    country: 'Country name',
    createdAt: (new Date()).toISOString()
  },
  {
    _id: '1',
    title: '2nd diary entry',
    body: 'Proin convallis facilisis dapibus. Etiam accumsan neque a ' +
    'consectetur tempus. Quisque vehicula facilisis lacus non feugiat. Sed ' +
    'eget orci sapien. Sed sollicitudin ex turpis, a tincidunt ligula ' +
    'facilisis eu. Cras nec dolor sit amet lectus facilisis vulputate eu a ' +
    'tellus. In fringilla a tortor vitae lobortis. Mauris ipsum magna, ' +
    'molestie id ullamcorper pellentesque, feugiat quis sapien. ' +
    'Pellentesque eu finibus dolor. Cras hendrerit turpis neque, id porta ' +
    'lectus eleifend eu. Aliquam dictum lectus et gravida scelerisque.',
    country: 'Country name',
    createdAt: (new Date()).toISOString()
  },
  {
    _id: '2',
    title: '3rd diary entry',
    body: 'Donec mattis diam in ligula vulputate tristique. Cras vitae est ' +
    'dapibus, tincidunt augue nec, dignissim tellus. Nunc id justo non ' +
    'tellus sollicitudin elementum. Cras faucibus tellus in augue feugiat, ' +
    'at aliquet augue dictum. Curabitur nec nulla et leo congue laoreet ' +
    'vitae quis nisi. Fusce nisl urna, condimentum et tincidunt venenatis, ' +
    'pulvinar non tellus. Morbi sed tempus odio.',
    country: 'Country name',
    createdAt: (new Date()).toISOString()
  },
  {
    _id: '3',
    title: '4th diary entry',
    body: 'Etiam rutrum eleifend scelerisque. Fusce ex justo, accumsan ' +
    'suscipit venenatis in, porta ac mi. Duis aliquam mauris vitae mi ' +
    'blandit dignissim. Fusce pellentesque eros velit. Integer mollis ' +
    'tempor ex et eleifend. Quisque eleifend leo nec nunc suscipit ' +
    'pellentesque. Mauris enim enim, vestibulum in erat ut, feugiat pretium ' +
    'justo. Ut tincidunt congue libero, sit amet pretium eros. Aenean ' +
    'elementum egestas enim sit amet condimentum. Cras tincidunt metus eget ' +
    'ipsum elementum, non ultricies lorem vehicula. Aenean pulvinar maximus ' +
    'enim et pulvinar. Curabitur eros elit, aliquam id lacus quis, ' +
    'scelerisque maximus nibh. Maecenas imperdiet pharetra mauris eget ' +
    'tincidunt.',
    country: 'Country name',
    createdAt: (new Date()).toISOString()
  }
];
