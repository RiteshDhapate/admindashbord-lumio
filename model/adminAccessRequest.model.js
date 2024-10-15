import mongoose from "mongoose"

const adminAccessRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const AdminAccessRequest = mongoose.model('AdminAccessRequest', adminAccessRequestSchema);

export default AdminAccessRequest;

