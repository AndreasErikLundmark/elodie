# Audio showreel, React + TypeScript + Vite + Tailwind

Runs on 8080

Install everything.... 

#npm run dev


to deploy
```bash
#See nginx.conf
#See package.json ( change image name and google run ids here ) 
#See vite.config.js
```
```bash
#npm run docker:clean 
#npm run docker:build
#npm run docker:push  
#npm run docker:deploy
```

<img width="800" alt="Screenshot 2025-02-10 at 08 58 53" src="https://github.com/user-attachments/assets/73b17c10-a6d1-4108-bb12-d94dc0e8a2ec" />


----- Backend -----

build and push: 
```
docker buildx build \
  --platform linux/amd64 \
  -t gcr.io/gcp-project-id/audiostreamer \
  --load .
docker push gcr.io/cp-project-id/audiostreamer
```
Deploy:
```
gcloud run deploy audiostreamer \
  --image gcr.io/<gcp-project>/audiostreamer \
  --platform managed \
  --region us-central1 \
  --project <gcp-project> \
  --allow-unauthenticated
```

