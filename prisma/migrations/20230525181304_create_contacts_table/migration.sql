-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
