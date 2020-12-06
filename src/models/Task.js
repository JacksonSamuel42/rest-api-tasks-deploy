import {Schema, model} from 'mongoose';
import mongoosePagination from 'mongoose-paginate-v2'

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

taskSchema.plugin(mongoosePagination);
export default model('Task', taskSchema);
