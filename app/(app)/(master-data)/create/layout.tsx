import { TaskProvider } from "@/app/(app)/(master-data)/create/_context";

export default function CreatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TaskProvider>{children}</TaskProvider>;
}
