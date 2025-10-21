'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { getDesignSuggestions } from '@/app/actions';
import type { SuggestDesignElementsOutput } from '@/ai/flows/suggest-design-elements';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, Paintbrush, Type, Layout, Star, Palette } from 'lucide-react';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  file: z.any().optional(),
}).refine(data => data.url || data.file, {
  message: 'Please provide either a URL or a file.',
  path: ['url'],
});

export default function AISuggester() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestDesignElementsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setResult(null);

    let websiteDataUri = values.url || '';

    if (values.file && values.file.length > 0) {
      const file = values.file[0];
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          title: 'File too large',
          description: 'Please upload an image smaller than 4MB.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
      try {
        websiteDataUri = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
        });
      } catch (error) {
        toast({
          title: 'Error reading file',
          description: 'There was a problem processing your file.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
    }

    try {
      const suggestions = await getDesignSuggestions({ websiteDataUri });
      setResult(suggestions);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error generating suggestions',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const suggestionItems = result ? [
    { icon: Palette, title: "Color Scheme", content: result.colorScheme },
    { icon: Type, title: "Typography", content: result.typography },
    { icon: Layout, title: "Layout", content: result.layout },
    { icon: Star, title: "Iconography", content: result.iconography },
    { icon: Paintbrush, title: "Animation", content: result.animation },
  ] : [];

  return (
    <section id="ai-suggester" className="w-full bg-secondary/50 py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">AI Style Suggester</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-foreground/80 md:text-xl">
            Get instant UI/UX design inspiration. Enter a website URL or upload a screenshot to get AI-powered suggestions.
          </p>
        </div>
        <Card className="mx-auto mt-12 max-w-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-primary" />
              <span>Generate Design Ideas</span>
            </CardTitle>
            <CardDescription>
              Provide a URL or an image to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="relative flex items-center">
                  <div className="flex-grow border-t"></div>
                  <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Or</span>
                  <div className="flex-grow border-t"></div>
                </div>
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Upload Screenshot</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={e => onChange(e.target.files)} {...rest} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Suggest Styles'
                  )}
                </Button>
              </form>
            </Form>

            {result && (
              <div className="mt-8">
                 <Separator className="my-6" />
                <h3 className="mb-4 text-2xl font-semibold text-center">Suggested Theme</h3>
                 <Card className="mb-6 bg-background">
                  <CardContent className="p-6">
                    <p className="text-center text-foreground/90">{result.overallTheme}</p>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {suggestionItems.map(item => (
                    <Card key={item.title}>
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                          <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                          <CardTitle className='text-xl'>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/80">{item.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
