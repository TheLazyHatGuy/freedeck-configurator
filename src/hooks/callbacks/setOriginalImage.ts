import { useCallback } from "react";

import {
  IConvertedImage,
  IConvertedImagePage,
  IDisplayPage,
  IOriginalImagePage,
} from "../../App";
import { getEmptyConvertedImage } from "../../definitions/emptyConvertedImage";
import { monochrome128by64BitmapHeader } from "../../definitions/headers";
import { composeImage } from "../../lib/composeImage";

export const useSetOriginalImageCallback = (
  convertedImagePages: IConvertedImagePage[],
  originalImagePages: IOriginalImagePage[],
  displayPages: IDisplayPage[],
  setOriginalImagePages: (
    value: React.SetStateAction<IOriginalImagePage[]>
  ) => void,
  setConvertedImagePages: (
    value: React.SetStateAction<IConvertedImagePage[]>
  ) => void
) =>
  useCallback(
    async (pageIndex: number, displayIndex: number, image: Buffer | null) => {
      const display = displayPages[pageIndex][displayIndex];
      let convertedImage: IConvertedImage;
      if (image !== null) {
        convertedImage = await composeImage(image, 128, 64, display);
      } else {
        convertedImage = getEmptyConvertedImage();
      }
      const newOriginalImages = [...originalImagePages];
      newOriginalImages[pageIndex][displayIndex] = image;
      setOriginalImagePages(newOriginalImages);

      const newConvertedImages = [...convertedImagePages];
      newConvertedImages[pageIndex][displayIndex] = convertedImage;
      setConvertedImagePages(newConvertedImages);
    },
    [
      convertedImagePages,
      originalImagePages,
      displayPages,
      setOriginalImagePages,
      setConvertedImagePages,
    ]
  );
