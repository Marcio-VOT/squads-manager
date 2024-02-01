// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedData() {
  // Create squad members
  const squadMembers = [];
  for (let i = 1; i <= 5; i++) {
    const squadMember = await prisma.squadMember.create({
      data: {
        name: `Member ${i}`,
        position: `Position ${i}`,
        email: `member${i}@example.com`,
        discord: `member${i}#1234`,
      },
    });
    squadMembers.push(squadMember);
  }

  // Create products
  const products = [];
  for (let i = 1; i <= 5; i++) {
    const product = await prisma.product.create({
      data: {
        priority: i,
        item_description: `Product ${String.fromCharCode(64 + i)}`,
      },
    });
    products.push(product);
  }

  // Create squads with leaders, scrum masters, and product owners
  for (let i = 0; i < 5; i++) {
    await prisma.squad.create({
      data: {
        name: `Team ${String.fromCharCode(65 + i)}`,
        leader_id: squadMembers[i].member_id,
        product_id: products[i].product_id,
        sprint_duration: 3,
        trello_url: `https://burndown.example.com/team${i}`,
        product_owner_id: squadMembers[(i + 1) % 5].member_id,
        scrum_master_id: squadMembers[(i + 2) % 5].member_id,
      },
    });
  }
}

seedData()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
