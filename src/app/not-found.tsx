import { ErrorScreen } from "@/components/error-screen";

export default function NotFoundPage() {
  return (
    <ErrorScreen
      title="Page Not Found"
      message="We couldn't find the page you were looking for. It might have been moved or deleted."
      code="404"
      showHomeButton={true}
    />
  );
}
