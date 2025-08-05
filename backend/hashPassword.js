import bcrypt from 'bcryptjs';

async function createHash() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  console.log('Hashed password:', hashedPassword);
}

createHash();
