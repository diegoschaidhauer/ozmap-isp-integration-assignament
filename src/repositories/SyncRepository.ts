import mongoose from 'mongoose';

const syncSchema = new mongoose.Schema({
  entityType: String,
  entityId: Number,
  syncedAt: Date,
});

const SyncModel = mongoose.model('Sync', syncSchema);

export class SyncRepository {
  async saveSync(entityType: string, entityId: number) {
    await new SyncModel({ entityType, entityId, syncedAt: new Date() }).save();
  }
}
