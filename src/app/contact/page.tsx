import { ContactForm } from "@/components/contact-form"
import { BookingCalendar } from "@/components/booking-calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Calendar, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="container py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
            Get in <span className="font-medium">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Book a session or reach out with any questions about our photography services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="booking">Book a Session</TabsTrigger>
              </TabsList>
              <TabsContent value="contact" className="mt-6">
                <ContactForm />
              </TabsContent>
              <TabsContent value="booking" className="mt-6">
                <BookingCalendar />
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-muted/30 p-6 rounded-xl space-y-6">
            <h3 className="text-xl font-medium">Contact Information</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Studio Location</p>
                  <p className="text-muted-foreground">123 Photography Lane, Creative District, City</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">hello@nonygraphy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Working Hours</p>
                  <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                  <p className="text-muted-foreground">Weekends: By appointment</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673596444!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1sen!2sus!4v1616201032121!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Studio location"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

