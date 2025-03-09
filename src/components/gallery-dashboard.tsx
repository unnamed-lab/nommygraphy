"use client"

import { useState } from "react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, Eye, Users } from "lucide-react"

// Sample data for the dashboard
const data = [
  {
    name: "Jan",
    total: 234,
  },
  {
    name: "Feb",
    total: 345,
  },
  {
    name: "Mar",
    total: 456,
  },
  {
    name: "Apr",
    total: 567,
  },
  {
    name: "May",
    total: 678,
  },
  {
    name: "Jun",
    total: 789,
  },
  {
    name: "Jul",
    total: 890,
  },
  {
    name: "Aug",
    total: 987,
  },
  {
    name: "Sep",
    total: 876,
  },
  {
    name: "Oct",
    total: 765,
  },
  {
    name: "Nov",
    total: 654,
  },
  {
    name: "Dec",
    total: 543,
  },
]

export function GalleryDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Images</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">+6 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gallery Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,549</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">+2 new categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+18.2% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Gallery Views</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Recent uploads and edits to your gallery.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Upload className="h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">New image uploaded</p>
                    <p className="text-sm text-muted-foreground">Wedding Collection • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Gallery edited</p>
                    <p className="text-sm text-muted-foreground">Portrait Collection • 5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Upload className="h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">New images uploaded</p>
                    <p className="text-sm text-muted-foreground">Landscape Collection • 1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/gallery">View All Activity</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Detailed analytics for your gallery performance.</CardDescription>
          </CardHeader>
          <CardContent className="h-[450px] flex items-center justify-center">
            <p className="text-muted-foreground">Analytics dashboard coming soon.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Generate and view reports for your gallery.</CardDescription>
          </CardHeader>
          <CardContent className="h-[450px] flex items-center justify-center">
            <p className="text-muted-foreground">Reports dashboard coming soon.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

