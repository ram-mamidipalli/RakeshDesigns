export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container flex items-center justify-center py-6">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Rakesh Designs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
