'use server';

import { z } from 'zod';
import { inquirySchema } from './schema';
import {
  suggestDesignElements,
  type SuggestDesignElementsInput,
  type SuggestDesignElementsOutput,
} from '@/ai/flows/suggest-design-elements';

export async function sendInquiry(values: z.infer<typeof inquirySchema>): Promise<{ success: boolean; error?: string }> {
  const parsed = inquirySchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: 'Invalid input.' };
  }

  // Mock sending email or saving to DB
  console.log('Received inquiry:', parsed.data);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true };
}

export async function getDesignSuggestions(
  input: SuggestDesignElementsInput
): Promise<SuggestDesignElementsOutput> {
  // Here we're directly calling the Genkit flow function.
  // The input is already expected to be in the correct format by the client-side component.
  const result = await suggestDesignElements(input);
  return result;
}
