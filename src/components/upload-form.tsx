"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().optional(),
  images: z.any().refine((files) => files?.length > 0, {
    message: "Please select at least one image.",
  }),
})

export function UploadForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newPreviews: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          newPreviews.push(event.target.result as string)
          setPreviewImages([...previewImages, ...newPreviews])
        }
      }

      reader.readAsDataURL(file)
    }

    form.setValue("images", files)
  }

  const removePreview = (index: number) => {
    const newPreviews = [...previewImages]
    newPreviews.splice(index, 1)
    setPreviewImages(newPreviews)

    // If all previews are removed, clear the form field
    if (newPreviews.length === 0) {
      form.setValue("images", null)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      toast("Upload successful", {
        description: "Your images have been uploaded to the gallery.",
      });

      router.push("/dashboard/gallery")
    }, 2000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Images</FormLabel>
              <FormControl>
                <div className="grid gap-4">
                  <div
                    className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      if (e.dataTransfer.files) {
                        form.setValue("images", e.dataTransfer.files)

                        // Create previews
                        const newPreviews: string[] = []
                        for (let i = 0; i < e.dataTransfer.files.length; i++) {
                          const file = e.dataTransfer.files[i]
                          const reader = new FileReader()

                          reader.onload = (event) => {
                            if (event.target?.result) {
                              newPreviews.push(event.target.result as string)
                              setPreviewImages([...previewImages, ...newPreviews])
                            }
                          }

                          reader.readAsDataURL(file)
                        }
                      }
                    }}
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Drag & drop your images</h3>
                    <p className="mb-4 mt-2 text-sm text-muted-foreground">or click to browse files</p>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                      ref={field.ref}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        document.getElementById("images")?.click()
                      }}
                    >
                      Select Files
                    </Button>
                  </div>

                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                          <Image
                            src={preview || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removePreview(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>Upload JPG, PNG or WebP images (max 10MB each).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="landscape">Landscape</SelectItem>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="abstract">Abstract</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter a description for your image(s)" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/gallery")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-4 w-4" />
                Upload to Gallery
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

