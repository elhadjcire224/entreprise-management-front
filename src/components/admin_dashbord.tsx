import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BuildingIcon, CheckIcon, ClockIcon, XIcon } from 'lucide-react';

const DashboardMetric = ({ title, value, change, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="w-4 h-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

export function AdminDashboard() {
  const metrics = [
    { title: "Total Companies", value: "1,234", change: "+5% from last month", icon: BuildingIcon },
    { title: "Pending Validations", value: "87", change: "+10% from last month", icon: ClockIcon },
    { title: "Validated This Month", value: "42", change: "+15% from last month", icon: CheckIcon },
    { title: "Rejected This Month", value: "15", change: "-5% from last month", icon: XIcon },
  ];

  const recentActivities = [
    { company: "Acme Inc.", action: "Validated", user: "John Doe", dateTime: "2023-05-01 10:30 AM" },
    { company: "Globex Corp.", action: "Pending", user: "Jane Smith", dateTime: "2023-04-30 3:45 PM" },
    { company: "Stark Industries", action: "Rejected", user: "Bob Johnson", dateTime: "2023-04-29 9:15 AM" },
    { company: "Wayne Enterprises", action: "Validated", user: "Alice Williams", dateTime: "2023-04-28 2:00 PM" },
    { company: "Oscorp Industries", action: "Pending", user: "Charlie Brown", dateTime: "2023-04-27 11:30 AM" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <DashboardMetric key={index} {...metric} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>The 5 most recent company validation activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date/Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{activity.company}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell>{activity.dateTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm">View All</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
