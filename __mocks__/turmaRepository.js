// __mocks__/userRepository.js
const mockuserRepository = {
    findById: jest.fn(),
    findByEmailExceptId: jest.fn(),
    update: jest.fn(),
  };
  //console.log('mockuserRepository', mockuserRepository);
  
  export default mockuserRepository;
