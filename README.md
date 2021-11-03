# Newbie-Foodie-api

## QuickStart

To run the server locally:
```bash
npm install
npm start
```

## GCP
### Database
Hosted on Cloud SQL (34.133.190.224:3306)

### Backend API
Hosted on Cloud Run (https://newbie-foodie-mi3dxq6nuq-uc.a.run.app)

#### To push a new build:
\<TAG> being a version tag e.g. X.Y.Z
```bash
gcloud builds submit --tag gcr.io/newbie-foodie/newbie-foodie:<TAG> .
gcloud run deploy newbie-foodie --region=us-central1 --image=gcr.io/newbie-foodie/newbie-foodie:<TAG>
```
