import { Currency } from "../constants";

export interface Payment {
    id: string,
    currency: Currency,
    customerName: string,
    amount: number,
    date: string,
    customerAddress: string,
    description: string,
    status: string
}

export interface PaymentSearchResponse {
    payments: Payment[];
    total: number;
    page: number;
    pageSize: number;
}

export interface PaymentQueryParams {
    search?: string;
    currency?: string;
    page?: number;
    pageSize?: number;
}