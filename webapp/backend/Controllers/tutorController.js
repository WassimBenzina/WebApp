const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Tutor = require("../models/Tutor");
const Subject = require("../models/Subject");
const Student = require("../models/Student");

const { QueryTypes, where } = require("sequelize");

const getTutors = async (request, response) => {
  try {
    const tutors = await sequelize.query(
      'SELECT * FROM subjects NATURAL JOIN tutors NATURAL JOIN students',
      { type: sequelize.QueryTypes.SELECT }
    );
    response.status(200).json({ tutors });
  } catch (error) {
    console.error("Error fetching tutors:", error);
    response
      .status(500)
      .json({ msg: "Error on getting tutors", error: error.message });
  }
};

const getTutorsBySubjectID = async (request, response) => {
  try {
    const { subjectID } = request.params; 
    const tutors = await sequelize.query(
      "SELECT * FROM tutors NATURAL JOIN students WHERE SubjectID = :subjectID",
      {
        replacements: { subjectID },
        type: QueryTypes.SELECT,
      }
    );
      response.status(200).json({ tutors: tutors });
  } catch (error) {
    console.error("Error fetching tutor:", error);
    response
      .status(500)
      .json({ msg: "Error on getting tutor", error: error.message });
  }
};

const getOneTutorByStudentID = async (request, response) => {
  
  try {
    const { studentID } = request.params; 
    const tutor = await sequelize.query(
      "SELECT TutorID FROM tutors WHERE StudentID = :studentID",
      {
        replacements: { studentID },
        type: QueryTypes.SELECT,
      }
    );

    if (tutor.length > 0) {
      
      response.status(200).json({ TutorID: tutor[0].TutorID });
    } else {
      response.status(200).json({ TutorID: -1 });
    }
  } catch (error) {
    console.error("Error fetching tutor:", error);
    response
      .status(500)
      .json({ msg: "Error on getting tutor", error: error.message });
  }
};

const deleteTutor = async (request, response) => {
  try {
    const { id } = request.params;

    const tutor = await Tutor.findOne({ where: { TutorID: id } });

    if (!tutor) {
      return response.status(404).json({ msg: 'Tutor not found' });
    }

    await Tutor.destroy({ where: { TutorID: id } });

    response.status(200).json({ msg: 'Tutor deleted successfully' });
  } catch (error) {
    console.error('Error deleting tutor:', error);
    response.status(500).json({ msg: 'Error deleting tutor', error: error.message });
  }
};

const postTutor = async (request, response) => {
  try {
    const { studentID, subjectID } = request.params;
    const createdTutor = {
      StudentID: studentID,
      SubjectID: subjectID,
    };
    await Tutor.create(createdTutor);
    response
      .status(200)
      .json({ tutor: createdTutor, msg: "Tutor added successfully",studentID :studentID,subjectID:subjectID});
  } catch (error) {
    console.error("Error on adding tutor:", error);
    response
      .status(500)
      .json({ msg: "Error on adding tutor", error: error.message });
  }
};


module.exports = { deleteTutor,getTutors, postTutor,getOneTutorByStudentID ,getTutorsBySubjectID};
