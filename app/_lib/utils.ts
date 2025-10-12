import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Transaction } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SerializedTransaction = Omit<Transaction, "amount"> & {
  amount: number;
};
