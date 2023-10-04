# Veo

How to run this:

-Backend Part:

```bash
cd backend
```

The classic install packages
```bash
npm i
```

To get an instance of postgres up and running:
```bash
docker-compose up postgres
```

Then Prisma:
```bash
npx prisma migrate dev --name init
```

To auto-generate types prisma normally needs this:
```bash
npx prisma generate
```

To Run:
```bash
npm run dev
```

To Test:
```bash
npm run test
```

-Frontend Part:

```bash
cd frontend
```

Surprise! install packages!
```bash
npm i
```
Actually starting:
```bash
npm run start
```

