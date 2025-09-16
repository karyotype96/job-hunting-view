import type IRecord from "$lib/utils/record";
import _ from "lodash";

export const recordStore = $state({
    loading: true,
    records: new Array<IRecord>(),
    currentRecordID: -1,
});

export const loadRecords = async () => {
    recordStore.loading = true;
    
    try {
        const response = await fetch("http://localhost:4001/api/records");
        if (!response.ok){
            return;
        }
        const data = await response.json();
        const recordArray = new Array<IRecord>();

        _.forEach(data["data"], (rec) => {
            let newRecord: IRecord = {
                id: rec.id,
                companyName: rec.companyName,
                jobTitle: rec.jobTitle,
                status: rec.status,
                timeApplied: new Date(rec.timeApplied)
            }

            recordArray.unshift(newRecord);
        })

        recordStore.records = recordArray;
    } catch (err) {
        // error(err);
    } finally {
        recordStore.loading = false;
    }
}