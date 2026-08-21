import { Container } from "@/components/layout/Container";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

/**
 * Global not-found page.
 * Renders for any unmatched route in the application,
 * including unknown /projects/[slug] lookups.
 */
export default function NotFound() {
  return (
    <Container className="flex-1 flex flex-col justify-center py-24">
      <Typography variant="metadata" className="text-accent mb-4 block">
        404
      </Typography>
      <Typography variant="h1" as="h1" className="mb-4">
        Page not found
      </Typography>
      <Typography variant="body" className="max-w-md mb-10">
        The page you are looking for does not exist or may have been moved.
      </Typography>
      <div>
        <Button variant="primary" href="/">
          Return home
        </Button>
      </div>
    </Container>
  );
}
