const mongoose = require('mongoose')
let { composeWithMongoose } = require('graphql-compose-mongoose')
const { GQC } = require('graphql-compose')

mongoose.Promise = global.Promise
mongoose.connect('localhost', 'test')

console.log(composeWithMongoose)

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL

const TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, // standard types
  author: {
    type: String,
    required: true
  },
  duration: {
    type: Number
  },
  updated: { 
    type: Date, 
    default: Date.now 
  },
})
const TrackModel = mongoose.model('TrackModel', TrackSchema)


// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {} // left it empty for simplicity, described below
const TrackTC = composeWithMongoose(TrackModel, customizationOptions)

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD USER OPERATIONS
// via graphql-compose it will be much much easier, with less typing
GQC.rootQuery().addFields({
  trackById: TrackTC.getResolver('findById'),
  trackByIds: TrackTC.getResolver('findByIds'),
  trackOne: TrackTC.getResolver('findOne'),
  trackMany: TrackTC.getResolver('findMany'),
  trackTotal: TrackTC.getResolver('count'),
  trackConnection: TrackTC.getResolver('connection'),
})

GQC.rootMutation().addFields({
  trackCreate: TrackTC.getResolver('createOne'),
  trackUpdateById: TrackTC.getResolver('updateById'),
  trackUpdateOne: TrackTC.getResolver('updateOne'),
  trackUpdateMany: TrackTC.getResolver('updateMany'),
  trackRemoveById: TrackTC.getResolver('removeById'),
  trackRemoveOne: TrackTC.getResolver('removeOne'),
  trackRemoveMany: TrackTC.getResolver('removeMany'),
})

const graphqlSchema = GQC.buildSchema()

module.exports = graphqlSchema