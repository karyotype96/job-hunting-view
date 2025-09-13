import { loadRecords, recordStore } from "$lib/components/global/globalState.svelte.js";
import type IRecord from "$lib/utils/record.js";
import { Applied } from "$lib/utils/record.js";
import { error } from "@sveltejs/kit";
import moment from "moment";
import _ from "lodash";

export async function load({ params }){
    const recordID = params.id;
    let record: IRecord = {
        id: -1,
        companyName: "",
        status: Applied,
        timeApplied: new Date()
    };

    if (recordID == "new"){
        recordStore.currentRecordID = -1;
    } else {
        await loadRecords();

        recordStore.currentRecordID = parseInt(recordID);
        let results = _.filter(recordStore.records, (rec) => {
            return rec.id == recordStore.currentRecordID
        });

        if (results.length > 0){
            record = {...results[0]}
        } else {
            error(404);
        }
    }

    return record;
}