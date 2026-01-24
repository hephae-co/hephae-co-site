# Hephae Website

This is the official website for Hephae. It is a full-stack application with a React frontend and a Node.js backend using Express. The backend communicates with Firebase services and the application is designed for deployment on Google Cloud Run.

## Architecture

The application follows a client-server model where the backend serves the React application and provides an API that interacts with Firebase.

```
[Client Browser] <--> [Vite/Node.js on Cloud Run] <--> [Firebase Services]
       |                      | (Express Server)
       |                      |
       <---------------------->
        (Serves React App)
```

- **Frontend**: A React single-page application (SPA) that provides the user interface.
- **Backend**: An Express.js server that serves the built React application's static files (`index.html`, CSS, JS) and may include API endpoints that use the `firebase-admin` SDK to communicate with Firebase services.
- **Deployment**: The entire application is containerized and deployed as a single service on Google Cloud Run.

## Project Structure

```
/
├── components/     # React UI components
├── public/         # Public assets
├── App.tsx         # Main React application component
├── server.js       # Node.js Express backend server
├── Dockerfile      # Docker configuration for building the production container
└── vite.config.ts  # Vite configuration
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

This project requires certain environment variables to be set to function correctly. Create a `.env` file in the root of the project and add the following variables:

```
GEMINI_API_KEY="your_gemini_api_key"
AI_READINESS_QUEST_URL="your_ai_readiness_quest_url"
TRAFFIC_FORECASTER_URL="your_traffic_forecaster_url"
AETHERIA_AI_RESTAURANT_URL="your_aetheria_ai_restaurant_url"
AI_PRODUCT_MOCKUP_URL="your_ai_product_mockup_url"
MARKETING_BUSINESS_AI_URL="your_marketing_business_ai_url"
```

Replace `"your_*_url"` and `"your_gemini_api_key"` with the actual values. For Firebase, you will also need to set up authentication. See the "Firebase Authentication" section below.

### Installation

Install NPM packages:
```sh
npm install
```

### Running the Development Server
To run the app in development mode:
```sh
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload if you make changes to the code.

### Firebase Authentication

For the backend server to access Firebase services locally, you need to provide Application Default Credentials (ADC).

1.  **Authenticate with Google Cloud**:
    ```bash
    gcloud auth application-default login
    ```
2.  **Set Google Application Credentials**: If you are using a service account file (recommended for production environments), set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your service account key file.
    ```bash
    export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"
    ```

## Usage


### Local Build (Mac M1/M2)

For Macbook Silicone M2 environments, you can build a local Docker image using the following commands:

```sh
export SERVICE_NAME=hephae-co-site
export TAG=$(git branch --show-current)-$(git rev-parse --short HEAD)
docker build --platform linux/amd64 . -t ${SERVICE_NAME}:${TAG}
```

### Deployment Build

After the local deployment has been tested, the git branch merged to main, and a new tag has been created, you can create a deployment build with the following commands:

```sh
export SERVICE_NAME=hephae-co-site
export TAG=$(git describe --abbrev=0)
docker build --platform linux/amd64 . -t ${SERVICE_NAME}:${TAG}
```

### Running the Container

After building the image, run it with the following command, making sure to replace `your_api_key_here` and `your_*_url` with your actual values:

```sh
docker run -p 8080:8080 --it \
  -e GEMINI_API_KEY="your_api_key_here" \
  -e AI_READINESS_QUEST_URL="your_ai_readiness_quest_url" \
  -e TRAFFIC_FORECASTER_URL="your_traffic_forecaster_url" \
  -e AETHERIA_AI_RESTAURANT_URL="your_aetheria_ai_restaurant_url" \
  -e AI_PRODUCT_MOCKUP_URL="your_ai_product_mockup_url" \
  -e MARKETING_BUSINESS_AI_URL="your_marketing_business_ai_url" \
  --name ${SERVICE_NAME} \
  --rm ${SERVICE_NAME}:${TAG}
```

## Testing

Unit tests are not currently implemented for this project.

## Deployment

### Deploying from Source to Cloud Run

You can deploy this application directly to Cloud Run from your source code. The command will use the `.env` file to configure the environment variables for the deployed service, including the `GEMINI_API_KEY`.

#### Prerequisites

1.  A Google Cloud Project with billing enabled.
2.  The [Google Cloud SDK](https://cloud.google.com/sdk/install) installed and authenticated.
3.  The Cloud Run and Cloud Build APIs enabled in your project:
    ```bash
    gcloud services enable run.googleapis.com cloudbuild.googleapis.com
    ```
4.  Verify you own the domain you want to map (optional):
    ```bash
    gcloud domains verify hephae.co
    ```
    Add the TXT records to your Domain registrar and verify. After verification run:
    ```bash
    gcloud domains list-user-verified
    ```

#### Deployment Command

```bash
gcloud run deploy $SERVICE_NAME \
    --source . \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --env-vars-from-file .env
```

#### Domain Mapping

Set your domain as an environment variable:
```bash
export DOMAIN="hephae.co"
```

Then, create the domain mapping:
```bash
gcloud beta run domain-mappings create --service ${SERVICE_NAME} --domain $DOMAIN --region us-central1
```

## Versioning

The current versioning strategy depends on the feature development lifecycle (dev, test, release) and deployment environment (dev, prod). The image tag for each build in in dev & test is a combination of the feature branch name and commit hash (eg.feature-xyz_a9f24be). For feature releases, the tag prefix is the source tag or version number (e.g 0.1.0, 0.2.0, etc.)

### Development and Testing
For dev and test, use the branch name and commit hash:

```sh
export TAG=$(git branch --show-current)-$(git rev-parse --short HEAD)
```

### Release
For feature releases, checkout a specific tag, then use the tag name/number:

```sh
export TAG=`git describe --abbrev=0`
```

## Contributing

We welcome contributions to Hephae Site! Please feel free to report bugs, suggest features, or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Hephae.co

## Authors and Acknowledgements

*   **Hephae.co**

## Contact

For questions or support, please contact us at [contact@hephae.co](mailto:contact@hephae.co).
