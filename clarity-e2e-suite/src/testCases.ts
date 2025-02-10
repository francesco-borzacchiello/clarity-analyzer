import { BarChartJson } from "./types";

export interface UnFunctionalTestCase {
    url: string;
    oracle?: BarChartJson | null;
    from: number;
    to: number;
}

export const testCases: { [key: string]: UnFunctionalTestCase } = {
    'chart-3 - solaris - (2020-12-01 - 2021-09-05) - with oracle': {
        url: '/d/ac159a53-38b3-4646-9fb3-6620b4ff7a7f/count-of-high-risk-all-and-confirmed-vs-low-risk-results-by-user-3?orgId=1&var-employee=All&var-includeDisabledEmployees=false&var-datasource=PostgreSQL-solaris-global_db',
        oracle:{
            "Agust--in Maugus": {
                "Low Risk": 2
            },
            "Ben Cumpton": {
                "Low Risk": 80,
                "Unverified High Risk": 2,
                "Voided High Risk": 1
            },
            "Constantina Quintanar": {
                "Low Risk": 104,
                "Unverified High Risk": 22
            },
            "DeLgado": {
                "Low Risk": 26
            },
            "Deanna Rosheck": {
                "High Risk Confirmed": 5,
                "Low Risk": 267,
                "Preliminar High Risk": 3,
                "Unverified High Risk": 4,
                "Voided High Risk": 15
            },
            "Drake Ferguson": {
                "High Risk Confirmed": 1,
                "Low Risk": 17,
                "Preliminar High Risk": 1,
                "Unverified High Risk": 5
            },
            "Elsa Elias": {
                "Low Risk": 45,
                "Unverified High Risk": 1
            },
            "Estephanie Diaz": {
                "Low Risk": 123,
                "Voided High Risk": 5
            },
            "Felipe Kason": {
                "Low Risk": 102,
                "Voided High Risk": 4,
                "Preliminar High Risk": 1,
                "High Risk Confirmed": 1
            },
            "Ivania Torres": {
                "Low Risk": 67
            }
        },
        from: 1606777200000,
        to: 1630792800000
    },
    'chart-3 - solaris - (2020-12-01 - 2021-02-15)' : {
        url: '/d/ac159a53-38b3-4646-9fb3-6620b4ff7a7f/count-of-high-risk-all-and-confirmed-vs-low-risk-results-by-user-3?orgId=1&var-employee=All&var-includeDisabledEmployees=false&var-datasource=PostgreSQL-solaris-global_db',
        from: 1606777200000,
        to: 1613343600000
    },
    'chart-3 - solaris - (2020-02-01 - 2021-03-01)' : {
        url: '/d/ac159a53-38b3-4646-9fb3-6620b4ff7a7f/count-of-high-risk-all-and-confirmed-vs-low-risk-results-by-user-3?orgId=1&var-employee=All&var-includeDisabledEmployees=false&var-datasource=PostgreSQL-solaris-global_db',
        from: 1613343600000,
        to: 1614553200000
    }
}

export const intervalPairs = {
    'chart-3 - solaris - |2020-12-01 - 2021-02-01| <= |2020-12-01 - 2021-02-15|': {
        url: '/d/ac159a53-38b3-4646-9fb3-6620b4ff7a7f/count-of-high-risk-all-and-confirmed-vs-low-risk-results-by-user-3?orgId=1&var-employee=All&var-includeDisabledEmployees=false&var-datasource=PostgreSQL-solaris-global_db',
        largerInterval: { from: 1606777200000, to: 1613343600000 },
        smallerInterval: { from: 1606777200000, to: 1612134000000 }
    },
    'chart-3 - solaris - (2020-02-15 - 2021-03-01) < (2021-02-01 - 2021-03-01)': {
        url: '/d/ac159a53-38b3-4646-9fb3-6620b4ff7a7f/count-of-high-risk-all-and-confirmed-vs-low-risk-results-by-user-3?orgId=1&var-employee=All&var-includeDisabledEmployees=false&var-datasource=PostgreSQL-solaris-global_db',
        largerInterval: { from: 1612134000000, to: 1614553200000 },
        smallerInterval: { from: 1613343600000, to: 1614553200000 }
    }
};