export interface GlobalDataArray {
    state?: string;
    country?: string;
    last_updated?: Date;
    lat_?: number;
    long_?: number;
    confirmed?: number;
    deaths?: number;
    recovered?: number;
    active?: number;
    combined_Key?: number;
    incident_Rate?: number;
    case_Fatality_Ratio?: number;
}

export interface GlobalDataSummary {
    confirmed?: number;
    deaths?: number;
    recovered?: number;
    active?: number;
}