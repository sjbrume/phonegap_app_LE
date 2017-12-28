import {toTimestamp} from "../../utils/to_timestamp";

export const mock = [
    {
        "id": 1,
        "region_id": 2,
        "id_code": 23,
        "address": "address",
        "lat": 46.484583,
        "lng": 30.7326,
        "license": "MIT",
        "company": "Название компании",
        "license_start_at": toTimestamp(new Date()),
        "license_end_at": toTimestamp(new Date()),
        "license_type": "alcohol",
        "status": "active",
        "geocoding_payload": "geocoding_payload",
        "geocoding_at": toTimestamp(new Date()),
        "created_at": toTimestamp(new Date()),
        "update_at": toTimestamp(new Date()),
    }, {
        "id": 2,
        "region_id": 22,
        "id_code": 23,
        "address": "address",
        "lat": 46.45630839,
        "lng": 30.70850372,
        "license": "MIT",
        "company": "Название компании",
        "license_start_at": toTimestamp(new Date()),
        "license_end_at": toTimestamp(new Date()),
        "license_type": "alcohol",
        "status": "active",
        "geocoding_payload": "geocoding_payload",
        "geocoding_at": toTimestamp(new Date()),
        "created_at": toTimestamp(new Date()),
        "update_at": toTimestamp(new Date()),
    }
]