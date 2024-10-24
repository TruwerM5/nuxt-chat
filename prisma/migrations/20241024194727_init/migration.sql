-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "from_nickname" TEXT NOT NULL,
    "to_nickname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "messages_from_nickname_key" ON "messages"("from_nickname");

-- CreateIndex
CREATE UNIQUE INDEX "messages_to_nickname_key" ON "messages"("to_nickname");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_from_nickname_fkey" FOREIGN KEY ("from_nickname") REFERENCES "users"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_to_nickname_fkey" FOREIGN KEY ("to_nickname") REFERENCES "users"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;
