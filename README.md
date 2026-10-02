# leakfix-render-test

A throwaway Render service for testing [leakfix](https://github.com/safayet404/leakfix)
against the real Render API. The `.env` is committed on purpose: it is the "leak".

`GET /health` returns fingerprints of the JWT secrets, so you can see a rotation reach
the running app without the secrets ever being shown. Delete the service when done.
