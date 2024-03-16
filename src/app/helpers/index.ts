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

export const formatEvents = (data: EventType) => {
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
