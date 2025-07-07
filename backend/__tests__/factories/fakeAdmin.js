const fakeAdmin = async (email = 'admin@demo.com', password = 'admin123') => {
  const Admin = require('../models/coreModels/Admin');
  const AdminPassword = require('../models/coreModels/AdminPassword');
  const newAdminPassword = new AdminPassword();

  const salt = uniqueId();

  const passwordHash = newAdminPassword.generateHash(salt, password);

  const demoAdmin = {
    email,
    name: 'IDURAR',
    surname: 'Admin',
    enabled: true,
    role: 'owner',
  };
  const result = await new Admin(demoAdmin).save();

  const AdminPasswordData = {
    password: passwordHash,
    emailVerified: true,
    salt: salt,
    user: result._id,
  };
  await new AdminPassword(AdminPasswordData).save();

  return {
    email: demoAdmin.email,
    password: password,
    id: result._id,
  };
};

module .exports = fakeAdmin;
