"use server";

import { db } from "../../_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { upsertTransactionSchema } from "./schema";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

// server actions DEVEM ter seus parâmetros validados por ser uma rota http.

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  // SE a validação falhar, o Zod lançará uma exceção
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.transaction.upsert({
    where: {
      id: params.id,
    },
    update: { ...params, userId },
    create: { ...params, userId },
  });

  revalidatePath("/transactions");
};
