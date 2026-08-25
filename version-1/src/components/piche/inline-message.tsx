export function InlineMessage({
  tone = "success",
  children,
}: {
  tone?: "success" | "error";
  children: React.ReactNode;
}) {
  const isSuccess = tone === "success";
  return (
    <div
      role="status"
      className={`flex items-center gap-(--space-sm) text-(length:--body-sm-size) ${
        isSuccess
          ? "rounded-(--radius-md-ds) bg-(--status-success-bg) px-3.5 py-2.5 text-(--status-success)"
          : "text-(--status-error)"
      }`}
    >
      {children}
    </div>
  );
}
