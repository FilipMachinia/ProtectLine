export interface TicketType {
  name: TType;
  severity: number;
}

export enum TType {
  CriticalBug= "Critical bug",
  Bug= "Bug",
  Feature = "Feature",
  Chore = "Chore",
}
