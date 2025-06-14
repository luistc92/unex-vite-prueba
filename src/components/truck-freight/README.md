# Truck Freight Components

This directory contains the modular components that make up the TruckFreightTable functionality. The components have been extracted from the original monolithic `TruckFreightTable.tsx` component to improve maintainability, reusability, and testability.

## Component Structure

```
truck-freight/
├── StatusBadge.tsx          # Reusable status badge with color coding
├── FreightForm.tsx          # Reusable form for freight data input/editing
├── FreightCard.tsx          # Individual freight item display and editing
├── AddFreightCard.tsx       # Dedicated component for adding new freight
├── CommentEditor.tsx        # Inline comment editing functionality
├── FreightList.tsx          # Container for freight cards in a truck
├── TruckRow.tsx            # Complete truck row component
├── index.ts                # Barrel exports
└── README.md               # This file
```

## Component Responsibilities

### StatusBadge
- **Purpose**: Display freight status with appropriate color coding
- **Props**: `status: string`
- **Features**: Automatic color mapping based on status value

### FreightForm
- **Purpose**: Reusable form component for freight data input/editing
- **Props**: freight data, field change handlers, save/cancel handlers
- **Features**: Validation, disabled state support, customizable button text

### FreightCard
- **Purpose**: Display individual freight items with expand/collapse editing
- **Props**: freight data, editing state, event handlers
- **Features**: Click to expand, inline editing, keyboard navigation

### AddFreightCard
- **Purpose**: Dedicated component for adding new freight items
- **Props**: truck ID, new freight data, event handlers
- **Features**: Toggle expand/collapse, form validation

### CommentEditor
- **Purpose**: Inline editing of truck comments
- **Props**: comment data, editing state, event handlers
- **Features**: Hover-to-show edit button, textarea editing

### FreightList
- **Purpose**: Container component for all freight-related items in a truck
- **Props**: freight array, editing states, event handlers
- **Features**: Manages freight cards and add freight card

### TruckRow
- **Purpose**: Complete truck row containing truck info, freight list, and comments
- **Props**: truck data, all editing states, event handlers
- **Features**: Orchestrates all truck-related functionality

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be reused in other parts of the application
3. **Testability**: Smaller components are easier to unit test
4. **Maintainability**: Changes to specific functionality are isolated
5. **Readability**: Code is easier to understand and navigate
6. **Type Safety**: Strong TypeScript typing throughout

## Usage

Import components individually or use the barrel export:

```typescript
// Individual imports
import { StatusBadge } from './truck-freight/StatusBadge'
import { FreightForm } from './truck-freight/FreightForm'

// Barrel import
import { StatusBadge, FreightForm, TruckRow } from './truck-freight'
```

## Future Improvements

- Add unit tests for each component
- Extract custom hooks for complex state management
- Add Storybook stories for component documentation
- Consider adding error boundaries for better error handling
- Add accessibility improvements (ARIA labels, keyboard navigation)
