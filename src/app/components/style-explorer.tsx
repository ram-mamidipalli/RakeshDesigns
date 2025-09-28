"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Wand2 } from "lucide-react";
import { getAIStyleSuggestions } from "@/app/actions/ai-style-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  styleDescription: z.string().optional(),
  imageFile: z.any().optional(),
});

type AIStyleSuggestionsOutput = {
  moodboardImage: string;
  styleDescription: string;
};

export function StyleExplorer() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIStyleSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      styleDescription: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    if (values.styleDescription) {
      formData.append("styleDescription", values.styleDescription);
    }
    if (values.imageFile && values.imageFile[0]) {
      formData.append("imageFile", values.imageFile[0]);
    }
    
    if (!values.styleDescription && (!values.imageFile || !values.imageFile[0])) {
      toast({
        variant: "destructive",
        title: "Input Required",
        description: "Please provide a style description or upload an image.",
      });
      setIsLoading(false);
      return;
    }

    const response = await getAIStyleSuggestions(formData);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: response.error || "An unexpected error occurred.",
      });
    }

    setIsLoading(false);
  };

  return (
    <section id="style-explorer" className="py-16 md:py-24">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">AI-Powered Style Explorer</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Not sure where to start? Describe your vision or upload inspiration images, and let our AI generate a custom moodboard to kickstart the creative process.
          </p>
          <Card className="mt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Create Your Moodboard</CardTitle>
                  <CardDescription>Provide details to generate a style concept.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="styleDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Style Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., 'A minimalist and modern style with a touch of vintage elegance...'" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageFile"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Inspiration Image (optional)</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Generate Style
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-lg aspect-square flex flex-col items-center justify-center bg-secondary/50 border-2 border-dashed">
            {isLoading ? (
                <div className="text-center text-muted-foreground">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin" />
                    <p className="mt-4">Generating your moodboard...</p>
                </div>
            ) : result ? (
                <div className="p-4 w-full h-full flex flex-col">
                    <div className="relative flex-1">
                        <Image
                            src={result.moodboardImage}
                            alt="AI Generated Moodboard"
                            fill
                            className="object-contain rounded-md"
                        />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground text-center italic line-clamp-2">{result.styleDescription}</p>
                </div>
            ) : (
                <div className="text-center text-muted-foreground">
                    <Wand2 className="mx-auto h-12 w-12" />
                    <p className="mt-4">Your AI-generated moodboard will appear here.</p>
                </div>
            )}
            </Card>
        </div>
      </div>
    </section>
  );
}
