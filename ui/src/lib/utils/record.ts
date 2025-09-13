export default interface IRecord {
    id: number;
    companyName: string;
    status: number;
    timeApplied: Date;
}

export const Applied = 1;
export const Rejected = 2;
export const Accepted = 3;