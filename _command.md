# Git / GitHub

## 1. Commits

#### stage all changes for review:

`git add .`

#### commit changes:

`git commit -m "commit message"`

## 2. Branch Management

#### create and jump to a new branch:

`git checkout -b feature/branchName`

#### jump to a different branch:

`git checkout feature/branchName`

#### rename branch:

`git branch -m oldBranchName newBranchName`

# Prisma ORM

Avoid making schema changes in both places (DB and Prisma). Pick one as your source of truth — ideally Prisma — and always push changes from there. Mixing changes in the DB and Prisma is what causes these inconsistencies.

## During Development

### 1. sync Prisma schema with DB - migration table not created

`npx prisma db push`

### 2. regenerate the Prisma Client so your code reflects the new schema

`npx prisma generate`

### 3. Open Prisma Studio to visually inspect your data (optional)

`npx prisma studio`

## During or Nearing Production

### 1. migrate changes - migration table created

`npx prisma migrate dev --name added_profile_table`

### 2. regenerate the Prisma Client so your code reflects the new schema

`npx prisma generate`

## sync DB changes to Prisma

`npx prisma db pull`
