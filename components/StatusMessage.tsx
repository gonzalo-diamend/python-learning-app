export function StatusMessage({ message, kind = "info" }: { message: string; kind?: "info" | "error" | "success" }) {
  return <p className={`status-message ${kind}`}>{message}</p>;
}
