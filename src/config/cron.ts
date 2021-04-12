export const scheduleConfig = {
  checkNotReturnedUmbrellas: '0 * * * * ', // every 0 minute in hour
  deleteUnfinishedEscortRequests: '0 1 * * *', // every 01:00 am
  seekerReminder: '0 12 */2 * *', // at 12:00 am every two days
};
