export type AccountType = 'LDAP' | 'Local';

export interface Account {
  id: number;
  label: {text: string}[];
  type: AccountType
  login: string
  password: string | null
}
