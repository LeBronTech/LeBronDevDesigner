'use server';

/**
 * @fileOverview A UI design element suggestion AI agent.
 *
 * - suggestDesignElements - A function that handles the suggestion of UI design elements based on a website screenshot or URL.
 * - SuggestDesignElementsInput - The input type for the suggestDesignElements function.
 * - SuggestDesignElementsOutput - The return type for the suggestDesignElements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDesignElementsInputSchema = z.object({
  websiteDataUri: z
    .string()
    .describe(
      "A screenshot of a website, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>' or a URL of the website."
    ),
});
export type SuggestDesignElementsInput = z.infer<typeof SuggestDesignElementsInputSchema>;

const SuggestDesignElementsOutputSchema = z.object({
  colorScheme: z.string().describe('Suggested color scheme for the UI design.'),
  typography: z.string().describe('Suggested typography for the UI design.'),
  layout: z.string().describe('Suggested layout for the UI design.'),
  iconography: z.string().describe('Suggested iconography for the UI design.'),
  animation: z.string().describe('Suggested animations for the UI design.'),
  overallTheme: z.string().describe('Overall suggested theme for the UI design based on the input.'),
});
export type SuggestDesignElementsOutput = z.infer<typeof SuggestDesignElementsOutputSchema>;

export async function suggestDesignElements(input: SuggestDesignElementsInput): Promise<SuggestDesignElementsOutput> {
  return suggestDesignElementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDesignElementsPrompt',
  input: {schema: SuggestDesignElementsInputSchema},
  output: {schema: SuggestDesignElementsOutputSchema},
  prompt: `You are an expert UI/UX designer specializing in generating design suggestions based on existing websites.

You will analyze the provided website screenshot or URL and suggest UI design elements, including color schemes, typography, layout, iconography, and animations, that would be suitable for a portfolio website.

Consider the overall aesthetic and suggest an overall theme that aligns with the analyzed website's style.

Analyze the following website:

Website: {{media url=websiteDataUri}}`,
});

const suggestDesignElementsFlow = ai.defineFlow(
  {
    name: 'suggestDesignElementsFlow',
    inputSchema: SuggestDesignElementsInputSchema,
    outputSchema: SuggestDesignElementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
