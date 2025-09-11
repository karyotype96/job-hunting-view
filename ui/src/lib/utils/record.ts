import type { Moment } from "moment";

export default interface IRecord {
    id: number;
    companyName: string;
    status: number;
    timeApplied: Moment;
}

export const Applied = 1;
export const Rejected = 2;
export const Accepted = 3;