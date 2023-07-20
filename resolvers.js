const { Student } = require("./models/Student.js");

const resolvers = {
    Query: {
        hello: () => "hello from reflectoring blog",
        welcome: (params) => `Hello ${params.name}`,
        students: async () => await Student.find({}),
        student: async (parent, args) => await Student.findById(args.id),
    },
    Mutation: {
        create: async (parent, args) => {
            const newStudent = new Student({
                first_name: args.firstName,
                last_name: args.lastName,
                age: args.age,
            });
            await newStudent.save();
            return newStudent;
        },
        update: async (parent, args) => {
            const { id } = args;
            const updatedStudent = await Student.findByIdAndUpdate(id, args);
            if (!updatedStudent) {
                throw new Error(`Student with ID ${id} not found`);
            }
            return updatedStudent;
        },
        delete: async (parent, args) => {
            const { id } = args;
            const deletedStudent = await Student.findByIdAndDelete(id);
            if (!deletedStudent) {
                throw new Error(`Student with ID ${id} not found`);
            }
            return deletedStudent;
        },
    },
};

module.exports = { resolvers };

