# Warh Elshasha Frontend

React/Vite public website for Warh Elshasha, built from the project documentation in the repository root.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- The app uses fallback CMS content so it can render before Strapi is connected.
- Set `VITE_STRAPI_URL` and `VITE_STRAPI_API_TOKEN` when connecting the CMS.
- Public routes never request clinical records, client records, or restricted dashboard data.
