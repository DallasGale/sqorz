type AccountsType = {
  accountName: string;
  accountCode: string;
};

export type OrgType = {
  accounts: AccountsType[];
};

type EventType = {
  eventName: string;
  eventId: string;
};

export type EventsType = {
  events: EventType[];
};

type SeriesTypes = {
  seriesName: string;
  seriesId: string;
};

export type SeriesType = {
  series: SeriesTypes[];
};

export type ClassType = {
  className: string;
  classCode: string;
  competitorRankSummaries: { firstName: string; lastName: string }[];
};

export type ClassesType = {
  classRanks: ClassType[];
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

export const formatEventData = (data: EventsType) => {
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

export const formatEventGroupedData = (data: EventsType) => {
  if (data) {
    return data.events
      .filter((event) => event.eventName.toLowerCase().includes("series"))
      .map(({ eventName, eventId }: EventType, i) => {
        let groupName = eventName.split(" - VIC ");
        return {
          group: `${groupName[0]}`,
          items: [
            {
              label: `${groupName[1]}`,
              value: eventId,
            },
          ],
          seriesTally: [{ position: 1, name: "", points: "" }], // [{ label: "Series A", value: "1"
        };
      });
  }
};

export const consolidateGroupedData = (data: any, roundLeaders: any) => {
  const result = {};
  const groups = formatEventGroupedData(data);
  if (groups) {
    console.log({ roundLeaders });
    groups.forEach((group) => {
      if (result.hasOwnProperty(group.group)) {
        result[group.group].items.push(...group.items);
      } else {
        result[group.group] = { ...group };
      }
    });
  }

  return Object.values(result);
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

export const formatClassData = (data: ClassesType) => {
  if (data) {
    return data.classRanks.map((classes) => {
      return {
        label: classes.className,
        value: classes.classCode,
        rank: classes.competitorRankSummaries,
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
