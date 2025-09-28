"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  servicePackage: z.enum(["consultation", "branding-kit", "full-service"], {
    required_error: "You need to select a service package.",
  }),
  date: z.date({
    required_error: "A date for the meeting is required.",
  }),
  projectBrief: z.string().min(10, { message: "Please provide a brief description of your project." }),
});

const servicePackages = [
    { id: "consultation", label: "Consultation Call", description: "30-min call to discuss your project." },
    { id: "branding-kit", label: "Basic Branding Kit", description: "Logo, color palette, and typography." },
    { id: "full-service", label: "Full Service Design", description: "Complete branding and web design." },
];

export function Booking() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      projectBrief: "",
    }
  });

  const onSubmit = (values: z.infer<typeof bookingSchema>) => {
    setIsLoading(true);

    const serviceLabel = servicePackages.find(p => p.id === values.servicePackage)?.label || values.servicePackage;

    const message = `Hello! I'd like to book a service with you.
    
*Service Package:* ${serviceLabel}
*Name:* ${values.name}
*Email:* ${values.email}
*Preferred Date:* ${format(values.date, "PPP")}

*Project Brief:*
${values.projectBrief}`;

    const whatsappUrl = `https://wa.me/+918978015826?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');

    setIsLoading(false);
    form.reset();
  };

  return (
    <section id="booking" className="py-16 md:py-24 bg-secondary/50">
      <div className="container max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold font-headline">Book a Service</CardTitle>
            <CardDescription className="text-lg">Ready to start? Fill out the form below to book your project.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="servicePackage"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-lg font-semibold">1. Select a Service Package</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid md:grid-cols-3 gap-4"
                        >
                          {servicePackages.map(pkg => (
                            <FormItem key={pkg.id} className="flex-1">
                                <FormControl>
                                    <RadioGroupItem value={pkg.id} className="sr-only" id={pkg.id} />
                                </FormControl>
                                <Label htmlFor={pkg.id} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 h-full cursor-pointer hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                    <h3 className="font-semibold">{pkg.label}</h3>
                                    <p className="text-sm text-muted-foreground mt-2 text-center">{pkg.description}</p>
                                </Label>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">2. Provide Your Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="projectBrief"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Brief</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Tell us about your project, your goals, and your target audience..." className="min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-lg font-semibold">3. Schedule a Kick-off Meeting</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0,0,0,0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Chat on WhatsApp
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
