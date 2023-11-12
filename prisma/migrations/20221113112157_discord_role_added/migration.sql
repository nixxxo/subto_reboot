-- CreateEnum
CREATE TYPE "BillingFrequency" AS ENUM ('onetime', 'recurring_monthly');

-- CreateEnum
CREATE TYPE "PaypalOrderStatus" AS ENUM ('initialized', 'captured');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordServer" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "serverId" TEXT,
    "icon" TEXT,
    "botAccess" BOOLEAN,
    "plan" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "DiscordServer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordServerCustomization" (
    "id" TEXT NOT NULL,
    "accountName" TEXT,
    "tagline" TEXT,
    "terms" TEXT,
    "perks" TEXT,
    "template" INTEGER DEFAULT 1,
    "mainColor" TEXT,
    "secColor" TEXT,
    "logo" TEXT,
    "cover" TEXT,
    "video" TEXT,
    "website" TEXT,
    "redirect" TEXT,
    "storeLink" TEXT,
    "sortProducts" TEXT,
    "discordServerId" TEXT,

    CONSTRAINT "DiscordServerCustomization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "StripeConnection" (
    "id" SERIAL NOT NULL,
    "account" TEXT NOT NULL,
    "details_submitted" BOOLEAN NOT NULL DEFAULT false,
    "charges_enabled" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "discord_server_db_id" TEXT NOT NULL,

    CONSTRAINT "StripeConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaypalConnection" (
    "id" SERIAL NOT NULL,
    "tracking_id" TEXT NOT NULL,
    "primary_email_confirmed" BOOLEAN,
    "payments_receivable" BOOLEAN DEFAULT false,
    "merchant_id" TEXT,
    "discord_server_db_id" TEXT NOT NULL,
    "enabled" BOOLEAN DEFAULT false,

    CONSTRAINT "PaypalConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeSubscriptionSession" (
    "id" SERIAL NOT NULL,
    "session_Id" TEXT NOT NULL,
    "discord_server_db_id" TEXT NOT NULL,
    "status" TEXT,
    "current_period_start" INTEGER,
    "current_period_end" INTEGER,

    CONSTRAINT "StripeSubscriptionSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL,
    "discord_role_id" INTEGER NOT NULL,
    "billingFrequency" "BillingFrequency" NOT NULL,
    "grossEarnings" INTEGER NOT NULL DEFAULT 0,
    "netEarnings" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "cancelling" INTEGER NOT NULL DEFAULT 0,
    "cancelled" INTEGER NOT NULL DEFAULT 0,
    "discord_server_db_id" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaypalOrder" (
    "id" TEXT NOT NULL,
    "status" "PaypalOrderStatus" NOT NULL,
    "paypalOrderId" TEXT,
    "productId" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "grossProductPrice" INTEGER NOT NULL,
    "platformCharge" INTEGER NOT NULL,
    "type" "BillingFrequency" NOT NULL,

    CONSTRAINT "PaypalOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeOrder" (
    "id" TEXT NOT NULL,
    "payment_intent" TEXT NOT NULL,
    "stripeId" TEXT,
    "amount" INTEGER,
    "amount_captured" INTEGER,
    "application_fee_amount" INTEGER,
    "balance_transaction" TEXT,
    "receipt_url" TEXT,
    "captured" BOOLEAN,
    "created" INTEGER,
    "customer" TEXT,
    "paid" BOOLEAN,
    "product_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "StripeOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeProductSubscription" (
    "id" SERIAL NOT NULL,
    "session_Id" TEXT NOT NULL,
    "status" TEXT,
    "current_period_start" INTEGER,
    "current_period_end" INTEGER,
    "product_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_revenue_generated" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StripeProductSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DiscordServerToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordServer_serverId_key" ON "DiscordServer"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordServerCustomization_storeLink_key" ON "DiscordServerCustomization"("storeLink");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordServerCustomization_discordServerId_key" ON "DiscordServerCustomization"("discordServerId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "StripeConnection_discord_server_db_id_key" ON "StripeConnection"("discord_server_db_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalConnection_tracking_id_key" ON "PaypalConnection"("tracking_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalConnection_discord_server_db_id_key" ON "PaypalConnection"("discord_server_db_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeSubscriptionSession_session_Id_key" ON "StripeSubscriptionSession"("session_Id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeSubscriptionSession_discord_server_db_id_key" ON "StripeSubscriptionSession"("discord_server_db_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalOrder_paypalOrderId_key" ON "PaypalOrder"("paypalOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeOrder_payment_intent_key" ON "StripeOrder"("payment_intent");

-- CreateIndex
CREATE UNIQUE INDEX "StripeProductSubscription_session_Id_key" ON "StripeProductSubscription"("session_Id");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscordServerToUser_AB_unique" ON "_DiscordServerToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscordServerToUser_B_index" ON "_DiscordServerToUser"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscordServerCustomization" ADD CONSTRAINT "DiscordServerCustomization_discordServerId_fkey" FOREIGN KEY ("discordServerId") REFERENCES "DiscordServer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeConnection" ADD CONSTRAINT "StripeConnection_discord_server_db_id_fkey" FOREIGN KEY ("discord_server_db_id") REFERENCES "DiscordServer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaypalConnection" ADD CONSTRAINT "PaypalConnection_discord_server_db_id_fkey" FOREIGN KEY ("discord_server_db_id") REFERENCES "DiscordServer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeSubscriptionSession" ADD CONSTRAINT "StripeSubscriptionSession_discord_server_db_id_fkey" FOREIGN KEY ("discord_server_db_id") REFERENCES "DiscordServer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_discord_server_db_id_fkey" FOREIGN KEY ("discord_server_db_id") REFERENCES "DiscordServer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaypalOrder" ADD CONSTRAINT "PaypalOrder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaypalOrder" ADD CONSTRAINT "PaypalOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeOrder" ADD CONSTRAINT "StripeOrder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeOrder" ADD CONSTRAINT "StripeOrder_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeProductSubscription" ADD CONSTRAINT "StripeProductSubscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeProductSubscription" ADD CONSTRAINT "StripeProductSubscription_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscordServerToUser" ADD FOREIGN KEY ("A") REFERENCES "DiscordServer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscordServerToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
