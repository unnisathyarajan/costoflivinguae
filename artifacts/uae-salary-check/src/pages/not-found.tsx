import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <p className="text-xl text-muted-foreground">
          Looks like this page got lost in the sand dunes.
        </p>
        <div className="pt-6">
          <Link href="/" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}>
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
