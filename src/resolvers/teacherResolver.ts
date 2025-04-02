import { Teacher } from '../models/Teacher';
import { Student } from '../models/Student';

export const teacherResolver = {
  Query: {
    teachers: async () => await Teacher.find(),
    teacher: async (_, { id }) => await Teacher.findById(id),
  },
  Mutation: {
    addTeacher: async (_, { name }) => {
      const newTeacher = new Teacher({ name });
      await newTeacher.save();
      return newTeacher;
    },
  },
};
