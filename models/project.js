var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
   order: Number,
   title: String,
   thumbnail: String,
   optionalImg1: String,
   optionalImg2: String,
   optionalImg3: String,
   tech: String,
   description: String,
   descriptionFull: String,
   githubLink: String,
   exampleLink: String,
   functionality: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
    },
});

module.exports = mongoose.model("Project", ProjectSchema);