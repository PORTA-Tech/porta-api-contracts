# Privacy Contract Constraints

The signal layer is privacy-hardened.

## Prohibited payloads
- Raw keystroke content
- Clipboard content
- Screen capture
- File/message content
- Raw network traffic content
- Free-text user input fields in signal events

## Allowed signal shape
- Numeric, bounded, behavioral telemetry only
- Typed enums and timestamps

`events/signal-sample.schema.json` intentionally disallows free-text fields via `additionalProperties: false` and strict typed properties.