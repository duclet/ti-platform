# @ti-platform/client-airtable

This client provides a client to interact with Airtable.

Ideally, this package should not even need to exist since Airtable have provided their own client. However, they refuse
to actually implement all features of their REST APIs with their client. This package tries to fix that.

# Contents

# Example Usage

```typescript
import {AirtableClient } from "@ti-platform/client-airtable";

const client = new AirtableClient('my-api-token');

const records = await client.listRecords<{ Field1: boolean; Field2: string }>({
    baseId: 'app12345',
    tableId: 'tbl12345',
    fields: ['Field1', 'Field2'],
    maxRecords: 10,
});
```

# API Docs
---Insert API Docs---
