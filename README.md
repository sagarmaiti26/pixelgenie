# PixelGenie : An AI SaaS Application

## Overview

Welcome to the AI Image Manipulation SaaS project. This platform provides users with a suite of powerful AI-driven tools for image restoration, generative fill, object removal, and object recolor. Leveraging cutting-edge technologies, the application ensures seamless user experience and efficient image manipulation capabilities.

## Features

- **Image Restore**: Restore old or damaged photos to their original quality.
- **Generative Fill**: Fill missing parts of an image using AI-powered generative models.
- **Object Remove**: Remove unwanted objects from images with precision.
- **Object Recolor**: Change the colors of objects within images effectively.
- **Background Remove**: Remove the background of the objects.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Payment Processing**: Stripe
- **Image Manipulation**: Cloudinary API

## Installation

### Prerequisites

- Node.js
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/sagarmaiti26/pixelgenie.git
cd pixelgenie
```

### Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
MONGODB_URL=your_database_url
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
WEBHOOK_SECRET=clerk_webhook_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_secret_webhook
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
```

### Run the Application

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application should now be running on `http://localhost:3000`.

## Usage

1. **Sign Up / Login**: Use Clerk for authentication to sign up or log in to the platform.
2. **Subscription**: Subscribe to a plan using Stripe for payment processing.
3. **Image Upload**: Upload images via the Cloudinary API.
4. **Image Manipulation**: Use the provided tools for restoring, filling, removing, or recoloring images.
5. **Download**: Save and download the processed images.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add some feature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

Sagar Maiti  
- [Email](mailto:sagarmaiti277@gmail.com)  
- [LinkedIn](https://www.linkedin.com/in/sagarmaiti26)  
- [GitHub](https://github.com/sagarmaiti26)

---
