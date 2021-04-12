export const cronConfig = {
  checkNotReturnedUmbrellas: {
    cronTime: '0 * * * * ',
    timezone: 'America/Los_Angeles',
  },
  deleteUnfinishedEscortRequests: {
    cronTime: '0 1 * * *',
    timezone: 'America/Los_Angeles',
  },
  seekerReminder: {
    cronTime: '0 12 */2 * *',
    timezone: 'America/Los_Angeles',
  },

};
