#!/usr/bin/env node

/**
 * Script to import cities from an Excel file to Convex database
 * 
 * Usage:
 *   node scripts/importCitiesFromExcel.js path/to/your/file.xlsx
 * 
 * Excel file should have columns:
 *   - name (or ciudad): City name
 *   - alias: City alias/short name
 *   - estado: State name
 * 
 * Install dependencies first:
 *   npm install xlsx convex
 */

const XLSX = require('xlsx');
const { ConvexHttpClient } = require('convex/browser');
const path = require('path');
const fs = require('fs');

// Configuration
const CONVEX_URL = process.env.CONVEX_URL || process.env.VITE_CONVEX_URL;
const BATCH_SIZE = 50; // Process cities in batches

async function main() {
  // Check command line arguments
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node scripts/importCitiesFromExcel.js <excel-file-path>');
    console.error('Example: node scripts/importCitiesFromExcel.js ./data/cities.xlsx');
    process.exit(1);
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  // Check Convex URL
  if (!CONVEX_URL) {
    console.error('CONVEX_URL environment variable not found.');
    console.error('Make sure you have CONVEX_URL or VITE_CONVEX_URL set in your environment.');
    process.exit(1);
  }

  console.log(`Reading Excel file: ${filePath}`);
  console.log(`Convex URL: ${CONVEX_URL}`);

  try {
    // Initialize Convex client
    const client = new ConvexHttpClient(CONVEX_URL);

    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];
    
    console.log(`Reading sheet: ${sheetName}`);

    // Convert to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`Found ${rawData.length} rows in Excel file`);

    if (rawData.length === 0) {
      console.log('No data found in Excel file');
      return;
    }

    // Show sample of first row to help with column mapping
    console.log('\nSample row (first row):');
    console.log(JSON.stringify(rawData[0], null, 2));

    // Map Excel columns to our schema
    const cities = rawData.map((row, index) => {
      try {
        // Try different possible column names
        const name = row.name || row.ciudad || row.Name || row.Ciudad || row.CIUDAD;
        const alias = row.alias || row.Alias || row.ALIAS || name; // Use name as alias if not provided
        const estado = row.estado || row.state || row.Estado || row.State || row.ESTADO;

        if (!name) {
          throw new Error(`Missing city name in row ${index + 1}`);
        }
        if (!estado) {
          throw new Error(`Missing estado in row ${index + 1}`);
        }

        return {
          name: String(name).trim(),
          alias: String(alias).trim(),
          estado: String(estado).trim(),
        };
      } catch (error) {
        console.error(`Error processing row ${index + 1}:`, error.message);
        console.error('Row data:', row);
        return null;
      }
    }).filter(city => city !== null); // Remove invalid rows

    console.log(`\nProcessed ${cities.length} valid cities`);

    if (cities.length === 0) {
      console.log('No valid cities to import');
      return;
    }

    // Show sample of processed data
    console.log('\nSample processed city:');
    console.log(JSON.stringify(cities[0], null, 2));

    // Confirm before proceeding
    console.log(`\nReady to import ${cities.length} cities to Convex database.`);
    console.log('Press Ctrl+C to cancel, or press Enter to continue...');
    
    // Wait for user confirmation
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });

    // Import in batches
    let totalImported = 0;
    let totalFailed = 0;

    for (let i = 0; i < cities.length; i += BATCH_SIZE) {
      const batch = cities.slice(i, i + BATCH_SIZE);
      console.log(`\nImporting batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(cities.length / BATCH_SIZE)} (${batch.length} cities)...`);

      try {
        const result = await client.mutation("importCities:batchCreateCities", {
          cities: batch
        });

        totalImported += result.successful;
        totalFailed += result.failed;

        console.log(`Batch result: ${result.successful} successful, ${result.failed} failed`);
      } catch (error) {
        console.error(`Error importing batch:`, error);
        totalFailed += batch.length;
      }
    }

    console.log(`\n✅ Import completed!`);
    console.log(`Total imported: ${totalImported}`);
    console.log(`Total failed: ${totalFailed}`);
    console.log(`Total processed: ${totalImported + totalFailed}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nImport cancelled by user');
  process.exit(0);
});

main().catch(console.error);
