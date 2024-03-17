type AccountsType = {
  accountName: string;
  accountCode: string;
};

export type OrgType = {
  accounts: AccountsType[];
};

type EventsType = {
  eventName: string;
  eventId: string;
};

export type EventType = {
  events: EventsType[];
};

type SeriesTypes = {
  seriesName: string;
  seriesId: string;
};

export type SeriesType = {
  series: SeriesTypes[];
};

export const formatOrgs = (data: OrgType) => {
  if (data) {
    return data.accounts.map((org) => {
      return {
        label: org.accountName,
        value: org.accountCode,
      };
    });
  }
};

export const formatEventData = (data: EventType) => {
  if (data) {
    return data.events
      .filter((event) => event.eventName.toLowerCase().includes("series"))
      .map((event) => {
        return {
          label: event.eventName,
          value: event.eventId,
        };
      });
  }
};

export const formatSeriesData = (data: SeriesType) => {
  if (data) {
    return data.series.map((series) => {
      return {
        label: series.seriesName,
        value: series.seriesId,
      };
    });
  }
};

// let arr1: { label: string; value: string }[] = [];
// export const formatEventData = (data: EventType) => {
//   if (data) {
//     return data.events
//       .filter((event) => event.eventName.toLowerCase().includes("series"))
//       .map((event) => {
//         arr1.push({
//           label: event.eventName,
//           value: event.eventId,
//         });
//       });
//   }
//   console.log({ arr1 });
//   return arr1;
// };

// let arr2: { label: string; value: string }[] = [];
// export const formatSeriesData = (data: SeriesType) => {
//   if (data) {
//     return data.series.map((series) => {
//       arr2.push({
//         label: series.seriesName,
//         value: series.seriesId,
//       });
//     });
//   }
//   return arr2;
// };

// type MergedType = {
//   label: string
//   id: string
// }
// export const formatMergedData = (data: MergedType) => {
//   if (data) {
//     return data.map((series) => {
//       return {
//         label: series.seriesName,
//         value: series.seriesId,
//       };
//     });
//   }
// };
