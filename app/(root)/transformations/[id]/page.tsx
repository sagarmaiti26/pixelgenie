import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import { getImageById } from "../../../../lib/actions/image.actions";
import { getImageSize } from "../../../../lib/utils";

import Header from "../../../../components/shared/Header";
import TransformedImage from "../../../../components/shared/TransformedImage";
import { DeleteConfirmation } from "../../../../components/shared/DeleteConfirmation";


const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-3">
        {[
          { label: "Transformation", value: image.transformationType },
          { label: "Prompt", value: image.prompt },
          { label: "Color", value: image.color },
          { label: "Aspect Ratio", value: image.aspectRatio },
        ]
          .filter((item) => item.value)
          .map((item) => (
            <div key={item.label} className="meta-chip">
              <span className="text-slate-500">{item.label}</span>
              <span className="capitalize text-brand-600">{item.value}</span>
            </div>
          ))}
      </section>

      <section className="mt-10 border-t border-slate-200">
        <div className="transformation-grid">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-slate-900">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt={image.title}
              priority
              className="transformation-original_image"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Link
              href={`/transformations/${image._id}/update`}
              className="submit-button"
            >
              Update Image
            </Link>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;
