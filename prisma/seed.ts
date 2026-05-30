import 'dotenv/config';
import { PrismaClient } from '../src/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'admin' },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('boore2233', 10);

    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'boore@gmail.com',
        passwordHash,
        role: 'admin',
        status: 'active',
      },
    });

    console.log('Created admin user:', admin.email);
  } else {
    console.log('Admin user already exists');
  }

  // Check if property exists
  const existingProperty = await prisma.property.findFirst({
    where: { name: 'Downtown Office Complex' },
  });

  if (!existingProperty) {
    // Create test property
    const property = await prisma.property.create({
      data: {
        name: 'Downtown Office Complex',
        address: '123 Main St',
        city: 'New York',
        country: 'USA',
        landArea: 10000.0,
      },
    });

    console.log('Created property:', property.name);

    // Create test building
    const building = await prisma.building.create({
      data: {
        propertyId: property.id,
        name: 'Building A',
        type: 'commercial',
        floorsCount: 10,
        totalArea: 5000.0,
        status: 'active',
      },
    });

    console.log('Created building:', building.name);
  } else {
    console.log('Test data already exists');
  }

  // Log all buildings
  const allBuildings = await prisma.building.findMany({
    include: { property: true },
  });
  console.log('All buildings:', allBuildings);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
