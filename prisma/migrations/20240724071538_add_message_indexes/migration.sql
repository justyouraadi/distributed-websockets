-- CreateIndex
CREATE INDEX "Message_id_idx" ON "Message"("id");

-- CreateIndex
CREATE INDEX "Message_room_id_idx" ON "Message"("room_id");

-- CreateIndex
CREATE INDEX "Message_message_idx" ON "Message"("message");
