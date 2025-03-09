"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
  urls: z.object({
    instagram: z
      .string()
      .url({ message: "Please enter a valid URL." })
      .optional()
      .or(z.literal("")),
    facebook: z
      .string()
      .url({ message: "Please enter a valid URL." })
      .optional()
      .or(z.literal("")),
    twitter: z
      .string()
      .url({ message: "Please enter a valid URL." })
      .optional()
      .or(z.literal("")),
  }),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(false),
  galleryUpdates: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export function SettingsForm() {
  const [isSaving, setIsSaving] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "nonygraphy",
      email: "admin@nonygraphy.com",
      bio: "Professional photographer specializing in portraits, weddings, and landscapes.",
      urls: {
        instagram: "https://instagram.com/nonygraphy",
        facebook: "https://facebook.com/nonygraphy",
        twitter: "https://twitter.com/nonygraphy",
      },
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      galleryUpdates: true,
      marketingEmails: false,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast("Profile updated", {
        description: "Your profile information has been updated.",
      });
    }, 1000);
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast("Notification preferences updated", {
        description: "Your notification settings have been saved.",
      });
    }, 1000);
  }

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update your account information and public profile.
        </p>

        <Separator className="my-6" />

        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="space-y-8"
          >
            <FormField
              control={profileForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={profileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormDescription>{`We'll use this email to contact you.`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={profileForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed on your public profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <h4 className="text-sm font-medium mb-4">Social Media Links</h4>
              <div className="space-y-4">
                <FormField
                  control={profileForm.control}
                  name="urls.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="urls.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://facebook.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="urls.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://twitter.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>

        <Separator className="my-6" />

        <Form {...notificationsForm}>
          <form
            onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}
            className="space-y-8"
          >
            <FormField
              control={notificationsForm.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Email Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive notifications about your account via email.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={notificationsForm.control}
              name="galleryUpdates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Gallery Updates</FormLabel>
                    <FormDescription>
                      Receive notifications when your gallery receives views or
                      comments.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={notificationsForm.control}
              name="marketingEmails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Marketing Emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new features and promotions.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
