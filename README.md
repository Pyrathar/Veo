# Veo

How to run this:

-Backend Part:

```bash
cd backend
```

To get an instance of postgres up and running:
```bash
docker-compose up postgres
```

Then Prisma:
```bash
npx prisma migrate dev --name init
```
To Run:
```bash
npm run dev
```

To Test:
```bash
npm run test
```

-Backend Part:

```bash
cd frontend
```

```bash
npm run start
```

