import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowLeft,
  Home,
  RefreshCcw,
  ServerCrash,
  SearchX,
  WifiOff,
  ShieldX
} from "lucide-react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router";

interface ErrorInfo {
  icon: React.ElementType;
  title: string;
  description: string;
  suggestion: string;
}

const getErrorInfo = (error: unknown): ErrorInfo => {
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return {
          icon: SearchX,
          title: "Pagina Non Trovata",
          description: "La pagina che stai cercando non esiste o e stata spostata.",
          suggestion: "Verifica l'URL o torna alla homepage per continuare la navigazione."
        };
      case 401:
        return {
          icon: ShieldX,
          title: "Accesso Non Autorizzato",
          description: "Non hai i permessi necessari per accedere a questa risorsa.",
          suggestion: "Effettua il login con un account autorizzato."
        };
      case 403:
        return {
          icon: ShieldX,
          title: "Accesso Negato",
          description: "Non hai i privilegi per visualizzare questa pagina.",
          suggestion: "Contatta l'amministratore se ritieni di dover avere accesso."
        };
      case 500:
        return {
          icon: ServerCrash,
          title: "Errore del Server",
          description: "Si e verificato un problema con il nostro server.",
          suggestion: "Riprova tra qualche minuto. Se il problema persiste, contattaci."
        };
      case 503:
        return {
          icon: WifiOff,
          title: "Servizio Non Disponibile",
          description: "Il servizio e temporaneamente non disponibile.",
          suggestion: "Stiamo lavorando per risolvere il problema. Riprova piu tardi."
        };
      default:
        return {
          icon: AlertTriangle,
          title: `Errore ${error.status}`,
          description: error.statusText || "Si e verificato un errore imprevisto.",
          suggestion: "Riprova o torna alla homepage."
        };
    }
  }

  // Generic error
  return {
    icon: AlertTriangle,
    title: "Qualcosa e Andato Storto",
    description: error instanceof Error ? error.message : "Si e verificato un errore imprevisto.",
    suggestion: "Prova a ricaricare la pagina o torna alla homepage."
  };
};


const ErrorPageCustom = () => {
  const error:any = useRouteError();
  const errorInfo = getErrorInfo(error);
  const IconComponent = errorInfo.icon;

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-destructive/5 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {/* Error Icon Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-destructive/20" />
              <div className="relative flex size-24 items-center justify-center rounded-full bg-destructive/10 ring-4 ring-destructive/20">
                <IconComponent className="size-12 text-destructive" />
              </div>
            </div>
          </div>

          {/* Error Content */}
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {errorInfo.title}
            </h1>
            <p className="mb-2 text-lg text-muted-foreground">
              {errorInfo.description}
            </p>
            <p className="mb-8 text-sm text-muted-foreground/80">
              {errorInfo.suggestion}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="lg"
              className="gap-2 transition-all hover:shadow-md"
            >
              <RefreshCcw className="size-4" />
              Ricarica Pagina
            </Button>
            <Link to="/">
              <Button
                size="lg"
                className="w-full gap-2 shadow-lg transition-all hover:shadow-xl sm:w-auto"
              >
                <Home className="size-4" />
                Torna alla Home
              </Button>
            </Link>
          </div>

          {/* Additional Help Card */}
          <Card className="mt-12 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Hai bisogno di aiuto?
              </h3>
              <div className="space-y-3">
                <Link
                  to="/products"
                  className="flex items-center gap-3 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ArrowLeft className="size-4" />
                  Sfoglia i nostri prodotti
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-3 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ArrowLeft className="size-4" />
                  Scopri chi siamo
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Error Details (Development) */}
          {(import.meta.env.DEV && error) && (<details className="mt-8 rounded-lg border border-border/50 bg-muted/30 p-4">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                Dettagli Errore (Dev Only)
              </summary>
              <pre className="mt-4 overflow-auto rounded bg-background p-4 text-xs text-muted-foreground">
                {isRouteErrorResponse(error)
                  ? JSON.stringify({ status: error.status, statusText: error.statusText, data: error.data }, null, 2)
                  : error instanceof Error
                    ? `${error.name}: ${error.message}\n\n${error.stack}`
                    : String(error)
                }
              </pre>
            </details>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Se il problema persiste, contattaci a{" "}
            <a href="mailto:support@luminae.com" className="text-primary hover:underline">
              support@luminae.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPageCustom;
