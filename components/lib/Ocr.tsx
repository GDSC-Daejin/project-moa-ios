import { useEffect } from "react";
import axios from "axios";
import * as Crypto from "expo-crypto";
import { NAVER_OCR_URL, NAVER_SECRET_KEY } from "@env";

interface OcrProps {
  downloadUrl: string | null;
  onDataExtracted: (data: any) => void;
}

export default function Ocr({ downloadUrl, onDataExtracted }: OcrProps) {
  const URL = NAVER_OCR_URL;
  const SECRET = NAVER_SECRET_KEY;
  const UUID = Crypto.randomUUID();

  const getBase64FromUrl = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String.split(",")[1];
            resolve(base64Data);
          };
          reader.readAsDataURL(blob);
        })
        .catch((error) => reject(error));
    });
  };

  const sendOcrRequest = async () => {
    if (!downloadUrl) {
      console.warn("No download URL available.");
      return;
    }

    try {
      const imageBase64 = await getBase64FromUrl(downloadUrl);
      const imageName = downloadUrl.substring(downloadUrl.lastIndexOf("/") + 1);
      const imageFormat = imageName.split(".").pop()?.toLowerCase() || "";

      const acceptedFormats = ["jpg", "jpeg", "png", "tif", "tiff", "pdf"];
      const validFormat = acceptedFormats.includes(imageFormat)
        ? imageFormat
        : "jpg";

      const message = {
        images: [
          {
            format: validFormat,
            name: imageName,
            data: imageBase64,
          },
        ],
        requestId: UUID,
        timestamp: Date.now(),
        version: "V2",
      };

      const response = await axios.post(URL, message, {
        headers: {
          "X-OCR-SECRET": SECRET,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data.images[0];
        onDataExtracted(data);
      }
    } catch (error: any) {
      if (error.response) {
        console.warn("requestWithFile error:", error.response.data);
      } else {
        console.warn("requestWithFile error:", error.message);
      }
    }
  };

  useEffect(() => {
    if (downloadUrl) {
      sendOcrRequest();
    }
  }, [downloadUrl]);

  return <></>;
}
