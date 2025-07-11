# City Import Tools

This directory contains tools to import city data from Excel/CSV files into your Convex database.

## Available Methods

### 1. Web Interface (Recommended)
Use the `CityImporter` React component for a user-friendly interface.

**Usage:**
```typescript
import { CityImporter } from "@/components/CityImporter"

// Add to your app
<CityImporter />
```

**Features:**
- File upload (CSV, JSON)
- Manual data entry
- Preview and validation
- Batch processing
- Error handling
- Sample data import

### 2. Node.js Script (For Large Files)
Use the Node.js script for processing large Excel files.

**Setup:**
```bash
npm install xlsx convex
```

**Usage:**
```bash
node scripts/importCitiesFromExcel.js path/to/your/cities.xlsx
```

**Requirements:**
- Excel file with columns: `name`, `alias`, `estado`
- CONVEX_URL environment variable set

### 3. Convex Internal Actions (Programmatic)
Use internal actions for programmatic imports.

**Usage:**
```typescript
// Import sample cities
await ctx.runAction(internal.importCitiesScript.importSampleCities, {});

// Import from CSV string
await ctx.runAction(internal.importCitiesScript.importCitiesFromData, {
  data: "name,alias,estado\nMexico City,CDMX,Ciudad de Mexico",
  format: "csv",
  clearExisting: false
});
```

## Data Format Requirements

### CSV Format
```csv
name,alias,estado
Mexico City,CDMX,Ciudad de Mexico
Guadalajara,GDL,Jalisco
Monterrey,MTY,Nuevo Leon
```

### JSON Format
```json
[
  {"name":"Mexico City","alias":"CDMX","estado":"Ciudad de Mexico"},
  {"name":"Guadalajara","alias":"GDL","estado":"Jalisco"},
  {"name":"Monterrey","alias":"MTY","estado":"Nuevo Leon"}
]
```

### Excel Format
- Save your Excel file as CSV first
- Ensure columns are named: `name`, `alias`, `estado`
- Alternative column names are supported:
  - `name`: ciudad, City, Ciudad, CIUDAD
  - `alias`: Alias, ALIAS (optional, will use name if missing)
  - `estado`: state, Estado, State, ESTADO

## Column Mapping

The import tools automatically detect these column variations:

| Required Field | Accepted Column Names |
|----------------|----------------------|
| **name** | name, ciudad, City, Ciudad, CIUDAD |
| **alias** | alias, Alias, ALIAS, short |
| **estado** | estado, state, Estado, State, ESTADO |

## Features

### Duplicate Prevention
- Automatically checks for existing cities by name
- Skips duplicates to avoid conflicts
- Reports skipped cities in results

### Batch Processing
- Processes cities in batches of 50
- Prevents timeout issues with large datasets
- Shows progress during import

### Error Handling
- Validates required fields
- Reports specific errors for each row
- Continues processing even if some rows fail

### Data Validation
- Trims whitespace from all fields
- Converts all fields to strings
- Validates required fields are present

## Example Usage Scenarios

### 1. Initial Setup
```typescript
// Import sample Mexican cities for testing
const result = await importSample();
```

### 2. Bulk Import from Excel
```bash
# Convert Excel to CSV first, then:
node scripts/importCitiesFromExcel.js ./data/mexican_cities.csv
```

### 3. Web Interface Import
1. Open your app with the CityImporter component
2. Upload your CSV/JSON file or paste data
3. Choose options (clear existing, etc.)
4. Click "Import Cities"

### 4. Programmatic Import
```typescript
const csvData = `
name,alias,estado
Cancun,CUN,Quintana Roo
Acapulco,ACA,Guerrero
`;

const result = await ctx.runAction(internal.importCitiesScript.importCitiesFromData, {
  data: csvData,
  format: "csv"
});
```

## Troubleshooting

### Common Issues

1. **"Column not found" error**
   - Check your column names match expected formats
   - Ensure first row contains headers

2. **"No data found" error**
   - Verify file is not empty
   - Check file encoding (should be UTF-8)

3. **"Missing required field" error**
   - Ensure all rows have name and estado values
   - Check for empty cells in required columns

4. **Import partially fails**
   - Check the detailed results for specific row errors
   - Fix problematic rows and re-import

### Performance Tips

1. **Large files**: Use the Node.js script for files > 1000 rows
2. **Batch size**: Default batch size is 50, increase for better performance
3. **Memory**: For very large files, consider splitting into smaller chunks

## Security Notes

- The `clearAllCities` function permanently deletes all cities
- Always backup your data before bulk operations
- Test with sample data first
- Use the web interface for better safety controls

## File Structure

```
scripts/
├── importCitiesFromExcel.js     # Node.js script for Excel files
└── README_CITY_IMPORT.md        # This file

convex/
├── importCities.ts              # Core import mutations
└── importCitiesScript.ts        # Internal actions for imports

src/components/
└── CityImporter.tsx             # React component for web interface
```
