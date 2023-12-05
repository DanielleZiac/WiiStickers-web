import { useEffect, useRef } from "react";

type Props = {
  name: string | null;
  dept: string | null;
  backgroundColor: string | null;
  background: string | null;
  gender: string | null;
  wear: string | null;
  eyes: string | null;
  mouth: string | null;
  width: number;
  height: number;
};

export default async function Canvas(
  props: Props & React.ComponentProps<"canvas">,
) {
  const {
    width,
    height,
    name,
    dept,
    backgroundColor,
    background,
    gender,
    wear,
    eyes,
    mouth,
  } = props;

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const ctx = canvas.getContext("2d");

    // Set background color with RGBA values
    if (backgroundColor) {
      ctx.fillStyle = `rgba${backgroundColor}`;
    }

    // @ts-ignore
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawImages = async () => {
      // @ts-ignore
      const loadImage = async (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = (err) => reject(err);
        });
      };

      try {
        const imageSources = [];
        if (background) {
          imageSources.push(background);
        }
        if (gender) {
          imageSources.push(gender);
        }
        if (wear) {
          imageSources.push(wear);
        }
        if (eyes) {
          imageSources.push(eyes);
        }
        if (mouth) {
          imageSources.push(mouth);
        }

        for (let i = 0; i < imageSources.length; i++) {
          const image = await loadImage(`stickers/${imageSources[i]}.png`);
          ctx.drawImage(image, 0, 0, width, height);
        }

        // Set font properties
        ctx.font = "16px Arial";
        ctx.textAlign = "center";

        // Draw text on the canvas
        // @ts-ignore
        if (name && dept) {
          ctx.fillText(
            `I'm ${name} of ${dept.replace("background_", "")}!`,
            // @ts-ignore
            canvas.width / 2,
            // @ts-ignore
            canvas.height / 1.01,
          );
        }
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    drawImages();
  });

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: "1px solid black" }}
    />
  );
}
