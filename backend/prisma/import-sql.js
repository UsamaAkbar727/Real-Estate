const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function main() {
  const prisma = new PrismaClient();

  try {
    const sqlPath = path.join(__dirname, '../../real-estate.sql');
    console.log('Reading SQL file from:', sqlPath);
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Clean SQL content by removing all comment lines starting with '--'
    const cleanSql = sqlContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => !line.startsWith('--'))
      .join('\n');

    // Split statements by semicolon
    const rawStatements = cleanSql.split(';');

    console.log(`Found ${rawStatements.length} raw statements. Clearing existing data first...`);

    try {
      await prisma.$executeRawUnsafe('DELETE FROM Inquiry;');
      await prisma.$executeRawUnsafe('DELETE FROM Property;');
      await prisma.$executeRawUnsafe('DELETE FROM Agent;');
      console.log('Cleared existing records from dev.db.');
    } catch (e) {
      console.log('Table deletion skipped or failed:', e.message);
    }

    let successCount = 0;
    let skipCount = 0;

    for (let i = 0; i < rawStatements.length; i++) {
      let statement = rawStatements[i].trim();
      
      // Skip empty statements
      if (!statement) {
        skipCount++;
        continue;
      }

      // Skip CREATE TABLE statements
      if (statement.toUpperCase().startsWith('CREATE TABLE')) {
        console.log(`[Statement ${i}] Skipping CREATE TABLE statement.`);
        skipCount++;
        continue;
      }

      console.log(`[Statement ${i}] Executing query snippet: "${statement.substring(0, 100).replace(/\n/g, ' ')}..."`);
      try {
        await prisma.$executeRawUnsafe(statement);
        successCount++;
      } catch (err) {
        console.error(`[Statement ${i}] Error executing statement:\n`, statement);
        console.error(err);
        process.exit(1);
      }
    }

    console.log(`Import completed. Executed ${successCount} statements successfully. Skipped ${skipCount} statements.`);
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
