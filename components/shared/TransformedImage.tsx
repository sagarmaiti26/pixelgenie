'use client'

import { CldImage, getCldImageUrl } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import { dataUrl, debounce, download, getImageSize } from "../../lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

const TransformedImage = ({
  image,
  type,
  title,
  isTransforming,
  setIsTransforming,
  transformationConfig,
  hasDownload = false,
}: TransformedImageProps) => {
  const dowloadHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      }),
      title
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-slate-900">Transformed</h3>

        {hasDownload && (
          <button className="download-btn" onClick={dowloadHandler}>
            <Image src="/assets/icons/download.svg" alt="" width={18} height={18} />
            Download
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000)();
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt=""
              />
              <p className="p-14-medium text-white/90">Applying magic…</p>
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">
          <Image src="/assets/icons/stars.svg" alt="" width={28} height={28} className="opacity-60" />
          Your transformed image will appear here
        </div>
      )}
    </div>
  );
};

export default TransformedImage;
