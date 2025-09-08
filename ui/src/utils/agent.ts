import * as request from "superagent";
import { Record } from "../models/record";

export const baseUrl = "http://localhost:4001";

export async function getRecords(): Promise<Array<Record>> {
    const records = new Array<Record>();

    try {
        const data = await request.get(baseUrl + "/api/records");
        console.log(data);
    } catch {
        console.error("Error retrieving records...");
    }

    return records;
}