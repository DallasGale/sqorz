type AccountsType = {
  accountName: string;
  accountCode: string;
};

export type OrgType = {
  accounts: AccountsType[];
};

export const formatOrgs = (orgs: OrgType) => {
  if (orgs) {
    return orgs.accounts.map((org) => {
      return {
        label: org.accountName,
        value: org.accountCode,
      };
    });
  }
};
