const resolvers = {
    Query: {
        allHospitals(_, args) {
            return Hospital.findAll();
        }
    }
};