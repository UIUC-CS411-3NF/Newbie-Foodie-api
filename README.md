# Newbie-Foodie-api

## QuickStart

```bash
cd api
npm install
npm start
```

### Run in Docker

```bash
docker-compose up
```

You can check `.env` for all the default settings. After running the above command, you should able to directly access mysql through `:3307` and api through `:8081` on your host machine.

## GCP
### Database
Hosted on Cloud SQL (34.133.190.224:3306)

### Backend API
Hosted on Cloud Run (https://newbie-foodie-mi3dxq6nuq-uc.a.run.app)

#### To push a new build:
\<TAG> being a version tag e.g. X.Y.Z
```bash
gcloud builds submit --tag gcr.io/newbie-foodie/newbie-foodie:<TAG> api
gcloud run deploy newbie-foodie --region=us-central1 --image=gcr.io/newbie-foodie/newbie-foodie:<TAG>
```
