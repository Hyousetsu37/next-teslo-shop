## Run in development

1. Clone the repository
2. Copy the `.env.template` and rename it to `.env`
3. Install dependencies `pnpm install`
4. Lift the database `docker compose up -d`
5. Run prisma migrations `pnpx prisma migrate dev --name initialMigration`
6. Run seed `pnpm run seed`
7. Run the project `pnpm dev`
