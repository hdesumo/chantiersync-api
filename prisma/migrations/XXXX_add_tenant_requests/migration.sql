-- CreateTable
CREATE TABLE "TenantRequest" (
    "id" SERIAL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "entreprise" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantRequest_email_key" ON "TenantRequest"("email");
