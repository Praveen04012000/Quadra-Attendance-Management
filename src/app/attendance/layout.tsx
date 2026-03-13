export default function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="flex items-start justify-center">
        {children}
      </main>
    </div>
  );
}
