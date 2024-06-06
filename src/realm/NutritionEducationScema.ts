// schema for database objects
export const NutritionEducationSchema = {
  name: 'NutritionEductaion',
  properties: {
    _id: 'int',
    agent_id: 'int',
    dov: 'string',
    isNew: 'bool',
    name: 'string?',
    location: 'string?',
    block: 'string?',
    district: 'string?',
    state: 'string?',
    partnerID: 'int?',
    totalNoOfParticipants: 'string',
    beneficiarieID: 'int',
    ageID: 'string',
    duration: 'int',
    methodUsed: 'string',
    topicsCovered: 'string',
    sessionConductedBy: 'string',
    feedbackFromParticipants: 'string',
    images: {
      type: 'list', // Realm List type for storing an array of objects
      objectType: 'ImagesSchema', // Reference the schema for image data
    },
  },
  primaryKey: '_id',
};
