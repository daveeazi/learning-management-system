import { Student } from '../models/Student';

export const studentResolver = {
  Query: {
    students: async () => await Student.find(),
    student: async (_, { id }) => await Student.findById(id),
  },
  Mutation: {
    addStudent: async (_, { name }) => {
      const newStudent = new Student({ name });
      await newStudent.save();
      return newStudent;
    },
  },
};
